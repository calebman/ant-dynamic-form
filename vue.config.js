const path = require('path')
const webpack = require('webpack')
const isProd = process.env.NODE_ENV === 'production'
const assetsCDN = {
  // webpack build externals
  externals: {
    vue: 'Vue',
    'ant-design-vue': 'antd',
    moment: 'moment',
    vuescroll: 'vuescroll',
    Sortable: 'Sortable',
    vuedraggable: 'vuedraggable',
    'vue-draggable-resizable': 'VueDraggableResizable'
  },
  css: [
    '//cdn.jsdelivr.net/npm/ant-design-vue@1.5.3/dist/antd.min.css'
  ],
  js: [
    '//cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
    '//cdn.jsdelivr.net/npm/ant-design-vue@1.5.3/dist/antd.min.js',
    '//cdn.jsdelivr.net/npm/moment@2.24.0/moment.min.js',
    '//cdn.jsdelivr.net/npm/moment@2.24.0/locale/zh-cn.js',
    '//cdn.jsdelivr.net/npm/vuescroll@4.15.0/dist/vuescroll.min.js',
    '//cdn.jsdelivr.net/npm/sortablejs@1.10.2/Sortable.min.js',
    '//cdn.jsdelivr.net/npm/vuedraggable@2.23.2/dist/vuedraggable.umd.min.js',
    '//cdn.jsdelivr.net/npm/vue-draggable-resizable@2.1.2/dist/VueDraggableResizable.umd.min.js'
  ]
}
module.exports = {
  publicPath: isProd ? '/ant-dynamic-form/' : '/',
  // 修改 pages 入口
  pages: {
    index: {
      entry: 'examples/main.js', // 入口
      template: 'public/index.html', // 模板
      filename: 'index.html' // 输出文件
    }
  },
  configureWebpack: {
    // webpack plugins
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
    // if prod, add externals
    externals: isProd ? assetsCDN.externals : {}
  },
  // 扩展 webpack 配置
  chainWebpack: config => {
    // @ 默认指向 src 目录，这里要改成 examples
    // 另外也可以新增一个 ~ 指向 packages
    config.resolve.alias
      .set('@', path.resolve('examples'))
      .set('~', path.resolve('packages'))

    // 把 packages 和 examples 加入编译，因为新增的文件默认是不被 webpack 处理的
    config.module
      .rule('js')
      .include.add(/packages/).end()
      .include.add(/examples/).end()
      .use('babel')
      .loader('babel-loader')

    // if prod is on
    // assets require on cdn
    if (isProd) {
      config.plugin('html-index').tap(args => {
        args[0].cdn = assetsCDN
        return args
      })
    }
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // less vars，customize ant design theme

          // 'primary-color': '#F5222D',
          // 'link-color': '#F5222D',
          'border-radius-base': '2px'
        },
        // DO NOT REMOVE THIS LINE
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    // development server port 7000
    port: 7000
  },
  productionSourceMap: false
}
