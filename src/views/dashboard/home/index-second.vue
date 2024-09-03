<template>
  <div class="w-full p-2 md:p-4">
    <CasingCard
      v-if="deviceListData.length > 0"
      class="enter-y"
      @my-click="sensorsNum"
      :fieldsListData="fieldsListData"
      :deviceList="deviceListData"
    />
    <YgAverage
      v-if="deviceListData.length > 0"
      ref="childRef"
      class="!mt-4 enter-y"
      @my-click="getDataTime"
      :fieldsListData="fieldsListData"
      :timestamp="timestamp"
      :historyList="historyListData"
      :isBoxVolt="deviceListData[boxStatus]['deviceBusiness']['isBoxVolt']"
      :deviceName="deviceListData[boxStatus]['deviceName']"
    />
  </div>
</template>
<script lang="ts">
  import { ref, defineComponent, onMounted, onBeforeUnmount } from 'vue';
  import CasingCard from './components/yg_card.vue';
  import YgAverage from './components/yg_average.vue';
  
  import {
    newListRefeshApi,
    newListHistoryRefeshApi,
    newListHistoryListApi,
    msgFieldsAllApi,
  } from '/@/api/dashboard/dashboard';
  export default defineComponent({
    components: {
      CasingCard,
      YgAverage,
    },

    setup() {
      let fieldsListData = ref([]);

      let timestamp = ref(0);
      let startTimeData;
      let endTimeData;
      let historyListData = ref([]);
      let deviceListData = ref([]);
      let boxStatus = ref(0);
      let timerTwo;
      let timerStatus = true;

      const childRef = ref<any>();
      async function sensorsNum(index) {
        boxStatus.value = index;
        clearInterval(timerTwo);

        if (timerStatus) {
          let refreshData = {
            deviceUniqueId: deviceListData.value[index]['deviceUniqueId'],
          };
          const { historyList } = await newListHistoryRefeshApi(refreshData);

          historyListData.value = historyList;
          // timestamp.value = Number(new Date());
          childRef.value.onRangeChart(
            historyList,
            deviceListData.value[boxStatus.value]['deviceBusiness'],
          );

          timedTaskNow();
          timedTask();
        } else {
          let refreshData = {
            deviceUniqueId: deviceListData.value[boxStatus.value]['deviceUniqueId'],
            startTime: startTimeData,
            endTime: endTimeData,
          };
          const { historyList } = await newListHistoryListApi(refreshData);

          if (historyList) {
            historyListData.value = historyList;
          } else {
            historyListData.value = [];
          }

          childRef.value.onRangeChart(
            historyList,
            deviceListData.value[boxStatus.value]['deviceBusiness'],
          );

          // timestamp.value = Number(new Date());
        }
      }

      async function getDataTime(params, status) {
        timerStatus = status.value;
        startTimeData = params[0];
        endTimeData = params[1];
        if (status.value) {
          clearInterval(timerTwo);
          timedTaskNow();
          timedTask();
        } else {
          clearInterval(timerTwo);
          let refreshData = {
            deviceUniqueId: deviceListData.value[boxStatus.value]['deviceUniqueId'],
            startTime: startTimeData,
            endTime: endTimeData,
          };

          try {
            const { historyList } = await newListHistoryListApi(refreshData);
            historyListData.value = historyList;
          } catch (error) {
            historyListData.value = [];
          }

          // if (historyList) {
          //   historyListData.value = historyList;
          // } else {
          //   historyListData.value = [];
          // }

          timestamp.value = Number(new Date());
        }
      }

      async function timedTask() {
        if (deviceListData.value.length > 0) {
          clearInterval(timerTwo);
          timerTwo = setInterval(async () => {
            let { deviceList } = await newListRefeshApi();
            deviceListData.value = deviceList;

            let refreshData = {
              deviceUniqueId: deviceListData.value[boxStatus.value]['deviceUniqueId'],
            };
            const { historyList } = await newListHistoryRefeshApi(refreshData);
            historyListData.value = historyList;
            timestamp.value = Number(new Date());
          }, 5000);
        }
      }

      async function timedTaskNow() {
        let { deviceList } = await newListRefeshApi();
        if (deviceList.length > 0) {
          let refreshData = {
            deviceUniqueId: deviceList[boxStatus.value].deviceUniqueId,
          };
          const { historyList } = await newListHistoryRefeshApi(refreshData);
          historyListData.value = historyList;

          timestamp.value = Number(new Date());
        }
        deviceListData.value = deviceList;
      }

      onMounted(async () => {
        let { deviceList } = await newListRefeshApi();
        deviceListData.value = deviceList;

         const { showFields } = await msgFieldsAllApi();

        fieldsListData.value = showFields;

        if (deviceList.length > 0) {
          let refreshData = {
            deviceUniqueId: deviceList[boxStatus.value].deviceUniqueId,
          };

          const { historyList } = await newListHistoryRefeshApi(refreshData);
          historyListData.value = historyList;
          childRef.value.onRangeChart(historyList, deviceList[boxStatus.value]['deviceBusiness']);
        }
        timedTask();
      });

      // onUnmounted(() => {
      // });
      onBeforeUnmount(() => {
        clearInterval(timerTwo);
      });
      return {
        fieldsListData,
        timestamp,
        getDataTime,
        childRef,
        boxStatus,
        sensorsNum,
        historyListData,
        deviceListData,
      };
    },
  });
</script>
