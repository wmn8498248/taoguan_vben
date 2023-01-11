<template>
  {{ register }}
  <PageWrapper class="high-form p-4" :title="`设备:` + userId" @back="goBack">
    <a-card title="基本参数" :bordered="false">
      <BasicForm @register="register" />
    </a-card>
    <a-card title="额外参数" :bordered="false" class="!mt-5">
      <BasicForm @register="registerTask"> </BasicForm>
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
  import { schemas, taskSchemas } from './data';
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
          span: 6,
        },
        labelCol: {
          span: 9,
        },
        schemas: schemas,
        showActionButtonGroup: false,
      });

      const [registerTask, { validate: validateTaskForm, setFieldsValue: setFieldsValueTaskForm }] =
        useForm({
          baseColProps: {
            span: 8,
          },
          labelCol: {
            span: 12,
          },
          schemas: taskSchemas,
          showActionButtonGroup: false,
        });

      async function submitAll() {
        try {
          const [values, taskValues] = await Promise.all([validate(), validateTaskForm()]);
          console.log('form data:', values, taskValues);
          let listFrom = { ...values, ...taskValues };
          if (userId.value == 'new') {
            console.log(userId.value, '__________userId.value1 ');

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
        setFieldsValue(bushingDeviceBusiness);
        setFieldsValueTaskForm(bushingDeviceBusiness);
      }

      onMounted(async () => {
        if (userId.value != 'new') getHomeListApi();
      });
      return { userId, currentKey, goBack, register, registerTask, submitAll };
    },
  });
</script>
<style lang="less" scoped>
  .high-form {
    padding-bottom: 48px;
  }
</style>
