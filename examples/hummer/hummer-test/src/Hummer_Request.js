import{View, Hummer, Request} from './../../../../api/packages/hummer-api/dist/hummer-api.es'

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

       
        var request = new Request();
        request.url = "http://xxx.xxx.xxx.xxx:8000/test";
        request.method = "GET";
        request.send((response) => {
            console.log("----请求结果", JSON.stringify(response))
        });


    }

}

Hummer.render(new RootView());