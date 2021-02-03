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

        this.testInputInputType();

        this.testInputReturnKeyType();

        this.testTextAreaInputType();

        this.testTextAreaReturnKeyType();
    }

    testInputInputType() {
        let titleView = new Text();
        titleView.text = 'Input - 输入文本类型';
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

        let input1 = new Input();
        input1.placeholder = 'type: 不填';
        input1.style = {
            width: 110,
            height: 40,
            backgroundColor: '#FF000022',
            color: '#0000FF',
            fontSize: 14,
            placeholderColor: '#999999',
        };

        let input2 = new Input();
        input2.placeholder = 'type: default';
        input2.style = {
            width: 110,
            height: 40,
            backgroundColor: '#FF000022',
            marginLeft: 10,
            color: '#0000FF',
            fontSize: 14,
            placeholderColor: '#999999',
            type: 'default',
        };

        let input3 = new Input();
        input3.placeholder = 'type: email';
        input3.style = {
            width: 110,
            height: 40,
            backgroundColor: '#FF000022',
            marginLeft: 10,
            color: '#0000FF',
            fontSize: 14,
            placeholderColor: '#999999',
            type: 'email',
        };

        let input4 = new Input();
        input4.placeholder = 'type: number';
        input4.style = {
            width: 110,
            height: 40,
            backgroundColor: '#FF000022',
            marginTop: 10,
            color: '#0000FF',
            fontSize: 14,
            placeholderColor: '#999999',
            type: 'number',
        };

        let input5 = new Input();
        input5.placeholder = 'type: tel';
        input5.style = {
            width: 110,
            height: 40,
            backgroundColor: '#FF000022',
            marginLeft: 10,
            marginTop: 10,
            color: '#0000FF',
            fontSize: 14,
            placeholderColor: '#999999',
            type: 'tel',
        };

        let input6 = new Input();
        input6.placeholder = 'type: password';
        input6.style = {
            width: 110,
            height: 40,
            backgroundColor: '#FF000022',
            marginLeft: 10,
            marginTop: 10,
            color: '#0000FF',
            fontSize: 14,
            placeholderColor: '#999999',
            type: 'password',
        };

        layout.appendChild(input1);
        layout.appendChild(input2);
        layout.appendChild(input3);
        layout.appendChild(input4);
        layout.appendChild(input5);
        layout.appendChild(input6);
        this.appendChild(titleView);
        this.appendChild(layout);
    }

    testInputReturnKeyType() {
        let titleView = new Text();
        titleView.text = 'Input - 键盘确认按钮类型';
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
        input1.placeholder = 'type: 不填';
        input1.style = {
            width: 110,
            height: 40,
            backgroundColor: '#FF000022',
            color: '#0000FF',
            fontSize: 14,
            placeholderColor: '#999999',
        };

        let input2 = new Input();
        input2.placeholder = 'type: done';
        input2.style = {
            width: 110,
            height: 40,
            backgroundColor: '#FF000022',
            marginLeft: 10,
            color: '#0000FF',
            fontSize: 14,
            placeholderColor: '#999999',
            returnKeyType: 'done',
        };

        let input3 = new Input();
        input3.placeholder = 'type: go';
        input3.style = {
            width: 110,
            height: 40,
            backgroundColor: '#FF000022',
            marginLeft: 10,
            color: '#0000FF',
            fontSize: 14,
            placeholderColor: '#999999',
            returnKeyType: 'go',
        };

        let input4 = new Input();
        input4.placeholder = 'type: next';
        input4.style = {
            width: 110,
            height: 40,
            backgroundColor: '#FF000022',
            marginTop: 10,
            color: '#0000FF',
            fontSize: 14,
            placeholderColor: '#999999',
            returnKeyType: 'next',
        };

        let input5 = new Input();
        input5.placeholder = 'type: search';
        input5.style = {
            width: 110,
            height: 40,
            backgroundColor: '#FF000022',
            marginLeft: 10,
            marginTop: 10,
            color: '#0000FF',
            fontSize: 14,
            placeholderColor: '#999999',
            returnKeyType: 'search',
        };

        let input6 = new Input();
        input6.placeholder = 'type: send';
        input6.style = {
            width: 110,
            height: 40,
            backgroundColor: '#FF000022',
            marginLeft: 10,
            marginTop: 10,
            color: '#0000FF',
            fontSize: 14,
            placeholderColor: '#999999',
            returnKeyType: 'send',
        };

        layout.appendChild(input1);
        layout.appendChild(input2);
        layout.appendChild(input3);
        layout.appendChild(input4);
        layout.appendChild(input5);
        layout.appendChild(input6);
        this.appendChild(titleView);
        this.appendChild(layout);
    }

    testTextAreaInputType() {
        let titleView = new Text();
        titleView.text = 'TextArea - 输入文本类型';
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

        let textArea1 = new TextArea();
        textArea1.placeholder = 'type: 不填';
        textArea1.style = {
            width: 110,
            height: 50,
            backgroundColor: '#FF000022',
            color: '#0000FF',
            fontSize: 14,
            placeholderColor: '#999999',
            textLineClamp: 3,
        };

        let textArea2 = new TextArea();
        textArea2.placeholder = 'type: default';
        textArea2.style = {
            width: 110,
            height: 50,
            backgroundColor: '#FF000022',
            marginLeft: 10,
            color: '#0000FF',
            fontSize: 14,
            placeholderColor: '#999999',
            textLineClamp: 3,
            type: 'default',
        };

        let textArea3 = new TextArea();
        textArea3.placeholder = 'type: email';
        textArea3.style = {
            width: 110,
            height: 50,
            backgroundColor: '#FF000022',
            marginLeft: 10,
            color: '#0000FF',
            fontSize: 14,
            placeholderColor: '#999999',
            textLineClamp: 3,
            type: 'email',
        };

        let textArea4 = new TextArea();
        textArea4.placeholder = 'type: number';
        textArea4.style = {
            width: 110,
            height: 50,
            backgroundColor: '#FF000022',
            marginTop: 10,
            color: '#0000FF',
            fontSize: 14,
            placeholderColor: '#999999',
            textLineClamp: 3,
            type: 'number',
        };

        let textArea5 = new TextArea();
        textArea5.placeholder = 'type: tel';
        textArea5.style = {
            width: 110,
            height: 50,
            backgroundColor: '#FF000022',
            marginLeft: 10,
            marginTop: 10,
            color: '#0000FF',
            fontSize: 14,
            placeholderColor: '#999999',
            textLineClamp: 3,
            type: 'tel',
        };

        let textArea6 = new TextArea();
        textArea6.placeholder = 'type: password';
        textArea6.style = {
            width: 110,
            height: 50,
            backgroundColor: '#FF000022',
            marginLeft: 10,
            marginTop: 10,
            color: '#0000FF',
            fontSize: 14,
            placeholderColor: '#999999',
            textLineClamp: 3,
            type: 'password',
        };

        layout.appendChild(textArea1);
        layout.appendChild(textArea2);
        layout.appendChild(textArea3);
        layout.appendChild(textArea4);
        layout.appendChild(textArea5);
        layout.appendChild(textArea6);
        this.appendChild(titleView);
        this.appendChild(layout);
    }

    testTextAreaReturnKeyType() {
        let titleView = new Text();
        titleView.text = 'TextArea - 键盘确认按钮类型';
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

        let textArea1 = new TextArea();
        textArea1.placeholder = 'type: 不填';
        textArea1.style = {
            width: 110,
            height: 50,
            backgroundColor: '#FF000022',
            color: '#0000FF',
            fontSize: 14,
            placeholderColor: '#999999',
            textLineClamp: 3,
        };

        let textArea2 = new TextArea();
        textArea2.placeholder = 'type: done';
        textArea2.style = {
            width: 110,
            height: 50,
            backgroundColor: '#FF000022',
            marginLeft: 10,
            color: '#0000FF',
            fontSize: 14,
            placeholderColor: '#999999',
            textLineClamp: 3,
            returnKeyType: 'done',
        };

        let textArea3 = new TextArea();
        textArea3.placeholder = 'type: go';
        textArea3.style = {
            width: 110,
            height: 50,
            backgroundColor: '#FF000022',
            marginLeft: 10,
            color: '#0000FF',
            fontSize: 14,
            placeholderColor: '#999999',
            textLineClamp: 3,
            returnKeyType: 'go',
        };

        let textArea4 = new TextArea();
        textArea4.placeholder = 'type: next';
        textArea4.style = {
            width: 110,
            height: 50,
            backgroundColor: '#FF000022',
            marginTop: 10,
            color: '#0000FF',
            fontSize: 14,
            placeholderColor: '#999999',
            textLineClamp: 3,
            returnKeyType: 'next',
        };

        let textArea5 = new TextArea();
        textArea5.placeholder = 'type: search';
        textArea5.style = {
            width: 110,
            height: 50,
            backgroundColor: '#FF000022',
            marginLeft: 10,
            marginTop: 10,
            color: '#0000FF',
            fontSize: 14,
            placeholderColor: '#999999',
            textLineClamp: 3,
            returnKeyType: 'search',
        };

        let textArea6 = new TextArea();
        textArea6.placeholder = 'type: send';
        textArea6.style = {
            width: 110,
            height: 50,
            backgroundColor: '#FF000022',
            marginLeft: 10,
            marginTop: 10,
            color: '#0000FF',
            fontSize: 14,
            placeholderColor: '#999999',
            textLineClamp: 3,
            returnKeyType: 'send',
        };

        layout.appendChild(textArea1);
        layout.appendChild(textArea2);
        layout.appendChild(textArea3);
        layout.appendChild(textArea4);
        layout.appendChild(textArea5);
        layout.appendChild(textArea6);
        this.appendChild(titleView);
        this.appendChild(layout);
    }
}

Hummer.render(new RootView());