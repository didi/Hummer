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
        }

        this.testRequest();
    }

    testRequest() {
        let titleView = new Text();
        titleView.text = 'WebSocket';
        titleView.style = {
            color: '#333333',
            fontSize: 16,
        };

        let layout = new View();
        layout.style = {
            padding: 10,
            borderWidth: 1,
            borderColor: '#22222222',
        };

        let subLayout = new View();
        subLayout.style = {
            flexDirection: 'row',
        }
        let btn1 = new Button();
        btn1.text = 'connect';
        btn1.style = {
            width: 80,
            height: 40,
        };
        btn1.addEventListener('tap', e => {
            WebSocket.connect('ws://x.x.x.x:9000/');
        });

        let btn2 = new Button();
        btn2.text = 'close';
        btn2.style = {
            width: 80,
            height: 40,
        };
        btn2.addEventListener('tap', e => {
            WebSocket.close(1000, 'normal close');
        });

        let btn3 = new Button();
        btn3.text = 'send';
        btn3.style = {
            width: 80,
            height: 40,
        };
        btn3.addEventListener('tap', e => {
            WebSocket.send('test message!');
        });


        WebSocket.onOpen(() => {
            console.log('WebSocket onOpen');
        });
        WebSocket.onClose((code, reason) => {
            console.log('WebSocket onClose, code = ' + code + ', reason = ' + reason);
        });
        WebSocket.onError((errMsg) => {
            console.log('WebSocket onError, errMsg = ' + errMsg);
        });
        WebSocket.onMessage((data) => {
            console.log('WebSocket onMessage, data = ' + data);
        });


        let infoText = new Text();
        infoText.style = {
            marginLeft: 5,
            marginTop: 10,
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