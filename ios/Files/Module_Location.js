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
            marginTop: 90,
        }

        this.testPhone();
    }

    testPhone() {
        
        let location = new Location();
        
        location.onError((errCode, errMsg) => {
            // 定位时的错误信息
            console.log("------------> errCode: " + errCode + ", errMsg: " + errMsg);
        })
        
        let btn1 = new Button();
        btn1.text = "getLastLocation";
        btn1.addEventListener('tap', (event) => {
            location.getLastLocation((LocationInfo) => {
                // 获取上一次缓存的位置信息
                console.log("------------> LocationInfo: " + LocationInfo["latitude"]);
            });
        })

        let btn2 = new Button();
        btn2.text = "startLocation 2秒回调";
        btn2.addEventListener('tap', (event) => {
            location.startLocation((LocationInfo) => {
                // 2秒更新一次
                console.log("------------> LocationInfo: " + LocationInfo["latitude"]);
            }, 2000, 0);
        })

        let btn4 = new Button();
        btn4.text = "startLocation 默认60秒回调";
        btn4.addEventListener('tap', (event) => {
            location.startLocation((LocationInfo) => {
                // 1秒更新一次
                console.log("------------> LocationInfo: " + LocationInfo["latitude"]);
            });
        })
        
        let btn3 = new Button();
        btn3.text = "stopLocation";
        btn3.addEventListener('tap', (event) => {
            location.stopLocation();
        })

        this.appendChild(btn1);
        this.appendChild(btn2);
        this.appendChild(btn4);
        this.appendChild(btn3);
        
    }
}

Hummer.render(new RootView());
