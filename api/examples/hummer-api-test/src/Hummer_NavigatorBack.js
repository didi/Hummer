import { View, Navigator, Memory, Hummer, Button, NotifyCenter } from '../../../packages/hummer-api/dist/hummer-api.es'

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

        let pageInfo = Hummer.pageInfo;
       
        console.log('后一个页面接收到的pageInfo: ' + JSON.stringify(pageInfo));


        let result = {
            key1: 1112,
            key2: 2223,
        }

        Hummer.pageResult = result;

        let memory = new Memory()

        let isExit = memory.exist('daijia')
        console.log("memory是否存在", isExit)

        let val = memory.get('daijia')
        console.log("memory----查询成功", val)


        let notifyCenter = Hummer.notifyCenter
        let event1 = function (e) {
            console.log("NavigatorBack::接受前一个页面触发myHummer事件1:" + JSON.stringify(e));
        }
        let event2 = function (e) {
            console.log("NavigatorBack::接受前一个页面触发myHummer1事件2:" + JSON.stringify(e));
        }
        notifyCenter.addEventListener("myHummer", event1)
        notifyCenter.addEventListener("myHummer1", event2)

        let button = new Button()
        button.text = '跳转到上一页'
        button.addEventListener('tap', (event) => {
            notifyCenter.triggerEvent("myHummer1", "触发本页面myHummer");
            // notifyCenter.removeEventListener("myHummer");
            notifyCenter.triggerEvent("myHummer", "触发前一个页面myHummer");
            // notifyCenter.triggerEvent("myHummer", "触发前一个页面myHummer222222222");
            // Navigator.openPage(pageInfo, (result) => {
            //     console.log('Page result: ' + JSON.stringify(result));
            // });

        });



        this.appendChild(button)

    }

    onBack(){
        console.log("NavigatorBack::onBack()");

        let result = {
            key1: 2222,
            key2: 4444,
        }
        Hummer.pageResult = result;


    }

}

Hummer.render(new RootView());