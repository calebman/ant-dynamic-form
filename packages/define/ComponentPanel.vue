<!-- 组件定义面板 -->
<template>
  <div class="component-panel">
    <menu-tab v-model="operaTab" :items="operaTabs"></menu-tab>
    <vue-scroll :ops="{ bar: { background: '#c1c1c1', size: '6px' } }">
      <div v-show="operaTab === 'component'" class="form-editor-compoents-list">
        <component-grid title="基础组件" :componentList="basicComponents"></component-grid>
        <component-grid title="布局组件" :componentList="layoutComponents"></component-grid>
      </div>
      <component-outline v-show="operaTab === 'outline'" v-on="$listeners"></component-outline>
    </vue-scroll>
  </div>
</template>

<script>
import ComponentsMixin from '~/common/components-mixin'
import MenuTab from '~/components/MenuTab'
import VueScroll from 'vuescroll'
import ComponentGrid from './ComponentGrid'
import ComponentOutline from './ComponentOutline'
export default {
  name: 'ComponentPanel',
  mixins: [ComponentsMixin],
  components: {
    MenuTab,
    VueScroll,
    ComponentGrid,
    ComponentOutline
  },
  data () {
    return {
      operaTab: 'component',
      operaTabs: [
        { value: 'component', icon: 'bank', label: '组件' },
        { value: 'outline', icon: 'bars', label: '大纲' }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.component-panel {
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding-bottom: 45px;
  .form-editor-compoents-list {
    padding: 8px 0;
    width: 100%;
    height: 100%;
  }
}
</style>
