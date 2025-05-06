import fs from '@ohos:file.fs';
import { HMComponent } from '@bundle:com.example.hummer/hummer/ets/Components/Component';
export class Storage {
    static instance(nameSpace, filesDir) {
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
    set(key, value, callback) {
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
    get(key, callback) {
        let fileName = this._filePath + '/' + key + '.txt';
        // options
        let readTextOptions = {
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
    remove(key, callback) {
        let fileName = this._filePath + '/' + key + '.txt';
        fs.unlinkSync(fileName);
    }
    // removeAll
    removeAll(callback) {
        fs.rmdirSync(this._filePath);
    }
    // exist
    exist(key, callback) {
        let fileName = this._filePath + '/' + key + '.txt';
        return fs.accessSync(fileName);
    }
}
Storage._storageMap = new Map();
export class HMStorage extends HMComponent {
    constructor() {
        super(...arguments);
        this.storage = Storage.instance(this.context.config.nameSpace, this.context.abilityContext.getApplicationContext().filesDir);
    }
    // set
    set(key, value, callback) {
        return this.storage.set(key, value, callback);
    }
    // get
    get(key, callback) {
        return this.storage.get(key, callback);
    }
    // remove
    remove(key, callback) {
        return this.storage.remove(key, callback);
    }
    // removeAll
    removeAll(callback) {
        return this.storage.removeAll(callback);
    }
    // exist
    exist(key, callback) {
        return this.storage.exist(key, callback);
    }
}
//# sourceMappingURL=Storage.js.map