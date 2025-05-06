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

export class FileReader {
    // 换行符
    static readonly LF: string = '\n'

    // CR符
    static readonly CR: string = '\r'


    // 文件大小
    fileLength: number = 0

    // 读取的长度
    length: number = 0

    // 读写stream
    stream: any = null

    // 缓存buf
    buf: ArrayBuffer = new ArrayBuffer(1)

    /**
     * 读取文件行
     *
     * @param path 文件路径
     */
    constructor(path: string) {
        if (!!!path) {
            throw new Error('FileReader constructor path is null, checking the parameter')
            return;
        }
        this.stream = fs.createStreamSync(path, 'r+');
        let stat = fs.statSync(path)
        this.fileLength = stat.size
    }

    /**
     * 循环读取文件数据
     */
    readLine(): string {
        let line = ''
        while (this.length < this.fileLength) {
            this.stream.readSync(this.buf, { position: this.length })
            this.length++
            let temp = String.fromCharCode.apply(null, new Uint8Array(this.buf));
            line = line + temp
            // check CRLF
            if (temp == FileReader.CR) {
                // 边界判断 首先拿到下一个字符判断是否是LF 如果是CRLF需要再向后挪一位
                if(this.length < this.fileLength) {
                    let nextBuf = new ArrayBuffer(1)
                    this.stream.readSync(nextBuf, { position: this.length })
                    let nextTemp = String.fromCharCode.apply(null, new Uint8Array(nextBuf))
                    // 如果是CRLF 需要给当前length+1 向后挪一位
                    if (nextTemp == FileReader.LF) {
                        this.length++
                    }
                }
                // 如果不是CRLF 只有一个CR结尾length不用变
                return line;
            } else {
                // 判断LF情况
                if (temp == FileReader.LF) {
                    return line
                }
            }
        }
        return line
    }

    /**
     * 判断文件是否结束
     */
    isEnd() {
        return this.fileLength <= 0 || this.length == this.fileLength
    }

    /**
     * 关闭stream
     */
    close() {
        this.stream.closeSync()
    }
}