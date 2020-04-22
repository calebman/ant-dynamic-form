<!-- 表单构造器 -->
<template>
  <div class="ant-dynamic-form">
    <!-- 左侧操作栏 -->
    <div class="left-container" :style="{ width: `${componentPanelWidth}px` }">
      <vue-draggable-resizable
        class="panel-draggable-handle component-panel-draggable"
        :w="1"
        :z="9999"
        axis="x"
        @dragging="x => handleWidthDrag(x, 'componentPanelWidth')"
        @dragstop="state.componentPanelWidth = 0"
        :resizable="false"
      ></vue-draggable-resizable>
      <component-panel @on-element-select="handleEleSelect"></component-panel>
    </div>
    <div class="center-container">
      <!-- 工具栏 -->
      <div class="tools-panel">
        <tools-panel
          @on-setting-change="handleSettingChange"
          @on-mode-change="handleModeChange"
          @on-clear="handleClearPanel"
        ></tools-panel>
      </div>
      <!-- 表单构建面板 -->
      <div class="editor-panel">
        <editor-panel
          @on-element-add="handleEleAdd"
          @on-element-select="handleEleSelect"
          @on-element-copy="handleEleCopy"
          @on-element-remove="handleEleRemove"
        ></editor-panel>
      </div>
    </div>
    <!-- 右侧表单项配置模块 -->
    <div class="right-container" :style="{ width: `${settingPanelWidth}px` }">
      <vue-draggable-resizable
        class="panel-draggable-handle setting-panel-draggable"
        :w="1"
        :z="9999"
        axis="x"
        @dragging="x => handleWidthDrag(x, 'settingPanelWidth')"
        @dragstop="state.settingPanelWidth = 0"
        :resizable="false"
      ></vue-draggable-resizable>
      <setting-panel></setting-panel>
    </div>
  </div>
</template>

<script>
import { cloneDeep } from '~/util'
import ComponentPanel from './define/ComponentPanel'
import EditorPanel from './panel/EditorPanel'
import SettingPanel from './setting/SettingPanel'
import ToolsPanel from './tools/ToolsPanel'
import VueDraggableResizable from 'vue-draggable-resizable'
export default {
  name: 'AntDynamicForm',
  components: {
    ComponentPanel,
    EditorPanel,
    SettingPanel,
    ToolsPanel,
    VueDraggableResizable
  },
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          _key: 'root',
          component: 'AFormModel',
          options: {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 }
          },
          children: []
        }
      }
    }
  },
  provide () {
    return {
      // 响应式的向子组件提供信息
      getModeFromParent: () => this.editorMode,
      getCurSelectEle: () => this.curSelectEle,
      getFormSetting: () => this.formSetting,
      getFormValue: () => this.formValue,
      generatorKey: this.generatorKey
    }
  },
  watch: {
    value: {
      handler (val) {
        this.formSetting = val
      },
      deep: true,
      immediate: true
    },
    formSetting: {
      handler (val) {
        this.$emit('change', val)
        this.$emit('input', val)
      },
      deep: true
    }
  },
  data () {
    return {
      // 计数器
      counter: {},
      editorMode: 'edit',
      curSelectEle: null,
      componentPanelWidth: 240,
      settingPanelWidth: 360,
      state: {},
      formValue: {},
      formSetting: {}
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
      if (this.counter[componentName]) {
        this.counter[componentName] = ++this.counter[componentName]
      } else {
        this.counter[componentName] = 1
      }
      return componentName + this.counter[componentName]
    },
    findElementByKey (children, key) {
      for (const i in children) {
        const child = children[i]
        if (child._key === key) {
          return child
        }
        if (child.children && child.children.length > 0) {
          return this.findElementByKey(child.children, key)
        }
      }
    },
    handleSettingChange (setting) {
      this.formSetting = setting
      if (this.curSelectEle) {
        this.curSelectEle = this.findElementByKey(
          setting.children,
          this.curSelectEle._key
        )
      }
    },
    handleEleAdd (ele) {
      this.curSelectEle = ele
    },
    handleEleSelect (ele) {
      this.curSelectEle = ele
    },
    handleEleCopy (list, element, index) {
      const cloneEle = cloneDeep(element)
      // generator new key
      const deepGenKey = ele => {
        if (ele.children && ele.children.length > 0) {
          ele.children.forEach(o => deepGenKey(o))
        }
        const newKey = this.generatorKey(ele.component)
        ele._key = newKey
        if (ele.formOptions && ele.formOptions.prop) {
          ele.formOptions.prop = newKey
        }
      }
      deepGenKey(cloneEle)
      list.push(cloneEle)
      this.curSelectEle = cloneEle
    },
    /**
     * 处理节点删除事件
     */
    handleEleRemove (list, element, index) {
      list.splice(index, 1)
    },
    handleClearPanel () {
      this.formSetting = {
        component: 'AFormModel',
        options: {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 }
        },
        children: []
      }
    },
    handleWidthDrag (x, key) {
      console.log(x, key)
      const isComponentPanel = key === 'componentPanelWidth'
      this.dragOffset = isComponentPanel ? x : -x
      const minWidth = isComponentPanel ? 240 : 360
      let width = minWidth + this.dragOffset
      if (width > 2 * minWidth) {
        width = 2 * minWidth
      } else if (width < minWidth) {
        width = minWidth
      }
      this[key] = width
    },
    handleModeChange (mode) {
      this.editorMode = mode
    }
  }
}
</script>

<style lang="less">
.ant-dynamic-form {
  display: flex;
  width: 100%;
  height: auto;
  overflow: hidden;
  background: #fff;
  align-items: stretch;
  .left-container {
    overflow: auto;
    border: 1px solid #e0e0e0;
    position: relative;
    .component-panel-draggable {
      left: auto;
      right: 0;
    }
  }
  .center-container {
    flex: 1;
    .tools-panel {
      border-bottom: 2px solid #e0e0e0;
      height: 45px;
    }
    .editor-panel {
      min-height: 240px;
    }
  }
  .right-container {
    overflow: auto;
    border: 1px solid #e0e0e0;
    position: relative;
    .setting-panel-draggable {
      left: 0;
    }
  }
  .panel-draggable-handle {
    position: absolute;
    transform: translate(0px, 0px) !important;
    height: 100% !important;
    bottom: 0;
    cursor: col-resize;
    touch-action: none;
    background-color: #ccc;
  }
  .drag-ghost {
    background: #f56c6c;
    border: 2px solid #f56c6c;
    outline-width: 0;
    height: 3px;
    box-sizing: border-box;
    font-size: 0;
    content: "";
    overflow: hidden;
    padding: 0;
  }
}
</style>
