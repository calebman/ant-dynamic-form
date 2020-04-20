<!-- 组件配置面板 -->
<template>
  <div class="setting-panel">
    <menu-tab v-model="configTab" :items="configTabs"></menu-tab>
    <div v-if="curSelectEle === null" class="no-ele-content">
      <div class="inner">
        <div>选择一个组件进行配置</div>
        <div>左侧可拖动调节宽度</div>
      </div>
    </div>
    <vue-scroll
      v-else
      :ops="{ bar: { background: '#c1c1c1', size: '6px' } }"
      class="config-content"
    >
      <form-item-config v-if="showFormConfig" v-show="configTab === 'form'"></form-item-config>
      <layout-item-config v-if="showLayoutConfig" v-show="configTab === 'layout'"></layout-item-config>
      <component-config v-if="showComponentConfig" v-show="configTab === 'component'"></component-config>
    </vue-scroll>
  </div>
</template>

<script>
import PanelInjectMixin from '~/common/panel-inject-mixin'
import ComponentsMixin from '~/common/components-mixin'
import MenuTab from '~/components/MenuTab'
import VueScroll from 'vuescroll'
import FormItemConfig from './FormItemConfig'
import LayoutItemConfig from './LayoutItemConfig'
import ComponentConfig from './ComponentConfig'
export default {
  name: 'SettingPanel',
  mixins: [PanelInjectMixin, ComponentsMixin],
  components: {
    MenuTab,
    VueScroll,
    FormItemConfig,
    LayoutItemConfig,
    ComponentConfig
  },
  computed: {
    curComponentDefine () {
      return this.curSelectEle && this.allComponents.find(o => o.component === this.curSelectEle.component)
    },
    showFormConfig () {
      return this.curComponentDefine && this.curComponentDefine.isFormComponent
    },
    showLayoutConfig () {
      return this.curComponentDefine && this.curComponentDefine.isLayoutComponent
    },
    showComponentConfig () {
      return this.curSelectEle
    },
    configTabs () {
      const formTab = { value: 'form', icon: 'form', label: '表单配置' }
      const layoutTab = { value: 'layout', icon: 'form', label: '布局项配置' }
      const componentTab = { value: 'component', icon: 'setting', label: '组件配置' }
      return this.showLayoutConfig ? [layoutTab, componentTab] : [formTab, componentTab]
    }
  },
  watch: {
    showLayoutConfig (val) {
      this.configTab = val ? 'form' : 'layout'
    },
    curComponentDefine (val) {
      if (val) {
        this.configTab = val.isLayoutComponent ? 'layout' : 'form'
      }
    }
  },
  data () {
    return {
      configTab: 'layout'
    }
  },
  methods: {
    handleMenuClick ({ key }) {
      this.currentType = key
    }
  }
}
</script>

<style lang="less" scoped>
.setting-panel {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .no-ele-content {
    padding: 8px;
    font-weight: 300;
    height: 100%;
    width: 100%;
    font-size: 18px;
    color: #ccc;
    display: table;
    & > .inner {
      display: table-cell;
      vertical-align: middle;
      text-align: center;
    }
  }
  .config-content {
    padding: 10px;

    .el-form-item__label {
      padding: 0;
      font-weight: 500;
    }

    .el-form-item {
      border-bottom: solid 1px #e1e1e1;
      padding-bottom: 10px;
    }
  }
}
</style>
