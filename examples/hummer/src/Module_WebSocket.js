class RootView extends View {
    constructor() {
        super();

        this.style = {
            width: '100%',
            height: '100%',
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
            this.ws = new WebSocket('ws://x.x.x.x:8000/proxy/native');    
            this.ws.onopen = () => {
                console.log('WebSocket onOpen');
            };
            this.ws.onmessage = (event) => {
                console.log('WebSocket onMessage, event.data = ' + event.data);
            };
            this.ws.onclose = (event) => {
                console.log('WebSocket onClose, event.code = ' + event.code + ', event.reason = ' + event.reason);
            };
            this.ws.onerror = () => {
                console.log('WebSocket onError');
            };
        });

        let btn2 = new Button();
        btn2.text = 'close';
        btn2.style = {
            width: 80,
            height: 40,
        };
        btn2.addEventListener('tap', e => {
            this.ws.close();
        });

        let btn3 = new Button();
        btn3.text = 'send';
        btn3.style = {
            width: 80,
            height: 40,
        };
        btn3.addEventListener('tap', e => {
            this.ws.send('test message!');
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