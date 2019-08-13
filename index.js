const sources = require('webpack-sources')
const minifier = require('html-minifier').minify

module.exports = function (options = {}, pluginOptions = {}) {
  this.apply = function (compiler) {
    compiler.hooks.emit.tap('HTMLMinifierPlugin', function (compilation) {
      if (pluginOptions.verbose) {
        console.log('Starting to optimize HTML...')
      }

      const assets = compilation.assets

      for (let name of Object.getOwnPropertyNames(assets)) {
        if (!name.match(/\.html$/)) {
          continue
        }

        if (pluginOptions.verbose) {
          console.log('Processing ' + name + '...')
        }

        let asset = assets[name]
        let source = asset.source().toString()
        let result = minifier(source, options)
        assets[name] = new sources.RawSource(result)
        if (pluginOptions.verbose) {
          console.log('Processed ' + name +
            ', before: ' + source.length +
            ', after: ' + result.length +
            ', ratio: ' + Math.round(((result.length * 100) / source.length) * 100) / 100 + '%')
        }
      }
    })
  }
}
