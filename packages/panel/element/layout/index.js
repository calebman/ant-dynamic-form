import GridLayout from './GridLayout'
import TabsLayout from './TabsLayout'
import CollapseLayout from './CollapseLayout'
import StepsLayout from './StepsLayout'

export default {
  functional: true,
  render (createElement, ctx) {
    const layoutComponent = ctx.props.element.component
    switch (layoutComponent) {
      case 'ARow':
        return createElement(GridLayout, ctx)
      case 'ATabs':
        return createElement(TabsLayout, ctx)
      case 'ACollapse':
        return createElement(CollapseLayout, ctx)
      case 'ASteps':
        return createElement(StepsLayout, ctx)
    }
  }
}
