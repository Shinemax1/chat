const path = require('path'),
    fs = require('fs'),
    webpack = require('webpack'),
    autoprefixer = require('autoprefixer'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin')
    const cssFilename = 'static/css/[name].[contenthash:8].css';
    const CleanWebpackPlugin = require('clean-webpack-plugin');
    const nodeExternals = require('webpack-node-externals');

    function getExternals() {
      return fs.readdirSync(path.resolve(__dirname, '../node_modules'))
          .filter(filename => !filename.includes('.bin'))
          .reduce((externals, filename) => {
              externals[filename] = `commonjs ${filename}`
              return externals
          }, {})
    }

serverConfig = {
  context: path.resolve(__dirname, '..'),
  entry: {server: './server/server'},
  output: {
      libraryTarget: 'commonjs2',
      path: path.resolve(__dirname, '../build/server'),
      filename: 'static/js/[name].js',
      chunkFilename: 'static/js/chunk.[name].js'
  },
  target: 'node',
  node: {
      __filename: true,
      __dirname: true,
      // module:true
  },
  module: {
      loaders: [{
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader?cacheDirectory=true',
          options: {
              presets: ['es2015', 'react-app', 'stage-0'],
              plugins: ['add-module-exports',
              [
                "import",
                {
                  "libraryName": "antd-mobile",
                  "style": "css"
                }
              ],"transform-decorators-legacy"]
          },
          // include:[path.resolve('src'),path.resolve('server')]
      },{
        test: /\.css$/,
        exclude: /node_modules|antd-mobile\.css/,            
        loader: ExtractTextPlugin.extract(
          Object.assign(
            {
              fallback: {
                loader: require.resolve('style-loader'),
                options: {
                  hmr: false,
                },
              },
              use: [
                {
                  loader: require.resolve('css-loader'),
                  options: {
                    importLoaders: 1,
                    minimize: true,
                    modules: false,
                    localIdentName:"[name]-[local]-[hash:base64:8]",
                    // sourceMap: shouldUseSourceMap,
                  },
                },
                {
                  loader: require.resolve('postcss-loader'),
                  options: {
                    // Necessary for external CSS imports to work
                    // https://github.com/facebookincubator/create-react-app/issues/2677
                    ident: 'postcss',
                    plugins: () => [
                      require('postcss-flexbugs-fixes'),
                      autoprefixer({
                        browsers: [
                          '>1%',
                          'last 4 versions',
                          'Firefox ESR',
                          'not ie < 9', // React doesn't support IE8 anyway
                        ],
                        flexbox: 'no-2009',
                      }),
                    ],
                  },
                },
              ],
            },
            // extractTextPluginOptions
          )
        ),
        // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
      },
      {
        test: /\.css$/,
        include: /node_modules|antd-mobile\.css/,
        use: ExtractTextPlugin.extract({
          fallback: require.resolve('style-loader'),
          use: [{
            loader: require.resolve('css-loader'),
            options: {
              modules:false
            },
          }]
        })
      }, {
          test: /\.(jpg|png|gif|webp)$/,
          loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
      }, {
          test: /\.json$/,
          loader: 'json-loader',
      }]
  },
  // externals: ['socket.io'],
  externals: [nodeExternals()],
  resolve: {extensions: ['*', '.js', '.json', '.scss']},
  plugins: [
      new CleanWebpackPlugin(['../build/server']),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        minChunks(module) {
          return /node_modules/.test(module.context);
        },
        children: true,
        async: false,
      }),
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'vendor',
      //   minChunks(module) {
      //     console.log(module+'1111')          
      //     return /node_modules/.test(module.context);
      //   },
      // }),
      new webpack.optimize.CommonsChunkPlugin({
        children:true,
        async: 'shine',
        minChunks:2
      }),
      // new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      // new webpack.optimize.UglifyJsPlugin({
      //   compress: {
      //     warnings: false,
      //     // Disabled because of an issue with Uglify breaking seemingly valid code:
      //     // https://github.com/facebookincubator/create-react-app/issues/2376
      //     // Pending further investigation:
      //     // https://github.com/mishoo/UglifyJS2/issues/2011
      //     comparisons: false,
      //   },
      //   mangle: {
      //     safari10: true,
      //   },
      //   output: {
      //     comments: false,
      //     // Turned on because emoji and regex is not minified properly using default
      //     // https://github.com/facebookincubator/create-react-app/issues/2488
      //     ascii_only: true,
      //   },
      //   sourceMap: false,
      // }),
      new ExtractTextPlugin({
        filename: cssFilename,
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      // new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)})
  ],
//   //watch模式，不用每次都build
//   watchOptions: {
//       //检测修改的时间，以毫秒为单位
//       poll: 1000,
//       //防止重复保存而发生重复编译错误。这里设置的500是半秒内重复保存，不进行打包操作
//       aggregateTimeout: 500,
//       //不监听的目录
//       ignored: /node_modules/
//  }
}

module.exports =  serverConfig