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

        this.testAction();

        this.testBackground();

        this.testTextAlign();

        this.testTextStyle();
    }

    testAction() {
        let titleView = new Text();
        titleView.text = 'Input - 操作';
        titleView.style = {
            color: '#333333',
            fontSize: 16,
        };

        let layout = new View();
        layout.style = {
            flexDirection: 'column',
            padding: 10,
            borderWidth: 1,
            borderColor: '#22222222',
        };

        let subLayout1 = new View();
        subLayout1.style = {
            flexDirection: 'row',
            alignItems: 'center',
        };

        let input = new Input();
        input.placeholder = '请输入单行文本';
        input.style = {
            width: 140,
            backgroundColor: '#FF000022',
            color: '#0000FF',
            fontSize: 14,
            placeholderColor: '#999999',
        };
        input.addEventListener('input', (event) => {
            infoText.text = this.formatEvent(event);
        })

        let btn1 = new Button();
        btn1.text = 'Focus'
        btn1.style = {
            position: 'absolute',
            width: 70,
            height: 40,
            right: 0,
            fontSize: 12,
        };
        btn1.addEventListener('tap', event => {
            input.focused = btn1.text === 'Focus';
            btn1.text = btn1.text === 'Focus' ? 'Unfocus' : 'Focus';
        });

        let subLayout2 = new View();
        subLayout2.style = {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
        };

        let textArea = new TextArea();
        textArea.placeholder = '请输入多行文本';
        textArea.style = {
            width: 140,
            height: 40,
            backgroundColor: '#FF000022',
            color: '#0000FF',
            fontSize: 14,
            placeholderColor: '#999999',
        };
        textArea.addEventListener('input', (event) => {
            infoText.text = this.formatEvent(event);
        })

        let btn2 = new Button();
        btn2.text = 'Focus'
        btn2.style = {
            position: 'absolute',
            width: 70,
            height: 40,
            right: 0,
            fontSize: 12,
        };
        btn2.addEventListener('tap', event => {
            textArea.focused = btn2.text === 'Focus';
            btn2.text = btn2.text === 'Focus' ? 'Unfocus' : 'Focus';
        });

        let infoText = new Text();

        subLayout1.appendChild(input);
        subLayout1.appendChild(btn1);
        subLayout2.appendChild(textArea);
        subLayout2.appendChild(btn2);
        layout.appendChild(subLayout1);
        layout.appendChild(subLayout2);
        layout.appendChild(infoText);
        this.appendChild(titleView);
        this.appendChild(layout);
    }

    testBackground() {
        let titleView = new Text();
        titleView.text = 'Input - 背景';
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

        let input1 = new Input();
        input1.placeholder = '请输入单行文本';
        input1.style = {
            width: 110,
            height: 40,
            backgroundColor: '#FF000022',
            color: '#0000FF',
            fontSize: 14,
            placeholderColor: '#999999',
        };

        let input2 = new Input();
        input2.placeholder = '请输入单行文本';
        input2.style = {
            width: 110,
            height: 40,
            backgroundColor: 'linear-gradient(90deg #FF000060 #00FF0060)',
            marginLeft: 10,
            color: '#0000FF',
            fontSize: 14,
            placeholderColor: '#999999',
            borderWidth: 2,
            borderColor: '#000000',
            borderRadius: 10,
        };

        let input3 = new Input();
        input3.placeholder = '请输入单行文本';
        input3.style = {
            width: 110,
            height: 40,
            backgroundImage: 'njimage_demo',
            marginLeft: 10,
            color: '#0000FF',
            fontSize: 14,
            placeholderColor: '#999999',
        };

        let textArea1 = new TextArea();
        textArea1.placeholder = '请输入多行文本';
        textArea1.style = {
            width: 110,
            height: 50,
            backgroundColor: '#FF000022',
            marginTop: 10,
            color: '#0000FF',
            fontSize: 14,
            placeholderColor: '#999999',
            textLineClamp: 3,
        };

        let textArea2 = new TextArea();
        textArea2.placeholder = '请输入多行文本';
        textArea2.style = {
            width: 110,
            height: 50,
            backgroundColor: 'linear-gradient(90deg #FF000060 #00FF0060)',
            marginLeft: 10,
            marginTop: 10,
            color: '#0000FF',
            fontSize: 14,
            placeholderColor: '#999999',
            textLineClamp: 3,
            borderWidth: 2,
            borderColor: '#000000',
            borderRadius: 10,
        };

        let textArea3 = new TextArea();
        textArea3.placeholder = '请输入多行文本';
        textArea3.style = {
            width: 110,
            height: 50,
            backgroundImage: 'njimage_demo',
            marginLeft: 10,
            marginTop: 10,
            color: '#0000FF',
            fontSize: 14,
            placeholderColor: '#999999',
            textLineClamp: 3,
        };

        layout.appendChild(input1);
        layout.appendChild(input2);
        layout.appendChild(input3);
        layout.appendChild(textArea1);
        layout.appendChild(textArea2);
        layout.appendChild(textArea3);
        this.appendChild(titleView);
        this.appendChild(layout);
    }

    testTextAlign() {
        let titleView = new Text();
        titleView.text = 'Input - 文本对齐方式';
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

        let input1 = new Input();
        input1.placeholder = '请输入单行';
        input1.style = {
            width: 110,
            height: 60,
            backgroundColor: '#FF000022',
            color: '#0000FF',
            fontSize: 14,
            placeholderColor: '#999999',
            textAlign: 'left',
        };

        let input2 = new Input();
        input2.placeholder = '请输入单行';
        input2.style = {
            width: 110,
            height: 60,
            backgroundColor: '#FF000022',
            marginLeft: 10,
            color: '#0000FF',
            fontSize: 14,
            placeholderColor: '#999999',
            textAlign: 'center',
        };

        let input3 = new Input();
        input3.placeholder = '请输入单行';
        input3.style = {
            width: 110,
            height: 60,
            backgroundColor: '#FF000022',
            marginLeft: 10,
            color: '#0000FF',
            fontSize: 14,
            placeholderColor: '#999999',
            textAlign: 'right',
        };

        let textArea1 = new TextArea();
        textArea1.placeholder = '请输入多行';
        textArea1.style = {
            width: 110,
            height: 80,
            backgroundColor: '#FF000022',
            marginTop: 10,
            color: '#0000FF',
            fontSize: 14,
            placeholderColor: '#999999',
            textLineClamp: 3,
            textAlign: 'left',
        };

        let textArea2 = new TextArea();
        textArea2.placeholder = '请输入多行';
        textArea2.style = {
            width: 110,
            height: 80,
            backgroundColor: '#FF000022',
            marginLeft: 10,
            marginTop: 10,
            color: '#0000FF',
            fontSize: 14,
            placeholderColor: '#999999',
            textLineClamp: 3,
            textAlign: 'center',
        };

        let textArea3 = new TextArea();
        textArea3.placeholder = '请输入多行';
        textArea3.style = {
            width: 110,
            height: 80,
            backgroundColor: '#FF000022',
            marginLeft: 10,
            marginTop: 10,
            color: '#0000FF',
            fontSize: 14,
            placeholderColor: '#999999',
            textLineClamp: 3,
            textAlign: 'right',
        };

        layout.appendChild(input1);
        layout.appendChild(input2);
        layout.appendChild(input3);
        layout.appendChild(textArea1);
        layout.appendChild(textArea2);
        layout.appendChild(textArea3);
        this.appendChild(titleView);
        this.appendChild(layout);
    }

    testTextStyle() {
        let titleView = new Text();
        titleView.text = 'Input - 字体';
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

        let input1 = new Input();
        input1.text = 'Size: 默认';
        input1.style = {
            width: 80,
            height: 40,
            backgroundColor: '#FF0000',
            color: '#FFFFFF',
            placeholderColor: '#999999',
        };

        let input2 = new Input();
        input2.text = 'Size: 10';
        input2.style = {
            width: 80,
            height: 40,
            backgroundColor: '#FF0000',
            marginLeft: 10,
            color: '#FFFFFF',
            fontSize: 10,
            placeholderColor: '#999999',
        };

        let input3 = new Input();
        input3.text = 'Size: 20';
        input3.style = {
            width: 80,
            height: 40,
            backgroundColor: '#FF0000',
            marginLeft: 10,
            color: '#FFFFFF',
            fontSize: 20,
            placeholderColor: '#999999',
        };

        let input4 = new Input();
        input4.text = 'Color: Blue';
        input4.style = {
            width: 80,
            height: 40,
            backgroundColor: '#FF0000',
            marginLeft: 10,
            color: '#0000FF',
            fontSize: 14,
            placeholderColor: '#999999',
        };

        let input5 = new Input();
        input5.placeholder = '占位: Blue';
        input5.style = {
            width: 80,
            height: 40,
            backgroundColor: '#FF0000',
            marginTop: 10,
            color: '#FFFFFF',
            fontSize: 14,
            placeholderColor: '#0000FF',
        };

        let input6 = new Input();
        input6.text = '光标: Green';
        input6.style = {
            width: 80,
            height: 40,
            backgroundColor: '#FF0000',
            marginLeft: 10,
            marginTop: 10,
            color: '#FFFFFF',
            fontSize: 14,
            placeholderColor: '#999999',
            cursorColor: '#00FF00',
        };

        let input7 = new Input();
        input7.placeholder = '最多输入5字';
        input7.style = {
            width: 80,
            height: 40,
            backgroundColor: '#FF0000',
            marginLeft: 10,
            marginTop: 10,
            color: '#FFFFFF',
            fontSize: 14,
            placeholderColor: '#999999',
            maxLength: 5,
        };

        let input8 = new Input();
        input8.text = '字体';
        input8.style = {
            width: 80,
            height: 40,
            backgroundColor: '#FF0000',
            marginLeft: 10,
            marginTop: 10,
            color: '#FFFFFF',
            fontSize: 14,
            placeholderColor: '#999999',
//            fontFamily : 'New Times Roma',
        };

        layout.appendChild(input1);
        layout.appendChild(input2);
        layout.appendChild(input3);
        layout.appendChild(input4);
        layout.appendChild(input5);
        layout.appendChild(input6);
        layout.appendChild(input7);
        layout.appendChild(input8);
        this.appendChild(titleView);
        this.appendChild(layout);
    }

    formatEvent(event) {
        let type = 'event: [' + event.type + ']\n'
        let state = 'state: ' + event.state + ' - ' + this.formatEventState(event.state) + '\n';
        let position = event.position ? 'position: (' + event.position.x + ', ' + event.position.y + ')\n' : '';
        let direction = event.direction ? 'direction: ' + event.direction + '\n' : '';
        let scale = event.scale ? 'scale: ' + event.scale + '\n' : '';
        let text = event.text ? 'text: ' + event.text + '\n' : '';
        let timestamp = 'timestamp: ' + event.timestamp;
        return type + state + position + direction + scale + text + timestamp;
    }

    formatEventState(state) {
        let strState = '';
        switch(state) {
            case 0:
                strState = 'Normal';
                break;
            case 1:
                strState = 'Began';
                break;
            case 2:
                strState = 'Changed';
                break;
            case 3:
                strState = 'Ended';
                break;
            case 4:
                strState = 'Confirmed';
                break;
            default:
                strState = 'Unknown';
                break;
        }
        return strState;
    }
}

Hummer.render(new RootView());