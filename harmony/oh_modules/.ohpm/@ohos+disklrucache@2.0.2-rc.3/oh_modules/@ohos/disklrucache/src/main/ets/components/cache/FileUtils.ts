/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import fs from '@ohos.file.fs';
import { BusinessError } from '@ohos.base';

export class FileUtils {
  static readonly SEPARATOR: string = '/'
  private static sInstance: FileUtils
  base64Str: string = ''

  private constructor() {
  }

  /**
   * 单例实现FileUtils类
   */
  public static getInstance(): FileUtils {
    if (!this.sInstance) {
      this.sInstance = new FileUtils();
    }
    return this.sInstance;
  }

  /**
   * 新建文件
   *
   * @param path 文件绝对路径及文件名
   * @return number 文件句柄id
   */
  createFile(path: string): number {
    let num = -1;
    try {
      num = fs.openSync(path, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE).fd
    } catch (e) {
      console.log("createFile err :" + e)
    }
    return num;
  }

  /**
   * 删除文件
   *
   * @param path 文件绝对路径及文件名
   */
  deleteFile(path: string): void {
    try {
      let fileExist = fs.accessSync(path);
      if (fileExist) {
        fs.unlinkSync(path);
      }
    } catch (err) {
      console.log("FileUtils deleteFile Method has error, err msg=" + err.message + " err code=" + err.code);
    }
  }

  /**
   * 拷贝文件
   *
   * @param src 文件绝对路径及文件名
   * @param dest 拷贝到对应的路径
   */
  copyFile(src: string, dest: string) {
    fs.copyFileSync(src, dest);
  }

  /**
   * 异步拷贝文件
   *
   * @param src 文件绝对路径及文件名
   * @param dest 拷贝到对应的路径
   */
  async copyFileAsync(src: string, dest: string): Promise<void> {
    await fs.copyFile(src, dest);
  }

  /**
   * 清空已有文件数据
   *
   * @param path 文件绝对路径
   */
  clearFile(path: string): number {
    return fs.openSync(path, fs.OpenMode.TRUNC).fd
  }

  /**
   * 向path写入数据
   *
   * @param path 文件绝对路径
   * @param content 文件内容
   */
  writeData(path: string, content: ArrayBuffer | string) {
    let fd = fs.openSync(path, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE).fd
    let stat = fs.statSync(path)
    fs.writeSync(fd, content, { offset: stat.size })
    fs.closeSync(fd)
  }

  /**
   * 异步向path写入数据
   *
   * @param path 文件绝对路径
   * @param content 文件内容
   */
  async writeDataAsync(path: string, content: ArrayBuffer | string): Promise<void> {
    let fd = (await fs.open(path, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE)).fd
    let stat = await fs.stat(path)
    await fs.write(fd, content, { offset: stat.size })
    await fs.close(fd)
  }

  /**
   * 判断path文件是否存在
   *
   * @param path 文件绝对路径
   */
  exist(path: string): boolean {
    try {
      if (fs.accessSync(path)) {
        let stat = fs.statSync(path)
        return stat.isFile()
      } else {
        return false
      }
    } catch (error) {
      let err: BusinessError = error as BusinessError;
      console.error("accessSync failed with error message: " + err.message + ", error code: " + err.code);
    }

  }

  /**
   * 向path写入数据
   *
   * @param path 文件绝对路径
   * @param data 文件内容
   */
  writeNewFile(path: string, data: ArrayBuffer | string) {
    this.createFile(path)
    this.writeFile(path, data)
  }

  /**
   * 向path写入数据
   *
   * @param path 文件绝对路径
   * @param data 文件内容
   */
  async writeNewFileAsync(path: string, data: ArrayBuffer | string): Promise<void> {
    let fd = (await fs.open(path, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE)).fd
    await fs.truncate(fd)
    await fs.write(fd, data)
    await fs.fsync(fd)
    await fs.close(fd)
  }

  /**
   * 获取path的文件大小
   *
   * @param path 文件绝对路径
   */
  getFileSize(path: string): number {
    try {
      let stat = fs.statSync(path)
      return stat.size
    } catch (e) {
      console.error("FileUtils getFileSize e " + e)
      return -1
    }
  }

  /**
   * 读取路径path的文件
   *
   * @param path 文件绝对路径
   */
  readFile(path: string): ArrayBuffer {
    let fd = fs.openSync(path, fs.OpenMode.READ_WRITE).fd;
    let length = fs.statSync(path).size
    let buf = new ArrayBuffer(length);
    fs.readSync(fd, buf)
    return buf
  }

  /**
   * 读取路径path的文件
   *
   * @param path 文件绝对路径
   */
  async readFileAsync(path: string): Promise<ArrayBuffer> {
    let stat = await fs.stat(path);
    let fd = (await fs.open(path, fs.OpenMode.READ_WRITE)).fd;
    let length = stat.size;
    let buf = new ArrayBuffer(length);
    await fs.read(fd, buf);
    return buf
  }

  /**
   * 创建文件夹
   *
   * @param path 文件夹绝对路径，只有是权限范围内的路径，可以生成
   * @param recursive
   */
  createFolder(path: string, recursive?: boolean) {
    try {
      if (recursive) {
        if (!this.existFolder(path)) {
          let lastInterval = path.lastIndexOf(FileUtils.SEPARATOR)
          if (lastInterval == 0) {
            return
          }
          let newPath = path.substring(0, lastInterval)
          this.createFolder(newPath, true)
          if (!this.existFolder(path)) {
            fs.mkdirSync(path)
          }
        }
      } else {
        if (!this.existFolder(path)) {
          fs.mkdirSync(path)
        }
      }
    } catch (e) {
      console.log("createFolder err : " + e)
    }

  }

  /**
   * 判断文件夹是否存在
   *
   * @param path 文件夹绝对路径
   */
  existFolder(path: string): boolean {
    try {
      if (fs.accessSync(path)) {
        let stat = fs.statSync(path)
        return stat.isDirectory()
      } else {
        return false
      }
    }
    catch (error) {
      let err: BusinessError = error as BusinessError;
      console.error("accessSync failed with error message: " + err.message + ", error code: " + err.code);
    }
  }

  private writeFile(path: string, content: ArrayBuffer | string) {
    let fd = fs.openSync(path, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE).fd
    fs.truncateSync(fd)
    fs.writeSync(fd, content)
    fs.fsync(fd).then(() => {
      fs.close(fd).then(() => {
      }).catch((err: BusinessError) => {
        console.error("close file failed with error message: " + err.message + ", error code: " + err.code);
      })
    })
  }
}