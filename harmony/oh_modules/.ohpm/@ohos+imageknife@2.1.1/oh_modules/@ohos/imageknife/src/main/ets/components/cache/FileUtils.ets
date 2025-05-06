/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
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
import { BusinessError } from '@ohos.base'
export class FileUtils {
  base64Str: string = ''
  private static sInstance: FileUtils;

  public static getInstance(): FileUtils {
    if (!FileUtils.sInstance) {
      FileUtils.sInstance = new FileUtils();
    }
    return FileUtils.sInstance;
  }

  private constructor() {
    console.log("FileUtils - FileUtils constructor")
  }

  /**
   * 新建文件
   * @param path 文件绝对路径及文件名
   * @return number 文件句柄id
   */
  createFile(path: string): number {
    return fs.openSync(path, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE).fd
  }

  /**
   * 删除文件
   * @param path 文件绝对路径及文件名
   */
  deleteFile(path: string): void {
    try {
      let fileExist = fs.accessSync(path);
      if (fileExist) {
        fs.unlinkSync(path);
      }
    } catch (err) {
      console.log("FileUtils deleteFile Method has error, err msg=" + (err as BusinessError).message + " err code=" + (err as BusinessError).code);
    }
  }
  /**
   * 异步删除文件
   * @param path 文件绝对路径及文件名
   */
  deleteFileAsync(path: string): Promise<void> {
    return new Promise((resolve,reject)=>{
      fs.access(path).then(fileExist =>{
        if (fileExist) {
          fs.unlink(path).then(()=>{
            resolve();
          }).catch( (err:BusinessError)=>{
            reject(err)
          })
        }
      }).catch((err:BusinessError)=>{
        reject(err);
      })
    })
  }



  /**
   * 同步删除文件目录 必须保证文件夹里面没有文件
   * @param path 待删除目录的绝对路径
   */
  deleteFolderSync(path: string): void {
    if (this.existFolder(path)) {
      fs.rmdirSync(path);
    }
  }

  /**
   * 异步删除文件目录  必须保证文件夹里面没有文件
   * @param path 待删除目录的绝对路径
   */
  deleteFolderAsync(path: string, deleteComplete:(value: void) => void | PromiseLike<void>, deleteError:(reason: Object) => PromiseLike<never>) {
    if (this.existFolder(path)) {
      fs.rmdir(path)
        .then(deleteComplete).catch(deleteError);
    }
  }

  /**
   * 拷贝文件
   * @param path 文件绝对路径及文件名
   */
  copyFile(oriPath: string, newPath: string) {
    fs.copyFileSync(oriPath, newPath);
  }

  /**
   * 清空已有文件数据
   */
  clearFile(path: string): number {
    return fs.openSync(path, fs.OpenMode.TRUNC).fd
  }

  /**
   * 向path写入content数据，覆盖旧数据
   */
  writeFile(path: string, content: ArrayBuffer | string) {
    try {
      let fd = fs.openSync(path, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE).fd
      fs.truncateSync(fd)
      fs.writeSync(fd, content)
      fs.fsyncSync(fd)
      fs.closeSync(fd)
    } catch (e) {
      console.log("FileUtils - Failed to writeFile for " + e)
    }
  }

  /**
   * 向path写入数据
   */
  writeData(path: string, content: ArrayBuffer | string) {
    try {
      let fd = fs.openSync(path, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE).fd
      let stat = fs.statSync(path)
      console.info("FileUtils - writeData size = " + stat.size + " path=" + path);
      fs.writeSync(fd, content, { offset: stat.size })
      fs.closeSync(fd)
    } catch (e) {
      console.log("FileUtils - Failed to writeData for " + e)
    }
  }

  /**
   * 判断path文件是否存在
   */
  exist(path: string): boolean {
    try {
      let stat = fs.statSync(path)
      return stat.isFile()
    } catch (e) {
      console.debug("FileUtils - fileutils exsit e" + e)
      console.log("path=>" + path)
      return false
    }
  }

  /**
   * 向path写入数据
   */
  writePic(path: string, picData: ArrayBuffer) {
    console.info("FileUtils - writepic 1")
    this.createFile(path)
    this.writeFile(path, picData)
    console.info("FileUtils - writepic 3")
  }

