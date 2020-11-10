class RootView extends View {
    initialize() {
        let environment = Hummer.env;
        this.style = {
            marginTop:"88",
            backgroundColor:'#00FF00',
            width: environment.availableWidth,
            height: environment.availableHeight
        }

        this.testShow();
    }

    testShow() {
        let titleView = new Text();
        titleView.text = 'Loading - 显示';
        titleView.style = {
            color: '#333333',
            fontSize: 16,
            marginTop: 10,
            marginLeft: 10,
        };

        let layout = new View();
        layout.style = {
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginLeft: 10,
            marginRight: 10,
            borderWidth: 1,
            borderColor: '#22222222',
            flexWrap: 'wrap',
        };

        let loading = new Loading();
        loading.style = {
            width: 50,
            height: 50,
            margin: 10,
        }

        layout.appendChild(loading);
        this.appendChild(titleView);
        this.appendChild(layout);
    }
}

Hummer.render(new RootView());