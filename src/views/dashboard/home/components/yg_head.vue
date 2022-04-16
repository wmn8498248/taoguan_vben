<template>
  <div class="yg-header w-full mb-2 text-center">
    <div class="yg-header-left">
      <a-button :class="{static: activeKey}" size="default" type="link" :size="size" @click="handleModel('Modal1')">首页</a-button>
      <a-button :class="{static: (!activeKey)}" size="default" type="link" :size="size" @click="handleModel('Modal2')">列表</a-button>
    </div>
    <span class="yg-header-text">
      套管监测平台
    </span>
    <span class="yg-header-loginout md:mr-5">
      <!-- icon="ion:power-outline" -->
      <a-button  preIcon="mdi:page-next-outline" ghost type="primary" class="ml-2" @click="handleLoginOut"> 退出登陆 </a-button>
    </span>
  </div>
</template>
<script>
  import { defineComponent, ref } from 'vue';
  import { Card } from 'ant-design-vue';
  import { useUserStore } from '/@/store/modules/user';


  export default defineComponent({

    components: { Card },
    emits: ['visiblechange'],
    setup( _, { emit }) {

      const userStore = useUserStore();
      let activeKey = ref(true);
      //  login out
      function handleLoginOut() {
        userStore.confirmLoginOut();
      }
      function handleModel(res) {
        activeKey.value = (res === 'Modal1')
        emit('visiblechange', res);
      }

      return { handleLoginOut,handleModel, activeKey };
    },
  });
</script>
<style lang="less" scoped>
.yg-header{
  background-image: url("../../../../assets/images/bg-title.png");
  background-position: center bottom;
  background-size: auto 100%;
  position: relative;
  &-loginout{
    position: absolute;
    right: 0;
    bottom: 0;
  }
  &-left{
    position: absolute;
    left: 27px;
    bottom: 0;
    button{
      padding:0 10px;
      margin: 0 5px;
      color: #fff;
    }
    .static{
      background-color: #04839e;
      border: 1px solid #82c8d7;
      box-shadow: 0 0 2px #82c8d7;
    }
  }
  &-text{
    display: inline-block;
    line-height: 77px;
    font-size: 40px;
    background-image: linear-gradient(to bottom,#ffff, #83fbfe);
    background-clip: text;
    -o-background-clip: text;
    -ms-background-clip: text;
    -moz-background-clip: text;
    -webkit-background-clip: text;    
    color: #83fbfe;
    font-family: "fangsong";
  }
}

</style>
