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
      class="element"
      @click.stop="handleEleClick(element)"
    >
      <div :class="{ 'active': isSelectStatus(element), 'editor-view-item': isEditStatus }">
        <!-- 布局模块 -->
        <template v-if="element.type == 'layout'">
          <component :is="element.component" :element="element">
            <nested-element slot-scope="{ child }" :list="child.children" v-on="$listeners"></nested-element>
          </component>
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
          <div class="view-remove">
            <merge-icon type="copy" @click.stop="handleComponentCopy(element, index)"></merge-icon>
            <merge-icon type="delete" @click.stop="handleComponentDelete(element, index)"></merge-icon>
          </div>
          <div class="view-drag">
            <div class="triangle"></div>
            <div class="desc">
              <merge-icon class="drag-widget" type="drag"></merge-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  </draggable>
</template>

<script>
import PanelInjectMixin from '~/common/panel-inject-mixin'
import Draggable from 'vuedraggable'
import MergeIcon from '~/components/MergeIcon'
export default {
  name: 'NestedElement',
  mixins: [PanelInjectMixin],
  components: {
    Draggable,
    MergeIcon
  },
  props: {
    list: {
      type: Array,
      default: () => {
        return null
      }
    },
    dragElementClass: {
      type: String,
      default: 'drag-element-group'
    }
  },
  computed: {
    dragOptions () {
      return {
        animation: 200,
        // 预览模式下修改group的值 防止左侧组件面板的拖拽生效
        group: this.isEditStatus ? 'element' : 'disabled-element',
        ghostClass: 'drag-ghost',
        handle: '.drag-widget'
      }
    },
    showEmptyTip () {
      return this.isEditStatus && (!this.list || this.list.length === 0)
    },
    activeSelectStatus () {
      return this.isEditStatus && this.isSelect
    }
  },
  methods: {
    isSelectStatus (ele) {
      return !!(
        this.isEditStatus &&
        this.curSelectEle &&
        ele === this.curSelectEle
      )
    },
    handleEleClick (element) {
      if (this.isEditStatus && element !== this.curSelectEle) {
        this.$emit('on-element-select', element)
      }
    },
    handleComponentCopy (element, index) {
      this.$emit('on-element-copy', this.list, element, index)
    },
    handleComponentDelete (element, index) {
      this.$emit('on-element-remove', this.list, element, index)
    },
    handleElementAdd ({ newIndex }) {
      this.$emit('on-element-add', this.list[Math.max(newIndex - 1, 0)])
    }
  }
}
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
  .element {
    padding: 8px;
    .editor-view-item {
      min-height: 30px;
      border: 1px dashed #ccc;
      background: #fff;
      cursor: pointer;
      position: relative;
      &.active {
        outline: 2px solid #409eff;
        border: 1px solid #409eff;
      }
      &:hover {
        border: 1px solid #409eff;
      }
      .view-remove {
        position: absolute;
        right: -2px;
        bottom: -2px;
        height: 28px;
        color: #fff;
        line-height: 28px;
        background: #409eff;
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
        top: 0px;
        left: 0px;
        width: 36px;
        height: 36px;
        overflow: hidden;
        .triangle {
          width: 0;
          height: 0;
          border-top: 36px solid;
          border-right: 36px solid transparent;
          border-top-color: #409eff;
        }
        .desc {
          position: absolute;
          top: 0;
          left: 2px;
          z-index: 1;
          i {
            font-size: 17px;
            color: #fff;
            cursor: move;
          }
        }
      }
    }
  }
}
</style>
