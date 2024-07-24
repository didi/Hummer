import{View, Text, Button, Navigator, Hummer} from './../../../../api/packages/hummer-api/dist/hummer-api.es'

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
        text.text = "Page 2";

        let btn1 = new Button();
        btn1.text = "go to Page3"
        btn1.style = {
            marginTop: 50,
        };
        btn1.addEventListener('tap', (event) => {
            Navigator.openPage({
                id: "333",
                url: "./hm2_Comp_Navigator_Page3.js",
                animated: true,
            }, (result) => {
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

        console.log('Page info: ' + JSON.stringify(Hummer.pageInfo));

        Hummer.pageResult = {
            key1: 111.1,
            key2: "222"
        };
    }
}

Hummer.render(new RootView());