<template>
  <div class="menu-tabs">
    <div
      v-for="item in items"
      class="tab-item"
      :class="{active: value === item.value}"
      :key="item.value"
      @click="handleItemClick(item)"
    >
      <merge-icon v-if="item.icon" :type="item.icon" />
      <span :class="{ label: item.icon }">{{ item.label }}</span>
    </div>
  </div>
</template>

<script>
import MergeIcon from '../MergeIcon'
export default {
  name: 'MenuTab',
  components: {
    MergeIcon
  },
  props: {
    value: {
      type: String,
      default: null
    },
    items: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    handleItemClick (item) {
      this.$emit('input', item.value)
    }
  }
}
</script>

<style lang="less" scoped>
.menu-tabs {
  height: 45px;
  border-bottom: solid 2px #e4e7ed;
  padding: 0 5px;
  .tab-item {
    height: 45px;
    width: 50%;
    line-height: 45px;
    display: inline-block;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    position: relative;
    cursor: pointer;

    & > .label {
      margin-left: 8px;
    }

    &.active {
      border-bottom: solid 2px #409eff;
    }
  }
}
</style>
