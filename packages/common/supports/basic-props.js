const size = {
  type: 'radio',
  desc: '大小',
  options: [
    { value: 'small', label: '较小' },
    { value: 'default', label: '中等' },
    { value: 'large', label: '较大' }
  ]
}

const disabled = {
  type: 'radio',
  desc: '是否禁用',
  options: [
    { value: true, label: '是' },
    { value: false, label: '否' }
  ]
}

const maxLength = {
  type: 'number',
  desc: '最大长度',
  placeholder: '可支持输入的最大字符长度'
}

const placeholder = {
  type: 'input',
  desc: '填充内容',
  placeholder: '没有任何输入时的填充内容'
}

export {
  size,
  disabled,
  maxLength,
  placeholder
}
