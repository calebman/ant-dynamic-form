import { size } from '../basic-props'
export default {
  component: 'ASteps',
  icon: 'custom-biaoqian',
  name: '步骤条',
  props: Object.assign({ size }, {
    direction: {
      type: 'radio',
      desc: '步骤条类型',
      options: [
        { value: 'horizontal', label: '水平' },
        { value: 'vertical', label: '竖直' }
      ]
    },
    labelPlacement: {
      type: 'radio',
      desc: '标签放置位置',
      options: [
        { value: 'horizontal', label: '水平' },
        { value: 'vertical', label: '竖直' }
      ]
    }
  }),
  initProps: {
    direction: 'horizontal',
    labelPlacement: 'horizontal',
    size: 'default'
  },
  itemProps: {
    name: {
      type: 'input',
      desc: '标题',
      placeholder: '步骤条的主标题'
    },
    subTitle: {
      type: 'input',
      desc: '子标题',
      placeholder: '步骤条的二级标题'
    },
    description: {
      type: 'input',
      desc: '详情描述',
      placeholder: '步骤条的详细描述'
    },
    customIcon: {
      type: 'icon',
      desc: '图标',
      placeholder: '步骤条的展示图标'
    },
    group: {
      type: 'checkGroup',
      desc: '其他',
      options: [
        { value: 'disabled', label: '禁用该步骤' }
      ]
    }
  },
  initItemProps: {
    disabled: false
  }
}
