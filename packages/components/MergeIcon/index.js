import { Icon } from 'ant-design-vue'
// import iconFront from './iconfont/iconfont.js'
const CustomIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1764432_hg97dcycug.js'
})
export default {
  name: 'MergeIcon',
  props: {
    symbolPrefix: {
      type: String,
      default: 'custom-'
    },
    type: {
      type: String,
      default: null
    }
  },
  computed: {
    isCustomIcon () {
      return this.type && this.type.startsWith(this.symbolPrefix)
    }
  },
  render () {
    const dynamicProps = {
      on: this.$listeners,
      props: Object.assign(this.$attrs, {
        type: this.type
      })
    }
    if (this.isCustomIcon) {
      return (<CustomIcon {...dynamicProps}></CustomIcon>)
    } else {
      return (<Icon {...dynamicProps}></Icon>)
    }
  }
}
