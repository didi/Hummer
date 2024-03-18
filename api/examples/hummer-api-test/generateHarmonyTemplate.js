const fs = require('fs');
const path = require('path');

class HarmonyTemplatePlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('WrapFunctionPlugin', (compilation, callback) => {
      const outputDir = this.options.outputDir || './template';
      const hummerApiDir = this.options.hummerApiDir || './dist';
      // 获取所有输出的文件名
      const outputNames = Object.keys(compilation.assets);
      outputNames.forEach(outputName => {
       // 产生template模版
       if(!outputName.match( /\.map\b/)) return 

       const templateContent =  `import { IPageData } from '../../Hummer/Components/Module/Navigator';
        import HMEntrance, { HMEntranceController } from '../../Hummer/HMEntrance'
        import {HarmonyRuntimeContentProvider} from '../../Hummer/ContentProvider'
        import { renderFunc } from '`  + hummerApiDir + '/' +outputName + `'
        
        @Entry
        @Component
        export struct Template {
        
          public pageData?:IPageData;
          private entranceController: HMEntranceController = new HMEntranceController();
          aboutToAppear(): void {
          }
        
          aboutToDisappear(): void {
        
          }
          onBackPress(): boolean | void {
            return this.entranceController.onBackPress();
          }
          build() {
            NavDestination() {
              HMEntrance({controller:this.entranceController, pageData:this.pageData, contentProvider:new HarmonyRuntimeContentProvider(renderFunc)})
                .backgroundColor(Color.Red)
                .width('100%')
                .height('100%')
            }
            .onBackPressed(() => {
              if(this.onBackPress()){
                return true;
              }
              return false;
            })
          }
        }`
        const filePath = path.join(__dirname, outputDir, outputName + `.ets`);
        const folderPath = path.join(__dirname, outputDir);
        if (!fs.existsSync(folderPath)) {
          fs.mkdirSync(folderPath, { recursive: true });
        }
        // 生成ets文件
        fs.writeFile(filePath, templateContent, (err) => {
          if (err) {
              console.error('写入文件时出错：', err);
          } else {
              console.log('文件生成成功');
          }
        });
      
      });

      callback();
    });
  }
}

module.exports = HarmonyTemplatePlugin;
