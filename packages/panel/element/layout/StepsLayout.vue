<!-- 基于步骤条的布局 -->
<template>
  <div class="steps-layout">
    <a-steps v-model="currentStep" v-bind="element.options" type="navigation">
      <a-step
        v-for="item in element.children"
        v-bind="item.options"
        :title="item.options.name"
        :key="item._key"
      >
        <merge-icon v-if="item.options.customIcon" slot="icon" :type="item.options.customIcon"></merge-icon>
      </a-step>
    </a-steps>
    <div v-for="(item, index) in element.children" :key="item._key" v-show="index === currentStep" class="container">
      <slot :item="item"></slot>
    </div>
  </div>
</template>

<script>
import MergeIcon from '~/components/MergeIcon'
export default {
  name: 'StepsLayout',
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
  },
  data () {
    return {
      currentStep: 0
    }
  }
}
</script>
<style lang="less" scoped>
.steps-layout {
  & > .container {

  }
}
</style>
