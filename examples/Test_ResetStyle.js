class RootView extends View {
    initialize() {
        this.style = {
            flexGrow: 1,
            alignSelf: 'stretch',
            backgroundColor: "#FF000022",
            justifyContent: 'center',
            alignItems: 'center',
        }

        let view = new View();
        view.style = {
            width: 100,
            height: 100,
            backgroundColor:"#FFFF0022"
        }

        let text = new Text();
        text.text = "test\n3333";
        text.style = {
            width: 300,
            height: 210,
            maxWidth: 100,
            maxHeight: 100,
            minWidth: 50,
            minHeight: 50,
            alignSelf: 'flex-start',
            backgroundColor:"#FF000022",
            color: "#FF0000",
        }

        let input = new Input();
        input.placeholder = 'please input a text';
        input.style = {
            placeholderColor: '#FF0000',
            cursorColor: '#00FF00',
        }

        let sw = new Switch();
        sw.style = {
            backgroundColor: '#FF000044',
            onColor: "#00ff00",
            offColor: "#999999",
            thumbColor: "#ff0000",
        };

        let btn = new Button();
        btn.text = "reset"
        btn.style = {
            width: 70,
            height: 40,
            color: '#00FF00',
        }
        btn.addEventListener('tap', (event) => {
            view.resetStyle();
            text.resetStyle();
            input.resetStyle();
//            sw.resetStyle();
            btn.resetStyle();

            text.style = {
                width: 300,
                height: 210,
                backgroundColor:"#FF000022",
            }
        });

        this.appendChild(view);
        this.appendChild(text);
        this.appendChild(input);
        this.appendChild(sw);
        this.appendChild(btn);

        console.log("111");
        console.debug("222");
        console.info("333");
        console.warn("444");
        console.error("555");
    }
}

Hummer.render(new RootView());