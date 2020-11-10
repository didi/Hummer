创建一个全新应用
===

#### 安装 Hummer CLI
```
sudo npm install @didi/hummer-cli -g
```

#### 创建 Project
```
hummer create hummer-demo01
```

#### 安装 Project 依赖
```
cd hummer-demo01
sudo npm i
```
> *如果出现权限问题，请在所有命令前面加：* `sudo`  

> *如果* `sudo npm i` *遇到权限问题，请把 `node_modules` 目录用户从 `root` 改成自己的用户名：*  
`chown -R XiaoFeng node_modules/*`  
*如果还不行，尝试把 `node_modules` 整个目录提权：*  
`chmod -R 777 node_modules` 

> *如果出现 `node-sass` 安装失败，请把sass源设置为全局淘宝镜像源：*  
`npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/`

> *如果还是出现安装权限问题，请试下下面的安装方式*
`npm i -g --unsafe-perm node-sass`

#### 修改 webpack 配置（这块后续会单独抽离出去配置）
这里主要是配置 webpack 打包的源文件和编译输出文件的目录，打开 `./node_modules/@didi/hummer-cli-locale/configs/webpack.config.js`，修改其中的 `entry` 部分，如：
```js
devtool: 'cheap-module-source-map',
entry: {
    index: path.resolve(projectPath, 'src/index.js'),
    test: path.resolve(projectPath, 'src/test.ts'),
    home: path.resolve(projectPath, 'src/home.ts')
}
```
> *冒号前面的 `index` 等名称表示编译后产物的文件名，生成在dist目录下，同时也是JS页面链接的地址名称*  
> *冒号后面的 `src/index.js` 代表源文件的相对路径*

#### 运行
```
hummer run android/ios/web
```

#### 去除Native平台代码的build和install步骤（可选）
因为有时候我们只需要JS的编译产物，即js bundle文件，并不需要编译和安装原生工程和app，因为编译和安装原生工程是特别耗时的操作，可以通过下面的做法来跳过。  
打开 `/node_modules/@didi/hummer-cli-locale/lib/run/runner/base-runner.js`，修改最底下的 `run()` 方法，注释掉下面三行：
```js
// yield this.writeConfig2Native();
// yield this.buildNativePkg();
// yield this.installAndLaunchApp();
```

#### 去除打包后js文件中的__webpack_require__.p中的ip地址（可选） 
打开 `/node_modules/@didi/hummer-cli-locale/lib/run/runner/base-runner.js`，修改最底下的 `run()` 方法，注释掉下面这行：
```js
// this.webpackWebConfig.output.publicPath = `http://${this.host}:${this.port}/`;
```

#### 支持热更新功能（可选）
如果需要支持热更新功能，即改完代码立即生效的能力，需要修改以下代码：  
打开 `/node_modules/@didi/hummer-cli-locale/lib/run/runner/base-runner.js`
修改 `startServer()` 和 `watchFileChange()` 方法，参考下面的实现：
```js
startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        this.wsServer = new ws_server_1.WsServer(this.host, this.port, this.distDir);
        this.wsServer.on('connection', () => {
            // this.wsServer.send(JSON.stringify({
            //     type: 'ReloadBundle',
            //     params: `http://${this.host}:${this.port}/${this.entryFileName}?_=${new Date().getTime()}`
            // }));
        });
        this.wsServer.start();
    });
}

watchFileChange() {
    return __awaiter(this, void 0, void 0, function* () {
        const { distDir, entryFileName, host, port } = this;
        this.fsWatcher = fs.watch(distDir, { recursive: true }, (event, filename) => {
            // if (filename === entryFileName) {
                this.wsServer.send(JSON.stringify({
                    type: 'ReloadBundle',
                    params: `http://${host}:${port}/${filename}?_=${new Date().getTime()}`
                }));
            // }
        });
    });
}
```