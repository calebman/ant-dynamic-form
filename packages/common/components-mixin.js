
/**
 * @author JianhuiChen
 * @description 提供可拖拽的组件列表信息 自动引入supports目录中定义的组件信息
 * @field basicComponents 基础组件
 * @field layoutComponents 布局组件
 */
let componentsContext = require.context('./supports/layout', false, /.js$/)
const layoutComponents = componentsContext.keys().map(k => Object.assign(componentsContext(k).default, {
  type: 'layout',
  isLayoutComponent: true
}))
componentsContext = require.context('./supports/basic', false, /.js$/)
const basicComponents = componentsContext.keys().map(k => Object.assign(componentsContext(k).default, {
  type: 'basic',
  isFormComponent: true
}))
export default {
  computed: {
    allComponents () {
      return [].concat(this.layoutComponents, this.basicComponents)
    }
  },
  data () {
    return {
      layoutComponents,
      basicComponents,
      basicComponents1: [
        {
          type: 'basic',
          component: 'AInput',
          icon: 'icon-input',
          name: '文本输入框'
        },
        {
          type: 'basic',
          component: 'AInputNumber',
          icon: 'icon-number',
          name: '数字输入框'
        },
        {
          type: 'basic',
          component: 'ARadio',
          icon: 'icon-radio-active',
          name: '单选'
        },
        {
          type: 'basic',
          component: 'ACheckbox',
          icon: 'icon-check-box',
          name: '多选'
        },
        {
          type: 'basic',
          component: 'ADatePicker',
          icon: 'icon-date',
          name: '时间选择器'
        },
        {
          type: 'basic',
          component: 'ARate',
          icon: 'icon-pingfen1',
          name: '评分'
        },
        {
          type: 'basic',
          component: 'ASelect',
          icon: 'icon-select',
          name: '选择框'
        },
        {
          type: 'basic',
          component: 'ASwitch',
          icon: 'icon-switch',
          name: '切换'
        },
        {
          type: 'basic',
          component: 'ASlider',
          icon: 'icon-slider',
          name: '滑块'
        }
      ],
      otherComponents1: [
        {
          type: 'other',
          component: 'AFormModel',
          icon: 'icon-ad-icon-tooltip',
          name: '表单'
        },
        {
          type: 'other',
          component: 'ACol',
          icon: 'icon-grid-',
          name: '列'
        },
        {
          type: 'other',
          component: 'ATabPanel',
          icon: 'icon-grid-',
          name: '页签'
        }
      ]
    }
  }
}
