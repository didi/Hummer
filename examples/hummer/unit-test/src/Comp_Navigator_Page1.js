import{View, Text, Button, Navigator, Hummer} from '../../../../api/packages/hummer-api/dist/hummer-api.es'

class RootView extends View {
    constructor() {
        super();

        this.style = {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        }

        let text = new Text();
        text.text = "Page 1";

        let btn1 = new Button();
        btn1.text = "go to Page2"
        btn1.style = {
            marginTop: 50,
        };
        btn1.addEventListener('tap', (event) => {


            // let navPage = {
            //     url: "hummer://caimi/honey_popularize_submit_page",
            //     params: {
            //         popularizeModule: model,
            //         energyModel: energyModel
            //     }
            // }

            let pageInfo = {
                id: '222',
                // url:'http://172.23.166.31:8030/index.js',
                url: './Comp_Navigator_Page2.js',
                // url: 'http://www.baidu.com',
                // url: 'native://test',
                animated: true,
                params: {
                    aaa: 111,
                    bbb: 222,
                    ccc:null,
                    ccx:undefined
                },
                // closeSelf: true,
            };
            Navigator.openPage(pageInfo, (result) => {
                console.log('Page result: ' + JSON.stringify(result));
            });
        });

        let btn2 = new Button();
        btn2.text = "popPage"
        btn2.addEventListener('tap', (event) => {
            Navigator.popPage();
        });

        this.appendChild(text);
        this.appendChild(btn1);
        this.appendChild(btn2);
    }

    onCreate() {
        // 页面创建
        console.log("-- onCreate");
    }

    onAppear() {
        // 页面显示
        console.log("-- onAppear");
    }

    onDisappear() {
        // 页面隐藏
        console.log("-- onDisappear");
    }

    onDestroy() {
        // 页面销毁
        console.log("-- onDestroy");
    }

    onBack() {
        // 页面返回
        console.log("-- onBack");
        return false;
    }
}

Hummer.render(new RootView());