<template>
  <PageWrapper class="high-form p-4" :title="`设备:` + userId" @back="goBack">
    <a-card title="基本参数" :bordered="false">
      <BasicForm @register="register" />
    </a-card>

    <template #rightFooter>
      <a-button type="primary" @click="submitAll"> 提交 </a-button>
    </template>
  </PageWrapper>
</template>
<script lang="ts">
  import { BasicForm, useForm } from '/@/components/Form';
  import { defineComponent, ref, onMounted } from 'vue';
  // import PersonTable from './PersonTable.vue';
  import { PageWrapper } from '/@/components/Page';
  import { schemas } from './data';
  import { Card, Input, Select } from 'ant-design-vue';
  import { useRoute } from 'vue-router';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { useGo } from '/@/hooks/web/usePage';
  import { useTabs } from '/@/hooks/web/useTabs';
  import {
    deviceBusinessInfo,
    deviceBusinessUpdate,
    deviceBusinessSave,
  } from '/@/api/device/manage';

  export default defineComponent({
    name: 'FormHightPage',
    components: {
      BasicForm,
      PageWrapper,
      [Card.name]: Card,
      [Select.name]: Select,
      ASelectOption: Select.Option,
      [Input.name]: Input,
      [Input.Group.name]: Input.Group,
    },
    setup() {
      // const tableRef = ref<{ getDataSource: () => any } | null>(null);
      const route = useRoute();
      const go = useGo();
      // 此处可以得到用户ID
      const userId = ref(route.params?.id);
      const currentKey = ref('detail');
      const { setTitle } = useTabs();
      const { createMessage } = useMessage();

      // TODO
      // 本页代码仅作演示，实际应当通过userId从接口获得用户的相关资料

      // 设置Tab的标题（不会影响页面标题）
      setTitle('详情：设备' + userId.value);

      const [register, { validate, setFieldsValue }] = useForm({
        baseColProps: {
          xl: {
            span: 8,
            offset: 0,
          },
          xxl: {
            span: 6,
            offset: 0,
          },
          // span: 6,
        },
        labelCol: {
          span: 12,
        },
        schemas: schemas,
        showActionButtonGroup: false,
      });

      async function submitAll() {
        try {
          const [values] = await Promise.all([validate()]);
          console.log('form data:', values);
          let listFrom = { ...values };
          if (listFrom.MontiType === 1) {
            listFrom.isCurrent = true
            listFrom.isPtVolt = false
            listFrom.isBoxVolt = false
          };
          if (listFrom.MontiType === 2) {
            listFrom.isCurrent = false
            listFrom.isPtVolt = true
            listFrom.isBoxVolt = false
          };
          if (listFrom.MontiType === 3) {
            listFrom.isCurrent = false
            listFrom.isPtVolt = false
            listFrom.isBoxVolt = true
          };
          if (userId.value == 'new') {
            const { code } = await deviceBusinessSave(listFrom);
            if (code == 0) {
              createMessage.success('创建成功');
              go('/device/parameters');
            }
          } else {
            const { code } = await deviceBusinessUpdate(listFrom);
            if (code == 0) {
              createMessage.success('保存成功');
              go('/device/parameters');
            }
          }
        } catch (error) {}
      }
      function goBack() {
        // 本例的效果时点击返回始终跳转到账号列表页，实际应用时可返回上一页
        go('/device/parameters');
      }
      async function getHomeListApi() {
        const { bushingDeviceBusiness } = await deviceBusinessInfo({ id: userId.value });

        if (bushingDeviceBusiness.isCurrent) bushingDeviceBusiness.MontiType = 1;
        if (bushingDeviceBusiness.isPtVolt) bushingDeviceBusiness.MontiType = 2;
        if (bushingDeviceBusiness.isBoxVolt) bushingDeviceBusiness.MontiType = 3;
        setFieldsValue(bushingDeviceBusiness);
      }

      onMounted(async () => {
        if (userId.value != 'new') getHomeListApi();
      });
      return { userId, currentKey, goBack, register, submitAll };
    },
  });
</script>
<style lang="less" scoped>
  .high-form {
    padding-bottom: 48px;
  }
</style>
