// chartParamsUtil.js

/**
 * Function to get chart parameters to pass to pulumi helm.
 * This allows to either use a local submodule chart or a released one.
 * Warning: When using a local one, if you require custom mavryk-k8s images, make sure
 * to specify them in your params.
 * 
 * 
 * @param {any} params - The parameters to determine the chart parameters.
 * @param {string} chartName - The name of the chart.
 * @return {Object} The chart parameters.
 */
export function getChartParams(params: any, chartName: string): object {
  if (!params.chartPath && !params.chartRepoVersion) {
    throw new Error("Either 'chartPath' or 'chartRepoVersion' must be provided in params");
  }
  let chartParams: any;

  if (params.chartPath) {
    chartParams = { path: `${params.chartPath}/charts/${chartName}` };
  } else {
    let _chartName = chartName;
    if (chartName == "mavryk") {
      // special case: the mavryk chart is published as "mavryk-chain"
      _chartName = "mavryk-chain";

    }
    chartParams = {
      fetchOpts: {
        repo: "https://mavryk-network.github.io/mavryk-helm-charts"
      },
      chart: _chartName,
      version: params.chartRepoVersion
    };
  }

  return chartParams;
}
