import CollapseLayout from '../layout-impl/CollapseLayout'
export default {
  type: 'layout',
  component: CollapseLayout,
  options: {
    icon: 'custom-zhage',
    name: '折叠面板',
    props: {
      expandIconPosition: {
        type: 'radio',
        desc: '箭头图标位置',
        options: [
          { value: 'left', label: '左侧' },
          { value: 'right', label: '右侧' }
        ],
        default: 'left'
      },
      group: {
        type: 'checkGroup',
        desc: '其他',
        options: [
          { value: 'bordered', label: '带边框风格', default: true },
          { value: 'accordion', label: '手风琴模式', default: false }
        ]
      }
    },
    childProps: {
      name: {
        type: 'input',
        desc: '标题',
        default: '折叠面板项'
      },
      extraIcon: {
        type: 'icon-tip',
        desc: '面板右上角的图标',
        help: '可配合图标描述信息提供业务的详细说明'
      },
      group: {
        type: 'checkGroup',
        desc: '其他',
        options: [
          { value: 'disabled', label: '禁用该面板', default: false },
          { value: 'showArrow', label: '显示箭头', default: true }
        ]
      }
    }
  }
}
