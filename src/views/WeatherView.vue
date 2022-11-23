<template>
    <div class="Weather">
        <div>
            <h1>天气警告一览</h1>
            <P>现时并无警告生效</P>
        </div>
        <div>
            <h1>今日天气预报</h1>
            <P>{{ weatherReport }}</P>
        </div>
        <div>
            <div id="rainfallBarChart" style="margin-left: 20px; width: 100%; height:500px"></div>
        </div>
        <div>
            <div id="temperatureBarChart" style="margin-left: 20px; width: 100%; height:500px"></div>
        </div>
        <div>
            <h1>相对湿度</h1>
            <p>记录时间: {{ humidityRecordingTime }}</p>
            <p>{{ humidityValue }}%</p>
        </div>
        <div>
            <h1>日出时间</h1>
            <P>{{sunriseTime}}</P>
        </div>
        <div>
            <h1>日落时间</h1>
            <P>{{sunsetTime}}</P>
        </div>
    </div>
</template>
  
<script>


import axios from 'axios';
import * as echarts from 'echarts';

export default {
    name: 'WeatherView',
    data() {
        return {
            weatherWarnMessage: null,
            weatherReport: null,
            rainfallRecodingPeriod: null,
            humidityValue: null,
            humidityRecordingTime: null,
            sunriseTime:null,
            sunsetTime:null

        }
    },

    mounted() {
        this.getWeatherWarn();
        this.getWeatherGeneralSituation();
        this.getWeatherReport();
        this.getGasEmission();
    },

    methods: {
        async getGasEmission() {
            let response = (await axios.get('https://data.weather.gov.hk/weatherAPI/opendata/opendata.php?dataType=SRS&lang=sc&rformat=json&year=2022&month=11&day=23')).data.data
            this.sunriseTime = response[0][1]
            this.sunsetTime = response[0][3]
        },
        async getWeatherWarn() {
            let response = await axios.get('https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=warnsum&lang=sc')
            this.weatherWarnMessage = response.data
        },

        async getWeatherGeneralSituation() {
            let response = await axios.get('https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=sc')

            this.weatherReport = response.data.generalSituation
        },

        async getWeatherReport() {
            let response = (await axios.get('https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=sc')).data
            console.log(response)

            let temperatureData = response.temperature;
            // this.temperatureUpdateTime = temperatureData.updateTime.slice(0, 10) + ' ' + temperatureData.updateTime.slice(11, 19)
            let temperatureValue = temperatureData.data.map(function (item) {
                return item.value
            })
            let temperatureRegion = temperatureData.data.map(function (item) {
                return item.place
            })


            let rainfallData = response.rainfall;

            let rainfallMaxValue = rainfallData.data.map(function (item) {
                return item.max
            })
            let rainfallRegion = rainfallData.data.map(function (item) {
                return item.place
            })
            this.rainfallRecodingPeriod = rainfallData.startTime.slice(0, 10) + ' ' + rainfallData.startTime.slice(11, 19) + ' ~ ' + rainfallData.endTime.slice(0, 10) + ' ' + rainfallData.endTime.slice(11, 19);

            this.humidityValue = response.humidity.data[0].value
            this.humidityRecordingTime = response.humidity.recordTime.slice(0, 10) + ' ' + response.humidity.recordTime.slice(11, 19)

            var rainfallBarChart = echarts.init(document.getElementById("rainfallBarChart"));
            var option;
            option = {
                title: {
                    text: 'Rainfall Data',
                    subtext: 'Recording Period: ' + this.rainfallRecodingPeriod
                },
                xAxis: {
                    type: 'category',
                    data: rainfallRegion
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: rainfallMaxValue,
                        type: 'bar'
                    }
                ]
            };
            rainfallBarChart.setOption(option);

            var temperatureBarChart = echarts.init(document.getElementById("temperatureBarChart"));
            option = {
                title: {
                    text: 'Temperature Data',
                    subtext: 'UpdateTime: ' + this.rainfallRecodingPeriod
                },
                xAxis: {
                    type: 'category',
                    data: temperatureRegion
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: temperatureValue,
                        type: 'bar'
                    }
                ]
            };
            temperatureBarChart.setOption(option)
        }
    }
}
</script>
  
<style scoped>

</style>
  