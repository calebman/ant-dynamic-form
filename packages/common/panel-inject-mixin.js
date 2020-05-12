/**
 * @author JianhuiChen
 * @description 为任意深度的子组件提供以下信息
 * @field formSetting 表单的整体配置
 * @field formValue 表单数据
 * @field curSelectEle 当前选中的节点
 * @field mode 面板模式 preview、edit 代表 预览模式、编辑模式
 */
export default {
  inject: ['generatorKey', 'getFormSetting', 'getFormValue', 'getCurSelectEle', 'getModeFromParent'],
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
  }
}
