<!-- 可拖拽的节点 -->
<template>
  <draggable
    :list="list"
    tag="div"
    :class="{ 'drag-element-content': isEditStatus }"
    v-bind="dragOptions"
    @add="handleElementAdd"
  >
    <div v-show="showEmptyTip" slot="header" role="group" class="empty-container">
      <slot v-if="$slots.empty" name="empty"></slot>
      <div v-else class="empty">从左侧拖拽组件</div>
    </div>
    <div
      v-for="(element, index) in list"
      :key="element._key"
      :class="{ 'active': isSelectStatus(element), 'editor-view-item': isEditStatus }"
      @click.stop="handleEleClick(element)"
    >
      <!-- 布局模块 -->
      <template v-if="element.type == 'layout'">
        <element-layout :element="element">
          <nested-element slot-scope="{ item }" :list="item.children" v-on="$listeners"></nested-element>
        </element-layout>
      </template>
      <!-- 表单项 -->
      <a-form-model-item v-else v-bind="element.formOptions">
        <component
          :is="element.component"
          v-model="formValue[element.formOptions.prop]"
          v-bind="element.options"
        ></component>
      </a-form-model-item>
      <!-- 操作按钮 移除与拖拽 -->
      <div v-show="isSelectStatus(element)">
        <div class="view-remove" @click.stop="handleComponentDelete(element, index)">
          <merge-icon type="delete"></merge-icon>
        </div>
        <div class="view-drag">
          <merge-icon type="drag" class="drag-widget"></merge-icon>
        </div>
      </div>
    </div>
  </draggable>
</template>

<script>
import PanelInjectMixin from "~/common/panel-inject-mixin";
import Draggable from "vuedraggable";
import ElementLayout from "./layout";
import MergeIcon from "~/components/MergeIcon";
export default {
  name: "NestedElement",
  mixins: [PanelInjectMixin],
  components: {
    Draggable,
    ElementLayout,
    MergeIcon
  },
  props: {
    list: {
      type: Array,
      default: () => {
        return null;
      }
    },
    dragElementClass: {
      type: String,
      default: "drag-element-group"
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        // 预览模式下修改group的值 防止左侧组件面板的拖拽生效
        group: this.isEditStatus ? "element" : "disabled-element",
        ghostClass: "drag-ghost",
        handle: ".drag-widget"
      };
    },
    showEmptyTip() {
      return this.isEditStatus && (!this.list || this.list.length === 0);
    },
    activeSelectStatus() {
      return this.isEditStatus && this.isSelect;
    }
  },
  methods: {
    isSelectStatus(ele) {
      return !!(
        this.isEditStatus &&
        this.curSelectEle &&
        ele === this.curSelectEle
      );
    },
    handleEleClick(element) {
      if (this.isEditStatus && element !== this.curSelectEle) {
        this.$emit("on-element-select", element);
      }
    },
    handleComponentDelete(element, index) {
      this.$emit("on-element-remove", this.list, element, index);
    },
    handleElementAdd({ newIndex }) {
      this.$emit("on-element-add", this.list[newIndex - 1]);
    }
  }
};
</script>

<style lang="less" scoped>
.drag-element-content {
  min-height: 60px;
  background: #fff;
  .empty-container {
    & > .empty {
      font-weight: 300;
      display: flex;
      align-items: center;
      min-height: 80px;
      height: 100%;
      justify-content: center;
      font-size: 15px;
      color: #ccc;
    }
  }
  .editor-view-item {
    min-height: 30px;
    margin: 8px;
    border: 1px dashed #ccc;
    background: #fff;
    cursor: pointer;
    position: relative;
    &.active {
      outline: 2px solid #409eff;
      border: 1px solid #409eff;
    }
    &:hover {
      // background: #ecf5ff;
      border: 1px solid #409eff;
    }
    .view-remove {
      position: absolute;
      right: -2px;
      bottom: -2px;
      height: 28px;
      color: #fff;
      line-height: 28px;
      background: #ff7875;
      z-index: 9;
      i {
        font-size: 14px;
        color: #fff;
        margin: 0 5px;
        cursor: pointer;
      }
    }
    .view-drag {
      position: absolute;
      left: -2px;
      top: -2px;
      bottom: -18px;
      height: 28px;
      line-height: 28px;
      background: #409eff;
      z-index: 9;
      color: #fff;
      i {
        font-size: 14px;
        color: #fff;
        margin: 0 5px;
        cursor: move;
      }
    }
  }
}
</style>
