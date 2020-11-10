class RootView extends View {
    initialize() {
        let environment = Hummer.env;
        this.style = {
            marginTop: '88',
            height: environment.deviceHeight,
        }

        //View - 背景
        this.testBackground();

        //View - 边框
        this.testBorder();

        //View - 阴影
        this.testShadow();

        //View - 透明度
        this.testOpacity();

        //View - 显示
        this.testDisplay();

        //View - 超出边界
        this.testOverflow();

    }

    testBackground() {
        let titleView = new Text();
        titleView.text = 'View - 背景';
        titleView.style = {
            color: '#333333',
            fontSize: 16,
            marginTop: 10,
            marginLeft: 10,
        };

        let layout = new View();
        layout.style = {
            flexDirection: 'row',
            marginLeft: 10,
            marginRight: 10,
            borderWidth: 1,
            borderColor: '#22222222',
        };

        let view1 = new View();
        view1.style = {
            width: 60,
            height: 60,
            backgroundColor: '#FF0000',
            margin: 10,
        };

        let view2 = new View();
        view2.style = {
            width: 60,
            height: 60,
            backgroundColor: '#FF000044',
            margin: 10,
        };

        let view3 = new View();
        view3.style = {
            width: 60,
            height: 60,
            backgroundColor: 'linear-gradient(45deg #00000000 #000000A0)',
            margin: 10,
            shadow: '5 5 20 #00FF00',
            borderWidth: 1,
            borderRadius: 5
        };

        let view4 = new View();
        view4.style = {
            width: 60,
            height: 60,
            backgroundImage: 'njimage_demo',
            shadow: '5 5 20 #FF0000',
            margin: 10,
            borderWidth: 1,
            borderRadius: 10
        };

        layout.appendChild(view1);
        layout.appendChild(view2);
        layout.appendChild(view3);
        layout.appendChild(view4);
        this.appendChild(titleView);
        this.appendChild(layout);
    }

    testBorder() {
        let titleView = new Text();
        titleView.text = 'View - 边框';
        titleView.style = {
            color: '#333333',
            fontSize: 16,
            marginTop: 10,
            marginLeft: 10,
        };

        let layout = new View();
        layout.style = {
            flexDirection: 'row',
            marginLeft: 10,
            marginRight: 10,
            borderTopWidth: 1,
            borderBottomWidth: 5,
            // borderRadius: '50%',
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: '20%',
            borderTopRightRadius: 30,
            borderBottomRightRadius: 40,
            borderTopStyle: 'dotted',
            borderBottomStyle: 'dashed',
            borderTopColor: '#000000',
            borderBottomColor: '#FF0000',
            backgroundImage: 'njimage_demo'
        };

        let view1 = new View();
        view1.style = {
            width: '10%',
            height: 60,
            backgroundColor: '#FF0000',
            margin: 10,
            borderWidth: 5,
            borderColor: '#222222',
            borderStyle: 'solid',
            borderRadius: 10,
        };

        let view2 = new View();
        view2.style = {
            width: 60,
            height: 60,
            backgroundColor: '#FF000044',
            margin: 10,
            borderWidth: 5,
            borderColor: '#00000080',
            borderRadius: 10,
            borderStyle: 'dashed',
        };

        let view3 = new View();
        view3.style = {
            width: 60,
            height: 60,
            backgroundColor: '#FF000044',
            margin: 10,
            borderWidth: 5,
            borderColor: '#00000080',
            borderRadius: 10,
            borderStyle: 'dotted',
        };

        let view4 = new View();
        view4.style = {
            width: 60,
            height: 60,
            backgroundColor: 'linear-gradient(90deg #FF000060 #00FF0060)',
            margin: 10,
            borderRadius: 10,
            borderColor: "#000000",
            borderWidth: 5
        };

        let view5 = new View();
        view5.style = {
            width: 60,
            height: 60,
            backgroundColor: 'linear-gradient(90deg #FF000060 #00FF0060)',
            margin: 10,
            borderRadius: 60,
            borderColor: "#000000",
            borderWidth: 2
        };

        layout.appendChild(view1);
        layout.appendChild(view2);
        layout.appendChild(view3);
        layout.appendChild(view4);
        layout.appendChild(view5);
        this.appendChild(titleView);
        this.appendChild(layout);
    }

    testShadow() {
        let titleView = new Text();
        titleView.text = 'View - 阴影';
        titleView.style = {
            color: '#333333',
            fontSize: 16,
            marginTop: 10,
            marginLeft: 10,
        };

        let layout = new View();
        layout.style = {
            flexDirection: 'row',
            marginLeft: 10,
            marginRight: 10,
            borderWidth: 1,
            borderColor: '#22222222',
        };

        let view1 = new View();
        view1.style = {
            width: 60,
            height: 60,
            backgroundColor: '#FF0000',
            margin: 10,
            shadow: '5 5 10 #000000',
        };

        let view2 = new View();
        view2.style = {
            width: 60,
            height: 60,
            backgroundColor: '#FF0000',
            margin: 10,
            borderRadius: 10,
            shadow: '5 5 10 #000000',
        };

        layout.appendChild(view1);
        layout.appendChild(view2);
        this.appendChild(titleView);
        this.appendChild(layout);
    }

    testOpacity() {
        let titleView = new Text();
        titleView.text = 'View - 透明度';
        titleView.style = {
            color: '#333333',
            fontSize: 16,
            marginTop: 10,
            marginLeft: 10,
        };

        let layout = new View();
        layout.style = {
            flexDirection: 'row',
            marginLeft: 10,
            marginRight: 10,
            borderWidth: 1,
            borderColor: '#22222222',
        };

        let view1 = new View();
        view1.style = {
            width: 60,
            height: 60,
            backgroundColor: '#FF0000',
            margin: 10,
            opacity: 0.3,
        };

        let view2 = new View();
        view2.style = {
            width: 60,
            height: 60,
            backgroundColor: '#FF0000',
            margin: 10,
            opacity: 0.7,
        };

        layout.appendChild(view1);
        layout.appendChild(view2);
        this.appendChild(titleView);
        this.appendChild(layout);
    }

    testDisplay() {
        let titleView = new Text();
        titleView.text = 'View - 显示';
        titleView.style = {
            color: '#333333',
            fontSize: 16,
            marginTop: 10,
            marginLeft: 10,
        };

        let layout = new View();
        layout.style = {
            flexDirection: 'row',
            marginLeft: 10,
            marginRight: 10,
            borderWidth: 1,
            borderColor: '#22222222',
        };

        let view1 = new View();
        view1.style = {
            width: 60,
            height: 60,
            backgroundColor: '#FF0000',
            margin: 10,
        };

        let view2 = new View();
        view2.style = {
            width: 60,
            height: 60,
            backgroundColor: '#00FF00',
            margin: 10,
        };

        let view3 = new View();
        view3.style = {
            width: 60,
            height: 60,
            backgroundColor: '#0000FF',
            margin: 10,
        };

        let view4 = new View();
        view4.style = {
            width: 60,
            height: 60,
            backgroundColor: '#00FFFF',
            margin: 10,
        };

        let button = new Button();
        button.text = '隐藏';
        button.style = {
            position: 'absolute',
            width: 60,
            height: 40,
            top: 20,
            right: 10,
        };
        button.addEventListener('tap', (event) => {
            let isHide = view1.style.display === 'none';
            view1.style = {
                display: isHide ? 'flex' : 'none',
            };
            view2.style = {
                visibility: isHide ? 'visible' : 'hidden',
            };
            if (isHide) {
                layout.appendChild(view3);
            } else {
                layout.removeChild(view3);
            }
            button.text = isHide ? '隐藏' : '显示';
        });

        layout.appendChild(view1);
        layout.appendChild(view2);
        layout.appendChild(view3);
        layout.appendChild(view4);
        layout.appendChild(button);
        this.appendChild(titleView);
        this.appendChild(layout);
    }

    testOverflow() {
        let titleView = new Text();
        titleView.text = 'View - 超出边界';
        titleView.style = {
            color: '#333333',
            fontSize: 16,
            marginTop: 10,
            marginLeft: 10,
        };

        let layout = new View();
        layout.style = {
            flexDirection: 'row',
            marginLeft: 10,
            marginRight: 10,
            borderWidth: 1,
            borderColor: '#22222222',
        };

        let view1 = new View();
        view1.style = {
            width: 50,
            height: 50,
            backgroundColor: '#FF000040',
            margin: 10,
            overflow: 'visible',
        };

        let view2 = new View();
        view2.style = {
            width: 50,
            height: 50,
            backgroundColor: '#0000FF40',
            marginLeft: 20,
            marginTop: 10,
            overflow: 'visible',
        };

        view1.appendChild(view2);
        layout.appendChild(view1);
        this.appendChild(titleView);
        this.appendChild(layout);
    }

}

Hummer.render(new RootView());