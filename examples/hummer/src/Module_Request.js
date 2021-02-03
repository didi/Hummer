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
        titleView.text = 'Request - 请求';
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
        btn1.text = 'get请求';
        btn1.style = {
            width: 80,
            height: 40,
        };
        btn1.addEventListener('tap', e => {
            let request = new Request();
            request.url = 'http://x.x.x.x:9292/all_files';
            request.method = 'GET';
            request.send(response => {
                console.log('method: ' + request.method);
                console.log('response type is ' + typeof response);
                console.log('response: ' + JSON.stringify(response));

                let ret = 'method: ' + request.method + '\n'
                        + 'response type is ' + typeof response + '\n'
                        + 'response: ' + JSON.stringify(response) + '\n';


                infoText.text = ret;
            });
        });

        let btn2 = new Button();
        btn2.text = 'post请求';
        btn2.style = {
            width: 80,
            height: 40,
            marginLeft: 10,
        };
        btn2.addEventListener('tap', e => {
            let request = new Request();
            request.url = 'http://x.x.x.x:9292/all_files';
            request.method = 'POST';
            request.send(response => {
                console.log('method: ' + request.method);
                console.log('response type is ' + typeof response);
                console.log('response: ' + JSON.stringify(response));

                let ret = 'method: ' + request.method + '\n'
                        + 'response type is ' + typeof response + '\n'
                        + 'response: ' + JSON.stringify(response) + '\n';

                infoText.text = ret;
            });
        });

        let infoText = new Text();
        infoText.style = {
            marginLeft: 5,
            marginTop: 10,
        };

        subLayout.appendChild(btn1);
        subLayout.appendChild(btn2);
        layout.appendChild(subLayout);
        layout.appendChild(infoText);
        this.appendChild(titleView);
        this.appendChild(layout);
    }
}

Hummer.render(new RootView());