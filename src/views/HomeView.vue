<template>
  <div class="home">
    <div id="parkingVacancyBarChart" style="height: 400px; width: 100%"></div>
    <div>
      <div>
      <p>Resouce from 
        <a style="display:inline" href="http://18.163.41.237:1880/ui/#!/0?socketid=77Tq_FHMtzAIWEEcAAD_">Node-RED</a>
      </p>
      
      </div>
      <img src="../assets/TimeParkVacancy.png">
    </div>
  
    <div class="tunnel-traffic">
     
      <div class="block1" style="margin-right: 30px;">
        <div class="header">
          <span>西区海底隧道</span>
        </div>
        <div class="content">
          <div>
            <h6>九龙</h6>
            <div class="speed-content">
              <div class="speed-left">{{ this.tunnelCarSpeedList[1] }}</div>
              <img style="margin-right: 10px;" width="30"
                :src="this.tunnelRoadSituationList[1] === 'GOOD' ? greenup : (this.tunnelRoadSituationList[1] === 'AVERAGE' ? yellowup : redup)">
              <img width="30"
                :src="this.tunnelRoadSituationList[5] === 'GOOD' ? greendown : (this.tunnelRoadSituationList[5] === 'AVERAGE' ? yellowdown : reddown)">
              <div class="speed-right">{{ this.tunnelCarSpeedList[5] }}</div>
            </div>
            <h6>香港</h6>

          </div>
        </div>

      </div>
      <div class="block1" style="margin-right: 30px;">
        <div class="header">
          <span>红磡海底隧道</span>
        </div>
        <div class="content">
          <div>
            <h6>九龙</h6>
            <div class="speed-content">
              <div class="speed-left">{{ this.tunnelCarSpeedList[4] }}</div>
              <img style="margin-right: 10px;" width="30"
                :src="this.tunnelRoadSituationList[4] === 'GOOD' ? greenup : (this.tunnelRoadSituationList[4] === 'AVERAGE' ? yellowup : redup)">
              <img width="30"
                :src="this.tunnelRoadSituationList[0] === 'GOOD' ? greendown : (this.tunnelRoadSituationList[0] === 'AVERAGE' ? yellowdown : reddown)">
              <div class="speed-right">{{ this.tunnelCarSpeedList[0] }}</div>
            </div>
            <h6>香港</h6>

          </div>
        </div>
      </div>
      <div class="block1">
        <div class="header">
          <span>东区海底隧道</span>
        </div>
        <div class="content">
          <div>
            <h6>九龙</h6>
            <div class="speed-content">
              <div class="speed-left">{{ this.tunnelCarSpeedList[2] }}</div>
              <img style="margin-right: 10px;" width="30"
                :src="this.tunnelRoadSituationList[2] === 'GOOD' ? greenup : (this.tunnelRoadSituationList[2] === 'AVERAGE' ? yellowup : redup)">
              <img width="30"
                :src="this.tunnelRoadSituationList[3] === 'GOOD' ? greendown : (this.tunnelRoadSituationList[3] === 'AVERAGE' ? yellowdown : reddown)">
              <div class="speed-right">{{ this.tunnelCarSpeedList[3] }}</div>
            </div>
            <h6>香港</h6>

          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>


import axios from 'axios';
import * as echarts from 'echarts';
import redup from '@/assets/traffic-icon/redup.png'
import greenup from '@/assets/traffic-icon/greenup.png'
import yellowup from '@/assets/traffic-icon/yellowup.png'
import reddown from '@/assets/traffic-icon/reddown.png'
import yellowdown from '@/assets/traffic-icon/yellowdown.png'
import greendown from '@/assets/traffic-icon/greendown.png'
export default {
  name: 'HomeView',
  data() {
    return {
      tunnelCarSpeedList: [],
      tunnelRoadSituationList: [],
      redup: redup,
      greenup: greenup,
      yellowup: yellowup,
      reddown: reddown,
      greendown: greendown,
      yellowdown: yellowdown
    }
  },

  mounted() {
    this.drwaTunnelTraffic();
    this.drwaParkingBarChart();
  },

  methods: {
    async drwaTunnelTraffic() {
      let response = await axios.get('https://dashboard.data.gov.hk/api/traffic-speed?format=json')
      this.tunnelCarSpeedList = response.data.map(function (item) {
        return item.traffic_speed
      })
      this.tunnelRoadSituationList = response.data.map(function (item) {
        return item.road_saturation_level.slice(8)

      })
    },
    async drwaParkingBarChart() {
      let response = await axios.get('https://api.data.gov.hk/v1/carpark-info-vacancy?data=vacancy')
      let response1 = await axios.get('https://api.data.gov.hk/v1/carpark-info-vacancy?lang=zh_TW')
      let parkingMap = new Map()
  
      for (var item of response1.data.results) {
      
        parkingMap.set(item.park_Id, item.name);
      }

      let parkingVacancyList = response.data.results.filter(item => item.privateCar && item.privateCar[0].vacancy > 20)
      parkingVacancyList.sort((a,b) => b.privateCar[0].vacancy - a.privateCar[0].vacancy );

      let parkingNameList = parkingVacancyList.map(function (item) {
        return parkingMap.get(item.park_Id)
      })
      console.log(parkingNameList)
      let parikingVacancyNumList = parkingVacancyList.map(function (item) {
        return item.privateCar[0].vacancy
      })

      console.log(parikingVacancyNumList)
      console.log(parkingVacancyList)

      
      
      var parkingVacancyBarChart = echarts.init(document.getElementById("parkingVacancyBarChart"));
      var option;
      option = {
        xAxis: {
          type: 'category',
          data: parkingNameList
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: parikingVacancyNumList,
            type: 'bar'
          }
        ]
      };
      parkingVacancyBarChart.setOption(option);
    }
  }
}
</script>

<style scoped>
.tunnel-traffic {
  display: flex;
  flex-direction: row;
  margin-top: 20px;
}

.speed-content {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
}

.speed-left {
  margin-right: 20px;
}

.speed-right {
  margin-left: 20px;
}
</style>
