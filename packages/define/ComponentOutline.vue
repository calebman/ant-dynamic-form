<!-- 组件大纲 -->
<template>
  <div class="component-outline">
    <div style="padding: 8px">
      <a-input-search placeholder="搜索组件" @change="handleSearch" />
    </div>
    <a-tree
      :treeData="treeData"
      :selectedKeys="selectedKeys"
      showIcon
      defaultExpandAll
      :expandedKeys="expandedKeys"
      :autoExpandParent="autoExpandParent"
      @expand="handleExpand"
      @select="handleSelect"
    >
      <template slot="custom-icon" slot-scope="{ dataRef }">
        <merge-icon :type="dataRef.icon"></merge-icon>
      </template>
      <template slot="custom-title" slot-scope="{ title }">
        <span v-if="title.indexOf(searchValue) > -1">
          {{ title.substr(0, title.indexOf(searchValue)) }}
          <span
            style="color: #f50"
          >{{ searchValue }}</span>
          {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
        </span>
        <span v-else>{{ title }}</span>
      </template>
    </a-tree>
  </div>
</template>

<script>
import ComponentsMixin from '~/common/components-mixin'
import PanelInjectMixin from '~/common/panel-inject-mixin'
import MergeIcon from '~/components/MergeIcon'
export default {
  name: 'ComponentOutline',
  mixins: [ComponentsMixin, PanelInjectMixin],
  components: {
    MergeIcon
  },
  data () {
    return {
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: true
    }
  },
  computed: {
    treeData () {
      return this.transfer([this.formSetting])
    },
    treeDataList () {
      return this.generateList(this.treeData)
    },
    selectedKeys () {
      return this.curSelectEle ? [this.curSelectEle._key] : []
    }
  },
  methods: {
    transfer (elements) {
      return elements.map(o => {
        const componentObj = this.allComponents.find(
          c => c.component === o.component
        )
        let title
        const componentName = componentObj ? componentObj.name : o.component
        const options = o.options || {}
        switch (o.component) {
          case 'ATabPanel':
            title = options.tab
            break
          default:
            title = options.label
            break
        }
        const copyObj = {
          key: o._key,
          title: title || componentName,
          origin: o
        }
        copyObj.icon = componentObj ? componentObj.icon : 'question'
        copyObj.scopedSlots = { icon: 'custom-icon', title: 'custom-title' }
        if (o.children && o.children.length > 0) {
          copyObj.children = this.transfer(o.children)
        }
        return copyObj
      })
    },
    generateList (data, dataList = []) {
      data.forEach(o => {
        dataList.push({ key: o.key, title: o.title })
        if (o.children) {
          this.generateList(o.children, dataList)
        }
      })
      return dataList
    },
    handleSelect (keys, { node }) {
      const ele = node.dataRef.origin
      if (ele.type) {
        this.$emit('on-element-select', ele)
      }
    },
    handleExpand (expandedKeys) {
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    handleSearch (e) {
      const value = e.target.value
      const expandedKeys = this.treeDataList
        .map(item => {
          if (item.title.indexOf(value) > -1) {
            return getParentKey(item.key, this.treeData)
          }
          return null
        })
        .filter((item, i, self) => item && self.indexOf(item) === i)
      Object.assign(this, {
        expandedKeys,
        searchValue: value,
        autoExpandParent: true
      })
    }
  }
}
const getParentKey = (key, tree) => {
  let parentKey
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children)
      }
    }
  }
  return parentKey
}
</script>

<style lang="less" scoped>
</style>
