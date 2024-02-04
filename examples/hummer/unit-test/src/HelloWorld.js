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
        textView.text = "~ Hello Hummer123 ~";
        textView.style = {
            fontSize: 20,
            color: '#000000',
        }

        this.appendChild(textView);

        let textView2 = new Text();
        textView2.text = "~ Hello Hummer123 ~";
        textView2.style = {
            fontSize: 20,
            color: '#000000',
            fontFamily: 'BarlowSemiCondensedMedium',
        }

        this.appendChild(textView2);
    }
}

Hummer.render(new RootView());