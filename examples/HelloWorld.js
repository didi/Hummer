class RootView extends View {
    constructor() {
        super();
        let environment = Hummer.env;
        this.style = {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        }

        let textView = new Text();
        textView.text = "~ Hello Hummer ~"
        textView.style = {
            fontSize: 20,
        }

        this.appendChild(textView);
    }
}

Hummer.render(new RootView());