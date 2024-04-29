import{Button, Scroller, Request, Navigator, Hummer} from './../../../../api/packages/hummer-api/dist/hummer-api.es'

const baseUrl = "http://xxx.xxx.xxx.xxx:8000/";
const url = baseUrl + 'fileList';

class RootView extends Scroller {
    constructor() {
        super();

        this.style = {
            width: '100%',
            height: '100%',
            margin: 5,
        };

        this.request();
    }

    request() {
        console.log('request url: ' + url);
        const requestMy = new Request();
        requestMy.url = url;
        requestMy.method = "GET";
        requestMy.send((response) => {
            console.log("response data: " + JSON.stringify(response.data));
            this.updateTestView(response.data.data);
        });
    }

    updateTestView(data) {
        data.forEach((name) => {
            console.log("updateTestView, name: " + name);
            let button = new Button();
            button.text = name;
            button.style = {
                width: '100%',
                height: 32,
                margin: 5,
                borderRadius: 2,
                backgroundColor: '#22222222',
            }
            button.addEventListener("tap", (event) => {
                var newUrl = baseUrl + name;
                console.log("Navigator.openPage()  url = " + newUrl);

                var pageInfo = {
                    url: newUrl
                }

                Navigator.openPage(pageInfo, (data) => {
                    console.log("Navigator.openPage() callback data = " + data);
                });
            })
            this.appendChild(button);
        });
    }
}


Hummer.render(new RootView());
