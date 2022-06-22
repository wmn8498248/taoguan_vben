<template>
  <div class="md:w-3/4 w-full !md:mr-4" style="min-height: 50vh">
    <div class="md:flex enter-y">
      <!-- {{deviceListData}} -->
      <YgList
        v-if="deviceListData.length > 0"
        class="!md:mr-4"
        @my-click="sensorsNum"
        @fieldsClick="fieldsClick"
        :fieldsList="fieldsListData"
        :deviceList="deviceListData"
      ></YgList>
      <YgChart
        v-if="deviceListData.length > 0"
        class="mt-4 md:mt-0 w-full"
        :timestamp="timestamp"
        :historyList="realTimeListData"
        :isBoxVolt="deviceListData[boxStatus]['deviceBusiness']['isBoxVolt']"
        :deviceName="deviceListData[boxStatus]['deviceBusiness']['name']"
      />
    </div>
    <div class="w-full enter-y">
      <YgChartNow
        v-if="deviceListData.length > 0"
        class="!mt-4 enter-y"
        :historyList="historyListData"
        :isBoxVolt="deviceListData[boxStatus]['deviceBusiness']['isBoxVolt']"
        :deviceName="deviceListData[boxStatus]['deviceBusiness']['name']"
      />
    </div>
  </div>
  <div class="md:w-1/4 w-full md:mt-0 mt-4" style="min-height: 50vh">
    <YgBox v-if="deviceListData.length > 0" :deviceList="todayMvData[boxStatus]"></YgBox>
    <YgAlarm
      v-if="alarmPageData && deviceListData.length"
      class="md:mt-4 mt-4"
      :alarmPage="alarmPageData"
    ></YgAlarm>
    <!-- <YgAlarm class="md:mt-4 mt-4"></YgAlarm> -->
    <YgRadar
      v-if="deviceListData.length > 0"
      class="md:mt-4 mt-4"
      :deviceList="todayMvData[boxStatus]"
    ></YgRadar>
  </div>
</template>
<script lang="ts">
  import { ref, defineComponent, onMounted, onUnmounted } from 'vue';
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
    msgFieldsAllApi,
    msgFieldsUpdateApi,
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
      async function fieldsClick(res) {
        const { code } = await msgFieldsUpdateApi(res);
        console.log(code, 'code__');
      }

      async function sensorsNum(index: number) {
        boxStatus.value = index;
        let refreshData = {
          deviceUniqueId: deviceListData.value[index]['deviceUniqueId'],
        };
        const { realTimeList, historyList } = await newHomeDataListApi(refreshData);
        realTimeListData.value = realTimeList;
        historyListData.value = historyList;
        timestamp.value = Number(new Date());
      }

      async function getRefrshApi() {
        clearTimeout(timer);
        timer = setInterval(async () => {
          let refreshData = {
            deviceUniqueId: deviceListData.value[boxStatus.value]['deviceUniqueId'],
          };
          const { realTimeList } = await newHomeRefrshApi(refreshData);
          realTimeListData.value = realTimeList;
          timestamp.value = Number(new Date());
        }, 5000);
      }
      async function getHomeListApi() {
        clearTimeout(timerHome);
        timerHome = setInterval(async () => {
          const { todayMv, historyList, deviceList, realTimeList } = await newHomeApi();
          const { page } = await newHomeAlarmListApi(pages);

          todayMvData.value = todayMv;
          historyListData.value = historyList;
          deviceListData.value = deviceList;
          alarmPageData.value = page.list;
          realTimeListData.value = realTimeList;
        }, 300000);
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
      });

      onUnmounted(() => {
        clearInterval(timer);
        clearInterval(timerHome);
      });
      return {
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
