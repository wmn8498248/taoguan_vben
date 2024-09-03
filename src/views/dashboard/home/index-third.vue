<template>
  <div class="w-full index-third p-1 md:p-2">
    <!-- {{ aloneVectorList }} -->
    <!-- <div ref="chartRef" style="width: 100%; height: 100%"></div> -->
    <div class="canver-title" v-if="false"> 单独矢量图 </div>
    <div class="canver-box p-1 md:p-2" v-if="false" v-for="(item, num) in aloneVectorList">
      <div class="canver-mid">
        <div class="box-content">
          <div class="line-number">
            <span>&emsp;</span>
            <span>20</span>
            <span>40</span>
            <span>60</span>
            <span>80</span>
            <span>100</span>
          </div>

          <div class="content-circle circle1"></div>
          <div class="content-circle circle2"></div>
          <div class="content-circle circle3"></div>
          <div class="content-circle circle4"></div>
          <div class="content-circle circle5"></div>
          <!-- <div class="origin"></div> -->

          <div class="circle-line circle-line1"><span>180°</span><span>0°</span></div>
          <div class="circle-line circle-line2"><span>150°</span><span>330°</span></div>
          <div class="circle-line circle-line3"><span>120°</span><span>300°</span></div>
          <div class="circle-line circle-line4"><span>90°</span><span>270°</span></div>
          <div class="circle-line circle-line5"><span>60°</span><span>240°</span></div>
          <div class="circle-line circle-line6"><span>30°</span><span>210°</span></div>
          <div class="content-image"></div>
          <div v-for="(el, index) in item['bushings']">
            <div
              v-if="!oneStatic[num]['bushings'][index]['show']"
              class="box-line"
              :style="{
                width: el['monitorValue'] / 2 + '%',
                transform: 'rotate(' + tranNum(el['radian']) + 'deg)',
                backgroundColor: colorList[index],
              }"
            >
              <div
                v-if="el['monitorValue'] !== null"
                class="line-arrow"
                :style="{ borderColor: colorList[index] }"
              >
              </div>
            </div>
          </div>
        </div>
        <div class="box-bt">
          <span
            :title="'monitorValue:' + bush['monitorValue'] + '，radian:' + bush['radian']"
            :class="{ avtive: !oneStatic[num]['bushings'][index]['show'] }"
            v-for="(bush, index) in item['bushings']"
            :key="index"
            @click="tabList(1, index, num)"
            :style="{ backgroundColor: colorList[index] }"
          >
            {{ bush['name'] }}
          </span>
        </div>
      </div>
    </div>
    <div style="clear: both"></div>

    <div class="canver-title"> 单个矢量图 </div>
    <div class="canver-box p-1 md:p-2" v-for="(item, num) in simplexVectorsList">
      <div class="canver-mid">
        <div class="box-content">
          <div class="line-number" v-if="simplexVectorsList[num]['advanced']">
            <span>&emsp;</span>
            <span>40 </span>
            <span>80</span>
            <span>120</span>
            <span>160</span>
            <span>200</span>
          </div>
          <div class="line-number" v-else>
            <span>&emsp;</span>
            <span>20 </span>
            <span>40</span>
            <span>60</span>
            <span>80</span>
            <span>100</span>
          </div>

          <div class="content-circle circle1"></div>
          <div class="content-circle circle2"></div>
          <div class="content-circle circle3"></div>
          <div class="content-circle circle4"></div>
          <div class="content-circle circle5"></div>
          <!-- <div class="origin"></div> -->

          <div class="circle-line circle-line1"><span>180°</span><span>0°</span></div>
          <div class="circle-line circle-line2"><span>150°</span><span>330°</span></div>
          <div class="circle-line circle-line3"><span>120°</span><span>300°</span></div>
          <div class="circle-line circle-line4"><span>90°</span><span>270°</span></div>
          <div class="circle-line circle-line5"><span>60°</span><span>240°</span></div>
          <div class="circle-line circle-line6"><span>30°</span><span>210°</span></div>
          <div class="content-image"></div>
          <div v-for="(el, index) in item['bushings']">
            <div
              v-if="!twoStatic[num]['bushings'][index]['show']"
              class="box-line"
              :style="{
                width: simplexVectorsList[num]['advanced']
                  ? scaleNum(3, el['monitorValue'], num) / 4 + '%'
                  : scaleNum(3, el['monitorValue'], num) / 2 + '%',
                transform: 'rotate(' + tranNum(el['radian']) + 'deg)',
                backgroundColor: colorList[index],
              }"
            >
              <div
                v-if="el['monitorValue'] !== null"
                class="line-arrow"
                :style="{ borderColor: colorList[index] }"
              >
              </div>
            </div>
          </div>
        </div>
        <div class="box-bt">
          <span
            :title="'monitorValue:' + bush['monitorValue'] + ',radian:' + bush['radian']"
            :class="{ avtive: !twoStatic[num]['bushings'][index]['show'] }"
            v-for="(bush, index) in item['bushings']"
            :key="index"
            @click="tabList(2, index, num)"
            :style="{ backgroundColor: colorList[index] }"
          >
            {{ bush['name'] }}
          </span>
        </div>
      </div>
    </div>
    <div style="clear: both"></div>

    <div class="canver-title"> 三相矢量图 </div>
    <div class="canver-box p-1 md:p-2" v-for="(item, num) in threeVectorsList">
      <div class="canver-mid">
        <div class="box-content">
          <div class="line-number" v-if="threeVectorsList[num]['advanced']">
            <span>&emsp;</span>
            <span>40 </span>
            <span>80</span>
            <span>120</span>
            <span>160</span>
            <span>200</span>
          </div>
          <div class="line-number" v-else>
            <span>&emsp;</span>
            <span>20 </span>
            <span>40</span>
            <span>60</span>
            <span>80</span>
            <span>100</span>
          </div>

          <div class="content-circle circle1"></div>
          <div class="content-circle circle2"></div>
          <div class="content-circle circle3"></div>
          <div class="content-circle circle4"></div>
          <div class="content-circle circle5"></div>
          <!-- <div class="origin"></div> -->

          <div class="circle-line circle-line1"><span>180°</span><span>0°</span></div>
          <div class="circle-line circle-line2"><span>150°</span><span>330°</span></div>
          <div class="circle-line circle-line3"><span>120°</span><span>300°</span></div>
          <div class="circle-line circle-line4"><span>90°</span><span>270°</span></div>
          <div class="circle-line circle-line5"><span>60°</span><span>240°</span></div>
          <div class="circle-line circle-line6"><span>30°</span><span>210°</span></div>
          <div class="content-image"></div>
          <div v-for="(el, index) in item['bushings']">
            <div
              v-if="!threeStatic[num]['bushings'][index]['show']"
              class="box-line"
              :style="{
                width: threeVectorsList[num]['advanced']
                  ? scaleNum(3, el['monitorValue'], num) / 4 + '%'
                  : scaleNum(3, el['monitorValue'], num) / 2 + '%',
                transform: 'rotate(' + tranNum(el['radian']) + 'deg)',
                backgroundColor: colorList[index],
              }"
            >
              <div
                v-if="el['monitorValue'] !== null"
                class="line-arrow"
                :style="{ borderColor: colorList[index] }"
              >
              </div>
            </div>
          </div>
        </div>
        <div class="box-bt">
          <span
            :title="'monitorValue:' + bush['monitorValue'] + ',radian:' + bush['radian']"
            :class="{ avtive: !threeStatic[num]['bushings'][index]['show'] }"
            v-for="(bush, index) in item['bushings']"
            :key="index"
            @click="tabList(3, index, num)"
            :style="{ backgroundColor: colorList[index] }"
          >
            {{ bush['name'] }}
          </span>
        </div>
      </div>
    </div>
    <div style="clear: both"></div>
  </div>
