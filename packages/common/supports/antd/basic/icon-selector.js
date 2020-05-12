import IconPicker from '~/components/IconPicker'
import { placeholder } from '../basic-props'
export default {
  type: 'form',
  component: IconPicker,
  options: {
    icon: 'custom-gongju',
    name: '图标选择器',
    props: {
      placeholder,
      group: {
        type: 'checkGroup',
        desc: '其他',
        options: [
          { value: 'disabled', label: '禁用', default: false },
          { value: 'allowClear', label: '显示清除按钮', default: false }
        ]
      }
    }
  }
}