  /**
   * 获取path的文件大小
   */
  getFileSize(path: string): number {
    try {
      let stat = fs.statSync(path)
      return stat.size
    } catch (e) {
      console.error("FileUtils - FileUtils getFileSize e " + e)
      return -1
    }
  }

  /**
   * 同步读取路径path的文件
   */
  readFilePic(path: string): ArrayBuffer {
    try {
      let stat = fs.statSync(path)
      let fd = fs.openSync(path, fs.OpenMode.READ_ONLY).fd;
      let length = stat.size
      let buf = new ArrayBuffer(length);
      fs.readSync(fd, buf)
      fs.closeSync(fd)
      return buf
    } catch (e) {
      console.log("FileUtils - readFilePicSync " + e)
      return new ArrayBuffer(0)
    }
  }
  /**
   * 异步读取路径path的文件
   */
  readFilePicAsync(path: string): Promise<ArrayBuffer> {
    return new Promise((resolve,reject)=>{
      fs.open(path, fs.OpenMode.READ_ONLY).then((file) => {
        let stat = fs.statSync(path)
        let fd = file.fd;
        let length = stat.size;
        let buf = new ArrayBuffer(length);
        fs.read(fd,buf).then((readLen)=>{
          // 关闭文件
          fs.closeSync(file);
          resolve(buf);
        }).catch((err:BusinessError)=>{
          reject(err);
        })
      }).catch((err:BusinessError)=>{
        reject(err);
      })


    })

  }




  /**
   * stream式读取
   */
  readStream(path: string): string {
    try {
      let stat = fs.statSync(path)
      let length = stat.size
      let buf = new ArrayBuffer(length);
      let ss = fs.createStreamSync(path, "r+");
      ss.readSync(buf)
      ss.closeSync();
      let u8:Uint8Array = new Uint8Array(buf);
      let array:Array<number> = Array.from(u8)
      return String.fromCharCode(...array)
    } catch (e) {
      console.log("FileUtils - readFilePic " + e)
      return ""
    }
  }

  /**
   * stream式写入
   */
  writeStream(path: string, tempArray: ArrayBuffer) {
    try {
      console.error("FileUtils - writeStream =1 ")
      this.createFile(path)
      console.error("FileUtils - writeStream 2 ")
      let ss = fs.createStreamSync(path, "r+");
      console.error("FileUtils - writeStream 3 " + tempArray.byteLength)
      let num = ss.writeSync(tempArray, {
        encoding: 'utf-8'
      });
      console.error("FileUtils - write num = " + num)
      ss.flushSync();
      ss.closeSync();
    } catch (e) {
      console.log("FileUtils - Failed to writeStream for " + e)
    }
  }

  /**
   * 创建文件夹
   * @param 文件夹绝对路径
   */
  createFolder(path: string) {
    // 创建文件夹
    if (!this.existFolder(path)) {
      fs.mkdirSync(path)
    }
  }

  /**
   * 判断文件夹是否存在
   * @param 文件夹绝对路径
   */
  existFolder(path: string): boolean {
    try {
      let stat = fs.statSync(path)
      return stat.isDirectory()
    } catch (e) {
      console.debug("fileutils folder exsit error=" + e)
      return false
    }
  }

  /**
   * 如果文件夹不存在则创建一个文件夹 然后在其中创建文件 并且将数据写入进文件
   * @param folder 文件夹绝对路径
   * @param file 文件绝对路径
   * @param content 文件内容数据
   */
  createFileProcess(folder: string, file: string, content: ArrayBuffer | string) {
    // 创建文件夹
    this.createFolder(folder);
    // 创建文件
    this.createFile(file);
    // 写入数据
    this.writeFile(file, content)
  }

  /**
   * string 转 Uint8Array
   * @param str 输入String
   */
  stringToUint8Array(str:string): Uint8Array {
    let arr:Array<number> = new Array<number>();
    for (let i = 0, j = str.length; i < j; ++i) {
      arr.push(str.charCodeAt(i));
    }
    let tmpUint8Array = new Uint8Array(arr);
    return tmpUint8Array
  }



  uint8ArrayToBuffer(array: Uint8Array): ArrayBuffer {
    return array.buffer.slice(array.byteOffset, array.byteLength + array.byteOffset)
  }
}
