<template>
    <div class="Economy">
        <div id="governmentIncomePieChart" style="width:100%; height: 420px;"></div>
        <div id="depositBarChart" style="width:100%; height: 420px;"></div>
    </div>
</template>
  
<script>


import axios from 'axios';
import * as echarts from 'echarts';

export default {
    name: 'EconomyView',
    data() {
        return {

        }
    },
    mounted() {
        this.drawGovernmentIncomePieChart()
    },
    methods: {
        async drawGovernmentIncomePieChart() {
            let response = (await axios.get('https://api.hkma.gov.hk/public/market-data-and-statistics/monthly-statistical-bulletin/ef-fc-resv-assets/fc-resv-assests')).data.result.records.slice(9,21)
            let response1 = (await axios.get('https://api.hkma.gov.hk/public/market-data-and-statistics/monthly-statistical-bulletin/banking/customer-deposits-by-type-cny')).data.result.records.slice(9,21)
            console.log(response1)
            var governmentIncomePieChart = echarts.init(document.getElementById("governmentIncomePieChart"));
            var depositBarChart = echarts.init(document.getElementById("depositBarChart"));
            let foreignExchangeReservesList = response.map(function (item) {
                 return item.fc_resv_assets_total
             })
             let CustomerdepositList = response1.map(function (item) {
                 return item.total_deposits
             })
            var option
            option = {
                title: {
                    text:"2021 Foreign Reserve",
                    subtext: 'In one million USD'
                },
                xAxis: {
                    type: 'category',
                    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                },
                yAxis: {
                    type: 'value',
                    min:400000,
                },
                series: [
                    {
                        data: foreignExchangeReservesList,
                        type: 'bar'
                    }
                ]
            };
            governmentIncomePieChart.setOption(option)
            option = {
                title: {
                    text:"2021 Customer deposit in bank ",
                    subtext: 'In one million RMB'
                },
                xAxis: {
                    type: 'category',
                    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                },
                yAxis: {
                    type: 'value',
                    min:500000,
                },
                series: [
                    {
                        data: CustomerdepositList,
                        type: 'bar'
                    }
                ]
            };
            depositBarChart.setOption(option)
        }
    }
}
</script>
  
<style scoped>

</style>
  