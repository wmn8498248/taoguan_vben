<template>
  <audio id="audioMc" hidden="true" controls>
    <source src="../../../assets/images/alarm2.mp3" type="audio/mp3" />
  </audio>
  <div class="md:flex p-2 md:p-4">
    <div class="md:w-3/5 w-full !md:mr-4">
      <YgList v-if="deviceListData.length > 0" @my-click="sensorsNum" @fieldsClick="fieldsClick"
        :fieldsList="fieldsListData" :deviceList="deviceListData"></YgList>
    </div>
    <div class="md:w-2/5 w-full">
      <YgChart v-if="deviceListData.length > 0" class="mt-4 md:mt-0 w-full" :timestamp="timestamp"
        :historyList="realTimeListData" :isBoxVolt="deviceListData[boxStatus]['deviceBusiness']['isBoxVolt']"
        :deviceName="deviceListData[boxStatus]['deviceBusiness']['name']" />
    </div>
  </div>
  <div class="md:flex">
    <div class="md:w-3/5 w-full !md:mr-4">
      <YgChartNow v-if="deviceListData.length > 0" class="!mt-4 enter-y" :historyList="historyListData"
        :isBoxVolt="deviceListData[boxStatus]['deviceBusiness']['isBoxVolt']"
        :deviceName="deviceListData[boxStatus]['deviceBusiness']['name']" />
    </div>
    <div class="md:w-2/5 w-full md:mt-0 !mt-4">
      <!-- todayMvData[boxStatus] -->
      <YgBox v-if="deviceListData.length > 0 && oneInfo.length > 0" :deviceList="oneInfo[0]"></YgBox>

      <YgAlarm v-if="alarmPageData && deviceListData.length" class="md:mt-4 mt-4" :alarmPage="alarmPageData">
        <div :class="palyStatus ? 'audio-class' : 'audio-class audio-no'" @click="closeAudio(true)">
          <Icon icon="audio|svg" :size="25" />
        </div>
      </YgAlarm>
    </div>
  </div>
  <Modal2 @register="register2" :consoleList="consoleList" @closeAudio="closeAudio" />
</template>
<script lang="ts">
import { useModal } from '/@/components/Modal';
import Modal2 from './components/Modal2.vue';
import { ref, defineComponent, onMounted, onBeforeUnmount } from 'vue';
import YgList from './components/yg_list.vue';
import YgChart from './components/yg_chart.vue';
import YgChartNow from './components/yg_chart_now.vue';
import YgBox from './components/yg_box.vue';
import YgAlarm from './components/yg_alarm.vue';
import YgRadar from './components/yg_radar.vue';
import { Icon } from '/@/components/Icon';

import {
  newHomeApi,
  newHomeRefrshApi,
  newHomeDataListApi,
  newHomeAlarmListApi,
  msgFieldsAllApi,
  msgFieldsUpdateApi,
} from '/@/api/dashboard/dashboard';

