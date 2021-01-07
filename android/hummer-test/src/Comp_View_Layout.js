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

        this.testMargin();

        this.testPadding();

        this.testAbsolute();
    }

    testMargin() {
        let titleView = new Text();
        titleView.text = 'View - Margin';
        titleView.style = {
            color: '#333333',
            fontSize: 16,
        };

        let viewLayout = new View();
        viewLayout.style = {
            flexDirection: 'row',
            padding: 10,
            borderWidth: 1,
            borderColor: '#22222222',
            flexWrap: 'wrap',
        };

        // marginLeft: 10
        let subLayout1 = new View();
        subLayout1.style = {
            alignItems: 'center',
        };
        let view1 = new View();
        view1.style = {
            width: 70,
            height: 70,
            backgroundColor: '#FF000022',
            justifyContent: 'center',
        };

        let child1 = new View();
        child1.style = {
            width: 20,
            height: 20,
            marginLeft: 10,
            backgroundColor: '#0000FF',
        };

        let text1 = new Text();
        text1.text = 'margLeft: 10';
        text1.style = {
            fontSize: 10,
            textAlign: 'center',
        };

        // marginTop: 10
        let subLayout2 = new View();
        subLayout2.style = {
            alignItems: 'center',
            marginLeft: 10,
        };
        let view2 = new View();
        view2.style = {
            width: 70,
            height: 70,
            backgroundColor: '#FF000022',
            alignItems: 'center',
        };

        let child2 = new View();
        child2.style = {
            width: 20,
            height: 20,
            marginTop: 10,
            backgroundColor: '#0000FF',
        };

        let text2 = new Text();
        text2.text = 'marginTop: 10';
        text2.style = {
            fontSize: 10,
            textAlign: 'center',
        };

        // marginRight: 10
        let subLayout3 = new View();
        subLayout3.style = {
            alignItems: 'center',
            marginLeft: 10,
        };
        let view3 = new View();
        view3.style = {
            width: 70,
            height: 70,
            backgroundColor: '#FF000022',
            justifyContent: 'center',
            alignItems: 'flex-end',
        };

        let child3 = new View();
        child3.style = {
            width: 20,
            height: 20,
            marginRight: 10,
            backgroundColor: '#0000FF',
        };

        let text3 = new Text();
        text3.text = 'marginRight: 10';
        text3.style = {
            fontSize: 10,
            textAlign: 'center',
        };

        // marginBottom: 10
        let subLayout4 = new View();
        subLayout4.style = {
            alignItems: 'center',
            marginLeft: 10,
            marginRight: 20,
        };
        let view4 = new View();
        view4.style = {
            width: 70,
            height: 70,
            backgroundColor: '#FF000022',
            justifyContent: 'flex-end',
            alignItems: 'center',
        };

        let child4 = new View();
        child4.style = {
            width: 20,
            height: 20,
            marginBottom: 10,
            backgroundColor: '#0000FF',
        };

        let text4 = new Text();
        text4.text = 'marginBottom: 10';
        text4.style = {
            fontSize: 10,
            textAlign: 'center',
        };

        // margin: 10
        let subLayout5 = new View();
        subLayout5.style = {
            alignItems: 'center',
            marginTop: 10,
        };

        let view5 = new View();
        view5.style = {
            backgroundColor: '#FF000022',
            justifyContent: 'center',
            alignItems: 'center',
        };

        let child5 = new View();
        child5.style = {
            width: 20,
            height: 20,
            margin: 10,
            backgroundColor: '#0000FF',
        };

        let text5 = new Text();
        text5.text = 'margin: 10';
        text5.style = {
            fontSize: 10,
            textAlign: 'center',
        };

        view1.appendChild(child1);
        subLayout1.appendChild(view1);
        subLayout1.appendChild(text1);
        viewLayout.appendChild(subLayout1);

        view2.appendChild(child2);
        subLayout2.appendChild(view2);
        subLayout2.appendChild(text2);
        viewLayout.appendChild(subLayout2);

        view3.appendChild(child3);
        subLayout3.appendChild(view3);
        subLayout3.appendChild(text3);
        viewLayout.appendChild(subLayout3);

        view4.appendChild(child4);
        subLayout4.appendChild(view4);
        subLayout4.appendChild(text4);
        viewLayout.appendChild(subLayout4);

        view5.appendChild(child5);
        subLayout5.appendChild(view5);
        subLayout5.appendChild(text5);
        viewLayout.appendChild(subLayout5);

        this.appendChild(titleView);
        this.appendChild(viewLayout);
    }

    testPadding() {
        let titleView = new Text();
        titleView.text = 'View - Padding';
        titleView.style = {
            color: '#333333',
            fontSize: 16,
            marginTop: 10,
        };

        let viewLayout = new View();
        viewLayout.style = {
            flexDirection: 'row',
            padding: 10,
            borderWidth: 1,
            borderColor: '#22222222',
            flexWrap: 'wrap',
        };

        // paddingLeft: 10
        let subLayout1 = new View();
        subLayout1.style = {
            alignItems: 'center',
        };
        let view1 = new View();
        view1.style = {
            width: 70,
            height: 70,
            backgroundColor: '#FF000022',
            justifyContent: 'center',
            paddingLeft: 10,
        };

        let child1 = new View();
        child1.style = {
            width: 20,
            height: 20,
            backgroundColor: '#0000FF',
        };

        let text1 = new Text();
        text1.text = 'paddingLeft: 10';
        text1.style = {
            fontSize: 10,
            textAlign: 'center',
        };

        // paddingTop: 10
        let subLayout2 = new View();
        subLayout2.style = {
            alignItems: 'center',
            marginLeft: 10,
        };
        let view2 = new View();
        view2.style = {
            width: 70,
            height: 70,
            backgroundColor: '#FF000022',
            alignItems: 'center',
            paddingTop: 10,
        };

        let child2 = new View();
        child2.style = {
            width: 20,
            height: 20,
            backgroundColor: '#0000FF',
        };

        let text2 = new Text();
        text2.text = 'paddingTop: 10';
        text2.style = {
            fontSize: 10,
            textAlign: 'center',
        };

        // paddingRight: 10
        let subLayout3 = new View();
        subLayout3.style = {
            alignItems: 'center',
            marginLeft: 10,
        };
        let view3 = new View();
        view3.style = {
            width: 70,
            height: 70,
            backgroundColor: '#FF000022',
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingRight: 10,
        };

        let child3 = new View();
        child3.style = {
            width: 20,
            height: 20,
            backgroundColor: '#0000FF',
        };

        let text3 = new Text();
        text3.text = 'paddingRight: 10';
        text3.style = {
            fontSize: 10,
            textAlign: 'center',
        };

        // paddingBottom: 10
        let subLayout4 = new View();
        subLayout4.style = {
            alignItems: 'center',
            marginLeft: 10,
            marginRight: 20,
        };
        let view4 = new View();
        view4.style = {
            width: 70,
            height: 70,
            backgroundColor: '#FF000022',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingBottom: 10,
        };

        let child4 = new View();
        child4.style = {
            width: 20,
            height: 20,
            backgroundColor: '#0000FF',
        };

        let text4 = new Text();
        text4.text = 'paddingBottom: 10';
        text4.style = {
            fontSize: 10,
            textAlign: 'center',
        };

        // padding: 10
        let subLayout5 = new View();
        subLayout5.style = {
            alignItems: 'center',
            marginTop: 10,
        };

        let view5 = new View();
        view5.style = {
            backgroundColor: '#FF000022',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
        };

        let child5 = new View();
        child5.style = {
            width: 20,
            height: 20,
            backgroundColor: '#0000FF',
        };

        let text5 = new Text();
        text5.text = 'padding: 10';
        text5.style = {
            fontSize: 10,
            textAlign: 'center',
        };

        view1.appendChild(child1);
        subLayout1.appendChild(view1);
        subLayout1.appendChild(text1);
        viewLayout.appendChild(subLayout1);

        view2.appendChild(child2);
        subLayout2.appendChild(view2);
        subLayout2.appendChild(text2);
        viewLayout.appendChild(subLayout2);

        view3.appendChild(child3);
        subLayout3.appendChild(view3);
        subLayout3.appendChild(text3);
        viewLayout.appendChild(subLayout3);

        view4.appendChild(child4);
        subLayout4.appendChild(view4);
        subLayout4.appendChild(text4);
        viewLayout.appendChild(subLayout4);

        view5.appendChild(child5);
        subLayout5.appendChild(view5);
        subLayout5.appendChild(text5);
        viewLayout.appendChild(subLayout5);

        this.appendChild(titleView);
        this.appendChild(viewLayout);
    }

    testAbsolute() {
        let titleView = new Text();
        titleView.text = 'View - Absolute';
        titleView.style = {
            color: '#333333',
            fontSize: 16,
            marginTop: 10,
        };

        let viewLayout = new View();
        viewLayout.style = {
            flexDirection: 'row',
            padding: 10,
            borderWidth: 1,
            borderColor: '#22222222',
            flexWrap: 'wrap',
        };

        // Absolute Left: 10
        let subLayout1 = new View();
        subLayout1.style = {
            alignItems: 'center',
        };
        let view1 = new View();
        view1.style = {
            width: 70,
            height: 70,
            backgroundColor: '#FF000022',
            justifyContent: 'center',
        };

        let child1 = new View();
        child1.style = {
            position: 'absolute',
            left: 10,
            width: 20,
            height: 20,
            backgroundColor: '#0000FF',
        };

        let text1 = new Text();
        text1.text = 'left: 10';
        text1.style = {
            fontSize: 10,
            textAlign: 'center',
        };

        // Absolute Top: 10
        let subLayout2 = new View();
        subLayout2.style = {
            alignItems: 'center',
            marginLeft: 10,
        };
        let view2 = new View();
        view2.style = {
            width: 70,
            height: 70,
            backgroundColor: '#FF000022',
            alignItems: 'center',
        };

        let child2 = new View();
        child2.style = {
            position: 'absolute',
            top: 10,
            width: 20,
            height: 20,
            backgroundColor: '#0000FF',
        };

        let text2 = new Text();
        text2.text = 'top: 10';
        text2.style = {
            fontSize: 10,
            textAlign: 'center',
        };

        // Absolute Right: 10
        let subLayout3 = new View();
        subLayout3.style = {
            alignItems: 'center',
            marginLeft: 10,
        };
        let view3 = new View();
        view3.style = {
            width: 70,
            height: 70,
            backgroundColor: '#FF000022',
            justifyContent: 'center',
            alignItems: 'flex-end',
        };

        let child3 = new View();
        child3.style = {
            position: 'absolute',
            right: 10,
            width: 20,
            height: 20,
            backgroundColor: '#0000FF',
        };

        let text3 = new Text();
        text3.text = 'right: 10';
        text3.style = {
            fontSize: 10,
            textAlign: 'center',
        };

        // Absolute Bottom: 10
        let subLayout4 = new View();
        subLayout4.style = {
            alignItems: 'center',
            marginLeft: 10,
        };
        let view4 = new View();
        view4.style = {
            width: 70,
            height: 70,
            backgroundColor: '#FF000022',
            justifyContent: 'flex-end',
            alignItems: 'center',
        };

        let child4 = new View();
        child4.style = {
            position: 'absolute',
            bottom: 10,
            width: 20,
            height: 20,
            backgroundColor: '#0000FF',
        };

        let text4 = new Text();
        text4.text = 'bottom: 10';
        text4.style = {
            fontSize: 10,
            textAlign: 'center',
        };

        view1.appendChild(child1);
        subLayout1.appendChild(view1);
        subLayout1.appendChild(text1);
        viewLayout.appendChild(subLayout1);

        view2.appendChild(child2);
        subLayout2.appendChild(view2);
        subLayout2.appendChild(text2);
        viewLayout.appendChild(subLayout2);

        view3.appendChild(child3);
        subLayout3.appendChild(view3);
        subLayout3.appendChild(text3);
        viewLayout.appendChild(subLayout3);

        view4.appendChild(child4);
        subLayout4.appendChild(view4);
        subLayout4.appendChild(text4);
        viewLayout.appendChild(subLayout4);

        this.appendChild(titleView);
        this.appendChild(viewLayout);
    }
}

Hummer.render(new RootView());