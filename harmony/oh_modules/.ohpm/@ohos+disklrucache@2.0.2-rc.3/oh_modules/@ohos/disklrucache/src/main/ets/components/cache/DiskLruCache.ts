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
import { CustomMap } from './CustomMap'
import { FileUtils } from './FileUtils'
import { FileReader } from './FileReader'
import { DiskCacheEntry } from './DiskCacheEntry'
import { SparkMD5 } from '../3rd_party/spark-md5'
export class DiskLruCache {
  // 默认缓存数据最大值
  private static readonly DEFAULT_MAX_SIZE: number = 300 * 1024 * 1024

  // 默认缓存文件名
  private static readonly DEFAULT_NAME: string = 'diskLruCache'

  // 缓存journal文件名称
  private static readonly journal: string = 'journal'

  // 缓存journal备份文件名称
  private static readonly journalTemp: string = 'journal_temp'

  // 备份文件save标识符
  private static readonly SAVE: string = 'save'

  // 备份文件read标识符
  private static readonly READ: string = 'read'

  // 备份文件remove标识符
  private static readonly REMOVE: string = 'remove'

  // 缓存文件路径地址
  private path: string = ''

  // 缓存journal文件路径
  private journalPath: string = ''

  // 缓存journal备份文件路径
  private journalPathTemp: string = ''

  // 缓存数据最大值
  private maxSize: number = DiskLruCache.DEFAULT_MAX_SIZE

  // 当前缓存数据值
  private size: number = 0

  // 缓存数据集合
  private cacheMap: CustomMap<string, DiskCacheEntry> = new CustomMap<string, DiskCacheEntry>()

  private constructor(path: string, maxSize: number) {
    this.path = path
    this.maxSize = maxSize
    this.journalPath = path + DiskLruCache.journal
    this.journalPathTemp = path + DiskLruCache.journalTemp
  }

  /**
   * 打开context获取的cache路径中的缓存，如果不存在缓存，则创建新缓存
   *
   * @param context 上下文
   * @param maxSize 缓存数据最大值，默认值为300M
   */
  public static create(context, maxSize?: number): DiskLruCache {
    if (!!!context) {
      throw new Error('DiskLruCache create context is empty, checking the parameter');
    }
    if (!!!maxSize) {
      maxSize = DiskLruCache.DEFAULT_MAX_SIZE
    }
    if (maxSize <= 0) {
      throw new Error("DiskLruCache create maxSize <= 0, checking the parameter");
    }

    // 使用默认应用在内部存储上的缓存路径，作为存储地址
    let path = context.cacheDir + FileUtils.SEPARATOR + DiskLruCache.DEFAULT_NAME
    if (!FileUtils.getInstance().existFolder(path)) {
      FileUtils.getInstance().createFolder(path, true)
    }
    if (path.endsWith(FileUtils.SEPARATOR)) {
      path = path
    } else {
      path = path + FileUtils.SEPARATOR
    }
    let journalPath = path + DiskLruCache.journal
    let journalPathTemp = path + DiskLruCache.journalTemp

    // 判断日志文件是否存在，如果没有初始化创建
    if (FileUtils.getInstance().exist(journalPath)) {
      let stat = fs.statSync(journalPath)
      if (stat.size > 0) {
        FileUtils.getInstance().createFile(journalPathTemp)
        FileUtils.getInstance().copyFile(journalPath, journalPathTemp)
        let diskLruCache: DiskLruCache = new DiskLruCache(path, maxSize)
        diskLruCache.readJournal(journalPathTemp)
        diskLruCache.resetJournalFile()
        return diskLruCache
      } else {
        return new DiskLruCache(path, maxSize)
      }
    } else {
      FileUtils.getInstance().createFile(journalPath)
      return new DiskLruCache(path, maxSize)
    }
  }

