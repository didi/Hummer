class RootView extends View {
    constructor() {
        super();

        this.style = {
            width: '100%',
            height: '100%',
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
        }

        this.testShow();
    }

    testShow() {
        let titleView = new Text();
        titleView.text = 'Loading - 显示';
        titleView.style = {
            color: '#333333',
            fontSize: 16,
        };

        let layout = new View();
        layout.style = {
            flexDirection: 'row',
            alignItems: 'flex-start',
            padding: 10,
            borderWidth: 1,
            borderColor: '#22222222',
            flexWrap: 'wrap',
        };

        let loading = new Loading();
        loading.style = {
            width: 50,
            height: 50,
        }

        layout.appendChild(loading);
        this.appendChild(titleView);
        this.appendChild(layout);
    }
}

Hummer.render(new RootView());