import test from 'ava'
import webpack from 'webpack'
import path from 'path'
import os from 'os'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import HtmlMinifierWebpackPlugin from '../index'

const tmp = os.tmpdir()

test.cb('it minifies html files', t => {
  webpack({
    entry: path.join(__dirname, '../fixture/entry.js'),
    output: {
      filename: 'index.js',
      path: path.join(tmp, 't1')
    },
    plugins: [
      new HtmlWebpackPlugin(),
      new HtmlMinifierWebpackPlugin({
        collapseWhitespace: true
      })
    ]
  }, (err, stats) => {
    if (err) { t.end(err) }
    let html = stats.compilation.assets['index.html']
    t.truthy(html.source().indexOf('\n') === -1)
    t.end()
  })
})
