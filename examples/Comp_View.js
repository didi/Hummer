class RootView extends View {
    constructor() {
        super();
        this.style = {
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
        }

        this.scroller = new Scroller();
        this.appendChild(this.scroller);

        // View - 背景
        this.testBackground();

        // View - 边框
        this.testBorder();

        // View - 阴影
        this.testShadow();

        // View - 透明度
        this.testOpacity();

        // View - 显示
        this.testDisplay();

        // View - 超出边界
        this.testOverflow();

    }

    testBackground() {
        let titleView = new Text();
        titleView.text = 'View - 背景';
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
        };

        let view1 = new View();
        view1.style = {
            width: 60,
            height: 60,
            backgroundColor: '#FF0000',
        };

        let view2 = new View();
        view2.style = {
            width: 60,
            height: 60,
            backgroundColor: '#FF000044',
            marginLeft: 10,
        };

        let view3 = new View();
        view3.style = {
            width: 60,
            height: 60,
            backgroundColor: 'linear-gradient(90deg #00DC3200 #00C3C2FF)',
            marginLeft: 10,
        };

        let view4 = new View();
        view4.style = {
            width: 60,
            height: 60,
            backgroundImage: 'njimage_demo',
            marginLeft: 10,
            borderRadius: 10,
        };

        let view5 = new View();
        view5.style = {
            width: 60,
            height: 60,
            backgroundImage: 'http://b-ssl.duitang.com/uploads/item/201503/08/20150308143143_wCVJF.jpeg',
            marginLeft: 10,
            zIndex: 10,
            borderRadius: 10,
        };

        layout.appendChild(view1);
        layout.appendChild(view2);
        layout.appendChild(view3);
        layout.appendChild(view4);
        layout.appendChild(view5);
        this.scroller.appendChild(titleView);
        this.scroller.appendChild(layout);
    }

    testBorder() {
        let titleView = new Text();
        titleView.text = 'View - 边框';
        titleView.style = {
            color: '#333333',
            fontSize: 16,
            marginTop: 10,
        };

        let layout = new View();
        layout.style = {
            padding: 10,
            borderWidth: 1,
            borderColor: '#22222222',
        };

        let subLayout1 = new View();
        subLayout1.style = {
            flexDirection: 'row',
        };

        let subLayout2 = new View();
        subLayout2.style = {
            flexDirection: 'row',
        };

        let view1 = new View();
        view1.style = {
            width: 60,
            height: 60,
            backgroundColor: '#FF0000',
            borderLeftStyle: 'solid',
            borderLeftWidth: 10,
            borderTopWidth: 5,
            borderRightWidth: 30,
            borderBottomWidth: 5,
            borderLeftColor: '#000000E0',
            borderRightColor: '#00FFFFE0',
            borderTopColor: '#FFFF00E0',
            borderBottomColor: '#0000FFE0',
            borderRadius: 20,
        };

        let view2 = new View();
        view2.style = {
            width: 60,
            height: 60,
            backgroundColor: '#FF000044',
            marginLeft: 10,
            borderLeftWidth: 0,
            borderTopWidth: 50,
            borderRightWidth: 50,
            borderBottomWidth: 50,
            borderRightColor: '#00000080',
            borderTopColor: '#FFFF0080',
            borderBottomColor: '#0000FF80',
            borderRadius: 10,
            borderStyle: 'solid',
        };

        let view3 = new View();
        view3.style = {
            width: 60,
            height: 60,
            backgroundColor: '#FF000044',
            marginLeft: 10,
            borderLeftWidth: 15,
            borderTopWidth: 6,
            borderRightWidth: 3,
//            borderLeftColor: '#FF000080',
            borderRightColor: '#00000080',
            borderTopColor: '#00FF0080',
            borderBottomColor: '#0000FF80',
            borderRadius: 10,
            borderLeftStyle: 'solid',
            borderRightStyle: 'solid',
            borderTopStyle: 'solid',
            borderBottomStyle: 'solid',
        };

        let view4 = new View();
        view4.style = {
            width: 60,
            height: 60,
            backgroundColor: 'linear-gradient(90deg #FF000060 #00FF0060)',
            marginLeft: 10,
            borderRadius: 10,
        };

        let view5 = new View();
        view5.style = {
            width: 60,
            height: 60,
            backgroundColor: 'linear-gradient(90deg #FF000060 #00FF0060)',
            marginLeft: 10,
            borderRadius: 30,
        };

        let view6 = new View();
        view6.style = {
            width: 60,
            height: 60,
            marginTop: 10,
            borderLeftWidth: 6,
            borderTopWidth: 6,
            borderRightWidth: 6,
            borderBottomWidth: 14,
            borderLeftColor: '#000000E0',
            borderTopColor: '#00FF0080',
            borderRightColor: '#00FFFFE0',
            borderBottomColor: '#0000FFE0',
            borderStyle: 'solid',
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
        };

        let view7 = new View();
        view7.style = {
            width: 60,
            height: 60,
            marginTop: 10,
            marginLeft: 10,
            backgroundColor: '#FF000044',
            borderLeftWidth: 6,
            borderTopWidth: 6,
            borderRightWidth: 6,
            borderBottomWidth: 14,
            borderLeftColor: '#000000E0',
            borderTopColor: '#00FF0080',
            borderRightColor: '#00FFFFE0',
            borderBottomColor: '#0000FFE0',
            borderStyle: 'solid',
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
        };

        let view8 = new View();
        view8.style = {
            width: 60,
            height: 60,
            marginTop: 10,
            marginLeft: 10,
            borderLeftWidth: 6,
            borderTopWidth: 6,
            borderRightWidth: 14,
            borderBottomWidth: 6,
            borderLeftColor: '#000000E0',
            borderTopColor: '#00FF0080',
            borderRightColor: '#00FFFFE0',
            borderBottomColor: '#0000FFE0',
            borderStyle: 'solid',
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
        };

        let view9 = new View();
        view9.style = {
            width: 60,
            height: 60,
            marginTop: 10,
            marginLeft: 10,
            backgroundColor: '#FF000044',
            borderLeftWidth: 6,
            borderTopWidth: 6,
            borderRightWidth: 14,
            borderBottomWidth: 6,
            borderLeftColor: '#000000E0',
            borderTopColor: '#00FF0080',
            borderRightColor: '#00FFFFE0',
            borderBottomColor: '#0000FFE0',
            borderStyle: 'solid',
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
        };

        subLayout1.appendChild(view1);
        subLayout1.appendChild(view2);
        subLayout1.appendChild(view3);
        subLayout1.appendChild(view4);
        subLayout1.appendChild(view5);
        subLayout2.appendChild(view6);
        subLayout2.appendChild(view7);
        subLayout2.appendChild(view8);
        subLayout2.appendChild(view9);
        layout.appendChild(subLayout1);
        layout.appendChild(subLayout2);
        this.scroller.appendChild(titleView);
        this.scroller.appendChild(layout);
    }

    testShadow() {
        let titleView = new Text();
        titleView.text = 'View - 阴影';
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
        };

        let view1 = new View();
        view1.style = {
            width: 60,
            height: 60,
            backgroundColor: '#FF0000',
            borderTopRightRadius: 10,
            borderBottomLeftRadius: 10,
            shadow: '5 5 10 #000000',
        };

        let view2 = new View();
        view2.style = {
            width: 60,
            height: 60,
            backgroundColor: '#FF0000',
            marginLeft: 10,
            borderTopLeftRadius: 10,
            borderBottomRightRadius: 10,
            shadow: '5 5 10 #000000',
        };

        layout.appendChild(view1);
        layout.appendChild(view2);
        this.scroller.appendChild(titleView);
        this.scroller.appendChild(layout);
    }

    testOpacity() {
        let titleView = new Text();
        titleView.text = 'View - 透明度';
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
        };

        let view1 = new View();
        view1.style = {
            width: 60,
            height: 60,
            backgroundColor: '#FF0000',
            opacity: 0.3,
        };

        let view2 = new View();
        view2.style = {
            width: 60,
            height: 60,
            backgroundColor: '#FF0000',
            marginLeft: 10,
            opacity: 0.7,
        };

        layout.appendChild(view1);
        layout.appendChild(view2);
        this.scroller.appendChild(titleView);
        this.scroller.appendChild(layout);
    }

    testDisplay() {
        let titleView = new Text();
        titleView.text = 'View - 显示';
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
        };

        let view1 = new View();
        view1.style = {
            width: 60,
            height: 60,
            backgroundColor: '#FF0000',
        };

        let view2 = new View();
        view2.style = {
            width: 60,
            height: 60,
            backgroundColor: '#00FF00',
            marginLeft: 10,
        };

        let view3 = new View();
        view3.style = {
            width: 60,
            height: 60,
            backgroundColor: '#0000FF',
            marginLeft: 10,
        };

        let view4 = new View();
        view4.style = {
            width: 60,
            height: 60,
            backgroundColor: '#00FFFF',
            marginLeft: 10,
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
        this.scroller.appendChild(titleView);
        this.scroller.appendChild(layout);
    }

    testOverflow() {
        let titleView = new Text();
        titleView.text = 'View - 超出边界';
        titleView.style = {
            color: '#333333',
            fontSize: 16,
            marginTop: 10,
        };

        let layout = new View();
        layout.style = {
            flexDirection: 'row',
            height: 80,
            padding: 10,
            borderWidth: 1,
            borderColor: '#22222222',
        };

        let view1 = new View();
        view1.style = {
            width: 50,
            height: 50,
            backgroundColor: '#FF000040',
        };

        let view2 = new View();
        view2.style = {
            width: 50,
            height: 50,
            backgroundColor: '#0000FF40',
            marginLeft: 20,
            marginTop: 10,
            overflow: 'hidden',
        };

        let view3 = new View();
        view3.style = {
            width: 50,
            height: 50,
            backgroundColor: '#0000FF40',
            marginLeft: 20,
            marginTop: 10,
        };

        view2.appendChild(view3);
        view1.appendChild(view2);
        layout.appendChild(view1);
        this.scroller.appendChild(titleView);
        this.scroller.appendChild(layout);
    }
}

Hummer.render(new RootView());