  /**
   * 设置disk缓存最大数据值
   *
   * @param max 缓存数据最大值
   */
  setMaxSize(max: number) {
    if (max <= 0 || max > DiskLruCache.DEFAULT_MAX_SIZE) {
      throw new Error('setMaxSize error, checking the parameter');
    }
    this.maxSize = max
    this.trimToSize()
  }

  /**
   * 存储disk缓存数据
   *
   * @param key 键值
   * @param content 文件内容
   */
  set(key: string, content: ArrayBuffer | string) {
    if (!!!key) {
      throw new Error('key is null, checking the parameter')
    }
    let fileSize
    if (content instanceof ArrayBuffer) {
      if (content == null || content.byteLength == 0) {
        throw new Error('content is null. checking the parameter')
      }
      fileSize = content.byteLength
    } else {
      if (!!!content) {
        throw new Error('content is null, checking the parameter')
      }
      fileSize = content.length;
    }
    if (this.fileSizeMoreThenMaxSize(fileSize)) {
      throw new Error('content must be less then DiskLruCache Size, checking the parameter')
      return
    }
    key = SparkMD5.hashBinary(key)
    this.size = this.size + fileSize
    this.putCacheMap(key, fileSize)
    FileUtils.getInstance().writeData(this.journalPath, DiskLruCache.SAVE + ' ' + key + FileReader.LF)
    this.trimToSize()
    let tempPath = this.path + key
    FileUtils.getInstance().writeNewFile(tempPath, content)
  }

  /**
   * 异步存储disk缓存数据
   *
   * @param key 键值
   * @param content 文件内容
   */
  async setAsync(key: string, content: ArrayBuffer | string): Promise<void> {
    if (!!!key) {
      throw new Error('key is null, checking the parameter')
    }
    let fileSize
    if (content instanceof ArrayBuffer) {
      if (content == null || content.byteLength == 0) {
        throw new Error('content is null. checking the parameter')
      }
      fileSize = content.byteLength
    } else {
      if (!!!content) {
        throw new Error('content is null, checking the parameter')
      }
      fileSize = content.length;
    }
    if (this.fileSizeMoreThenMaxSize(fileSize)) {
      throw new Error('content must be less then DiskLruCache Size, checking the parameter')
      return
    }
    key = SparkMD5.hashBinary(key)
    this.size = this.size + fileSize
    this.putCacheMap(key, fileSize)
    await FileUtils.getInstance().writeDataAsync(this.journalPath, DiskLruCache.SAVE + ' ' + key + FileReader.LF)
    this.trimToSize()
    let tempPath = this.path + key
    await FileUtils.getInstance().writeNewFileAsync(tempPath, content)
  }

  /**
   * 获取key缓存数据
   *
   * @param key key 键值
   */
  get(key: string): ArrayBuffer {
    if (!!!key) {
      throw new Error('key is null,checking the parameter');
    }
    key = SparkMD5.hashBinary(key)
    let path = this.path + key;
    if (FileUtils.getInstance().exist(path)) {
      let ab: ArrayBuffer = FileUtils.getInstance().readFile(path)
      this.putCacheMap(key, ab.byteLength)
      FileUtils.getInstance().writeData(this.journalPath, DiskLruCache.READ + ' ' + key + FileReader.LF)
      return ab
    } else {
      return null;
    }
  }

  /**
   * 异步获取key缓存数据
   *
   * @param key 键值
   */
  async getAsync(key: string): Promise<ArrayBuffer> {
    if (!!!key) {
      throw new Error('key is null,checking the parameter');
    }
    key = SparkMD5.hashBinary(key)
    let path = this.path + key;
    if (FileUtils.getInstance().exist(path)) {
      let ab: ArrayBuffer = await FileUtils.getInstance().readFileAsync(path)
      this.putCacheMap(key, ab.byteLength)
      await FileUtils.getInstance().writeDataAsync(this.journalPath, DiskLruCache.READ + ' ' + key + FileReader.LF)
      return ab
    } else {
      return null;
    }
  }

