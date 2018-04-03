const path = require('path');
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const isDev = process.env.NODE_ENV === 'development'

const config = {
  entry: path.join(__dirname, 'src/index.js'), // 入口
  output: { // 出口
    filename: 'boundle.js',
    path: path.join(__dirname, 'dist')
  },
  // 配置
  module: {
    // 检测文件类型
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader'
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    }, {
      test: /\.(gif|jpg|jpeg|png|svg)$/,
      // 这么写可以配置loader的操作方式
      use: [{
        loader: 'url-loader',
        options: {
          // 图片大小小于1024k，则把图片转化成base64码写入代码中
          limit: 1024,
          // 指定输出文件的名称
          name: '[name]-aaa.[ext]'
        }
      }]
    }, {
      test: /\.styl$/,
      use: [
        'style-loader',
        'css-loader',
        'stylus-loader'
      ]
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new HTMLPlugin()
  ]
}

if (isDev) {
  config.devServer = {
    port: 8080,
    // 在别人的电脑上也可以访问这台电脑，手机连接电脑访问
    host: '0.0.0.0',
    // 错误显示到网页上
    overlay: {
      errors: true
    },
    hot: true
  }
  config.devtool = '#cheap-module-eval-source-map'
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
}

module.exports = config