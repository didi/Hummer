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

        // View - 渐变角度
        this.testDeg();
    }

    testDeg() {
        let titleView = new Text();
        titleView.text = 'View - 渐变角度';
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
        };

        let text1 = new Text();
        text1.text = '0'
        text1.style = {
            width: 60,
            height: 60,
            backgroundColor: 'linear-gradient(0deg #FF000060 #00FF0060)',
            color: '#FFFFFF',
            textAlign: 'center',
        };

        let text2 = new Text();
        text2.text = '90'
        text2.style = {
            width: 60,
            height: 60,
            backgroundColor: 'linear-gradient(90deg #FF000060 #00FF0060)',
            marginLeft: 10,
            color: '#FFFFFF',
            textAlign: 'center',
        };

        let text3 = new Text();
        text3.text = '180'
        text3.style = {
            width: 60,
            height: 60,
            backgroundColor: 'linear-gradient(180deg #FF000060 #00FF0060)',
            marginLeft: 10,
            color: '#FFFFFF',
            textAlign: 'center',
        };

        let text4 = new Text();
        text4.text = '270'
        text4.style = {
            width: 60,
            height: 60,
            backgroundColor: 'linear-gradient(270deg #FF000060 #00FF0060)',
            marginLeft: 10,
            color: '#FFFFFF',
            textAlign: 'center',
        };

        let text5 = new Text();
        text5.text = '360'
        text5.style = {
            width: 60,
            height: 60,
            backgroundColor: 'linear-gradient(360deg #FF000060 #00FF0060)',
            marginLeft: 10,
            color: '#FFFFFF',
            textAlign: 'center',
        };

        let subLayout2 = new View();
        subLayout2.style = {
            flexDirection: 'row',
        };

        let text6 = new Text();
        text6.text = '45'
        text6.style = {
            width: 60,
            height: 60,
            backgroundColor: 'linear-gradient(45deg #FF000060 #00FF0060)',
            marginTop: 10,
            color: '#FFFFFF',
            textAlign: 'center',
        };

        let text7 = new Text();
        text7.text = '135'
        text7.style = {
            width: 60,
            height: 60,
            backgroundColor: 'linear-gradient(135deg #FF000060 #00FF0060)',
            marginLeft: 10,
            marginTop: 10,
            color: '#FFFFFF',
            textAlign: 'center',
        };

        let text8 = new Text();
        text8.text = '225'
        text8.style = {
            width: 60,
            height: 60,
            backgroundColor: 'linear-gradient(225deg #FF000060 #00FF0060)',
            marginLeft: 10,
            marginTop: 10,
            color: '#FFFFFF',
            textAlign: 'center',
        };

        let text9 = new Text();
        text9.text = '315'
        text9.style = {
            width: 60,
            height: 60,
            backgroundColor: 'linear-gradient(315deg #FF000060 #00FF0060)',
            marginLeft: 10,
            marginTop: 10,
            color: '#FFFFFF',
            textAlign: 'center',
        };

        let text10 = new Text();
        text10.text = '405'
        text10.style = {
            width: 60,
            height: 60,
            backgroundColor: 'linear-gradient(405deg #FF000060 #00FF0060)',
            marginLeft: 10,
            marginTop: 10,
            color: '#FFFFFF',
            textAlign: 'center',
        };

        layout.appendChild(subLayout1);
        layout.appendChild(subLayout2);
        subLayout1.appendChild(text1);
        subLayout1.appendChild(text2);
        subLayout1.appendChild(text3);
        subLayout1.appendChild(text4);
        subLayout1.appendChild(text5);
        subLayout2.appendChild(text6);
        subLayout2.appendChild(text7);
        subLayout2.appendChild(text8);
        subLayout2.appendChild(text9);
        subLayout2.appendChild(text10);
        this.appendChild(titleView);
        this.appendChild(layout);
    }
}

Hummer.render(new RootView());