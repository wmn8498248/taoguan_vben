import { FormProps, FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';

export function optionsName(): {} {
  return {
    name: '传感器名称',
    monitorValue: '数值',
    a3A31Percentage: '总谐波含量(%)',
    a3Percentage: '3次谐波含量(%)',
    a5Percentage: '5次谐波含量(%)',
    cap: '电容量(pF)',
    capCurrent: '容性电流(mA)',
    loss: '介损',
    relativelyCap: '相对电容量(%)',
    relativelyLoss: '相对介损',
    resistanceCurrent: '阻性电流(mA)',
    resistanceCurrentEval: '阻性电流等效值(mA)',
    zeroMonitor: '零序电流(mA)',
  };
}
export function options(): any[] {
  return [
    {
      label: '数值',
      value: 'monitorValue',
    },
    {
      label: '总谐波含量(%)',
      value: 'a3A31Percentage',
    },
    {
      label: '3次谐波含量(%):',
      value: 'a3Percentage',
    },
    {
      label: '5次谐波含量(%):',
      value: 'a5Percentage',
    },
    {
      label: '电容量(pF)',
      value: 'cap',
    },
    {
      label: '容性电流(mA)',
      value: 'capCurrent',
    },
    {
      label: '介损',
      value: 'loss',
    },
    {
      label: '相对电容量(%)',
      value: 'relativelyCap',
    },
    {
      label: '相对介损',
      value: 'relativelyLoss',
    },
    {
      label: '阻性电流(mA)',
      value: 'resistanceCurrent',
    },
    {
      label: '阻性电流等效值(mA)',
      value: 'resistanceCurrentEval',
    },
    {
      label: '零序电流(mA)',
      value: 'zeroMonitor',
    },
  ];
}

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      fixed: 'left',
      width: 200,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 150,
      filters: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' },
      ],
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
    {
      title: '编号',
      dataIndex: 'no',
      width: 150,
      sorter: true,
      defaultHidden: true,
    },
    {
      title: '开始时间',
      width: 150,
      sorter: true,
      dataIndex: 'beginTime',
    },
    {
      title: '结束时间',
      width: 150,
      sorter: true,
      dataIndex: 'endTime',
    },
  ];
}

export function getBasicShortColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      width: 150,
      dataIndex: 'id',
      sorter: true,
      sortOrder: 'ascend',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 120,
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
    {
      title: '编号',
      dataIndex: 'no',
      width: 80,
    },
  ];
}

export function getMultipleHeaderColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 200,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 120,
    },
    {
      title: '地址',
      dataIndex: 'address',
      sorter: true,
      children: [
        {
          title: '编号',
          dataIndex: 'no',
          width: 120,
          filters: [
            { text: 'Male', value: 'male', children: [] },
            { text: 'Female', value: 'female', children: [] },
          ],
        },

        {
          title: '开始时间',
          dataIndex: 'beginTime',
          width: 120,
        },
        {
          title: '结束时间',
          dataIndex: 'endTime',
          width: 120,
        },
      ],
    },
  ];
}

export function getCustomHeaderColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 200,
    },
    {
      // title: '姓名',
      dataIndex: 'name',
      width: 120,
      slots: { title: 'customTitle' },
    },
    {
      // title: '地址',
      dataIndex: 'address',
      width: 120,
      slots: { title: 'customAddress' },
      sorter: true,
    },

    {
      title: '编号',
      dataIndex: 'no',
      width: 120,
      filters: [
        { text: 'Male', value: 'male', children: [] },
        { text: 'Female', value: 'female', children: [] },
      ],
    },
    {
      title: '开始时间',
      dataIndex: 'beginTime',
      width: 120,
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      width: 120,
    },
  ];
}
const renderContent = ({ text, index }: { text: any; index: number }) => {
  const obj: any = {
    children: text,
    attrs: {},
  };
  if (index === 9) {
    obj.attrs.colSpan = 0;
  }
  return obj;
};
export function getMergeHeaderColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 300,
      customRender: renderContent,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 300,
      customRender: renderContent,
    },
    {
      title: '地址',
      dataIndex: 'address',
      colSpan: 2,
      width: 120,
      sorter: true,
      customRender: ({ text, index }: { text: any; index: number }) => {
        const obj: any = {
          children: text,
          attrs: {},
        };
        if (index === 2) {
          obj.attrs.rowSpan = 2;
        }
        if (index === 3) {
          obj.attrs.colSpan = 0;
        }
        return obj;
      },
    },
    {
      title: '编号',
      dataIndex: 'no',
      colSpan: 0,
      filters: [
        { text: 'Male', value: 'male', children: [] },
        { text: 'Female', value: 'female', children: [] },
      ],
      customRender: renderContent,
    },
    {
      title: '开始时间',
      dataIndex: 'beginTime',
      width: 200,
      customRender: renderContent,
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      width: 200,
      customRender: renderContent,
    },
  ];
}
export const getAdvanceSchema = (itemNumber = 6): FormSchema[] => {
  const arr: any = [];
  for (let index = 0; index < itemNumber; index++) {
    arr.push({
      field: `field${index}`,
      label: `字段${index}`,
      component: 'Input',
      colProps: {
        xl: 12,
        xxl: 8,
      },
    });
  }
  return arr;
};
export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [
      ...getAdvanceSchema(5),
      {
        field: `field11`,
        label: `Slot示例`,
        component: 'Select',
        slot: 'custom',
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
    ],
  };
}
export function getBasicData() {
  const data: any = (() => {
    const arr: any = [];
    for (let index = 0; index < 40; index++) {
      arr.push({
        id: `${index}`,
        name: 'John Brown',
        age: `1${index}`,
        no: `${index + 10}`,
        address: 'New York No. 1 Lake ParkNew York No. 1 Lake Park',
        beginTime: new Date().toLocaleString(),
        endTime: new Date().toLocaleString(),
      });
    }
    return arr;
  })();
  return data;
}

export function getTreeTableData() {
  const data: any = (() => {
    const arr: any = [];
    for (let index = 0; index < 40; index++) {
      arr.push({
        id: `${index}`,
        name: 'John Brown',
        age: `1${index}`,
        no: `${index + 10}`,
        address: 'New York No. 1 Lake ParkNew York No. 1 Lake Park',
        beginTime: new Date().toLocaleString(),
        endTime: new Date().toLocaleString(),
        children: [
          {
            id: `l2-${index}`,
            name: 'John Brown',
            age: `1${index}`,
            no: `${index + 10}`,
            address: 'New York No. 1 Lake ParkNew York No. 1 Lake Park',
            beginTime: new Date().toLocaleString(),
            endTime: new Date().toLocaleString(),
          },
        ],
      });
    }
    return arr;
  })();

  return data;
}
