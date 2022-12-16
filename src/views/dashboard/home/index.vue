<template>
  <div class="home-index">
    <div class="md:flex enter-y">
      <YgHead @visiblechange="openTargetModal" />
    </div>
    <!-- mt-5 md:mt-10 -->
    <div class="home-index-content enter-y p-2 md:p-4">
      <component :is="currentModal"></component>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, shallowRef, ComponentOptions } from 'vue';

  import YgHead from './components/yg_head.vue';
  import Modal1 from './index-first.vue';
  import Modal2 from './index-second.vue';
  
  export default defineComponent({
    components: { YgHead, Modal1, Modal2 },
    setup() {
      const currentModal = shallowRef<Nullable<ComponentOptions>>(Modal1);

      function openTargetModal(index) {
        currentModal.value = index;
      }
      return{
        openTargetModal,
        currentModal
      }
    }

  })
  
</script>
<style lang="less" scoped>
.home-index{
  background-image: url("../../../assets/images/yg-bg.jpg");
  background-size: 100% 100%;
  background-position: center top;
  min-height: 100vh;
  background-repeat: no-repeat;
  background-attachment: fixed;
  &-content{
    margin-top: 50px;
    height: calc(100% - 85px);
    align-items: center;
  }
}

</style>