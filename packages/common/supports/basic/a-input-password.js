import { size, maxLength, placeholder } from '../basic-props'
export default {
  component: 'AInputPassword',
  icon: 'custom-mima',
  name: '密码输入框',
  props: {
    ...{ size, maxLength, placeholder },
    group: {
      type: 'checkGroup',
      desc: '其他',
      options: [
        { value: 'disabled', label: '禁用' },
        { value: 'allowClear', label: '显示清除按钮' },
        { value: 'visibilityToggle', label: '显示密码与明文切换按钮' }
      ]
    }
  },
  initProps: {
    visibilityToggle: true,
    disabled: false,
    allowClear: false
  }
}
