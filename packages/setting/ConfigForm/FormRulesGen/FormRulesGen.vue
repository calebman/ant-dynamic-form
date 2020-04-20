<!-- 表单校验规则生成器 -->
<template>
  <div class="form-rules-generator">
    <a-checkbox v-model="required" class="required-check">是否必填</a-checkbox>
    <a-list
      itemLayout="horizontal"
      size="small"
      :dataSource="filterRuleData"
      :locale="{ emptyText: '暂无校验规则' }"
      class="rule-list"
    >
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a-tooltip slot="actions" title="删除此规则">
          <a-icon type="delete" class="close-action" @click="handleRuleDelete(item, index)"></a-icon>
        </a-tooltip>
        <a-list-item-meta>
          <edit-span
            :spanStyle="{ color: '#1890ff' }"
            slot="title"
            v-model="item.pattern"
            :component="RuleInput"
          ></edit-span>
          <edit-span
            slot="description"
            v-model="item.message"
            allowClear
            placeholder="请输入验证失败的提示信息"
          ></edit-span>
        </a-list-item-meta>
      </a-list-item>
      <div slot="footer" class="rule-footer-content">
        <a-button block type="primary" ghost @click="handleRuleAdd">新增校验规则</a-button>
      </div>
    </a-list>
  </div>
</template>

<script>
import EditSpan from './EditSpan'
import RuleInput from './RuleInput'
import PanelInjectMixin from '~/common/panel-inject-mixin'
export default {
  name: 'FormRulesGen',
  mixins: [PanelInjectMixin],
  components: {
    EditSpan
  },
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      RuleInput,
      required: false,
      requiredRule: null,
      ruleData: []
    }
  },
  computed: {
    filterRuleData () {
      return this.ruleData.filter(o => o.required === undefined)
    }
  },
  watch: {
    value: {
      handler (val) {
        this.ruleData = val
      },
      deep: true,
      immediate: true
    },
    ruleData: {
      handler (val) {
        if (val.some(o => o.required)) {
          this.required = true
        } else {
          this.required = false
        }
        this.$emit('change', val)
        this.$emit('input', val)
      },
      deep: true
    },
    required (val) {
      const index = this.ruleData.indexOf(this.requiredRule)
      if (index > -1) {
        this.ruleData.splice(index, 1)
      }
      if (val) {
        this.requiredRule = { trigger: ['change', 'blur'], required: true, message: `${this.curSelectEle.formOptions.label}必须填写` }
        this.ruleData.push(this.requiredRule)
      }
    }
  },
  methods: {
    handleRuleAdd () {
      this.ruleData.push({
        pattern: '',
        message: ''
      })
    },
    handleRuleDelete (item) {
      const index = this.ruleData.indexOf(item)
      if (index > -1) {
        this.ruleData.splice(index, 1)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.form-rules-generator {
  .required-check {
    margin-bottom: 8px;
  }
  .rule-list {
    border: 1px solid #d9d9d9;
    padding: 4px 11px;
    .close-action {
      cursor: pointer;
      line-height: 32px;
      color: #ff4d4f;
    }
    .rule-footer-content {
      text-align: center;
    }
  }
}
</style>
