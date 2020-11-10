class RootView extends View {
    initialize() {
        let environment = Hummer.env;
        this.style = {
            flexDirection: 'column',
            width: environment.deviceWidth,
            height: environment.deviceHeight,
        }

        this.testAction();
    }

    testAction() {
        let titleView = new Text();
        titleView.text = 'NotifyCenter - 操作';
        titleView.style = {
            color: '#333333',
            fontSize: 16,
            marginTop: 10,
            marginLeft: 10,
        };

        let layout = new View();
        layout.style = {
            marginLeft: 10,
            marginRight: 10,
            borderWidth: 1,
            borderColor: '#22222222',
            flexWrap: 'wrap',
        };

        let subLayout = new View();
        subLayout.style = {
            flexDirection: 'row',
        }

        let notifyCenter = Hummer.notifyCenter;
        let callback = (value) => {
           console.log('receive event: ' + JSON.stringify(value));
           infoText.text = JSON.stringify(value);
        }

        let btn1 = new Button();
        btn1.text = '注册消息';
        btn1.style = {
            width: 110,
            height: 40,
            margin: 10,
        };
        btn1.addEventListener('tap', e => {
            notifyCenter.addEventListener("testEvent", callback);
        });

        let btn2 = new Button();
        btn2.text = '取消注册';
        btn2.style = {
            width: 110,
            height: 40,
            margin: 10,
        };
        btn2.addEventListener('tap', e => {
            notifyCenter.removeEventListener("testEvent", callback);
        });

        let btn3 = new Button();
        btn3.text = '发送消息';
        btn3.style = {
            width: 110,
            height: 40,
            margin: 10,
        };
        btn3.addEventListener('tap', e => {
            let value = {
                test: '1234',
            };
            notifyCenter.triggerEvent("testEvent", value);
        });

        let infoText = new Text();
        infoText.text = '接收消息：\n';
        infoText.style = {
            width: Hummer.env.deviceWidth - 50,
            margin: 15,
        };

        subLayout.appendChild(btn1);
        subLayout.appendChild(btn2);
        subLayout.appendChild(btn3);
        layout.appendChild(subLayout);
        layout.appendChild(infoText);
        this.appendChild(titleView);
        this.appendChild(layout);
    }
}

Hummer.render(new RootView());