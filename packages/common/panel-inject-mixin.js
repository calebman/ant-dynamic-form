/**
 * @author JianhuiChen
 * @description 为任意深度的子组件提供以下信息
 * @field formSetting 表单的整体配置
 * @field formValue 表单数据
 * @field curSelectEle 当前选中的节点
 * @field mode 面板模式 preview、edit 代表 预览模式、编辑模式
 */
// 组件计数器 用于key的生产
const counter = {}
export default {
  inject: ['getFormSetting', 'getFormValue', 'getCurSelectEle', 'getModeFromParent'],
  computed: {
    formSetting () {
      return this.getFormSetting()
    },
    formValue () {
      return this.getFormValue()
    },
    curSelectEle () {
      return this.getCurSelectEle()
    },
    mode () {
      return this.getModeFromParent()
    },
    isPreviewStatus () {
      return this.mode === 'preview'
    },
    isEditStatus () {
      return this.mode === 'edit'
    }
  },
  methods: {
     /**
     * 生成对应组件类型的唯一key值
     */
    generatorKey (component) {
      let componentName
      if (typeof component === 'object') {
        componentName = component.name
      } else {
        componentName = component
      }
      if (counter[componentName]) {
        counter[componentName] = ++counter[componentName]
      } else {
        counter[componentName] = 1
      }
      return componentName + counter[componentName]
    }
  }
}