</template>
<script lang="ts">
  import { ref, defineComponent, onMounted, onUnmounted, onBeforeUnmount } from 'vue';
  import { msgVector } from '/@/api/dashboard/dashboard';


  export default defineComponent({
    setup() {
      let aloneVectorList = ref([]);
      let simplexVectorsList = ref([]);
      let threeVectorsList = ref([]);
      let oneStatic = ref([]);
      let twoStatic = ref([]);
      let threeStatic = ref([]);

      let timer: NodeJS.Timeout;

      let colorList = ref([
        '#990000',
        '#9900cc',
        '#999900',
        '#99cc00',
        '#99ff00',
        '#cc0000',
        '#cccc00',
        '#003366',
        '#999999',
      ]);

      async function getMsgVerctor() {
        // const { historyList } = await msgVector();
      }
      // function setValue<T extends keyof Test> (key: T, val: Test[T]) {
      //   test[key] = val
      // }

      function tabList(el: number, res: number, num: number) {
        switch (el) {
          case 1:
            // let aloneVectorList.value[num]['bushings'][res]['show']
            oneStatic.value[num]['bushings'][res]['show'] = !oneStatic.value[num]['bushings'][res][
              'show'
            ] as never;
            break;
          case 2:
            twoStatic.value[num]['bushings'][res]['show'] = !twoStatic.value[num]['bushings'][res][
              'show'
            ] as never;
            break;
          case 3:
            threeStatic.value[num]['bushings'][res]['show'] = !threeStatic.value[num]['bushings'][
              res
            ]['show'] as never;
            break;
          default:
            break;
        }
      }
      // 1.15
      function tranNum(res) {
        let rotateValue = 0;
        if (res < 0) {
          rotateValue = (res * 180) / 3.14159265 + 360;
        } else {
          rotateValue = (res * 180) / 3.14159265;
        }

        return -rotateValue;
      }

      function scaleNum(tic: number, res: number, num: number) {
        // let radius = 2;
        let numStatic = -1;

        if (num !== numStatic) {
          console.log(res, 'resvalue');
          if (res > 100) {
            numStatic = num;
          }

          if (tic === 1) {
            if (res > 100) {
              aloneVectorList.value[num]['advanced'] = true as never;
              // radius = 4;
            }
          }
          if (tic === 2) {
            if (res > 100) {
              simplexVectorsList.value[num]['advanced'] = true as never;
              // radius = 4;
            }
          }
          if (tic === 3) {
            if (res > 100) {
              threeVectorsList.value[num]['advanced'] = true as never;
              // radius = 4;
            }
          }
        }

        return res;
      }

      async function getRefrshApi() {
        clearInterval(timer);
        timer = setInterval(async () => {
          const { aloneVector, simplexVectors, threeVectors } = await msgVector();
          aloneVectorList.value = aloneVector;
          simplexVectorsList.value = simplexVectors;
          threeVectorsList.value = threeVectors;
        }, 5000);
      }

      onMounted(async () => {
        const { aloneVector, simplexVectors, threeVectors } = await msgVector();
        aloneVectorList.value = aloneVector;
        simplexVectorsList.value = simplexVectors;
        threeVectorsList.value = threeVectors;

        oneStatic.value = aloneVector;
        twoStatic.value = simplexVectors;
        threeStatic.value = threeVectors;

        getRefrshApi();
      });

      onBeforeUnmount(() => {
        clearInterval(timer);
      });
      onUnmounted(() => {});
      return {
        scaleNum,
        oneStatic,
        twoStatic,
        threeStatic,
        tranNum,
        colorList,
        tabList,
        getMsgVerctor,
        aloneVectorList,
        simplexVectorsList,
        threeVectorsList,
      };
    },
  });
