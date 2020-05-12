# ant-dynamic-form的设计思路

## 结构设计

表单构建器的整体由**工具栏、操作面板、组件库与组件配置页**四项组成，具体的组合方式见下图

![](https://resources.chenjianhui.site/form-design-structure.png)

## 组件库

组件库提供了构建界面的所有元素，分为以下几种类型

1. 基础组件：输入框、选择器、单选多选、文件上传等
2. 布局组件：卡片、栅格、标签页、列表等
3. 自定义扩展：提供给用户基于基础、布局组件的可拓展的接口

![](https://resources.chenjianhui.site/design-component-lib.png)

### 组件配置树设计

### 可拓展式设计

#### ComponentFactory 组件工厂

组件工厂负责装载所有可用的组件信息

#### ComponentScanner 组件扫描器

组件扫描器负责根据用户配置，扫描与注册系统组件列表

#### ComponentRegistrar 组件注册器

组件注册器负责将组件信息注册到工厂中，并面向用户提供了注册函数，用户需要提供符合规则的组件配置

![](https://resources.chenjianhui.site/design-component-factory.png)

## 操作面板

操作面板负责展示表单的构成并提供拖拽换位操作

#### EditorPanel 面板对象

#### NestedElement 节点对象

## 组件配置页

## 工具栏

工具栏负责将全局操作提供给用户，例如撤销/重做、预览、导出（Html、Vue、Json）、导入等功能