  /**
   * 获取key缓存数据绝对路径
   *
   * @param key 键值
   */
  getFileToPath(key: string): string {
    if (!!!key) {
      throw new Error('key is null,checking the parameter');
    }
    key = SparkMD5.hashBinary(key);
    let path = this.path + key;
    if (FileUtils.getInstance().exist(path)) {
      FileUtils.getInstance().writeData(this.journalPath, DiskLruCache.READ + ' ' + key + FileReader.LF);
      return path
    } else {
      return null
    }
  }

  /**
   * 异步获取key缓存数据绝对路径
   *
   * @param key 键值
   */
  async getFileToPathAsync(key: string): Promise<string> {
    if (!!!key) {
      throw new Error('key is null,checking the parameter');
    }
    key = SparkMD5.hashBinary(key);
    let path = this.path + key;
    if (FileUtils.getInstance().exist(path)) {
      await FileUtils.getInstance().writeDataAsync(this.journalPath, DiskLruCache.READ + ' ' + key + FileReader.LF);
      return path
    } else {
      return null
    }
  }

  /**
   * 获取缓存路径
   */
  getPath(): string {
    return this.path;
  }

  /**
   * 删除key缓存数据
   *
   * @param key 键值
   */
  deleteCacheDataByKey(key: string): DiskCacheEntry {
    if (!!!key) {
      throw new Error('key is null,checking the parameter');
    }
    key = SparkMD5.hashBinary(key)
    let path = this.path + key;
    if (FileUtils.getInstance().exist(path)) {
      let ab = FileUtils.getInstance().readFile(path)
      this.size = this.size - ab.byteLength
      this.cacheMap.remove(key)
      FileUtils.getInstance().writeData(this.journalPath, DiskLruCache.REMOVE + ' ' + key + FileReader.LF)
      FileUtils.getInstance().deleteFile(path)
    }
    return this.cacheMap.get(key)
  }

  /**
   *遍历当前的磁盘缓存数据
   *
   * @param fn 遍历后方法回调
   */
  foreachDiskLruCache(fn) {
    this.cacheMap.each(fn)
  }

  /**
   * 清除所有disk缓存数据
   */
  cleanCacheData() {
    this.cacheMap.each((value, key) => {
      FileUtils.getInstance().deleteFile(this.path + key)
    })
    FileUtils.getInstance().deleteFile(this.journalPath)
    this.cacheMap.clear()
    this.size = 0
  }

  getCacheMap() {
    return this.cacheMap;
  }

  /**
   * 返回当前DiskLruCache的size大小
   */
  getSize() {
    return this.size;
  }

  /**
   * 处理journal文件数据
   *
   * @param line 日志行字符串
   */
  private dealWithJournal(line: string) {
    let filePath = ''
    try {
      let lineData = line.split(' ')
      if (lineData.length > 1) {
        if (lineData[0] != DiskLruCache.REMOVE) {
          filePath = this.path + lineData[1]
          let fileStat = fs.statSync(filePath)
          if (fileStat.isFile() && fileStat.size > 0) {
            this.size = this.size + fileStat.size
            FileUtils.getInstance().writeData(this.journalPath, line + FileReader.LF)
            this.putCacheMap(lineData[1], fileStat.size)
          }
        } else {
          if (this.cacheMap.hasKey(lineData[1])) {
            let cacheEntry: DiskCacheEntry = this.cacheMap.get(lineData[1])
            this.size = this.size - cacheEntry.getLength()
            this.cacheMap.remove(lineData[1])
          }
        }
      }
    } catch (e) {
      console.error('DiskLruCache - dealWithJournal e ' + e)
    }
  }

