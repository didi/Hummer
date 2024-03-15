import{View,Memory,Storage, NotifyCenter, Hummer} from '../../../packages/hummer-api/dist/hummer-api.es'

export class RootView extends View {
    constructor() {
        super();

        this.style = {
            width: '100%',
            height: '100%',
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 10,
        };

        // let memory = new Memory()
        // memory.set('daijia', 'daijiaValue', (res) => {
        //     console.log("----是否设置成功", JSON.stringify(res))
        // })

        // memory.get('daijia', (res) => {
        //     console.log("----查询成功", JSON.stringify(res))
        // })
   


    //     let storage = new Storage()
    //     storage.exist('daijiaStorage', (res) => {
    //         console.log("----storage查询成功", JSON.stringify(res))
    //     })
   
    //     storage.set('daijiaStorage', JSON.stringify({name:'hummer', other:'hummer_api'}), (res) => {
    //         console.log("----storage是否设置成功", JSON.stringify(res))
    //         storage.get('daijiaStorage', (res) => {
    //             console.log("----storage查询成功", JSON.stringify(res))
    //         })
       
    //     })

    //     let notifyCenter = new NotifyCenter()
    //     notifyCenter.addEventListener("myHummer", (e) => {
    //         console.log("myHummer被执行内容：", e)
    //     })
    //     let testFunction = function test(e) {
    //         console.log("myHummer被执行内容111111：", e)
    //     }
    //     notifyCenter.addEventListener("myHummer", testFunction)

    //     notifyCenter.removeEventListener("myHummer")
        
        
    //     let notifyCenter1 = new NotifyCenter()
    //     notifyCenter1.triggerEvent("myHummer", "内容xxxxxxxx")


    //    let env =  Hummer.Env
    //     console.log("---------hummer全局环境变量", JSON.stringify(env))

    }

}

Hummer.render(new RootView());