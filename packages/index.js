import Antd from 'ant-design-vue'
import AntDynamicForm from './AntDynamicForm'
import AIconInput from './components/AIconInput'
import IconPicker from './components/IconPicker'
import 'ant-design-vue/dist/antd.less'
const installer = {
  vm: {},
  install (Vue) {
    Vue.use(Antd)
    Vue.component(AntDynamicForm.name, AntDynamicForm)
    Vue.component(AIconInput.name, AIconInput)
    Vue.component(IconPicker.name, IconPicker)
  }
}

export {
  AntDynamicForm
}

export default installer
