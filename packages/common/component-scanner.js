import SupportTypes from './support-types'
import factory from './component-factory'
import { basicComponents as antdBasicComponents, layoutComponents as antdLayoutComponents } from './supports/antd'
import { basicComponents as eleBasicComponents, layoutComponents as eleLayoutComponents } from './supports/element-ui'
import { basicComponents as iviewBasicComponents, layoutComponents as iviewLayoutComponents } from './supports/iview'
class ComponentScanner {
  constructor (type) {
    this.type = type
  }
  scanComponents () {
    let basicComponents = []
    let layoutComponents = []
    switch (this.type) {
      case SupportTypes.ANTD:
        basicComponents = antdBasicComponents
        layoutComponents = antdLayoutComponents
        break
      case SupportTypes.ELEMENTUI:
        basicComponents = eleBasicComponents
        layoutComponents = eleLayoutComponents
        break
      case SupportTypes.IVIEW:
        basicComponents = iviewBasicComponents
        layoutComponents = iviewLayoutComponents
        break
      default:
        return []
    }
    factory.addRepos([
      { key: 'basic', name: '基础组件', componentDefs: basicComponents },
      { key: 'layout', name: '布局组件', componentDefs: layoutComponents }
    ])
  }
}

export default ComponentScanner
