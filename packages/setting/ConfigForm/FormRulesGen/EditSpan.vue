<!-- 可编辑的span组件-->
<template>
  <div class="span-wapper">
    <span
      v-show="isPreviewStatus"
      class="span-text"
      :style="spanStyle"
      @click="handleSpanClick"
    >{{ componentValue }}</span>
    <component
      v-show="!isPreviewStatus"
      :is="component"
      v-model="componentValue"
      v-bind="$attrs"
      @blur="changeToPreview"
      @pressEnter="changeToPreview"
    ></component>
  </div>
</template>

<script>
export default {
  name: 'EditSpan',
  components: {},
  props: {
    value: {
      type: [String, Number, Object, RegExp],
      default: null
    },
    component: {
      type: [String, Object],
      default: 'AInput'
    },
    spanStyle: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      showSpan: false,
      componentValue: null
    }
  },
  computed: {
    isPreviewStatus () {
      return this.showSpan && this.componentValue
    }
  },
  watch: {
    value: {
      handler (val) {
        this.componentValue = val
      },
      deep: true,
      immediate: true
    },
    componentValue: {
      handler (val) {
        this.$emit('change', val)
        this.$emit('input', val)
      },
      deep: true
    }
  },
  methods: {
    changeToPreview () {
      this.showSpan = true
    },
    handleSpanClick () {
      this.showSpan = false
    }
  }
}
</script>

<style lang="less" scoped>
.span-wapper {
  .span-text {
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    white-space: nowrap;
    width: 240px;
    display: block;
  }
}
</style>
