<!-- 表单编辑器组件 -->
<template>
  <div class="widget-form-container">
    <vue-scroll :ops="{ bar: { background: '#c1c1c1', size: '6px' } }">
      <a-form-model v-bind="formSetting.options" :model="formValue" class="form-model">
        <nested-element class="root-element" :list="formSetting.children" v-on="$listeners">
          <a-empty
            slot="empty"
            class="empty-panel"
            image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
            :imageStyle="{ height: '60px' }"
          >
            <span class="text" slot="description">
              从左侧拖拽组件
            </span>
          </a-empty>
        </nested-element>
      </a-form-model>
    </vue-scroll>
  </div>
</template>

<script>
import VueScroll from 'vuescroll'
import NestedElement from './element/NestedElement'
import PanelInjectMixin from '~/common/panel-inject-mixin'
export default {
  name: 'EditorPanel',
  mixins: [PanelInjectMixin],
  components: {
    VueScroll,
    NestedElement
  },
  mounted () {
    document.body.ondrop = function (event) {
      const isFirefox =
        navigator.userAgent.toLowerCase().indexOf('firefox') > -1
      if (isFirefox) {
        event.preventDefault()
        event.stopPropagation()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.widget-form-container {
  height: 100%;
  width: 100%;
  .form-model {
    height: 100%;
    .root-element {
      .empty-panel {
        margin-top: 120px;
        .text {
          font-weight: 300;
          font-size: 16px;
          color: #ccc;
        }
      }
    }
  }
}
</style>
