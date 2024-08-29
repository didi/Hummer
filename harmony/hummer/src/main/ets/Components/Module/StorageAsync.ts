import distributedKVStore from '@ohos.data.distributedKVStore';
import { BusinessError } from '@ohos.base';
import { HMComponent } from '../Component';
import  { dataNotFind } from '../../Utils/Error'


let kvManager: distributedKVStore.KVManager
let kvStore: distributedKVStore.SingleKVStore | null; // 数据库实例
const BUNDLE_NAME  = "com.hummer.dataManager"

export class HMStorage2 extends HMComponent {
  // 命名空间
  private  nameSpace = this.context.config.nameSpace
  private  abilityContext = this.context.abilityContext.getApplicationContext()
  // 数据库初始化函数
  async init(type: string, callback?: Function) {
    // app级别数据库管理实例，不同app用过bundleName区分
    const kvManagerConfig: distributedKVStore.KVManagerConfig = {
      context: this.abilityContext,
      bundleName: BUNDLE_NAME,
    }
    try {
      kvManager = distributedKVStore.createKVManager(kvManagerConfig);
      console.info("kvManager create success");
      // 设置时候数据库不存在需要创建数据库实例
      let createIfMissing = (type === 'set')
      // 获取数据实例
      try {
        const options: distributedKVStore.Options = {
          createIfMissing: createIfMissing,
          encrypt: false,
          backup: false,
          autoSync: true,
          kvStoreType: distributedKVStore.KVStoreType.SINGLE_VERSION,
          securityLevel: distributedKVStore.SecurityLevel.S2,
        };
        // 分布式键值数据库实例
        kvStore = await kvManager.getKVStore<distributedKVStore.SingleKVStore>(this.nameSpace, options)

      } catch (e) {
        let error = e as BusinessError;
        let errMsg = `An unexpected error occurred.code is ${error.code},message is ${error.message}`
        this.context.handleError(dataNotFind(errMsg))
        callback && callback({
          code:error.code,
          data:null,
          msg:error.message
        })
      }

    } catch (e) {
      let error = e as BusinessError;
      let errMsg =`Failed to create KVManager.code is ${error.code},message is ${error.message}`
      this.context.handleError(dataNotFind(errMsg))
      callback && callback({
        code:error.code,
        data:null,
        msg:error.message
      })
    }
  }


  // close
  private async close(){
    kvManager.closeKVStore(BUNDLE_NAME, this.nameSpace).then(() => {
      console.info('Succeeded in closing KVStore');
      kvManager = null
      kvStore = null
    }).catch((err: BusinessError) => {
      let errMsg = `Failed to close KVStore.code is ${err.code},message is ${err.message}`
      this.context.handleError(dataNotFind(errMsg))
    });
  }


  // set
  private async set(key: string, value: string, callback?: Function){
    try {
      if(!kvManager || !kvStore){
       await this.init('set', callback)
      }
      // 设置
      kvStore.put(key, value).then(() => {
        this.close()
        callback && callback({
          code: 0,
          data:null,
          msg:null
        })
      }).catch((err: BusinessError) => {
        let errMsg = `Failed to put.code is ${err.code},message is ${err.message}`
        this.context.handleError(dataNotFind(errMsg))
        callback && callback({
          code:err.code,
          data:null,
          msg:err.message
        })
      });

    } catch (error) {
      let errMsg = JSON.stringify(error)
      this.context.handleError(dataNotFind(errMsg))
      callback && callback({
        code:-1,
        data:null,
        msg: JSON.stringify(error)
      })
    };
  }

  // remove
  private async remove(key: string, callback?: Function){
    try {
      if(!kvManager || !kvStore){
        await this.init('remove', callback)
      }
      // 删除
      kvStore.delete(key).then(() => {
        console.info('Succeeded in deleting');
        this.close()
        callback && callback({
          code: 0,
          data:null,
          msg:null
        })
      }).catch((err: BusinessError) => {
        let errMsg = `Failed to delete.code is ${err.code},message is ${err.message}`
        this.context.handleError(dataNotFind(errMsg))
        callback && callback({
          code:err.code,
          data:null,
          msg:err.message
        })
      });

    } catch (error) {
      let errMsg = JSON.stringify(error)
      this.context.handleError(dataNotFind(errMsg))
      console.log("异常处理remove", error)
      callback && callback({
        code:-1,
        data:null,
        msg: JSON.stringify(error)
      })
    };
  }



  // removeAll
  private async removeAll(callback?: Function){
    try {
      if(!kvManager){
        // 数据库存储的上下文
        let abilityContext = this.context.abilityContext.getApplicationContext()
        // app级别数据库管理实例，不同app用过bundleName区分
        const kvManagerConfig: distributedKVStore.KVManagerConfig = {
          context: abilityContext,
          bundleName: BUNDLE_NAME,
        }
        try {
          kvManager = distributedKVStore.createKVManager(kvManagerConfig);
        } catch (e) {
          let error = e as BusinessError;
          let errMsg = `Failed to create KVManager.code is ${error.code},message is ${error.message}`
          this.context.handleError(dataNotFind(errMsg))
          callback && callback({
            code:error.code,
            data:null,
            msg:error.message
          })
        }
      }
      kvManager.deleteKVStore(BUNDLE_NAME, this.nameSpace).then(() => {
        console.info('Succeeded in deleting KVStore');
        this.close()
        callback && callback({
          code: 0,
          data: null,
          msg: null
        })
      }).catch((err: BusinessError) => {
        let errMsg = `Failed to delete KVStore.code is ${err.code},message is ${err.message}`
        this.context.handleError(dataNotFind(errMsg))
        callback && callback({
          code:err.code,
          data:null,
          msg:err.message
        })
      });

    } catch (error) {
      let errMsg = JSON.stringify(error)
      this.context.handleError(dataNotFind(errMsg))
      callback && callback({
        code: -1,
        data: null,
        msg: JSON.stringify(error)
      })
    }
  }


  // get
  private async get(key: string, callback: Function) :Promise<any>{
    try {
      if(!kvManager || !kvStore){
        await this.init('get', callback)
      }
      // 查询
        kvStore.get(key).then((data) => {
          this.close()
          callback({
            code:0,
            data:data,
            msg:null
          })
        }).catch((err: BusinessError) => {
          let errMsg = `Failed to get: code is ${err.code},message is ${err.message}`
          this.context.handleError(dataNotFind(errMsg))
          callback({
            code:err.code,
            data:null,
            msg:err.message
          })
        });
    } catch (error) {
      let errMsg = JSON.stringify(error)
      this.context.handleError(dataNotFind(errMsg))
      callback({
        code:-1,
        data:null,
        msg: JSON.stringify(error)
      })
    };
  }


  // exist
  private async exist(key: string, callback: Function) :Promise<any>{
    const existCallback = (res) => {
      if(res && res?.code === 0){
        callback({
          code: 0,
          data: true,
          msg: null
        })
      }else{
        callback({
          code: 0,
          data: false,
          msg: null
        })
      }
    }
    this.get(key, existCallback)
  }


}