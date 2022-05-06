<template>
  <div class="md:w-3/4 w-full !md:mr-4" style="min-height: 50vh">
    <div class="md:flex enter-y">
      <YgList
        v-if="deviceListData.length > 0"
        class="!md:mr-4"
        @my-click="sensorsNum"
        :deviceList="deviceListData"
      ></YgList>
      <YgChart
        v-if="deviceListData.length > 0"
        class="mt-4 md:mt-0 w-full"
        :timestamp="timestamp"
        :historyList="realTimeListData"
        :deviceName="deviceListData[boxStatus].deviceName"
      />
    </div>
    <div class="w-full enter-y">
      <YgChartNow
        v-if="deviceListData.length > 0"
        class="!mt-4 enter-y"
        :historyList="historyListData"
        :deviceName="deviceListData[boxStatus].deviceName"
      />
    </div>
  </div>
  <div class="md:w-1/4 w-full md:mt-0 mt-4" style="min-height: 50vh">
    <YgBox v-if="deviceListData.length > 0" :deviceList="deviceListData[boxStatus]"></YgBox>
    <YgAlarm v-if="alarmPageData&&deviceListData.length"  class="md:mt-4 mt-4" :alarmPage="alarmPageData.list"></YgAlarm>
    <!-- <YgAlarm class="md:mt-4 mt-4"></YgAlarm> -->
    <YgRadar
      v-if="deviceListData.length > 0"
      class="md:mt-4 mt-4"
      :deviceList="deviceListData[boxStatus]"
    ></YgRadar>
  </div>
</template>
<script lang="ts">
  import { ref, computed, defineComponent, onMounted, onUnmounted } from 'vue';
  import YgList from './components/yg_list.vue';
  import YgChart from './components/yg_chart.vue';
  import YgChartNow from './components/yg_chart_now.vue';
  import YgBox from './components/yg_box.vue';
  import YgAlarm from './components/yg_alarm.vue';
  import YgRadar from './components/yg_radar.vue';

  import {
    newHomeApi,
    newHomeRefrshApi,
    newHomeDataListApi,
    newHomeAlarmListApi,
  } from '/@/api/dashboard/dashboard';

  export default defineComponent({
    components: {
      YgList,
      YgChart,
      YgChartNow,
      YgBox,
      YgAlarm,
      YgRadar,
    },

    setup() {
      let todayMvData = ref([]);
      let realTimeListData = ref([]);
      let historyListData = ref([]);
      let deviceListData = ref([]);
      let alarmPageData = ref({ list: [] });
      let boxStatus = ref(0);
      let timer;
      let timerHome;
      let pages = {
        pageNum: 1,
        pageSize: 9999,
      };
      let timestamp = ref(0);

      async function sensorsNum(index) {
        boxStatus.value = index;
        let refreshData = {
          boardId: deviceListData.value[index].boardId,
          bushingId: deviceListData.value[index].bushingId,
        };
        const { realTimeList, historyList } = await newHomeDataListApi(refreshData);
        realTimeListData.value = realTimeList;
        historyListData.value = historyList;
        timestamp.value = Date.parse(new Date());
      }

      async function getRefrshApi() {
        timer = setInterval(async () => {
          let refreshData = {
            boardId: deviceListData.value[boxStatus.value].boardId,
            bushingId: deviceListData.value[boxStatus.value].bushingId,
          };
          const { realTimeList } = await newHomeRefrshApi(refreshData);
          realTimeListData.value = realTimeList;
          timestamp.value = Date.parse(new Date());
        }, 5000);
      }
      async function getHomeListApi() {
        timerHome = setInterval(async () => {
          const { todayMv, historyList, deviceList, realTimeList } = await newHomeApi();
          const { alarmPage } = await newHomeAlarmListApi(pages);

          todayMvData.value = todayMv;
          historyListData.value = historyList;
          deviceListData.value = deviceList;
          alarmPageData.value = alarmPage;
          realTimeListData.value = realTimeList;
        }, 300000);
      }
      onMounted(async () => {
        getHomeListApi();
        const { todayMv, historyList, deviceList, realTimeList } = await newHomeApi();
        const { alarmPage } = await newHomeAlarmListApi(pages);

        if (deviceList.length > 0) {
          getRefrshApi();
        }

        todayMvData.value = todayMv;
        historyListData.value = historyList;
        deviceListData.value = deviceList;
        alarmPageData.value = alarmPage;
        realTimeListData.value = realTimeList;
      });

      onUnmounted(() => {
        clearInterval(timer);
        clearInterval(timerHome);
      });
      return {
        timestamp,
        boxStatus,
        sensorsNum,
        todayMvData,
        realTimeListData,
        historyListData,
        deviceListData,
        alarmPageData,
      };
    },
  });
</script>