</script>
<style lang="less" scoped>
  .index-third {
    overflow: hidden;
    color: #fff;

    .canver-title {
      // font-size: 18px;
      text-indent: 2em;
    }
    .canver-box {
      width: 20%;
      height: 20vw;
      min-width: 375px;
      min-height: 375px;
      float: left;
      position: relative;
      .canver-mid {
        width: 100%;
        height: 100%;
        padding: 40px;
        background-color: #4049c3;
        border-radius: 15px;
        background-image: url(/src/assets/images/yg-bg.jpg);
      }
      .box-content {
        width: 100%;
        height: 100%;
        position: relative;
        top: -20px;
        .line-number {
          width: 50%;
          position: absolute;
          left: 50%;
          top: 50%;
          z-index: 9;
          transform: rotate(-60deg);
          transform-origin: top left;
          span {
            float: left;
            width: 20%;
            font-size: 12px;
            // color: #484848;
            // color: #e47676;
            color: #ff0000;
            font-weight: 800;
            text-align: left;
          }
          span:nth-child(6) {
            position: absolute;
            right: -20%;
            top: 0;
          }
        }
        .circle-line {
          position: absolute;
          left: 0;
          top: 50%;
          width: 100%;
          height: 0;
          border-top: 1px dashed #d1d1d1;
          margin-top: -0.5px;
          font-size: 12px;
          font-style: normal;
          padding: 0 5px;
          color: #fff;
          font-weight: 100;
          span:nth-child(1) {
            float: left;
          }
          span:nth-child(2) {
            float: right;
          }
          // background-color: #d1d1d1;
        }
        .circle-line1 {
          transform: rotate(0deg);
        }
        .circle-line2 {
          transform: rotate(30deg);
        }
        .circle-line3 {
          transform: rotate(60deg);
        }
        .circle-line4 {
          transform: rotate(90deg);
        }
        .circle-line5 {
          transform: rotate(120deg);
        }
        .circle-line6 {
          transform: rotate(150deg);
        }
        .content-circle {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          position: absolute;
          left: 0;
          top: 0;
          border: 1px solid #fff;
          box-shadow: 0 0 5px #000;
        }
        .circle1 {
          background-color: #6666cc;
        }
        .circle2 {
          background-color: #6666ff;
          transform: scale(0.8);
        }
        .circle3 {
          background-color: #6699ff;
          transform: scale(0.6);
        }
        .circle4 {
          background-color: #66ccff;
          transform: scale(0.4);
        }
        .circle5 {
          background-color: #00a8fc;
          transform: scale(0.2);
        }
        .origin {
          width: 2px;
          height: 2px;
          border-radius: 50%;
          position: absolute;
          left: 50%;
          top: 50%;
          margin-top: -1px;
          margin-left: -1px;
          background-color: #000;
          z-index: 9;
        }
        // .content-image {
        //   width: 100%;
        //   height: 100%;
        //   background-image: url('../../../assets/images/ld1.png');
        //   background-size: 100%;
        //   background-position: center;
        //   background-repeat: no-repeat;
        // }
        .box-line {
          width: 20%;
          height: 2px;
          background-color: aqua;
          transform: rotate(70deg);
          transform-origin: left center;
          position: absolute;
          left: 50%;
          top: 50%;
          margin-top: -1px;
          border-color: inherit;
          transition: all 3s;
        }
        .line-arrow {
          width: 10px;
          height: 10px;
          margin-top: 17px;
          border-top: 2px solid aqua;
          border-right: 2px solid aqua;
          transform: matrix(
            0.7071067811865475,
            0.7071067811865476,
            -0.7071067811865476,
            0.7071067811865475,
            0,
            0
          );
          position: absolute;
          right: 0;
          top: -21px;
        }
        // .box-line::after {
        //   content: '';
        //   display: inline-block;
        //   width: 20px;
        //   height: 20px;
        //   margin-top: 20px;
        //   border-top: 4px solid aqua;
        //   border-right: 4px solid aqua;
        //   border-color: inherit;
        //   transform: matrix(
        //     0.7071067811865475,
        //     0.7071067811865476,
        //     -0.7071067811865476,
        //     0.7071067811865475,
        //     0,
        //     0
        //   );
        //   position: absolute;
        //   right: 0;
        //   top: -28px;
        // }
        // .box-line::after {
        //   content: "";
        //   width: 0;
        //   height: 0;
        //   border-width: 16px;
        //   border-color: transparent transparent transparent aqua;
        //   position: absolute;
        //   right: -17px;
        //   top: -14px;
        // }
      }
      .box-bt {
        position: absolute;
        left: 0;
        width: 100%;
        bottom: 10px;
        min-height: 35px;
        span {
          display: inline-block;
          font-size: 12px;
          padding: 0 10px;
          margin-right: 5px;
          cursor: pointer;
          opacity: 0.3;
        }
        span:hover {
          border: 1px solid #c4ffff;
        }
        span.avtive {
          border: 1px solid #000000;
          box-shadow: inset 0 0 4px #000;
          opacity: 1;
        }
      }
    }
  }
</style>
