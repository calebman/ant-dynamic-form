<p align="center"><img src="https://resources.chenjianhui.site/ant-dynamic-form-logo-color-primary.svg"/></p>
<p align="center"><strong>可拖拽式表单构建器</strong></p>

## 简介

**ant-dynamic-form**是一个基于[Ant Design Vue](https://github.com/vueComponent/ant-design-vue)为基础组件实现的动态表单构建器，它有以下可能的应用场景：

#### 场景一、CRUD操作

[CRUD](https://zh.wikipedia.org/zh/%E5%A2%9E%E5%88%AA%E6%9F%A5%E6%94%B9)是程序员们不得不承认的干的最多的一件事情，一般情况下它们由三部分代码组成

* 后端增删改查套件
* 表格与筛选组件
* 表单与详情页组件

> 这里把后端增删改查套件放到一起说是因为，其以数据表为基准的代码生成方案（Controller、Service、Dao、POJO、Swagger Docs）已经太多了，所以可以单独作为一个模块解决

[它们较为复杂的组合到一起看起来就像这样，点此查看](docs/scenes1-preview.md)

如上述的增删改查它的复杂度由以下因素构成

![](https://resources.chenjianhui.site/form-complexity.png)

1. 字段数量：涉及大量字段的数据录入场景
2. 表单排版：当字段数量较多时，如不进行合适的模块拆分整体页面效果会显得极差
3. 组件类型：每一个完整的增删改查都可能会涉及到多个前端组件，如输入框、选择框、时间日期选择器、文件上传、位置信息等等

上述的考虑就直接导致了编码的复杂度上升，利用**ant-dynamic-form**来配置化生成表单或者直接生成vue template代码都能减轻部分工作量，并且入门门槛较低，这部分工作可以给更多人做。

#### 场景二、动态数据采集系统

动态数据采集是指可变字段的数据采集，可变是指字段的数量、类型、描述信息可变，这在政府信息化项目中是较为常见的，一部分体现在项目要求某些信息采集模块不能定死就这些字段，还有一部分体现在开发过程中的需求变更上。

不管是哪种情况都很恶心人，于是碰到与业务耦合性没那么强且大部分为数据采集的模块系统时，我们会用动态去适应它们。所谓的动态就是**后端动态建表、前端动态生成表格、筛选、表单、详情页**，在这个场景下**ant-dynamic-form**可以大行其道。

![](https://resources.chenjianhui.site/dynamic-data-system.png)

#### 场景三、与甲方的沟通工具

虽然大部分甲方是不关心你的录入界面是怎么样的，只要能用就行，但是就会有抠字眼抠细节的甲方在你验收时提出一些字段命名、布局相关的问题，如果有这样的甲方可以考虑需求阶段使用此工具构建一些直观的界面，之后保留配置可直接交予开发用作构建代码的参考。

## 如何使用

```bash
# 获取依赖
yarn add ant-dynamic-form@beta -s
```

```javascript
import AntDynamicForm from '../packages'
Vue.use(AntDynamicForm)

<ant-dynamic-form style="height: 100%;"></ant-dynamic-form>
```

## 如何开发

```bash
# 获取代码
git clone https://github.com/calebman/ant-dynamic-form
cd ant-dynamic-form
# 安装依赖
yarn install
# 运行示例
yarn serve
```

## 开发计划

- [x] 主界面开发
- [x] 拖拽实现
- [x] 支持布局组件
- [x] 支持表单组件
- [x] 支持清空、预览
- [x] 支持撤销、重做
- [x] 支持大纲视图
- [ ] 接入Ant Design Vue的所有表单项组件
- [ ] 支持更多的参数配置
- [ ] 支持配置粘贴导入
- [ ] 支持配置、vue代码、html代码导出
- [ ] 支持跨组件库平台
- [ ] 支持elment-ui
- [ ] 支持iview

## 相关阅读

* [ant-dynamic-form的设计思路](docs/design.md)

## 致谢

* Ant Deisgn Vue：本仓库强依赖于[Ant Deisgn Vue](https://github.com/vueComponent/ant-design-vue)
* vue-form-marking：本仓库参考了[vue-form-marking](https://github.com/GavinZhuLei/vue-form-making)的布局与组件拖拽的实现思路
