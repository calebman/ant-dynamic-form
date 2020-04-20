<!-- 校验规则编辑器 -->
<template>
  <a-auto-complete
    v-model="ruleValue"
    showSearch
    allowClear
    placeholder="请输入校验正则表达式"
    optionLabelProp="value"
    @search="handleSearch"
    v-on="$listeners"
  >
    <template slot="dataSource">
      <a-select-opt-group v-for="group in filterRegex" :key="group.type">
        <span slot="label">{{ group.title }}</span>
        <a-select-option v-for="item in group.options" :key="item.regex" :value="item.regex">
          <span class="rule-title">{{ item.title }}</span>
          <span class="rule-regex">{{ item.regex }}</span>
        </a-select-option>
      </a-select-opt-group>
    </template>
  </a-auto-complete>
</template>

<script>
const registerUsuallyRegex = [
  {
    type: 'number',
    title: '数字类校验',
    options: [
      { title: '数字', regex: /^[0-9]*$/ },
      { title: 'n位数字', regex: /^\d{n}$/ },
      { title: '至少n位', regex: /^\d{n,}$/ },
      { title: 'm-n位', regex: /^\d{m,n}$/ },
      { title: '正数、负数、和小数', regex: /^(\\-|\+)?\d+(\.\d+)?$/ },
      { title: '非零的正整数', regex: /^[1-9]\d*$/ },
      { title: '非零的负整数', regex: /^-[1-9]\d*$/ }
    ]
  },
  {
    type: 'string',
    title: '字符类校验',
    options: [
      { title: '汉字', regex: /^[\u4e00-\u9fa5]{0,}$/ },
      { title: '英文和数字', regex: /^[A-Za-z0-9]+$/ },
      { title: '仅有英文字母', regex: /^[A-Za-z]+$/ },
      { title: '仅有大写字母', regex: /^[A-Z]+$/ },
      { title: '仅有小写字母', regex: /^[a-z]+$/ }
    ]
  },
  {
    type: 'other',
    title: '特殊',
    options: [
      { title: '邮箱', regex: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/ },
      { title: '手机号码', regex: /^([1][3,4,5,6,7,8,9])\d{9}$/ },
      { title: '电话号码', regex: /^((\d{3,4}-)|\d{3.4}-)?\d{7,8}$/ },
      { title: '国内电话', regex: /\d{3}-\d{8}|\d{4}-\d{7}/ },
      { title: '身份证', regex: /^((\d{18})|([0-9x]{18})|([0-9X]{18}))$/ },
      { title: '账号', regex: /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/ },
      { title: '密码', regex: /^[a-zA-Z]\w{5,17}$/ },
      { title: '日期', regex: /^\d{4}-\d{1,2}-\d{1,2}/ },
      { title: '邮政编码', regex: /[1-9]\d{5}(?!\d)/ },
      { title: 'IP地址', regex: /\d+\.\d+\.\d+\.\d+/ }
    ]
  }
]
export default {
  name: 'RuleInput',
  components: {},
  props: {
    value: {
      type: [RegExp, String, Number],
      default: null
    }
  },
  data () {
    return {
      registerUsuallyRegex,
      ruleValue: null,
      filterRegex: []
    }
  },
  computed: {
    usuallyRegexOptions () {
      return this.registerUsuallyRegex.map(group => {
        return {
          type: group.type,
          title: group.title,
          options: group.options.map(o => {
            return {
              trigger: ['change', 'blur'],
              title: o.title,
              regex: String(o.regex)
            }
          })
        }
      })
    }
  },
  watch: {
    value: {
      handler (val) {
        if (val) {
          this.ruleValue = String(val)
        }
      },
      deep: true,
      immediate: true
    },
    ruleValue: {
      handler (val) {
        let value = ''
        try {
          // eslint-disable-next-line no-eval
          value = eval(val)
        } catch (error) {
          // ignore
        }
        this.$emit('change', value)
        this.$emit('input', value)
      }
    }
  },
  methods: {
    handleSearch (value) {
      if (value) {
        this.filterRegex = this.usuallyRegexOptions
          .map(group => {
            return {
              type: group.type,
              title: group.title,
              options: group.options.filter(o => o.title.indexOf(value) > -1)
            }
          })
          .filter(group => group.options.length > 0)
      } else {
        this.filterRegex = this.usuallyRegexOptions
      }
    }
  },
  mounted () {
    this.filterRegex = this.usuallyRegexOptions
  }
}
</script>

<style lang="less" scoped>
.rule-title {
  color: #ff4d4f;
}
</style>
