<template>
  <div class="w-full">
    <canvas id="canvas" style="width: 100%;height: 100%;"></canvas>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, onMounted, onUnmounted } from 'vue';
import { msgVector } from '/@/api/dashboard/dashboard';
export default defineComponent({
  setup() {
    let aloneVector = ref([]);
    let simplexVectors = ref([]);
    let threeVectors = ref([]);
    async function getMsgVerctor() {
      // const { historyList } = await msgVector();
    }
    function radar(canvas, fromX, fromY, toX, toY, color) {
      var cavParam:any = {};
      cavParam.canvas = document.getElementById(canvas);
      cavParam.ctx = cavParam.canvas.getContext('2d');
      var radius = 0.5 * 0.86 * cavParam.canvas.width;
      var maxRms = 40;
      // var maxRms = maxNum;

      fromX = (fromX / maxRms) * radius;
      fromY = (fromY / maxRms) * radius;
      toX = (toX / maxRms) * radius;
      toY = (toY / maxRms) * radius;

      var headlen = 0.0646 * radius; //自定义箭头线的长度
      var theta = 45; //自定义箭头线与直线的夹角，个人觉得45°刚刚好
      var arrowX, arrowY; //箭头线终点坐标
      // 计算各角度和对应的箭头终点坐标
      var angle = (Math.atan2(fromY - toY, fromX - toX) * 180) / Math.PI;
      var angle1 = ((angle + theta) * Math.PI) / 180;
      var angle2 = ((angle - theta) * Math.PI) / 180;
      var topX = headlen * Math.cos(angle1);
      var topY = headlen * Math.sin(angle1);
      var botX = headlen * Math.cos(angle2);
      var botY = headlen * Math.sin(angle2);

      cavParam.ctx.beginPath();
      cavParam.ctx.lineWidth = 0.02 * radius;

      //画直线
      cavParam.ctx.moveTo(fromX, fromY);
      cavParam.ctx.lineTo(toX, toY);

      arrowX = toX + topX;
      arrowY = toY + topY;
      //画上边箭头线
      cavParam.ctx.moveTo(arrowX, arrowY);
      cavParam.ctx.lineTo(toX, toY);

      arrowX = toX + botX;
      arrowY = toY + botY;
      //画下边箭头线
      cavParam.ctx.lineTo(arrowX, arrowY);

      cavParam.ctx.strokeStyle = color;
      cavParam.ctx.stroke();
    }

    onMounted(async () => {
      const { aloneVector, simplexVectors, threeVectors } = await msgVector();
      aloneVector.value = aloneVector;
      simplexVectors.value = simplexVectors;
      threeVectors.value = threeVectors;
      console.log(aloneVector, simplexVectors, threeVectors);
      radar("canvas", 30, 120, 30, 10, "#dd1a00")
    });

    onUnmounted(() => {});
    return {
      getMsgVerctor,
      aloneVector,
      simplexVectors,
      threeVectors,
    };
  },
});
</script>
