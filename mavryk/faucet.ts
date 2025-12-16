import * as k8s from "@pulumi/kubernetes"
import * as pulumi from "@pulumi/pulumi"
import { RandomPassword } from "@pulumi/random"
import * as fs from "fs"
import * as YAML from "yaml"
import { getChartParams } from './chartResolver'

export interface Parameters {
  readonly faucetPrivateKey: pulumi.Output<string>
  readonly faucetRecaptchaSiteKey: pulumi.Output<string>
  readonly faucetRecaptchaSecretKey: pulumi.Output<string>
  readonly humanName: string
  readonly namespace: k8s.core.v1.Namespace
  readonly helmValuesFile: string
  readonly chartPath?: string
  readonly chartRepoVersion?: string
}

/**
 * Deploy a mavryk-k8s topology in a k8s cluster.
 * Supports either local charts or charts from a repo
 */

export class MavrykFaucet extends pulumi.ComponentResource {
  readonly mavrykFaucetHelmValues: any

  constructor(
    name: string,
    params: Parameters,
    provider: k8s.Provider,
    opts?: pulumi.ResourceOptions
  ) {
    const inputs: pulumi.Inputs = {
      options: opts,
    }
    super("pulumi-contrib:components:MavrykFaucet", name, inputs, opts)

    this.mavrykFaucetHelmValues = YAML.parse(
      fs.readFileSync(params.helmValuesFile, "utf8")
    );
    this.mavrykFaucetHelmValues["faucetPrivateKey"] = params.faucetPrivateKey
    let chartParams = getChartParams(params, "mavryk-faucet");

    if (this.mavrykFaucetHelmValues.disableChallenges !== true) {
      if (!this.mavrykFaucetHelmValues.redis) {
        this.mavrykFaucetHelmValues.redis = {}
      }

      const redisPassword = new RandomPassword(
        `${name}-redis-pswd`,
        { length: 16 },
        { parent: this }
      ).result

      this.mavrykFaucetHelmValues.redis.password = redisPassword

      new k8s.helm.v3.Release(
        `${name}-redis`,
        {
          chart: "redis",
          version: "17.15.6",
          namespace: params.namespace.metadata.name,
          repositoryOpts: {
            repo: "https://charts.bitnami.com/bitnami",
          },
          values: {
            // Keep the resource names short and simple
            fullnameOverride: "redis",
            // Deploy a single instance
            architecture: "standalone",
            // Don't create a pv and persist data
            master: {
              persistence: {
                enabled: false,
              },
            },
            global: {
              redis: {
                password: redisPassword,
              },
            },
          },
        },
        { provider: provider, parent: this }
      )
    }

    const testnetsDomain = `${name}.testnets.mavryk.network`
    const faucetDomain = `faucet.${testnetsDomain}`
    this.mavrykFaucetHelmValues.googleCaptchaSecretKey =
      params.faucetRecaptchaSecretKey
    this.mavrykFaucetHelmValues.authorizedHost = `https://${faucetDomain}`
    this.mavrykFaucetHelmValues.config.application.googleCaptchaSiteKey =
      params.faucetRecaptchaSiteKey
    this.mavrykFaucetHelmValues.config.application.backendUrl = `https://${faucetDomain}`
    this.mavrykFaucetHelmValues.config.network.name =
      this.mavrykFaucetHelmValues.config.network.name || params.humanName
    this.mavrykFaucetHelmValues.config.network.rpcUrl = `https://rpc.${testnetsDomain}`
    this.mavrykFaucetHelmValues.ingress.host = faucetDomain
    this.mavrykFaucetHelmValues.ingress.tls = [
      {
        hosts: [faucetDomain],
        secretName: `${faucetDomain}-secret`,
      },
    ]

    const faucetChartValues: any = {
      ...chartParams,
      namespace: params.namespace.metadata.name,
      values: this.mavrykFaucetHelmValues,
      version: params.chartRepoVersion,
    }

    new k8s.helm.v3.Chart(`${name}-faucet`, faucetChartValues, {
      providers: { kubernetes: provider }, parent: this,
    })

  }
}
