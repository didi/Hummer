import { View, Navigator, Hummer, Memory, Button, NotifyCenter } from '../../../packages/hummer-api/dist/hummer-api.es'

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

        let pageInfo = {
            id: '111',
            url: './Hummer_NavigatorBack.js',
            params: {
                aaa: 111,
                bbb: 222,
            }
        };
        let button = new Button()
        button.text = '跳转到下一页'
        button.style = {
            backGroundColor: "#ff0000"
        }
        button.addEventListener('tap', (event) => {
            console.log("------开始跳转")
            Navigator.openPage(pageInfo, (result) => {
                console.log('Navigator::下一个页面的返回值Page result: ', JSON.stringify(result));
            });

        });

        let memory = new Memory()
        memory.set('daijia', 'daijiaValue')



        let notifyCenter = Hummer.notifyCenter
        notifyCenter.addEventListener("myHummer", (value) => {
            console.log("Navigator::收到后一个页面触发myHummer事件::" + value)
        })

        this.appendChild(button)
        this.canGoBack = true;

    }


    onBack() {
        console.log("page onBack")
    }

}

Hummer.render(new RootView());