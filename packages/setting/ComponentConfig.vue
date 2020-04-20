<!-- 组件配置表单 -->
<template>
  <config-form v-model="curSelectEle.options" :formItems="formItems" ></config-form>
</template>

<script>
import ComponentsMixin from '~/common/components-mixin'
import PanelInjectMixin from '~/common/panel-inject-mixin'
import ConfigForm from './ConfigForm'
export default {
  name: 'ComponentConfigForm',
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
  methods: {
    initForm (element) {
      let formItems = []
      const componentDefine = this.allComponents.find(c => c.component === element.component)
      if (componentDefine) {
        formItems = Object.entries(componentDefine.props).map(([key, value]) => {
          return Object.assign(value, { prop: key })
        })
      }
      this.formItems = formItems
    }
  }
}
</script>

<style lang="less" scoped>
</style>
