import { Input } from 'ant-design-vue'
import { size, maxLength, placeholder } from '../basic-props'
export default {
  type: 'form',
  component: Input.Password,
  options: {
    icon: 'custom-mima',
    name: '密码输入框',
    props: {
      ...{ size, maxLength, placeholder },
      group: {
        type: 'checkGroup',
        desc: '其他',
        options: [
          { value: 'disabled', label: '禁用', default: false },
          { value: 'allowClear', label: '显示清除按钮', default: false },
          { value: 'visibilityToggle', label: '显示密码与明文切换按钮', default: true }
        ]
      }
    }
  }
}
