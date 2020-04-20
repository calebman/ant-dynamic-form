export default {
  component: 'ARow',
  icon: 'custom-zhage',
  name: '栅格',
  props: {
    type: {
      type: 'radio',
      desc: '布局类型',
      options: [
        { value: null, label: '默认布局' },
        { value: 'flex', label: '弹性布局' }
      ]
    },
    align: {
      type: 'radio',
      desc: '垂直排列',
      options: [
        { value: 'top', label: '上对齐' },
        { value: 'middle', label: '居中对齐' },
        { value: 'bottom', label: '下对齐' }
      ]
    },
    gutter: {
      type: 'number',
      desc: '栅格间隔'
    },
    justify: {
      type: 'select',
      desc: '水平排列',
      options: [
        { value: 'start', label: '左对齐' },
        { value: 'center', label: '居中' },
        { value: 'end', label: '右对齐' },
        { value: 'space-around', label: '两端对齐' },
        { value: 'space-between', label: '间隔相等' }
      ]
    }
  },
  initProps: {
    type: null,
    align: 'top',
    gutter: 16,
    justify: 'center'
  },
  itemProps: {
  },
  initItemProps: {
  }
}
