import IconPicker from '~/components/IconPicker'
import { placeholder } from '../basic-props'
export default {
  component: IconPicker.name,
  icon: 'custom-gongju',
  name: '图标选择器',
  props: {
    placeholder,
    group: {
      type: 'checkGroup',
      desc: '其他',
      options: [
        { value: 'disabled', label: '禁用' },
        { value: 'allowClear', label: '显示清除按钮' }
      ]
    }
  },
  initProps: {
    disabled: false,
    allowClear: false
  }
}
