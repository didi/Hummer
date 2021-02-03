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
        }

        this.testEnvDisplay();
    }

    testEnvDisplay() {
        let titleView = new Text();
        titleView.text = 'Hummer.env';
        titleView.style = {
            color: '#333333',
            fontSize: 16,
        };

        let layout = new View();
        layout.style = {
            padding: 10,
            borderWidth: 1,
            borderColor: '#22222222',
        };

        let infoText = new Text();
        let info = '';
        for (var key in Hummer.env) {
            info += key + " = " + Hummer.env[key] + "\n";
        }

        infoText.text = info;
        console.log("Hummer.env: \n" + info);

        layout.appendChild(infoText);
        this.appendChild(titleView);
        this.appendChild(layout);
    }
}

Hummer.render(new RootView());

