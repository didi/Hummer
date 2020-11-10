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

        this.testLocation();
    }

    testLocation() {
        let titleView = new Text();
        titleView.text = 'Location - 定位';
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

        let subLayout = new View();
        subLayout.style = {
            flexDirection: 'row',
        }
        let btn1 = new Button();
        btn1.text = '上次定位信息';
        btn1.style = {
            width: 110,
            height: 40,
        };
        btn1.addEventListener('tap', e => {
            let location = new Location();
            location.getLastLocation((info) => {
                infoText.text = this.formatLocation(info);
            });
        });

        let location2 = new Location();

        let btn2 = new Button();
        btn2.text = '开始定位';
        btn2.style = {
            width: 80,
            height: 40,
            marginLeft: 10,
        };
        btn2.addEventListener('tap', e => {
            location2.startLocation((info) => {
                infoText.text = this.formatLocation(info);
            }, 2000, 0);
        });

        let btn3 = new Button();
        btn3.text = '结束定位';
        btn3.style = {
            width: 80,
            height: 40,
            marginLeft: 10,
        };
        btn3.addEventListener('tap', e => {
            location2.stopLocation();
        });

        let infoText = new Text();
        infoText.style = {
            marginLeft: 5,
            marginTop: 10,
        };

        subLayout.appendChild(btn1);
        subLayout.appendChild(btn2);
        subLayout.appendChild(btn3);
        layout.appendChild(subLayout);
        layout.appendChild(infoText);
        this.appendChild(titleView);
        this.appendChild(layout);
    }

    formatLocation(info) {
        let ret = 'latitude: ' + info.latitude + '\n'
                + 'longitude: ' + info.longitude + '\n'
                + 'altitude: ' + info.altitude + '\n'
                + 'accuracy: ' + info.accuracy + '\n'
                + 'speed: ' + info.speed + '\n'
                + 'bearing: ' + info.bearing + '\n'
                + 'timestamp: ' + info.timestamp + '\n'
        return ret;
    }
}

Hummer.render(new RootView());