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

        this.testState();

        this.testTextAlign();

        this.testTextStyle();
    }

    testBackground() {
        let titleView = new Text();
        titleView.text = 'Button - 背景';
        titleView.style = {
            color: '#333333',
            fontSize: 16,
        };

        let layout = new View();
        layout.style = {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            borderWidth: 1,
            borderColor: '#22222222',
            flexWrap: 'wrap',
        };

        let btn1 = new Button();
        btn1.text = 'btn1';
        btn1.style = {
            width: 70,
            height: 40,
            backgroundColor: '#FF0000',
            color: '#FFFFFF',
        };

        let btn2 = new Button();
        btn2.text = 'btn2';
        btn2.style = {
            width: 70,
            height: 40,
            backgroundColor: '#FF000044',
            marginLeft: 10,
            color: '#FFFFFF',
        };

        let btn3 = new Button();
        btn3.text = 'btn3';
        btn3.style = {
            width: 70,
            height: 40,
            backgroundColor: 'linear-gradient(90deg #FF000060 #00FF0060)',
            marginLeft: 10,
            color: '#FFFFFF',
        };

        let btn4 = new Button();
        btn4.text = 'btn4';
        btn4.style = {
            width: 70,
            height: 40,
            backgroundImage: 'njimage_demo',
            marginLeft: 10,
            color: '#FFFFFF',
        };

        let btn5 = new Button();
        btn5.text = 'btn5';
        btn5.style = {
            width: 70,
            height: 40,
            backgroundColor: '#FF000044',
            marginTop: 10,
            color: '#FFFFFF',
            borderWidth: 2,
            borderColor: '#000000',
            borderRadius: 10,
        };

        let btn6 = new Button();
        btn6.text = 'btn6';
        btn6.style = {
            width: 70,
            height: 40,
            backgroundColor: '#FF000044',
            marginLeft: 10,
            marginTop: 10,
            color: '#FFFFFF',
            borderRadius: 10,
        };

        let btn7 = new Button();
        btn7.text = 'btn7';
        btn7.style = {
            width: 70,
            height: 40,
            backgroundColor: 'linear-gradient(90deg #FF000060 #00FF0060)',
            marginLeft: 10,
            marginTop: 10,
            color: '#FFFFFF',
            borderRadius: 10,
        };

        let btn8 = new Button();
        btn8.text = 'btn8';
        btn8.style = {
            width: 70,
            height: 40,
            backgroundImage: 'njimage_demo',
            marginLeft: 10,
            marginTop: 10,
            color: '#FFFFFF',
            borderRadius: 10,
        };

        layout.appendChild(btn1);
        layout.appendChild(btn2);
        layout.appendChild(btn3);
        layout.appendChild(btn4);
        layout.appendChild(btn5);
        layout.appendChild(btn6);
        layout.appendChild(btn7);
        layout.appendChild(btn8);
        this.appendChild(titleView);
        this.appendChild(layout);
    }

    testState() {
        let titleView = new Text();
        titleView.text = 'Button - 按压状态';
        titleView.style = {
            color: '#333333',
            fontSize: 16,
            marginTop: 10,
        };

        let layout = new View();
        layout.style = {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            borderWidth: 1,
            borderColor: '#22222222',
            flexWrap: 'wrap',
        };

        let btn1 = new Button();
        btn1.text = 'btn1';
        btn1.style = {
            width: 70,
            height: 40,
            backgroundColor: '#FF0000',
            color: '#FFFFFF',
            textAlign: ''
        };
        btn1.pressed = { backgroundColor: '#333333', color: '#00FF00' };
        btn1.disabled = { backgroundColor: '#999999', color: '#666666' };

        let btn2 = new Button();
        btn2.text = 'btn2';
        btn2.style = {
            width: 70,
            height: 40,
            backgroundColor: '#FF000080',
            marginLeft: 10,
            color: '#FFFFFF',
            borderWidth: 2,
            borderColor: '#000000',
            borderRadius: 10,
        };
        btn2.pressed = {
            backgroundColor: '#33333380',
            color: '#00FF00',
            borderRadius: 10,
            borderWidth: 2,
            borderColor: '#FF0000',
        };
        btn2.disabled = {
            backgroundColor: '#99999980',
            color: '#666666',
            borderRadius: 10,
            borderWidth: 2,
            borderColor: '#666666',
        };

        let btn3 = new Button();
        btn3.text = 'btn3';
        btn3.style = {
            width: 70,
            height: 40,
            backgroundColor: '#FF000080',
            marginLeft: 10,
            color: '#FFFFFF',
            borderRadius: 10,
        };
        btn3.pressed = { backgroundColor: '#33333380', color: '#00FF00' };
        btn3.disabled = { backgroundColor: '#99999980', color: '#666666' };

        let btnState = new Button();
        btnState.text = 'disable';
        btnState.style = {
            position: 'absolute',
            width: 80,
            height: 40,
            right: 0,
        };
        btnState.addEventListener('tap', (event) => {
            if (btnState.text === 'disable') {
                btn1.enabled = false;
                btn2.enabled = false;
                btn3.enabled = false;
                btnState.text = 'enable';
            } else {
                btn1.enabled = true;
                btn2.enabled = true;
                btn3.enabled = true;
                btnState.text = 'disable';
            }
        });

        layout.appendChild(btn1);
        layout.appendChild(btn2);
        layout.appendChild(btn3);
        layout.appendChild(btnState);
        this.appendChild(titleView);
        this.appendChild(layout);
    }

    testTextAlign() {
        let titleView = new Text();
        titleView.text = 'Button - 文本对齐方式';
        titleView.style = {
            color: '#333333',
            fontSize: 16,
            marginTop: 10,
        };

        let layout = new View();
        layout.style = {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            borderWidth: 1,
            borderColor: '#22222222',
            flexWrap: 'wrap',
        };

        let btn1 = new Button();
        btn1.text = 'left';
        btn1.style = {
            width: 70,
            height: 40,
            backgroundColor: '#FF0000',
            color: '#FFFFFF',
            textAlign: 'left'
        };

        let btn2 = new Button();
        btn2.text = 'center';
        btn2.style = {
            width: 70,
            height: 40,
            backgroundColor: '#FF0000',
            marginLeft: 10,
            color: '#FFFFFF',
            textAlign: 'center'
        };

        let btn3 = new Button();
        btn3.text = 'right';
        btn3.style = {
            width: 70,
            height: 40,
            backgroundColor: '#FF0000',
            marginLeft: 10,
            color: '#FFFFFF',
            textAlign: 'right'
        };

        layout.appendChild(btn1);
        layout.appendChild(btn2);
        layout.appendChild(btn3);
        this.appendChild(titleView);
        this.appendChild(layout);
    }

    testTextStyle() {
        let titleView = new Text();
        titleView.text = 'Button - 字体';
        titleView.style = {
            color: '#333333',
            fontSize: 16,
            marginTop: 10,
        };

        let layout = new View();
        layout.style = {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            borderWidth: 1,
            borderColor: '#22222222',
            flexWrap: 'wrap',
        };

        let btn1 = new Button();
        btn1.text = 'Size: 默认';
        btn1.style = {
            width: 80,
            height: 40,
            backgroundColor: '#FF0000',
            color: '#FFFFFF',
        };

        let btn2 = new Button();
        btn2.text = 'Size: 10';
        btn2.style = {
            width: 80,
            height: 40,
            backgroundColor: '#FF0000',
            marginLeft: 10,
            color: '#FFFFFF',
            fontSize: 10,
        };

        let btn3 = new Button();
        btn3.text = 'Size: 20';
        btn3.style = {
            width: 80,
            height: 40,
            backgroundColor: '#FF0000',
            marginLeft: 10,
            color: '#FFFFFF',
            fontSize: 20,
        };

        let btn4 = new Button();
        btn4.text = 'Color: Blue';
        btn4.style = {
            width: 80,
            height: 40,
            backgroundColor: '#FF0000',
            marginLeft: 10,
            color: '#0000FF',
        };

        let btn5 = new Button();
        btn5.text = '字体';
        btn5.style = {
            width: 80,
            height: 40,
            backgroundColor: '#FF0000',
            marginTop: 10,
            color: '#FFFFFF',
//            fontFamily : 'New Times Roma',
        };

        layout.appendChild(btn1);
        layout.appendChild(btn2);
        layout.appendChild(btn3);
        layout.appendChild(btn4);
        layout.appendChild(btn5);
        this.appendChild(titleView);
        this.appendChild(layout);
    }
}

Hummer.render(new RootView());