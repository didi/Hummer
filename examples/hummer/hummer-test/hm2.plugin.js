class Hummer2DistFilePlugin {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
      compiler.hooks.emit.tapAsync('Hummer2DistFilePlugin', (compilation, callback) => {
        const hummer2 = this.options.hummer2 || false;
        if(hummer2){
            Object.keys(compilation.assets).forEach((filename) => {
                if (filename.endsWith('.js')) {
                    const newFilename = filename.replace(/.js$/, '.v2.js');
                    compilation.assets[newFilename] = compilation.assets[filename];
                    delete compilation.assets[filename];
                }
            });
        }
        callback();
      });
    }
  }
  
  module.exports = Hummer2DistFilePlugin;