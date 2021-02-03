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

        this.testTextAlign();

        this.testTextStyle();

        this.testTextLineNum();

        this.testTextSingleLineStyle();
    }

    testBackground() {
        let titleView = new Text();
        titleView.text = 'Text - 背景';
        titleView.style = {
            color: '#333333',
            fontSize: 16,
        };

        let layout = new View();
        layout.style = {
            flexDirection: 'row',
            padding: 10,
            borderWidth: 1,
            borderColor: '#22222222',
            flexWrap: 'wrap',
        };

        let text1 = new Text();
        text1.text = 'text1';
        text1.style = {
            width: 70,
            height: 30,
            backgroundColor: '#FF0000',
            color: '#FFFFFF',
            textAlign: 'center',
        };

        let text2 = new Text();
        text2.text = 'text2';
        text2.style = {
            width: 70,
            height: 30,
            backgroundColor: '#FF000044',
            marginLeft: 10,
            color: '#FFFFFF',
            textAlign: 'center',
        };

        let text3 = new Text();
        text3.text = 'text3';
        text3.style = {
            width: 70,
            height: 30,
            backgroundColor: 'linear-gradient(90deg #FF000060 #00FF0060)',
            marginLeft: 10,
            color: '#FFFFFF',
            textAlign: 'center',
        };

        let text4 = new Text();
        text4.text = 'text4';
        text4.style = {
            width: 70,
            height: 30,
            backgroundImage: 'njimage_demo',
            marginLeft: 10,
            color: '#FFFFFF',
            textAlign: 'center',
        };

        let text5 = new Text();
        text5.text = 'text5';
        text5.style = {
            width: 70,
            height: 30,
            backgroundColor: '#FF000044',
            marginTop: 10,
            color: '#FFFFFF',
            textAlign: 'center',
            borderWidth: 2,
            borderColor: '#000000',
            borderRadius: 10,
        };

        let text6 = new Text();
        text6.text = 'text6';
        text6.style = {
            width: 70,
            height: 30,
            backgroundColor: '#FF000044',
            marginLeft: 10,
            marginTop: 10,
            color: '#FFFFFF',
            textAlign: 'center',
            borderRadius: 10,
        };

        let text7 = new Text();
        text7.text = 'text7';
        text7.style = {
            width: 70,
            height: 30,
            backgroundColor: 'linear-gradient(90deg #FF000060 #00FF0060)',
            marginLeft: 10,
            marginTop: 10,
            color: '#FFFFFF',
            textAlign: 'center',
            borderRadius: 10,
        };

        layout.appendChild(text1);
        layout.appendChild(text2);
        layout.appendChild(text3);
        layout.appendChild(text4);
        layout.appendChild(text5);
        layout.appendChild(text6);
        layout.appendChild(text7);
        this.appendChild(titleView);
        this.appendChild(layout);
    }

    testTextAlign() {
        let titleView = new Text();
        titleView.text = 'Text - 文本对齐方式';
        titleView.style = {
            color: '#333333',
            fontSize: 16,
            marginTop: 10,
        };

        let layout = new View();
        layout.style = {
            flexDirection: 'row',
            padding: 10,
            borderWidth: 1,
            borderColor: '#22222222',
            flexWrap: 'wrap',
        };

        let text1 = new Text();
        text1.text = 'left';
        text1.style = {
            width: 70,
            height: 40,
            backgroundColor: '#FF0000',
            color: '#FFFFFF',
            textAlign: 'left'
        };

        let text2 = new Text();
        text2.text = 'center';
        text2.style = {
            width: 70,
            height: 40,
            backgroundColor: '#FF0000',
            marginLeft: 10,
            color: '#FFFFFF',
            textAlign: 'center'
        };

        let text3 = new Text();
        text3.text = 'right';
        text3.style = {
            width: 70,
            height: 40,
            backgroundColor: '#FF0000',
            marginLeft: 10,
            color: '#FFFFFF',
            textAlign: 'right'
        };

        layout.appendChild(text1);
        layout.appendChild(text2);
        layout.appendChild(text3);
        this.appendChild(titleView);
        this.appendChild(layout);
    }

    testTextStyle() {
        let titleView = new Text();
        titleView.text = 'Text - 样式';
        titleView.style = {
            color: '#333333',
            fontSize: 16,
            marginTop: 10,
        };

        let layout = new View();
        layout.style = {
            flexDirection: 'row',
            padding: 10,
            borderWidth: 1,
            borderColor: '#22222222',
            flexWrap: 'wrap',
        };

        let text1 = new Text();
        text1.text = 'Size: 默认';
        text1.style = {
            width: 70,
            height: 30,
            backgroundColor: '#FF0000',
            color: '#FFFFFF',
            textAlign: 'center',
        };

        let text2 = new Text();
        text2.text = 'Size: 10';
        text2.style = {
            width: 70,
            height: 30,
            backgroundColor: '#FF0000',
            marginLeft: 10,
            color: '#FFFFFF',
            textAlign: 'center',
            fontSize: 10,
        };

        let text3 = new Text();
        text3.text = 'Size: 20';
        text3.style = {
            width: 90,
            height: 30,
            backgroundColor: '#FF0000',
            marginLeft: 10,
            color: '#FFFFFF',
            textAlign: 'center',
            fontSize: 20,
        };

        let text4 = new Text();
        text4.text = 'Color: Blue';
        text4.style = {
            width: 70,
            height: 30,
            backgroundColor: '#FF0000',
            marginLeft: 10,
            color: '#0000FF',
            textAlign: 'center',
        };

        let text5 = new Text();
        text5.text = 'bold';
        text5.style = {
            width: 70,
            height: 30,
            backgroundColor: '#FF0000',
            marginTop: 10,
            color: '#FFFFFF',
            textAlign: 'center',
            fontWeight: 'bold'
        };

        let text6 = new Text();
        text6.text = 'italic';
        text6.style = {
            width: 70,
            height: 30,
            backgroundColor: '#FF0000',
            marginLeft: 10,
            marginTop: 10,
            color: '#FFFFFF',
            textAlign: 'center',
            fontStyle: 'italic'
        };

        let text7 = new Text();
        text7.text = 'underline';
        text7.style = {
            width: 70,
            height: 30,
            backgroundColor: '#FF0000',
            marginLeft: 10,
            marginTop: 10,
            color: '#FFFFFF',
            textAlign: 'center',
            textDecoration : 'underline',
        };

        let text8 = new Text();
        text8.text = 'line-through';
        text8.style = {
            width: 90,
            height: 30,
            backgroundColor: '#FF0000',
            marginLeft: 10,
            marginTop: 10,
            color: '#FFFFFF',
            textAlign: 'center',
            textDecoration : 'line-through',
        };

        let text9 = new Text();
        text9.text = '字体';
        text9.style = {
            width: 70,
            height: 30,
            backgroundColor: '#FF0000',
            marginTop: 10,
            color: '#FFFFFF',
            textAlign: 'center',
            fontFamily : 'New Times Roma',
        };

        let text10 = new Text();
        text10.formattedText = '我是<font color=\"#0000FF\">蓝色</font>的';
        text10.style = {
            width: 80,
            height: 30,
            backgroundColor: '#FF0000',
            marginLeft: 10,
            marginTop: 10,
            color: '#FFFFFF',
            textAlign: 'center',
        };

        layout.appendChild(text1);
        layout.appendChild(text2);
        layout.appendChild(text3);
        layout.appendChild(text4);
        layout.appendChild(text5);
        layout.appendChild(text6);
        layout.appendChild(text7);
        layout.appendChild(text8);
        layout.appendChild(text9);
        layout.appendChild(text10);
        this.appendChild(titleView);
        this.appendChild(layout);
    }

    testTextLineNum() {
        let titleView = new Text();
        titleView.text = 'Text - 文本行数';
        titleView.style = {
            color: '#333333',
            fontSize: 16,
            marginTop: 10,
        };

        let layout = new View();
        layout.style = {
            flexDirection: 'row',
            alignItems: 'center',
            padding:10,
            borderWidth: 1,
            borderColor: '#22222222',
            flexWrap: 'wrap',
        };

        let text1 = new Text();
        text1.text = '这是一个单行测试文本';
        text1.style = {
            width: 100,
            backgroundColor: '#FF0000',
            color: '#FFFFFF',
            textLineClamp: 1,
        };

        let text2 = new Text();
        text2.text = '这是一个两行测试文本';
        text2.style = {
            width: 100,
            backgroundColor: '#FF0000',
            marginLeft: 10,
            color: '#FFFFFF',
            textLineClamp: 2,
        };

        let text3 = new Text();
        text3.text = '这是一个不限制行数的测试文本~~~~';
        text3.style = {
            width: 100,
            backgroundColor: '#FF0000',
            marginLeft: 10,
            color: '#FFFFFF',
            textLineClamp: 0,
        };

        layout.appendChild(text1);
        layout.appendChild(text2);
        layout.appendChild(text3);
        this.appendChild(titleView);
        this.appendChild(layout);
    }

    testTextSingleLineStyle() {
        let titleView = new Text();
        titleView.text = 'Text - 文本省略样式';
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

        let text1 = new Text();
        text1.text = 'ellipsis 这是一个单行测试文本';
        text1.style = {
            width: 160,
            backgroundColor: '#FF0000',
            color: '#FFFFFF',
            textLineClamp: 1,
            textOverflow: 'ellipsis',
        };

        let text2 = new Text();
        text2.text = 'ellipsis 这是一个两行测试文本测试文本测试文本测试文本';
        text2.style = {
            width: 160,
            backgroundColor: '#FF0000',
            marginLeft: 10,
            color: '#FFFFFF',
            textLineClamp: 2,
            textOverflow: 'ellipsis',
        };

        let text3 = new Text();
        text3.text = 'clip 这是一个单行测试文本';
        text3.style = {
            width: 160,
            backgroundColor: '#FF0000',
            marginTop: 10,
            color: '#FFFFFF',
            textLineClamp: 1,
            textOverflow: 'clip',
        };

        let text4 = new Text();
        text4.text = 'clip 这是一个两行测试文本测试文本测试文本测试文本';
        text4.style = {
            width: 160,
            backgroundColor: '#FF0000',
            marginLeft: 10,
            marginTop: 10,
            color: '#FFFFFF',
            textLineClamp: 2,
            textOverflow: 'clip',
        };

        layout.appendChild(text1);
        layout.appendChild(text2);
        layout.appendChild(text3);
        layout.appendChild(text4);
        this.appendChild(titleView);
        this.appendChild(layout);
    }
}

Hummer.render(new RootView());