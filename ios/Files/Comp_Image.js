class RootView extends View {
    initialize() {
        let environment = Hummer.env;
        this.style = {
            flexDirection: 'column',
            marginTop: "88",
            width: environment.deviceWidth,
            height: environment.deviceHeight,
        }

        this.testSrc();

        this.testResize();
    }

    testSrc() {
        let titleView = new Text();
        titleView.text = 'Image - 图片样式';
        titleView.style = {
            color: '#333333',
            fontSize: 16,
            marginTop: 10,
            marginLeft: 10,
        };

        let layout = new View();
        layout.style = {
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 10,
            marginRight: 10,
            borderWidth: 1,
            borderColor: '#22222222',
            flexWrap: 'wrap',
        };

        let img1 = new Image();
        img1.src = 'njimage_demo';
        img1.style = {
            width: 80,
            height: 60,
            margin: 10,
            resize: 'contain',
        };

        let img2 = new Image();
        img2.src = 'njimage_demo';
        img2.style = {
            width: 80,
            height: 60,
            margin: 10,
            resize: 'contain',
            borderWidth: 2,
            borderColor: '#000000',
            borderRadius: 20,
        };

        let img3 = new Image();
        img3.src = 'njimage_demo';
        img3.style = {
            width: 80,
            height: 60,
            margin: 10,
            resize: 'contain',
            borderColor: '#00FF00',
            borderRadius: 80,
        };

        let img4 = new Image();
        img4.src = 'http://b-ssl.duitang.com/uploads/item/201503/08/20150308143143_wCVJF.jpeg';
        img4.style = {
            width: 80,
            height: 60,
            margin: 10,
        };

        let img5 = new Image();
        img5.src = 'http://b-ssl.duitang.com/uploads/item/201503/08/20150308143143_wCVJF.jpeg';
        img5.style = {
            width: 80,
            height: 60,
            margin: 10,
            borderWidth: 2,
            borderColor: '#000000',
            borderRadius: 20,
        };

        let img6 = new Image();
        img6.src = 'http://b-ssl.duitang.com/uploads/item/201503/08/20150308143143_wCVJF.jpeg';
        img6.style = {
            width: 80,
            height: 60,
            margin: 10,
            borderRadius: 80,
        };

        layout.appendChild(img1);
        layout.appendChild(img2);
        layout.appendChild(img3);
        layout.appendChild(img4);
        layout.appendChild(img5);
        layout.appendChild(img6);
        this.appendChild(titleView);
        this.appendChild(layout);
    }

    testResize() {
        let titleView = new Text();
        titleView.text = 'Image - 图片缩放样式';
        titleView.style = {
            color: '#333333',
            fontSize: 16,
            marginTop: 10,
            marginLeft: 10,
        };

        let layout = new View();
        layout.style = {
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 10,
            marginRight: 10,
            borderWidth: 1,
            borderColor: '#22222222',
            flexWrap: 'wrap',
        };

        let subLayout1 = new View();
        let img1 = new Image();
        img1.src = 'njimage_demo';
        img1.style = {
            width: 70,
            height: 50,
            margin: 10,
            backgroundColor: '#FF000022',
        };

        let text1 = new Text();
        text1.text = 'origin(默认)';
        text1.style = {
            fontSize: 12,
            textAlign: 'center',
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 10,
        };

        let subLayout2 = new View();
        let img2 = new Image();
        img2.src = 'njimage_demo';
        img2.style = {
            width: 70,
            height: 50,
            margin: 10,
            backgroundColor: '#FF000022',
            resize: 'contain',
        };

        let text2 = new Text();
        text2.text = 'contain';
        text2.style = {
            fontSize: 12,
            textAlign: 'center',
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 10,
        };

        let subLayout3 = new View();
        let img3 = new Image();
        img3.src = 'njimage_demo';
        img3.style = {
            width: 70,
            height: 50,
            margin: 10,
            backgroundColor: '#FF000022',
            resize: 'cover',
        };

        let text3 = new Text();
        text3.text = 'cover';
        text3.style = {
            fontSize: 12,
            textAlign: 'center',
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 10,
        };

        let subLayout4 = new View();
        let img4 = new Image();
        img4.src = 'njimage_demo';
        img4.style = {
            width: 70,
            height: 50,
            margin: 10,
            backgroundColor: '#FF000022',
            resize: 'stretch',
        };

        let text4 = new Text();
        text4.text = 'stretch';
        text4.style = {
            fontSize: 12,
            textAlign: 'center',
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 10,
        };

        let subLayout5 = new View();
        let img5 = new Image();
        img5.style = {
            width: 70,
            height: 50,
            margin: 10,
            backgroundColor: '#FF000022',
        };
        img5.src = 'http://b-ssl.duitang.com/uploads/item/201503/08/20150308143143_wCVJF.jpeg';

        let text5 = new Text();
        text5.text = 'origin(默认)';
        text5.style = {
            fontSize: 12,
            textAlign: 'center',
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 10,
        };

        let subLayout6 = new View();
        let img6 = new Image();
        img6.style = {
            width: 70,
            height: 50,
            margin: 10,
            backgroundColor: '#FF000022',
            resize: 'contain',
        };
        img6.src = 'http://b-ssl.duitang.com/uploads/item/201503/08/20150308143143_wCVJF.jpeg';


        let text6 = new Text();
        text6.text = 'contain';
        text6.style = {
            fontSize: 12,
            textAlign: 'origin',
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 10,
        };

        let subLayout7 = new View();
        let img7 = new Image();
        img7.style = {
            width: 70,
            height: 50,
            margin: 10,
            backgroundColor: '#FF000022',
            resize: 'cover',
        };
        img7.src = 'http://b-ssl.duitang.com/uploads/item/201503/08/20150308143143_wCVJF.jpeg';

        let text7 = new Text();
        text7.text = 'cover';
        text7.style = {
            fontSize: 12,
            textAlign: 'center',
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 10,
        };

        let subLayout8 = new View();
        let img8 = new Image();
        img8.style = {
            width: 70,
            height: 50,
            margin: 10,
            backgroundColor: '#FF000022',
            resize: 'stretch',
        };
        img8.src = 'http://b-ssl.duitang.com/uploads/item/201503/08/20150308143143_wCVJF.jpeg';

        let text8 = new Text();
        text8.text = 'stretch';
        text8.style = {
            fontSize: 12,
            textAlign: 'center',
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 10,
        };

        subLayout1.appendChild(img1);
        subLayout1.appendChild(text1);
        layout.appendChild(subLayout1);
        subLayout2.appendChild(img2);
        subLayout2.appendChild(text2);
        layout.appendChild(subLayout2);
        subLayout3.appendChild(img3);
        subLayout3.appendChild(text3);
        layout.appendChild(subLayout3);
        subLayout4.appendChild(img4);
        subLayout4.appendChild(text4);
        layout.appendChild(subLayout4);
        subLayout5.appendChild(img5);
        subLayout5.appendChild(text5);
        layout.appendChild(subLayout5);
        subLayout6.appendChild(img6);
        subLayout6.appendChild(text6);
        layout.appendChild(subLayout6);
        subLayout7.appendChild(img7);
        subLayout7.appendChild(text7);
        layout.appendChild(subLayout7);
        subLayout8.appendChild(img8);
        subLayout8.appendChild(text8);
        layout.appendChild(subLayout8);
        this.appendChild(titleView);
        this.appendChild(layout);
    }
}

Hummer.render(new RootView());