<!-- 组件定义面板 -->
<template>
  <div class="component-panel">
    <vue-scroll :ops="{ bar: { background: '#c1c1c1', size: '6px' } }">
      <div class="form-editor-compoents-list">
        <component-grid title="基础组件" :componentList="basicComponents"></component-grid>
        <component-grid title="布局组件" :componentList="layoutComponents"></component-grid>
      </div>
      <a-collapse class="form-component-outlie">
        <a-collapse-panel class="outline-panel" header="大纲" key="1">
          <component-outline v-on="$listeners"></component-outline>
        </a-collapse-panel>
      </a-collapse>
    </vue-scroll>
  </div>
</template>

<script>
import ComponentsMixin from '~/common/components-mixin'
import VueScroll from 'vuescroll'
import ComponentGrid from './ComponentGrid'
import ComponentOutline from './ComponentOutline'
export default {
  name: 'ComponentPanel',
  mixins: [ComponentsMixin],
  components: {
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
  },
  mounted () {

  }
}
</script>

<style lang="less">
.component-panel {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .form-editor-compoents-list {
    padding: 8px 0;
    width: 100%;
    height: 100%;
  }
  .form-component-outlie {
    position: absolute;
    bottom: 0;
    width: 100%;
    .outline-panel {
      & > .ant-collapse-header {
        padding: 6px 8px;
        padding-left: 40px;
      }
      .ant-collapse-content-box {
        padding: 0 !important;
      }
    }
  }
}
</style>
