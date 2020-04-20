<!-- 表单项配置 -->
<template>
  <config-form v-model="curSelectEle.formOptions" :formItems="formItems"></config-form>
</template>

<script>
import PanelInjectMixin from '~/common/panel-inject-mixin'
import ConfigForm from './ConfigForm'
export default {
  name: 'FormItemConfig',
  mixins: [PanelInjectMixin],
  components: {
    ConfigForm
  },
  data () {
    return {
      formItems: [
        {
          prop: 'label',
          type: 'input',
          desc: '标签文本',
          placeholder: '标签文本位于表单项的左侧'
        },
        {
          prop: 'prop',
          type: 'input',
          desc: '唯一标识',
          rules: [{ required: true, message: '唯一标识必须填写' }],
          placeholder: '表单提交的唯一标识'
        },
        {
          prop: 'help',
          type: 'input',
          desc: '提示文案',
          placeholder: '提示文案位于表单项的下方'
        },
        {
          prop: 'labelAlign',
          type: 'radio',
          desc: '对齐方式',
          options: [
            { value: 'left', label: '左对齐' },
            { value: 'right', label: '右对齐' }
          ]
        },
        {
          prop: 'group',
          type: 'checkGroup',
          desc: '其他',
          options: [
            { value: 'colon', label: '显示冒号' }
          ]
        },
        {
          prop: 'rules',
          type: 'rule',
          desc: '校验规则'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
</style>
