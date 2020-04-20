<!-- 基于栅格的布局 -->
<template>
  <a-row v-bind="element.options">
    <a-col
      v-for="item in element.children"
      v-bind="item.options"
      :span="item.options.span || (24 / element.children.length)"
      :key="item._key"
    >
      <slot :item="item"></slot>
    </a-col>
  </a-row>
</template>

<script>
export default {
  name: 'GridLayout',
  props: {
    element: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>
