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

        this.testBackground();

        this.testAction();
    }

    testBackground() {
        let titleView = new Text();
        titleView.text = 'Switch - 背景';
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

        let switch1 = new Switch();
        switch1.style = {
            backgroundColor: '#FF000044',
            onColor: "#00ff00",
            offColor: "#999999",
            thumbColor: "#FF0000",
        };

        let switch2 = new Switch();
        switch2.style = {
            backgroundColor: 'linear-gradient(90deg #FF000060 #00FF0060)',
            marginLeft: 10,
            onColor: "#00ff00",
            offColor: "#999999",
            thumbColor: "#00FF00",
        };

        let switch3 = new Switch();
        switch3.style = {
            backgroundColor: '#FF000044',
            marginLeft: 10,
            onColor: "#00ff00",
            offColor: "#999999",
            thumbColor: "#0000FF",
            borderWidth: 2,
            borderColor: '#000000',
            borderRadius: 10,
        };

        let switch4 = new Switch();
        switch4.style = {
            backgroundColor: 'linear-gradient(90deg #FF000060 #00FF0060)',
            marginLeft: 10,
            onColor: "#00ff00",
            offColor: "#999999",
            thumbColor: "#ff0000",
            borderRadius: 10,
        };

        let switch5 = new Switch();
        switch5.style = {
            backgroundImage: 'njimage_demo',
            marginLeft: 10,
            onColor: "#00ff00",
            offColor: "#999999",
            thumbColor: "#ff0000",
        };

        layout.appendChild(switch1);
        layout.appendChild(switch2);
        layout.appendChild(switch3);
        layout.appendChild(switch4);
        layout.appendChild(switch5);
        this.appendChild(titleView);
        this.appendChild(layout);
    }

    testAction() {
        let titleView = new Text();
        titleView.text = 'Switch - 操作';
        titleView.style = {
            color: '#333333',
            fontSize: 16,
            marginTop: 10,
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

        let subLayout = new View();
        let switchView = new Switch();
        switchView.style = {
            onColor: "#0000FF",
            offColor: "#FF0000",
            thumbColor: "#00FF00",
        };
        switchView.addEventListener('switch', e => {
            infoText.text = this.formatEvent(e);
        });

        let btn = new Button();
        btn.text = 'check'
        btn.style = {
            width: 80,
            height: 40,
        };
        btn.addEventListener('tap', e => {
            switchView.checked = btn.text === 'check';
            btn.text = btn.text === 'check' ? 'uncheck' : 'check';

            if (switchView.checked) {
                switchView.style = {
                    onColor: "#0000FF",
                    offColor: "#FF0000",
                    thumbColor: "#00FF00",
                };
            } else {
                switchView.style = {
                    onColor: "#00FFFF",
                    offColor: "#FFFF00",
                    thumbColor: "#FF00FF",
                };
            }
        });

        let infoText = new Text();
        infoText.style = {
            marginLeft: 30,
        };

        subLayout.appendChild(switchView);
        subLayout.appendChild(btn);
        layout.appendChild(subLayout);
        layout.appendChild(infoText);
        this.appendChild(titleView);
        this.appendChild(layout);
    }

    formatEvent(event) {
        let type = 'event: [' + event.type + ']\n'
        let state = 'state: ' + event.state + ' - ' + this.formatEventState(event.state) + '\n';
        let position = event.position ? 'position: (' + event.position.x + ', ' + event.position.y + ')\n' : '';
        let direction = event.direction ? 'direction: ' + event.direction + '\n' : '';
        let scale = event.scale ? 'scale: ' + event.scale + '\n' : '';
        let timestamp = 'timestamp: ' + event.timestamp + '\n';
        return type + state + position + direction + scale + timestamp;
    }

    formatEventState(state) {
        return state ? 'on' : 'off';
    }
}

Hummer.render(new RootView());