export default defineComponent({
  components: {
    Icon,
    Modal2,
    YgList,
    YgChart,
    YgChartNow,
    YgBox,
    YgAlarm,
    YgRadar,
  },

  setup() {
    const [register2, { openModal: openModal2 }] = useModal();

    let fieldsListData = ref([]);
    let todayMvData = ref([]);
    let realTimeListData = ref([]);
    let historyListData = ref([]);
    let deviceListData = ref([]);
    let alarmPageData = ref({ list: [] });
    let boxStatus = ref(0);
    let timer: NodeJS.Timeout;
    let timerHome: NodeJS.Timeout;
    let pages = {
      page: 1,
      limit: 9999,
    };
    let timestamp = ref(0);
    let consoleList = ref();

    let palyNum = ref(0);
    let palyStatus = ref(false);
    let oneInfo = ref([])

    async function fieldsClick(res) {
      const { code } = await msgFieldsUpdateApi(res);
      console.log(code, 'code__');
    }
    function aduioPlay() {
      // audioet audioPlayer: HTMLMediaElement
      let audioPlayer = document.getElementById('audioMc') as HTMLMediaElement;
      // const promise = audioPlayer.play();
      // console.log(promise, 'promise_____');
      // if (promise !== undefined) {
      //   promise
      //     .then((res) => {
      //       console.log(res, 'res');
      //       // 播放成功
      //     })
      //     .catch((error) => {
      //       console.log(error, 'error');
      //       // 提醒用户点击激活播放，并查看新订单
      //     });
      // }
      if (palyNum.value == 0 && palyStatus.value) {
        audioPlayer.load();
        audioPlayer.play();
        palyNum.value = palyNum.value + 1;
        console.log(palyNum.value, 'palyNum.value');
      }
    }

    function closeAudio(res) {
      if (res) {
        palyStatus.value = !palyStatus.value;
        // console.log(palyStatus.value, "palyStatus")
      } else {
        let audioPlayer = document.getElementById('audioMc') as HTMLMediaElement;
        const promise = audioPlayer.play();
        if (promise !== undefined) {
          promise
            .then((res) => {
              audioPlayer.pause();
              palyNum.value = 0;
              console.log(res, 'res');
              // 播放成功
            })
            .catch((error) => {
              palyNum.value = -1;

              console.log(error, 'error');
              // 提醒用户点击激活播放，并查看新订单
            });
        }
      }
      // audioPlayer.pause();
    }
    async function sensorsNum(index: number) {
      boxStatus.value = index;

      let decName = deviceListData.value[index]['deviceBusiness']['deviceUniqueId']

      oneInfo.value = todayMvData.value.filter((ele) => {
        // console.log(ele['deviceUniqueId'])
        return ele['deviceUniqueId'] === decName
      })

      // console.log(todayMvData.value, '点击')

      let refreshData = {
        deviceUniqueId: deviceListData.value[index]['deviceUniqueId'],
      };
      const { realTimeList, historyList } = await newHomeDataListApi(refreshData);
      realTimeListData.value = realTimeList;
      historyListData.value = historyList;
      timestamp.value = Number(new Date());
    }

    async function getRefrshApi() {
      clearInterval(timer);
      timer = setInterval(async () => {
        let refreshData = {
          deviceUniqueId: deviceListData.value[boxStatus.value]['deviceUniqueId'],
        };
        const { console, realTimeList } = await newHomeRefrshApi(refreshData);
        realTimeListData.value = realTimeList;
        timestamp.value = Number(new Date());
        if (console) {
          consoleList.value = console;
          aduioPlay();
          openModal2();
        }
      }, 5000);
    }
    async function getHomeListApi() {
      closeAudio(false);
      clearInterval(timerHome);
      timerHome = setInterval(async () => {
        const { todayMv, historyList, deviceList, realTimeList } = await newHomeApi();
        const { list } = await newHomeAlarmListApi(pages);

        todayMvData.value = todayMv;
        historyListData.value = historyList;
        deviceListData.value = deviceList;
        alarmPageData.value = list;
        realTimeListData.value = realTimeList;

        // todayMv.forEach(element => {
        //   console.log(element.deviceUniqueId)
        // });
        // console.log('+_____________________+')

      }, 60000);
    }
    onMounted(async () => {
      getHomeListApi();
      const { todayMv, historyList, deviceList, realTimeList } = await newHomeApi();
      const { list } = await newHomeAlarmListApi(pages);

      const { showFields } = await msgFieldsAllApi();

      fieldsListData.value = showFields;

      if (deviceList.length > 0) {
        getRefrshApi();
      }

      todayMvData.value = todayMv;
      historyListData.value = historyList;
      deviceListData.value = deviceList;

      alarmPageData.value = list;

      realTimeListData.value = realTimeList;
      if (deviceList.length > 0) {
        console.log('进入')
        oneInfo.value = todayMv.filter((ele) => {
          // console.log(ele['deviceUniqueId'])
          return ele['deviceUniqueId'] === deviceList[0]['deviceUniqueId']
        })
      }
    });

    onBeforeUnmount(() => {
      clearInterval(timer);
      clearInterval(timerHome);
    });

    return {
      oneInfo,
      palyStatus,
      palyNum,
      closeAudio,
      aduioPlay,
      consoleList,
      openModal2,
      register2,
      fieldsClick,
      timestamp,
      boxStatus,
      sensorsNum,
      todayMvData,
      realTimeListData,
      historyListData,
      deviceListData,
      alarmPageData,
      fieldsListData,
    };
  },
});
</script>

<style lang="less" scoped>
.audio-class {
  position: absolute;
  right: 5px;
  top: 2px;
  color: #37a1da;
  z-index: 999;
  cursor: pointer;
}

.audio-no {
  color: #959595;
}
</style>
