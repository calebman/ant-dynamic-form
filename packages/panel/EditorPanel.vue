<!-- 表单编辑器组件 -->
<template>
  <vue-scroll class="form-model-container" :ops="{ bar: { background: '#c1c1c1', size: '6px' } }">
    <a-form-model v-bind="formSetting.options" :model="formValue" class="form-model">
      <nested-element class="root-element" :list="formSetting.children" v-on="$listeners">
        <div slot="empty" class="empty-container">
          <a-empty
            class="empty-panel"
            image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
            :imageStyle="{ height: '90px' }"
          >
            <span class="text" slot="description">从左侧拖拽组件构建表单</span>
          </a-empty>
        </div>
      </nested-element>
    </a-form-model>
  </vue-scroll>
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
.form-model-container {
  height: 100%;
  width: 100%;
  overflow: auto;
  .form-model {
    height: 100%;
    margin-bottom: 60px;
    .root-element {
      .empty-container {
        padding-top: 120px;
        .empty-panel {
          .text {
            font-weight: 300;
            font-size: 17px;
            color: #ccc;
          }
        }
      }
    }
  }
}
</style>
