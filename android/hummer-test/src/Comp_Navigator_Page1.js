class RootView extends View {
    initialize() {
        let environment = Hummer.env;
        this.style = {
            flexDirection: 'column',
            width: environment.availableWidth,
            height: environment.availableHeight,
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
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
            let pageInfo = {
                id: '222',
                url: './Comp_Navigator_Page2.js',
//                url: 'http://www.baidu.com',
//                url: 'native://test',
                animated: true,
                params: {
                    aaa: 111,
                    bbb: 222,
                }
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
}

Hummer.render(new RootView());