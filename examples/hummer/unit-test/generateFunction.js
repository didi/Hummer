const fs = require('fs');
const path = require('path');

class WrapFunctionPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('WrapFunctionPlugin', (compilation, callback) => {
      const wrapFunction = this.options.wrapFunction || 'renderFunc';
      
      // 获取所有输出的文件名
      const outputNames = Object.keys(compilation.assets);

      outputNames.forEach(outputName => {
        const asset = compilation.assets[outputName];
        let wrappedContent = `export function ${wrapFunction}(__Hummer__, __GLOBAL__) {\n`;
        wrappedContent += asset.source();
        wrappedContent += '\n}\n';

        // 重新设置输出文件的内容
        compilation.assets[outputName] = {
          source: function() {
            return wrappedContent;
          },
          size: function() {
            return wrappedContent.length;
          }
        };
      });

      callback();
    });
  }
}

module.exports = WrapFunctionPlugin;
