<!-- 扩充a-input组件使其支持前后图标 -->
<template>
  <a-input v-bind="$attrs" v-on="inputListeners">
    <template slot="prefix">
      <a-tooltip v-if="hasPrefixTip" placement="topLeft" :title="prefix.tip">
        <merge-icon :type="prefix.icon" />
      </a-tooltip>
      <merge-icon v-else-if="prefix" :type="prefix" />
    </template>
    <template slot="suffix">
      <a-tooltip v-if="hasSuffixTip" placement="topRight" :title="suffix.tip">
        <merge-icon :type="suffix.icon" />
      </a-tooltip>
      <merge-icon v-else-if="suffix" :type="suffix" />
    </template>
  </a-input>
</template>

<script>
import MergeIcon from '../MergeIcon'
export default {
  name: 'AIconInput',
  components: {
    MergeIcon
  },
  props: {
    prefix: {
      type: [Object, String],
      default: () => {
        return null
      }
    },
    suffix: {
      type: [Object, String],
      default: () => {
        return null
      }
    }
  },
  computed: {
    inputListeners () {
      return Object.assign({}, this.$listeners, {
        input: event => {
          this.$emit('input', event.target.value)
        },
        change: event => {
          // 由于ant-form-item监听此事件进行表单项校验 延后change事件防止其值未更新时就进行校验
          this.$nextTick(() => this.$emit('change', event))
        }
      })
    },
    hasPrefixTip () {
      return this.prefix && typeof this.prefix === 'object'
    },
    hasSuffixTip () {
      return this.suffix && typeof this.suffix === 'object'
    }
  }
}
</script>
