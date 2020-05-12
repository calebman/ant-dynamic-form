import SupportTypes from './common/support-types'
import AntdComponents from './antd-components'
import ComponentRegistrar from './common/component-registrar'
import ComponentScanner from './common/component-scanner'
import AntDynamicForm from './AntDynamicForm'
import AIconInput from './components/AIconInput'
import IconPicker from './components/IconPicker'
/**
 * 引用必要组件
 */
function useComponents (Vue, options) {
  const type = (options && options.type) || SupportTypes.ANTD
  switch (type) {
    case SupportTypes.ANTD:
      Vue.use(AntdComponents)
      break
    case SupportTypes.ELEMENTUI:
      break
    case SupportTypes.IVIEW:
      break
  }
  Vue.component(AntDynamicForm.name, AntDynamicForm)
  Vue.component(AIconInput.name, AIconInput)
  Vue.component(IconPicker.name, IconPicker)
}

/**
 * 扫描注册的拖拽组件
 */
function scannerComponents (Vue, options) {
  const type = (options && options.type) || SupportTypes.ANTD
  const scanner = new ComponentScanner(type)
  scanner.scanComponents()
}

/**
 * 注册可可拽组件
 */
function registerComponent (typeName, { type, component, options }) {
  new ComponentRegistrar(typeName).register({ type, component, options })
}

export default {
  install (Vue, options) {
    useComponents(Vue, options)
    scannerComponents(Vue, options)
  }
}

export {
  registerComponent
}
