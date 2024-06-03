const fs = require('fs');
const path = require('path');
// 获取传入的参数
const args = process.argv.slice(2);
const configType = args[0] === 'hummer2' ? 'hummer2' : 'hummer';

const workDir = process.cwd();
// 根据参数选择配置文件

const configFileName = configType === 'hummer2' ? 'hummer2.config.js' : 'hummer.config.js';
const configFilePath = path.resolve(workDir, configFileName);
const targetConfigPath = path.resolve(workDir, 'hm.config.js');


// 读取选择的配置文件内容
const configContent = fs.readFileSync(configFilePath, 'utf8');


// 写入到目标配置文件
fs.writeFileSync(targetConfigPath, configContent, 'utf8');

// 清空 dist 目录
const distPath = path.resolve(workDir, 'dist');
if (fs.existsSync(distPath)) {
  fs.readdirSync(distPath).forEach((file) => {
    const curPath = path.join(distPath, file);
    if (fs.lstatSync(curPath).isDirectory()) {
      fs.rmdirSync(curPath, { recursive: true });
    } else {
      fs.unlinkSync(curPath);
    }
  });
  console.log('Dist directory cleaned');
} else {
  fs.mkdirSync(distPath);
  console.log('Dist directory created');
}