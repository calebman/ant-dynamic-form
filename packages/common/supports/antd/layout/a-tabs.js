import TabsLayout from '../layout-impl/TabsLayout'
import { size } from '../basic-props'
export default {
  type: 'layout',
  component: TabsLayout,
  options: {
    icon: 'custom-biaoqian',
    name: '标签页',
    props: {
      size,
      type: {
        type: 'radio',
        desc: '页签样式',
        options: [
          { value: 'line', label: '线条' },
          { value: 'card', label: '卡片' },
          { value: 'editable-card', label: '可编辑卡片' }
        ],
        default: 'line'
      },
      tabPosition: {
        type: 'radio',
        desc: '页签位置',
        options: [
          { value: 'top', label: '顶部' },
          { value: 'bottom', label: '底部' },
          { value: 'left', label: '左侧' },
          { value: 'right', label: '右侧' }
        ],
        default: 'top'
      },
      animated: {
        type: 'radio',
        desc: '使用动画',
        options: [
          { value: true, label: '是' },
          { value: false, label: '否' }
        ],
        help: '只有页签位置为顶部、底部时动画有效',
        default: true
      }
    },
    childProps: {
      name: {
        type: 'input',
        desc: '标题'
      },
      tabIcon: {
        type: 'icon-tip',
        desc: '图标',
        help: '图标显示标签标题左侧，可结合描述信息提供业务的详细说明'
      },
      group: {
        type: 'checkGroup',
        desc: '其他',
        options: [
          { value: 'disabled', label: '禁用该标签页', default: false }
        ]
      }
    }
  }
}
