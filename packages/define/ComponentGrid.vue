<!-- 展示可用的组件 -->
<template>
  <div class="compoents-grid">
    <template v-if="componentList.length">
      <div class="widget-cate">{{ title }}</div>
      <draggable
        tag="ul"
        :list="componentList"
        :move="() => true"
        :clone="handleCloneElement"
        v-bind="dragOptions"
      >
        <li v-for="(component, index) in componentList" class="form-edit-widget-label" :key="index">
          <a>
            <merge-icon :type="component.options.icon" class="icon"></merge-icon>
            <span>{{ component.options.name }}</span>
          </a>
        </li>
      </draggable>
    </template>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import MergeIcon from '~/components/MergeIcon'
import PanelInjectMixin from '~/common/panel-inject-mixin'
export default {
  name: 'ComponentGrid',
  mixins: [PanelInjectMixin],
  components: {
    Draggable,
    MergeIcon
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    // 组件列表
    componentList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: {
    dragOptions () {
      return {
        group: { name: 'element', pull: 'clone', put: false },
        sort: false,
        ghostClass: 'drag-ghost'
      }
    }
  },
  methods: {
    handleCloneElement ({ type, component, options }) {
      const newKey = this.generatorKey(component)
      const cloneElement = {
        _key: newKey,
        type: type,
        component: component,
        children: [],
        formOptions: {},
        options: {
          ...this.loadDefaultProps(options)
        }
      }
      if (type === 'form') {
        cloneElement.formOptions = {
          prop: newKey,
          label: this.generatorKey(options.name),
          required: false,
          colon: true,
          labelAlign: 'right'
        }
      }
      if (type === 'layout') {
        // 2 child default
        for (let i = 0; i < 2; i++) {
          cloneElement.children.push({
            _key: this.generatorKey('LayoutItem'),
            component: 'LayoutItem',
            options: {
              name: `LayoutItem${i}`,
              ...this.loadDefaultProps(options)
            },
            children: []
          })
        }
      }
      return cloneElement
    },
    loadDefaultProps ({ props = {} }) {
      const defaultVals = {}
      Object.keys(props).forEach(k => {
        const prop = props[k]
        if (prop.type === 'checkGroup') {
          prop.options.forEach(opt => {
            if (opt.default !== undefined) {
              defaultVals[opt.value] = opt.default
            }
          })
        } else if (prop.default !== undefined) {
          defaultVals[k] = prop.default
        }
      })
      return defaultVals
    }
  }
}
</script>

<style lang="less" scoped>
.compoents-grid {
  .widget-cate {
    padding: 8px 12px;
    font-size: 13px;
  }

  ul {
    position: relative;
    overflow: hidden;
    padding: 0 10px 10px;
    margin: 0;
  }

  .form-edit-widget-label {
    font-size: 12px;
    display: block;
    width: 48%;
    line-height: 26px;
    position: relative;
    float: left;
    left: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 1%;
    color: #333;
    border: 1px solid #f4f6fc;

    & > a {
      display: block;
      cursor: move;
      background: #f4f6fc;
      border: 1px solid #f4f6fc;
      color: #333;

      .icon {
        margin-right: 6px;
        margin-left: 8px;
        font-size: 14px;
        display: inline-block;
        vertical-align: middle;
      }

      span {
        display: inline-block;
        vertical-align: middle;
      }
    }
    a:hover {
      color: #409eff;
      border: 1px dashed #409eff;
    }
  }
}
</style>
