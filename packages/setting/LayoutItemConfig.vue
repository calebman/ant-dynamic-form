<!-- 布局子项配置 -->
<template>
  <div class="layout-item-config">
    <a-collapse v-if="curSelectEle.children && curSelectEle.children.length > 0" accordion>
      <a-collapse-panel
        v-for="item in curSelectEle.children"
        :header="item.options.name"
        :key="item._key"
      >
        <config-form
          v-if="formItems.length > 0"
          v-model="item.options"
          :formItems="formItems"
          style="padding: 0;">
        </config-form>
        <a-empty v-else description="暂无可配置项" />
        <a-icon slot="extra" class="close-action" type="delete" @click="handleItemRemove(item)" />
      </a-collapse-panel>
    </a-collapse>
    <a-empty v-else class="empty-layout" description="暂无布局项" />
    <div class="add-action-btn">
      <a-button type="primary" ghost block @click="handleItemAdd">新增{{ curComponentName }}布局项</a-button>
    </div>
  </div>
</template>

<script>
import ComponentsMixin from '~/common/components-mixin'
import PanelInjectMixin from '~/common/panel-inject-mixin'
import ConfigForm from './ConfigForm'
export default {
  name: 'LayoutItemConfig',
  mixins: [ComponentsMixin, PanelInjectMixin],
  components: {
    ConfigForm
  },
  data () {
    return {
      formItems: []
    }
  },
  watch: {
    curSelectEle: {
      handler (val) {
        this.initForm(val)
      },
      immediate: true
    }
  },
  computed: {
    curComponentDefine () {
      return this.curSelectEle && this.allComponents.find(c => c.component === this.curSelectEle.component)
    },
    curComponentName () {
      return this.curComponentDefine && this.curComponentDefine.name
    }
  },
  methods: {
    handleItemAdd () {
      const { children } = this.curSelectEle
      const len = children.length
      children.splice(len, 0, {
        _key: this.generatorKey('LayoutItem'),
        component: 'LayoutItem',
        options: {
          name: `LayoutItem${len + 1}`,
          ...this.curComponentDefine.initItemProps
        },
        children: []
      })
    },
    handleItemRemove (item) {
      const { children } = this.curSelectEle
      children.splice(children.indexOf(item), 1)
    },
    initForm () {
      let formItems = []
      if (this.curComponentDefine && this.curComponentDefine.itemProps) {
        formItems = Object.entries(this.curComponentDefine.itemProps).map(([key, value]) => {
          return Object.assign(value, { prop: key })
        })
      }
      this.formItems = formItems
    }
  }
}
</script>

<style lang="less" scoped>
.layout-item-config {
  margin-bottom: 60px;
  .empty-layout {
    margin: 8px;
  }
  .add-action-btn {
    margin: 8px;
  }
  .close-action {
    cursor: pointer;
    line-height: 32px;
    color: #ff4d4f;
  }
}
</style>
