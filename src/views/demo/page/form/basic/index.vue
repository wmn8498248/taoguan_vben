<template>
  <!-- content=" 表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。" -->

  <PageWrapper
    title="基础表单"
    contentBackground
    content=" 表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。"
    contentClass="p-4"
  >
    <BasicForm @register="register" @submit="customSubmitFunc" />
  </PageWrapper>
</template>
<script lang="ts">
  import { BasicForm, useForm } from '/@/components/Form';
  import { defineComponent, onMounted } from 'vue'; 
  import { schemas } from './data';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PageWrapper } from '/@/components/Page';

  import {
    deviceBusinessList,
    deviceBusinessSave,
    deviceBusinessInfo,
    deviceBusinessUpdate,
    deviceBusinessDelete,
  } from '/@/api/device/manage';

  export default defineComponent({
    name: 'FormBasicPage',
    components: { BasicForm, PageWrapper },
    setup() {
      const { createMessage } = useMessage();
      const [register, { validate, setProps }] = useForm({
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 15,
        },
        schemas: schemas,
        actionColOptions: {
          offset: 8,
          span: 23,
        },
        submitButtonOptions: {
          text: '提交',
        },
        // submitFunc: customSubmitFunc,
      });

      async function getBusinessList() {
        const { page } = await deviceBusinessList();
        console.log(page);
      }
      async function customSubmitFunc(values: any) {
        try {
          // 验证
          await validate();

          setProps({
            submitButtonOptions: {
              loading: true,
            },
          });

          console.log('click search,values:' + values);

          setTimeout(() => {
            setProps({
              submitButtonOptions: {
                loading: false,
              },
            });
            createMessage.success('提交成功！');
          }, 2000);
        } catch (error) {}
      }
      onMounted(async () => {
        getBusinessList();
      });
      return { register, customSubmitFunc };
    },
  });
</script>
<style lang="less" scoped>
  .form-wrap {
    padding: 24px;
    background-color: @component-background;
  }
</style>
