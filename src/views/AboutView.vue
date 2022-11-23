<template>
  <div class="about">

    <div id="laborforceLineChart" style="height: 400px; width: 600px;display: inline-block;"></div>
    <div id="unemploymentRateChart" style="height: 400px; width: 600px; display: inline-block;"></div>
    <div id="populationPieChart" style="height: 400px; width: 600px; display: inline-block"></div>
    <div id="populationMapChart" style="height: 400px; width: 600px"></div>
  </div>
</template>
<script>
// @ is an alias to /src

import axios from 'axios';
import * as echarts from 'echarts';
// import $ from 'jquery'
export default {
  name: 'AboutView',
  data() {
    return {
      info: null
    }
  },
  mounted() {
    this.drawLaborLineChart();
    this.drawPopulationPieChart();
    // this.drawPopulationMapChart();
  },

  methods: {
    // async drawPopulationMapChart() {
    //   var populationMapChart = echarts.init(document.getElementById("populationMapChart"));
    //   console.log(populationMapChart)
    //   // var myChart = echarts.init(populationMapChart);
    //   // var option;
    //   // myChart.showLoading();
    //   const geoJson = await fetch(')
    //   console.log(geoJson)
    //   console.log(123123)
    //   // myChart.hideLoading();
    //   // echarts.registerMap('HK', geoJson)
    //   // axios.get('https://echarts.apache.org/examples/data/asset/geo/HK.json', function (geoJson) {
    //   //   myChart.hideLoading();
    //   //   echarts.registerMap('HK', geoJson);
    //   //   myChart.setOption(
    //   //     (option = {
    //   //       title: {
    //   //         text: 'Population Density of Hong Kong （2011）',
    //   //         subtext: 'Data from Wikipedia',
    //   //         sublink:
    //   //           'http://zh.wikipedia.org/wiki/%E9%A6%99%E6%B8%AF%E8%A1%8C%E6%94%BF%E5%8D%80%E5%8A%83#cite_note-12'
    //   //       },
    //   //       tooltip: {
    //   //         trigger: 'item',
    //   //         formatter: '{b}<br/>{c} (p / km2)'
    //   //       },
    //   //       toolbox: {
    //   //         show: true,
    //   //         orient: 'vertical',
    //   //         left: 'right',
    //   //         top: 'center',
    //   //         feature: {
    //   //           dataView: { readOnly: false },
    //   //           restore: {},
    //   //           saveAsImage: {}
    //   //         }
    //   //       },
    //   //       visualMap: {
    //   //         min: 800,
    //   //         max: 50000,
    //   //         text: ['High', 'Low'],
    //   //         realtime: false,
    //   //         calculable: true,
    //   //         inRange: {
    //   //           color: ['lightskyblue', 'yellow', 'orangered']
    //   //         }
    //   //       },
    //   //       series: [
    //   //         {
    //   //           name: '香港18区人口密度',
    //   //           type: 'map',
    //   //           map: 'HK',
    //   //           label: {
    //   //             show: true
    //   //           },
    //   //           data: [
    //   //             { name: '中西区', value: 30000.34 },
    //   //             { name: '湾仔', value: 15477.48 },
    //   //             { name: '东区', value: 31686.1 },
    //   //             { name: '南区', value: 6992.6 },
    //   //             { name: '油尖旺', value: 44045.49 },
    //   //             { name: '深水埗', value: 40689.64 },
    //   //             { name: '九龙城', value: 37659.78 },
    //   //             { name: '黄大仙', value: 45180.97 },
    //   //             { name: '观塘', value: 55204.26 },
    //   //             { name: '葵青', value: 21900.9 },
    //   //             { name: '荃湾', value: 4918.26 },
    //   //             { name: '屯门', value: 5881.84 },
    //   //             { name: '元朗', value: 4178.01 },
    //   //             { name: '北区', value: 2227.92 },
    //   //             { name: '大埔', value: 2180.98 },
    //   //             { name: '沙田', value: 9172.94 },
    //   //             { name: '西贡', value: 3368 },
    //   //             { name: '离岛', value: 806.98 }
    //   //           ],
    //   //           // 自定义名称映射
    //   //           nameMap: {
    //   //             'Central and Western': '中西区',
    //   //             Eastern: '东区',
    //   //             Islands: '离岛',
    //   //             'Kowloon City': '九龙城',
    //   //             'Kwai Tsing': '葵青',
    //   //             'Kwun Tong': '观塘',
    //   //             North: '北区',
    //   //             'Sai Kung': '西贡',
    //   //             'Sha Tin': '沙田',
    //   //             'Sham Shui Po': '深水埗',
    //   //             Southern: '南区',
    //   //             'Tai Po': '大埔',
    //   //             'Tsuen Wan': '荃湾',
    //   //             'Tuen Mun': '屯门',
    //   //             'Wan Chai': '湾仔',
    //   //             'Wong Tai Sin': '黄大仙',
    //   //             'Yau Tsim Mong': '油尖旺',
    //   //             'Yuen Long': '元朗'
    //   //           }
    //   //         }
    //   //       ]
    //   //     })
    //   //   );
    //   // });
    //   // option && myChart.setOption(option);
    // },
    async drawPopulationPieChart() {
      // let response = await axios.get('https://ogciopsi.blob.core.windows.net/dataset/labour-force/labour-force-by-year.json');
      var populationPieChart = echarts.init(document.getElementById("populationPieChart"));
      var option;
      option = {
        title: {
          text: 'Population 2022',

          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1048, name: 'Male' },
              { value: 735, name: 'Female' },

            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      populationPieChart.setOption(option)
    },
    async drawLaborLineChart() {
      let response = await axios.get('https://ogciopsi.blob.core.windows.net/dataset/labour-force/labour-force-by-year.json')
      let yearList = response.data.map(function (item) {
        return item.year
      })
      let laborForceList = response.data.map(function (item) {
        return item.labour_force / 1000000
      })

      let unemploymentRateList = response.data.map(function (item) {
        return item.unemployment_rate
      })

      var laborforceLineChart = echarts.init(document.getElementById("laborforceLineChart"));
      var unemploymentRateChart = echarts.init(document.getElementById("unemploymentRateChart"));
      var option;

      option = {
        title: {
          text: 'Labour force (Million)'
        },
        xAxis: {
          type: 'category',
          data: yearList
        },
        yAxis: {
          type: 'value',
          min: 2
        },
        series: [
          {
            data: laborForceList,
            type: 'line',
            smooth: true
          }
        ]
      };
      laborforceLineChart.setOption(option)
      option = {
        title: {
          text: 'Unemployment Rate'
        },
        xAxis: {
          type: 'category',
          data: yearList
        },
        yAxis: {
          type: 'value',
          min: 0
        },
        series: [
          {
            data: unemploymentRateList,
            type: 'line',
            smooth: true
          }
        ]
      };
      unemploymentRateChart.setOption(option)
    }
  }
}
</script>

<style>
#laborforceLineChart {
  background-color: white;
}
</style>
