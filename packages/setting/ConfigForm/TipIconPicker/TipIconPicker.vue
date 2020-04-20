<!-- 可附带图标提示信息的选择器 -->
<template>
  <div class="tip-icon-picker">
    <icon-picker v-model="valueObj.icon" placeholder="请选择图标" v-bind="$attrs"></icon-picker>
    <a-input
      class="tip-input"
      allowClear
      v-show="valueObj.icon"
      v-model="valueObj.tip"
      placeholder="此处可给图标添加提示信息"
    >
      <a-tooltip slot="suffix" placement="topRight" title="提示信息将在鼠标移入图标时出现，未设置提示时不会显示">
        <a-icon type="info-circle-o"/>
      </a-tooltip>
    </a-input>
  </div>
</template>

<script>
import IconPicker from '~/components/IconPicker'
export default {
  name: 'TipIconPicker',
  components: {
    IconPicker
  },
  props: {
    value: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      valueObj: {
        icon: null,
        tip: null
      }
    }
  },
  watch: {
    value: {
      handler (val) {
        this.valueObj = val
      },
      deep: true,
      immediate: true
    },
    valueObj: {
      handler (val) {
        this.$emit('input', val)
      },
      deep: true
    }
  }
}
</script>

<style lang="less" scoped>
.tip-icon-picker {
  .tip-input {
    margin-top: 8px;
  }
}
</style>
