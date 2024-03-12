class RootView extends View {
    constructor() {
        super();

        this.style = {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
        }

        let textView = new Text();
        textView.text = "~ Hello Hummer ~";
        textView.style = {
            fontSize: 20,
            color: '#000000',
        }

        this.appendChild(textView);
    }
}

Hummer.render(new RootView());