const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const fs = require('fs').promises;
const fsNormal = require('fs');
const path = require('path');
const archiver = require('archiver');

async function moveDir(src, dest) {
  try {
    await fs.mkdir(dest, { recursive: true });
    const entries = await fs.readdir(src, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        await moveDir(srcPath, destPath);
      } else {
        await fs.rename(srcPath, destPath);
      }
    }

    await fs.rm(src, { recursive: true });
  } catch (err) {
    console.error(`移动目录时出错: ${err}`);
  }
}

async function deleteHmConfig(workDir) {
  const filePath = path.join(workDir, 'hm.config.js');
  try {
    await fs.access(filePath);
    await fs.unlink(filePath);
  } catch (err) {
    console.error(`删除文件 hm.config.js 时出错: ${err}`);
  }
}

async function runExec(workDir, file, configFiles) {
  const args = process.argv.slice(2);
  const command = `hummer ${args[0]}`;

  if (args[0] === 'build') {
    return new Promise((resolve, reject) => {
      exec(command, { cwd: workDir }, async (error) => {
        if (error) {
          console.error(`执行出错: ${error}`);
          return reject(error);
        }

        await deleteHmConfig(workDir);
        const srcDir = path.join(workDir, 'dist');
        const destDir = path.join(workDir, 'output', removeNameFromString(file, '.config.js'), 'dist');
        await moveDir(srcDir, destDir);
        resolve();
      });
    });
  } else {
    // return new Promise(async  (resolve, reject) => {
    //     if (configFiles.indexOf(file) === configFiles.length - 1) {
    //       const configContent = await fs.readFile(path.join(workDir, 'hm.config.js'), 'utf8');
    //       const updatedContent = configContent.replace(/(enableServer:\s*)false/, '$1true');
    //       await fs.writeFile(path.join(workDir, 'hm.config.js'), updatedContent, 'utf8');
    //     }
    //     exec(command, { cwd: workDir }, async (error) => {
    //       if (error) {
    //         console.error(`执行出错: ${error}`);
    //         return reject(error);
    //       }
    //       await deleteHmConfig(workDir);
    //       resolve();
    //     });
    // })
    // todo 临时解决方案，等恩泽把cli运行hummer dev增加回调后，注释当前代码并取消注释上方代码即可
    return new Promise(async (resolve, reject) => {
      // 如果是最后一次运行，打开运行窗口
      let targetDir =  workDir + '/hm.config.js'
      let currIndex = configFiles.indexOf(file)
      if(currIndex === configFiles.length -1 ){
        // 修改hm.config.js配置文件
        const configContent = await fs.readFile(targetDir, 'utf8')
        // 使用正则表达式修改 enableServer 属性为 true
        const updatedData = configContent.replace(/(enableServer:\s*)false/, '$1true');
        await fs.writeFile(targetDir, updatedData, 'utf8')
      }
      exec(command, workDir)
      // 延迟执行下一次hummer dev， 否则dist产物有问题
      setTimeout(async ()=>{
        await deleteHmConfig(workDir)
        resolve()
      }, 8000)
      // await deleteHmConfig(workDir)
    })
  }
}


async function clearDistDir(workDir, clearDir) {
  const distPath = path.resolve(workDir, clearDir);
  try {
    const files = await fs.readdir(distPath);
    await Promise.all(files.map(async (file) => {
      const curPath = path.join(distPath, file);
      const stats = await fs.lstat(curPath);

      if (stats.isDirectory()) {
        await fs.rm(curPath, { recursive: true });
      } else {
        await fs.unlink(curPath);
      }
    }));
  } catch (err) {
    if (err.code === 'ENOENT') {
    } else {
      throw err;
    }
  }
}

function removeNameFromString(inputString, nameToRemove) {
  return inputString.replace(new RegExp(nameToRemove, 'g'), '');
}

async function generateHummerConfig(configFilePath, file, rootDir) {
  const configContent = await fs.readFile(configFilePath, 'utf8');
  const targetConfigPath = path.resolve(rootDir, 'hm.config.js');
  const distDir = path.join(rootDir, 'output', removeNameFromString(file, '.config.js'));
  const targetConfigPath2 = path.resolve(distDir, 'hm.config.js');

  await fs.mkdir(path.dirname(targetConfigPath), { recursive: true });
  await fs.writeFile(targetConfigPath, configContent, 'utf8');

  if (process.argv.slice(2)[0] !== 'dev') {
    await fs.mkdir(path.dirname(targetConfigPath2), { recursive: true });
    await fs.writeFile(targetConfigPath2, configContent, 'utf8');
  }
}

async function zipDirectories(sourceDirs, outPath) {
  return new Promise((resolve, reject) => {
    const output = fsNormal.createWriteStream(outPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      console.log(`压缩文件已生成: ${archive.pointer()} total bytes`);
      resolve();
    });

    archive.on('error', (err) => reject(err));
    archive.on('progress', (progress) => {
      console.log(`压缩进度: ${(progress.entries.processed / progress.entries.total * 100).toFixed(2)} %`);
    });

    archive.pipe(output);
    sourceDirs.forEach(dir => archive.directory(dir, path.basename(dir)));
    archive.finalize();
  });
}

(async () => {
  try {
    const rootDir = process.cwd();
    await clearDistDir(rootDir, 'dist');
    await clearDistDir(rootDir, 'output');

    const files = await fs.readdir(rootDir);
    // 此处正则可根据实际情况修改
    let reg =  /hummer.*\.config\.js$/
    const configFiles = files.filter(file => reg.test(file));
    const args = process.argv.slice(2);

    console.log("待构建文件列表：", configFiles);

    for (let i = 0; i < configFiles.length; i++) {
      const file = configFiles[i];
      const configFilePath = path.resolve(rootDir, file);

      await generateHummerConfig(configFilePath, file, rootDir);
      await runExec(rootDir, file, configFiles);

      console.log(`hummer构建进度：${((i + 1) / configFiles.length * 100).toFixed(2)} %`);
    }

    if (args[0] === 'dev') return;

    console.log("构建完成，准备压缩文件");
    const outputZip = path.join(rootDir, 'output', 'outputFiles.zip');
    const distDirs = configFiles.map(file => path.join(rootDir, 'output', removeNameFromString(file, '.config.js'), 'dist'));

    await zipDirectories(distDirs, outputZip);
  } catch (err) {
    console.error(`执行出错: ${err}`);
  }
})();