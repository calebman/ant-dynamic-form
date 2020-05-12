/**
 * @author JianhuiChen
 * @description 提供可拖拽的组件列表信息 自动引入supports目录中定义的组件信息
 * @field basicComponents 基础组件
 * @field layoutComponents 布局组件
 */
let componentsContext = require.context('./layout', false, /.js$/)
const layoutComponents = componentsContext.keys().map(k => componentsContext(k).default)
componentsContext = require.context('./basic', false, /.js$/)
const basicComponents = componentsContext.keys().map(k => componentsContext(k).default)
export {
  basicComponents,
  layoutComponents
}
