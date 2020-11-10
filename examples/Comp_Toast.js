class RootView extends View {
    initialize() {
        let environment = Hummer.env;
        this.style = {
            width: environment.availableWidth,
            height: environment.availableHeight,
            justifyContent: 'center',
            alignItems: 'center',
        }

        let btn1 = new Button();
        btn1.text = "show Toast"
        btn1.addEventListener('tap', (event) => {
//            Toast.show("test");
            Toast.show("test", 3000);
        });

        let btn2 = new Button();
        btn2.text = "show Custom"
        btn2.addEventListener('tap', (event) => {
            let layout = new View();
            layout.style = {
                flexDirection: 'row',
                backgroundColor: "#25262D",
                borderRadius: 2,
                alignItems: 'center',
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 12,
                paddingBottom: 12,
            }

            let iconView = new Loading();
            iconView.style = {
                width: 24,
                height: 24,
            }

            let textView = new Text();
            textView.text = "这是Toast内容"
            textView.style = {
                marginLeft: 10,
                fontSize: 14,
                color: '#CCCCCC'
            }

            layout.appendChild(iconView);
            layout.appendChild(textView)

            Toast.custom(layout);
        });

        this.appendChild(btn1);
        this.appendChild(btn2);
    }
}

Hummer.render(new RootView());

