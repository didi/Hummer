class RootView extends View {
    initialize() {
        let environment = Hummer.env;
        this.style = {
            flexDirection: 'column',
            width: environment.deviceWidth,
            height: environment.deviceHeight,
        }

        this.testAction();
    }

    testAction() {
        let titleView = new Text();
        titleView.text = 'Timer - 操作';
        titleView.style = {
            color: '#333333',
            fontSize: 16,
            marginTop: 10,
            marginLeft: 10,
        };

        let layout = new View();
        layout.style = {
            marginLeft: 10,
            marginRight: 10,
            borderWidth: 1,
            borderColor: '#22222222',
            flexWrap: 'wrap',
        };

        let subLayout = new View();
        subLayout.style = {
            flexDirection: 'row',
        }

        let timer1 = new Timer();
        let btn1 = new Button();
        btn1.text = 'setTimeout';
        btn1.style = {
            width: 110,
            height: 40,
            margin: 10,
        };
        btn1.addEventListener('tap', e => {
            if (btn1.text === 'setTimeout') {
                infoText.text = '';
                timer1.setTimeout(() => {
                     console.log('timer Timeout 2s');
                     infoText.text += 'timer Timeout 2s' + '\n';
                }, 2);
            } else {
                timer1.clearTimeout();
                infoText.text = 'timer timeout canceled';
            }
            btn1.text = btn1.text === 'setTimeout' ? 'clearTimeout' : 'setTimeout';
        });

        let timer2 = new Timer();
        let btn2 = new Button();
        btn2.text = 'setInterval';
        btn2.style = {
            width: 110,
            height: 40,
            margin: 10,
        };
        btn2.addEventListener('tap', e => {
            if (btn2.text === 'setInterval') {
                infoText.text = '';
                timer2.setInterval(() => {
                     console.log('timer Interval 1s');
                     infoText.text += 'timer Interval 1s' + '\n';
                }, 1);
            } else {
                timer2.clearInterval();
                infoText.text = 'timer Interval canceled';
            }

            btn2.text = btn2.text === 'setInterval' ? 'clearInterval' : 'setInterval';
        });

        let infoText = new Text();
        infoText.style = {
            width: Hummer.env.deviceWidth - 50,
            margin: 15,
        };

        subLayout.appendChild(btn1);
        subLayout.appendChild(btn2);
        layout.appendChild(subLayout);
        layout.appendChild(infoText);
        this.appendChild(titleView);
        this.appendChild(layout);
    }
}

Hummer.render(new RootView());