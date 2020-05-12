import {
  Button,
  Divider,
  Checkbox,
  Select,
  Radio,
  Tree,
  Collapse,
  Row,
  List,
  Col,
  Steps,
  Tabs,
  FormModel,
  Input,
  InputNumber,
  Dropdown,
  Card,
  Icon,
  Empty,
  AutoComplete,
  Tooltip
} from 'ant-design-vue'

export default {
  install (Vue, options) {
    Vue.use(Tree)
    Vue.use(Collapse)
    Vue.use(Radio)
    Vue.use(FormModel)
    Vue.use(Input)
    Vue.use(InputNumber)
    Vue.use(Button)
    Vue.use(Checkbox)
    Vue.use(Select)
    Vue.use(Card)
    Vue.use(Row)
    Vue.use(List)
    Vue.use(Col)
    Vue.use(Tabs)
    Vue.use(Icon)
    Vue.use(Dropdown)
    Vue.use(Steps)
    Vue.use(Empty)
    Vue.use(AutoComplete)
    Vue.use(Tooltip)
    Vue.use(Divider)
  }
}
