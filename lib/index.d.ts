import { Plugin } from 'webpack'

export = HTMLMinifierPlugin;

declare class HTMLMinifierPlugin extends Plugin {
  constructor (minifierOptions?: object, options?: HTMLMinifierPlugin.Options);
}

declare namespace HTMLMinifierPlugin {
  interface Options {
    verbose?: boolean
  }
}
