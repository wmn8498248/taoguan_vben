<template>
  <div class="p-4 w-full" style="min-height: 100vh">
    湿哒哒所多{{ timestamp }}
    <CasingCard
      v-if="deviceListData.length > 0"
      class="enter-y"
      @my-click="sensorsNum"
      :deviceList="deviceListData"
    />
    <YgAverage
      v-if="deviceListData.length > 0"
      ref="childRef"
      class="!mt-4 enter-y"
      @my-click="getDataTime"
      :timestamp="timestamp"
      :historyList="historyListData"
      :deviceName="deviceListData[boxStatus].deviceName"
    />
  </div>
</template>
<script lang="ts">
  import { ref, computed, defineComponent, onMounted, onUnmounted } from 'vue';
  import CasingCard from './components/yg_card.vue';
  import YgAverage from './components/yg_average.vue';
  import {
    newListApi,
    newListRefeshApi,
    newListHistoryRefeshApi,
    newListHistoryListApi,
  } from '/@/api/dashboard/dashboard';
  export default defineComponent({
    components: {
      CasingCard,
      YgAverage,
    },

    setup() {
      let timestamp = ref(0);
      let startTimeData;
      let endTimeData;
      let historyListData = ref([]);
      let deviceListData = ref([]);
      let boxStatus = ref(0);
      let timerTwo;
      let timerStatus = true;
      let pages = {
        pageNum: 1,
        pageSize: 9999,
      };
      const childRef = ref<any>();
      async function sensorsNum(index, switchTime) {
        boxStatus.value = index;
        clearInterval(timerTwo);

        if (timerStatus) {
          let refreshData = {
            boardId: deviceListData.value[index].boardId,
            bushingId: deviceListData.value[index].bushingId,
          };
          const { historyList } = await newListHistoryRefeshApi(refreshData);
          historyListData.value = historyList;
          timestamp.value = Date.parse(new Date());
          timedTaskNow();
          timedTask();
        } else {
          let refreshData = {
            boardId: deviceListData.value[boxStatus.value].boardId,
            bushingId: deviceListData.value[boxStatus.value].bushingId,
            startTime: startTimeData,
            endTime: endTimeData,
          };
          const { historyList } = await newListHistoryListApi(refreshData);

          if (historyList) {
            historyListData.value = historyList;
          } else {
            historyListData.value = [];
          }

          timestamp.value = Date.parse(new Date());
        }

        // childRef.value.timingStar();
        // childRef.value.onRangeChart(historyListData);
      }

      async function getDataTime(params: [], status) {
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
            boardId: deviceListData.value[boxStatus.value].boardId,
            bushingId: deviceListData.value[boxStatus.value].bushingId,
            startTime: startTimeData,
            endTime: endTimeData,
          };
          const { historyList } = await newListHistoryListApi(refreshData);

          if (historyList) {
            historyListData.value = historyList;
          } else {
            historyListData.value = [];
          }

          timestamp.value = Date.parse(new Date());
        }
      }

      async function timedTask() {
        if (deviceListData.value.length > 0) {
          timerTwo = setInterval(async () => {
            timestamp.value = Date.parse(new Date());
            let { deviceList } = await newListRefeshApi();
            deviceListData.value = deviceList;

            let refreshData = {
              boardId: deviceList[boxStatus.value].boardId,
              bushingId: deviceList[boxStatus.value].bushingId,
            };
            const { historyList } = await newListHistoryRefeshApi(refreshData);
            historyListData.value = historyList;
            timestamp.value = Date.parse(new Date());
          }, 5000);
        }
      }

      async function timedTaskNow() {
        let { deviceList } = await newListRefeshApi();
        if (deviceList.length > 0) {
          let refreshData = {
            boardId: deviceList[boxStatus.value].boardId,
            bushingId: deviceList[boxStatus.value].bushingId,
          };
          const { historyList } = await newListHistoryRefeshApi(refreshData);
          historyListData.value = historyList;
        }
        deviceListData.value = deviceList;
      }

      onMounted(async () => {
        let { deviceList } = await newListRefeshApi();
        if (deviceList.length > 0) {
          let refreshData = {
            boardId: deviceList[boxStatus.value].boardId,
            bushingId: deviceList[boxStatus.value].bushingId,
          };
          const { historyList } = await newListHistoryRefeshApi(refreshData);
          historyListData.value = historyList;
        }
        deviceListData.value = deviceList;
        timedTask();
      });

      onUnmounted(() => {
        clearInterval(timerTwo);
      });
      return {
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
