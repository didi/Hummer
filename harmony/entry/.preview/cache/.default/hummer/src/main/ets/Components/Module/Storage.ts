import fs from "@ohos:file.fs";
import type { ReadTextOptions } from "@ohos:file.fs";
import { HMComponent } from "@bundle:com.example.hummer/entry@hummer/ets/Components/Component";
export class Storage {
    private static _storageMap: Map<string, Storage> = new Map();
    // 根目录—> com_hummer_cache—>namespace—>hm_storage—>文件
    private _filePath: string; // nameSpace
    public static instance(nameSpace: string, filesDir: string): Storage {
        const _instance = Storage._storageMap.get(nameSpace);
        if (_instance) {
            return _instance;
        }
        const newInstance = new Storage();
        newInstance._filePath = filesDir + "/com_hummer_cache/" + nameSpace + "/hm_storage";
        Storage._storageMap.set(nameSpace, newInstance);
        return newInstance;
    }
    // set
    public set(key: string, value: string, callback?: Function) {
        // 第一次需要创建目录
        let dirPath = this._filePath;
        // 判断是否存在路径
        let exist = fs.accessSync(dirPath);
        if (!exist) {
            fs.mkdirSync(dirPath, true);
        }
        // 创建文件
        let fileName = this._filePath + '/' + key + '.txt';
        let file = fs.openSync(fileName, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
        // 写入文件
        fs.writeSync(file.fd, value);
        // 关闭文件
        fs.closeSync(file);
        return true;
    }
    // get
    public get(key: string, callback?: Function): string {
        let fileName = this._filePath + '/' + key + '.txt';
        // options
        let readTextOptions: ReadTextOptions = {
            offset: 0,
            length: 0,
            encoding: 'utf-8'
        };
        try {
            let stat = fs.statSync(fileName);
            if (stat && stat.size) {
                readTextOptions.length = stat.size;
                return fs.readTextSync(fileName, readTextOptions);
            }
        }
        catch (e) {
            return undefined;
        }
        return undefined;
    }
    // remove
    public remove(key: string, callback?: Function) {
        let fileName = this._filePath + '/' + key + '.txt';
        fs.unlinkSync(fileName);
    }
    // removeAll
    public removeAll(callback?: Function) {
        fs.rmdirSync(this._filePath);
    }
    // exist
    public exist(key: string, callback?: Function): boolean {
        let fileName = this._filePath + '/' + key + '.txt';
        return fs.accessSync(fileName);
    }
}
export class HMStorage extends HMComponent {
    private storage = Storage.instance(this.context.config.nameSpace, this.context.abilityContext.getApplicationContext().filesDir);
    // set
    private set(key: string, value: string, callback?: Function) {
        return this.storage.set(key, value, callback);
    }
    // get
    private get(key: string, callback?: Function): string {
        return this.storage.get(key, callback);
    }
    // remove
    private remove(key: string, callback?: Function) {
        return this.storage.remove(key, callback);
    }
    // removeAll
    private removeAll(callback?: Function) {
        return this.storage.removeAll(callback);
    }
    // exist
    private exist(key: string, callback?: Function): boolean {
        return this.storage.exist(key, callback);
    }
}
