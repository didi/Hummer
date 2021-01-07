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
        text.text = "Page 2";

        let btn1 = new Button();
        btn1.text = "go to Page3"
        btn1.style = {
            marginTop: 50,
        };
        btn1.addEventListener('tap', (event) => {
            Navigator.openPage({id: "333", url: "./Comp_Navigator_Page3.js"}, (result) => {
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

        Hummer.pageResult = {key1: 111.1, key2: "222"};
    }
}

Hummer.render(new RootView());