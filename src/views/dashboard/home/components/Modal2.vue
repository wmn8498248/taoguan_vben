<template>
  <!-- :okButtonProps="{ disabled: true }" -->
  <!-- :showCancelBtn="false"
    :showOkBtn="false" -->
  <BasicModal
    v-bind="$attrs"
    @cancel="closeAudio"
    @ok="setModal"
    :height="1150"
    :minHeight="100"
    @register="register"
    :title="ListData.notShowType === 1 ? '数据报警' : '通讯报警'"
  >
    <!-- {{ ListData.name }}{{ dataList[ListData.alarmType] }} -->
    <div class="modal-title"
      ><Tag color="red">{{ ListData.name }}{{ dataList[ListData.alarmType] }}，请及时查看</Tag></div
    >
    <a-radio-group v-model:value="value">
      <!-- <a-radio :style="radioStyle" :value="1">30分钟内不显示</a-radio> -->
      <a-radio :style="radioStyle" :value="1">3小时内内不显示</a-radio>
      <a-radio :style="radioStyle" :value="2">24小时内不显示</a-radio>
      <a-radio :style="radioStyle" :value="3">
        <a-input size="small" v-model:value="inputValue" style="width: 100px" />
        分
      </a-radio>
    </a-radio-group>
    <!-- <a-button type="primary" @click="setModal" class="mr-2"> 不再弹窗报警 </a-button>
    <a-button type="primary" @click="closeModal" class="mr-2"> 关闭 </a-button> -->

    <!-- <a-button type="primary" @click="setModalProps"> 从内部修改title </a-button> -->
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, computed, reactive, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { msgNotShow } from '/@/api/dashboard/dashboard';
  import { Tag, Radio } from 'ant-design-vue';
  import { Dropdown } from '/@/components/Dropdown';

  const getDropdownList = [];
  const dataList = [
    '无',
    '电流过高',
    '电流过低',
    '相对介损过高',
    '相对电容量过高',
    '零序电流过高1',
    '零序电流过高2',
    '电容量超限',
    '介损超限',
    '通讯中断',
  ];
  const props = {
    consoleList: {
      type: null,
      default: {
        notShowType: 0,
        name: '',
        alarmLevel: 1,
        alarmType: 9,
        createTime: '',
        deviceUniqueId: '',
      },
    },
  };
  export default defineComponent({
    components: { BasicModal, Tag, Dropdown, ARadioGroup: Radio.Group, ARadio: Radio },
    props,
    setup(props, { emit }) {
      const value = ref<number>(1);
      const inputValue = ref<number>(30);
      const radioStyle = reactive({
        display: 'flex',
        height: '30px',
        lineHeight: '30px',
      });

      const [register, { closeModal, setModalProps }] = useModalInner();
      const ListData = computed(() => props.consoleList);

      async function setModal() {
        let realMinute = 0;
        switch (value.value) {
          case 1:
            realMinute = 180;
            break;
          case 2:
            realMinute = 1440;
            break;
          case 3:
            realMinute = inputValue.value;
            break;
          default:
            break;
        }

        let shwoData = {
          deviceUniqueId: props.consoleList.deviceUniqueId,
          minute: parseInt(realMinute),
          notShowType: props.consoleList.notShowType,
        };
        const {} = await msgNotShow(shwoData);
        closeModal();
        emit("closeAudio")
      }
      function closeAudio() {
        emit("closeAudio")
        closeModal();
      }

      return {
        closeAudio,
        inputValue,
        value,
        radioStyle,
        getDropdownList,
        dataList,
        ListData,
        register,
        closeModal,
        setModal,
        setModalProps: () => {
          setModalProps({ title: 'Modal New Title' });
        },
      };
    },
  });
</script>
<style lang="less" scoped>
  .modal-title {
    margin-bottom: 20px;
    text-align: center;
  }
</style>