  /**
   * 存储disk缓存数据
   *
   * @param key key 键值
   * @param path 文件路径
   */
  private setFileByPath(key: string, path: string) {
    if (!!!key) {
      throw new Error('key is null, checking the parameter')
    }
    if (!!!path || !FileUtils.getInstance().exist(path)) {
      throw new Error('path is null or no exist file, checking the parameter')
    }
    let fileSize = FileUtils.getInstance().getFileSize(path)
    if (fileSize == -1) {
      throw new Error('path getFileSize error ')
    }
    key = SparkMD5.hashBinary(key)
    this.size = this.size + fileSize
    this.putCacheMap(key, fileSize)
    FileUtils.getInstance().writeData(this.journalPath, DiskLruCache.SAVE + ' ' + key + FileReader.LF)
    this.trimToSize()
    fileSize = FileUtils.getInstance().getFileSize(path)
    FileUtils.getInstance().copyFile(path, this.path + key)
  }

  /**
   * 异步存储disk缓存数据
   *
   * @param key key 键值
   * @param path 文件路径
   */
  private async setFileByPathAsync(key: string, path: string): Promise<void> {
    if (!!!key) {
      throw new Error('key is null, checking the parameter')
    }
    if (!!!path || !FileUtils.getInstance().exist(path)) {
      throw new Error('path is null or no exist file, checking the parameter')
    }
    let fileSize = FileUtils.getInstance().getFileSize(path)
    if (fileSize == -1) {
      throw new Error('path getFileSize error ')
    }
    key = SparkMD5.hashBinary(key)
    this.size = this.size + fileSize
    this.putCacheMap(key, fileSize)
    await FileUtils.getInstance().writeDataAsync(this.journalPath, DiskLruCache.SAVE + ' ' + key + FileReader.LF)
    this.trimToSize()
    fileSize = FileUtils.getInstance().getFileSize(path)
    await FileUtils.getInstance().copyFileAsync(path, this.path + key)
  }

  /**
   * 重置journal文件数据
   */
  private resetJournalFile() {
    FileUtils.getInstance().clearFile(this.journalPath)
    for (let key of this.cacheMap.keys()) {
      FileUtils.getInstance().writeData(this.journalPath, DiskLruCache.SAVE + ' ' + key + FileReader.LF)
    }
  }

  /**
   * 读取journal文件的缓存数据
   *
   * @param path 日志缓存文件路径地址
   */
  private readJournal(path: string) {
    let fileReader = new FileReader(path)
    let line: string = ''
    while (!fileReader.isEnd()) {
      line = fileReader.readLine()
      line = line.replace(FileReader.LF, '').replace(FileReader.CR, '')
      this.dealWithJournal(line)
    }
    fileReader.close()
    FileUtils.getInstance().deleteFile(this.journalPathTemp)
    this.trimToSize()
  }

  /**
   * 缓存数据map集合
   *
   * @param key 键值
   * @param length 缓存文件大小
   */
  private putCacheMap(key: string, length?: number) {
    if (length > 0) {
      this.cacheMap.put(key, new DiskCacheEntry(key, length))
    } else {
      this.cacheMap.put(key, new DiskCacheEntry(key))
    }
  }

  /**
   * 根据LRU算法删除多余缓存数据
   */
  private trimToSize() {
    while (this.size > this.maxSize) {
      let tempKey: string = this.cacheMap.getFirstKey()
      let fileSize = FileUtils.getInstance().getFileSize(this.path + tempKey)
      if (fileSize > 0) {
        this.size = this.size - fileSize
      }
      FileUtils.getInstance().deleteFile(this.path + tempKey)
      this.cacheMap.remove(tempKey)
      FileUtils.getInstance().writeData(this.journalPath, DiskLruCache.REMOVE + ' ' + tempKey + FileReader.LF)
    }
  }

  /**
   * 图片文件过大 直接超过DiskLruCache上限
   */
  private fileSizeMoreThenMaxSize(fileSize: number): boolean {
    if (fileSize > this.maxSize) {
      return true;
    }
    return false;
  }
}