<!-- 折叠面板布局 -->
<template>
  <a-collapse v-bind="element.options">
    <a-collapse-panel v-for="item in element.children" v-bind="item.options" :header="item.options.name" :key="item._key">
      <template slot="extra">
        <a-tooltip v-if="item.options.extraIcon" placement="topLeft" :title="item.options.extraIcon.tip">
          <merge-icon :type="item.options.extraIcon.icon" />
        </a-tooltip>
      </template>
      <slot :child="item"></slot>
    </a-collapse-panel>
  </a-collapse>
</template>

<script>
import MergeIcon from '~/components/MergeIcon'
export default {
  name: 'CollapseLayout',
  components: {
    MergeIcon
  },
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
