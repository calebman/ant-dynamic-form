const size = {
  type: 'radio',
  name: '大小',
  options: [
    { value: 'small', label: '较小' },
    { value: 'default', label: '中等' },
    { value: 'large', label: '较大' }
  ],
  default: 'default'
}

const disabled = {
  type: 'radio',
  name: '是否禁用',
  options: [
    { value: true, label: '是' },
    { value: false, label: '否' }
  ],
  default: false
}

const maxLength = {
  type: 'number',
  name: '最大长度',
  desc: '可支持输入的最大字符长度'
}

const placeholder = {
  type: 'input',
  name: '填充内容',
  desc: '没有任何输入时的填充内容'
}

export {
  size,
  disabled,
  maxLength,
  placeholder
}
