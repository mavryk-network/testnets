---
layout: page
title: Atlasnet
permalink: /atlasnet-about
---

Test Chain for the Atlas Protocol Proposal.

| | |
|-------|---------------------|
| Public RPC endpoints |  |
| Faucet | [Atlasnet faucet](https://atlasnet.faucet.mavryk.network) |
| Full network name | `MAVRYK_ATLASNET_2024-02-23T10:39:51Z` |
| Tezos docker build | mavrykdynamics/mavryk:v19.3 |
| Activated on | 2024-02-23T10:39:51Z |
| Block Explorers | [MvKT](https://atlasnet.api.mavryk.network) |


Oxfordnet has 8 second blocks (twice faster than mainnet).

Oxfordnet started on Nairobi protocol then upgraded to Oxford at the end of cycle 1 (the second cycle).

Adaptive Issuance is disabled on Oxfordnet. To test Adaptive Issuance, please use Weeklynet or Dailynet.


### Install the software

⚠️  If you already have an existing Tezos installation, do not forget to backup and delete your `~/.tezos-node` and `~/.tezos-client`.



#### Alternative: Use docker

To join Atlasnet with docker, open a shell in the container:

```
docker run -it --entrypoint=/bin/sh mavrykdynamics/mavryk:v19.3
```

#### Alternative: Build the software

⚠️  If this is your first time installing Tezos, you may need to [install a few dependencies](https://tezos.gitlab.io/introduction/howtoget.html#setting-up-the-development-environment-from-scratch).

```
cd
git clone git@gitlab.com:tezos/tezos.git
cd tezos
git checkout b1e1def27039b8cede461b6614af1addefbd69da
opam init # if this is your first time using OPAM
make build-deps
eval $(opam env)
make
export PATH=$HOME/tezos:$PATH
```

### Join the Atlasnet network

Run the following commands:

```
octez-node config init --network https://testnets.mavryk.org/atlasnet

octez-node run --rpc-addr 127.0.0.1:8732
```






### Bake on the Atlasnet network

To improve reliability of the chain, you can take part in the consensus by becoming a baker. In that case, you will need some test tokens from the [faucet](https://atlasnet.faucet.mavryk.network).

If you are not a bootstrap baker, you need to register your key as a delegate using your alias or `pkh`. For instance:
```bash=2
octez-client register key mykey as delegate
```

You may now launch the baker process.
```bash=3
octez-baker-PtAtLas run with local node ~/.tezos-node mykey --liquidity-baking-toggle-vote pass
```

You may run the accuser as well:
```bash=3
octez-accuser-PtAtLas run
```

Note that you need a minimum amount of tez to get baking rights. If you are not a bootstrap baker, it will take you several cycles to start baking.

> 💡 Now that you are baking, you are responsible for the network health. Please ensure that the baking processes will keep running in the background. You may want to use screen, tmux, nohup or systemd. Also make sure that the baking processes will restart when your machine restarts.


