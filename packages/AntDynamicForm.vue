<!-- 表单构造器 -->
<template>
  <a-layout class="dy-form-editor">
    <!-- 左侧操作栏 -->
    <a-layout-sider
      :width="componentPanelWidth"
      theme="light"
      :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, border: '1px solid #e0e0e0'}"
    >
      <vue-draggable-resizable
        class="panel-draggable-handle component-panel-draggable"
        :w="1"
        :z="9999"
        axis="x"
        @dragging="x => handleWidthDrag(x, 'componentPanelWidth')"
        :resizable="false"
      ></vue-draggable-resizable>
      <component-panel @on-element-select="handleEleSelect"></component-panel>
    </a-layout-sider>
    <a-layout
      :style="{ marginLeft: `${componentPanelWidth}px`, marginRight: `${settingPanelWidth}px`, height: '100vh' }"
    >
      <!-- 工具栏 -->
      <a-layout-header
        :style="{ background: '#fff', padding: 0, borderBottom: '1px solid #e0e0e0', height: '45px' }"
      >
        <tools-panel
          @on-setting-change="handleSettingChange"
          @on-mode-change="handleModeChange"
          @on-clear="handleClearPanel"
        ></tools-panel>
      </a-layout-header>
      <!-- 表单构建面板 -->
      <a-layout-content :style="{ background: '#fff' }">
        <editor-panel
          @on-element-add="handleEleAdd"
          @on-element-select="handleEleSelect"
          @on-element-remove="handleEleRemove">
        </editor-panel>
      </a-layout-content>
    </a-layout>
    <!-- 右侧表单项配置模块 -->
    <a-layout-sider
      :width="settingPanelWidth"
      :style="{ background: '#fff', overflow: 'auto', height: '100vh', position: 'fixed', right: 0, border: '1px solid #e0e0e0' }"
    >
      <vue-draggable-resizable
        class="panel-draggable-handle setting-panel-draggable"
        :w="1"
        :z="9999"
        axis="x"
        @dragging="x => handleWidthDrag(x, 'settingPanelWidth')"
        :resizable="false"
      ></vue-draggable-resizable>
      <setting-panel></setting-panel>
    </a-layout-sider>
  </a-layout>
</template>

<script>
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
      getFormValue: () => this.formValue
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
      editorMode: 'edit',
      curSelectEle: null,
      componentPanelWidth: 240,
      settingPanelWidth: 360,
      formValue: {},
      formSetting: {}
    }
  },
  methods: {
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
        this.curSelectEle = this.findElementByKey(setting.children, this.curSelectEle._key)
      }
    },
    handleEleAdd (ele) {
      this.curSelectEle = ele
    },
    handleEleSelect (ele) {
      this.curSelectEle = ele
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
.dy-form-editor {
  .setting-panel-draggable {
    left: 0 !important;
  }
  .component-panel-draggable {
    left: auto !important;
    right: 0 !important;
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
    content: '';
    overflow: hidden;
    padding: 0;
  }
}
</style>
