import AIconInput from '~/components/AIconInput'
import { size, maxLength, placeholder } from '../basic-props'
export default {
  type: 'form',
  component: AIconInput,
  options: {
    icon: 'custom-danhangshurukuang',
    name: '文本输入框',
    props: {
      ...{ size, maxLength, placeholder },
      prefix: {
        type: 'icon-tip',
        name: '前缀图标',
        desc: '可用于装饰或区分输入框'
      },
      suffix: {
        type: 'icon-tip',
        desc: '后缀图标',
        help: '可配合图标描述信息提供业务的详细说明'
      },
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
