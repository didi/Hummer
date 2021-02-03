class RootView extends View {
    initialize() {
        let environment = Hummer.env;
        this.style = {
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
        }

        this.testBackground();

        this.testSrc();

        this.testSrcResize();

        this.testGifResize();
    }

    testBackground() {
            let titleView = new Text();
            titleView.text = 'Image - 背景';
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

            let img1 = new Image();
            img1.style = {
                width: 60,
                height: 60,
                backgroundColor: '#FF0000',
            };

            let img2 = new Image();
            img2.style = {
                width: 60,
                height: 60,
                backgroundColor: '#FF000044',
                marginLeft: 10,
            };

            let img3 = new Image();
            img3.style = {
                width: 60,
                height: 60,
                backgroundColor: 'linear-gradient(90deg #FF000060 #00FF0060)',
                marginLeft: 10,
            };

            let img4 = new Image();
            img4.style = {
                width: 80,
                height: 60,
                backgroundImage: 'njimage_demo',
                marginLeft: 10,
            };

            let img5 = new Image();
            img5.style = {
                width: 60,
                height: 60,
                backgroundColor: '#FF0000',
                borderWidth: 2,
                borderColor: '#000000',
                borderRadius: 10,
                marginTop: 10,
            };

            let img6 = new Image();
            img6.style = {
                width: 60,
                height: 60,
                backgroundColor: '#FF0000',
                borderRadius: 10,
                marginLeft: 10,
                marginTop: 10,
            };

            let img7 = new Image();
            img7.style = {
                width: 60,
                height: 60,
                backgroundColor: 'linear-gradient(90deg #FF000060 #00FF0060)',
                borderRadius: 10,
                marginLeft: 10,
                marginTop: 10,
            };

            let img8 = new Image();
            img8.style = {
                width: 80,
                height: 60,
                backgroundImage: 'njimage_demo',
                borderRadius: 10,
                marginLeft: 10,
                marginTop: 10,
            };

            layout.appendChild(img1);
            layout.appendChild(img2);
            layout.appendChild(img3);
            layout.appendChild(img4);
            layout.appendChild(img5);
            layout.appendChild(img6);
            layout.appendChild(img7);
            layout.appendChild(img8);
            this.appendChild(titleView);
            this.appendChild(layout);
        }

    testSrc() {
        let titleView = new Text();
        titleView.text = 'Image - 图片样式';
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

        let img1 = new Image();
        img1.src = 'njimage_demo';
        img1.style = {
            width: 60,
            height: 60,
            backgroundColor: '#FF000022',
        };

        let img2 = new Image();
        img2.src = 'njimage_demo';
        img2.style = {
            width: 60,
            height: 60,
            backgroundColor: '#FF000022',
            marginLeft: 10,
            borderWidth: 2,
            borderColor: '#000000',
            borderRadius: 20,
        };

        let img3 = new Image();
        img3.src = 'njimage_demo';
        img3.style = {
            width: 60,
            height: 60,
            backgroundColor: '#FF000022',
            marginLeft: 10,
            marginRight: 80,
            borderWidth: 2,
            borderColor: '#000000',
            borderRadius: 40,
        };

        let img4 = new Image();
        img4.src = 'http://b-ssl.duitang.com/uploads/item/201503/08/20150308143143_wCVJF.jpeg';
        img4.style = {
            width: 60,
            height: 60,
            backgroundColor: '#FF000022',
            marginTop: 10,
        };

        let img5 = new Image();
        img5.src = 'http://b-ssl.duitang.com/uploads/item/201503/08/20150308143143_wCVJF.jpeg';
        img5.style = {
            width: 60,
            height: 60,
            backgroundColor: '#FF000022',
            marginLeft: 10,
            marginTop: 10,
            borderWidth: 2,
            borderColor: '#000000',
            borderRadius: 20,
        };

        let img6 = new Image();
        img6.src = 'http://b-ssl.duitang.com/uploads/item/201503/08/20150308143143_wCVJF.jpeg';
        img6.style = {
            width: 60,
            height: 60,
            backgroundColor: '#FF000022',
            marginLeft: 10,
            marginTop: 10,
            borderWidth: 2,
            borderColor: '#000000',
            borderRadius: 40,
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

    testSrcResize() {
        let titleView = new Text();
        titleView.text = 'Image - 图片缩放样式';
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

        this.loadResImage(layout, 'njimage_demo', false);
        this.loadRemoteImage(layout, 'http://b-ssl.duitang.com/uploads/item/201503/08/20150308143143_wCVJF.jpeg', false);

        this.appendChild(titleView);
        this.appendChild(layout);
    }

    testGifResize() {
        let titleView = new Text();
        titleView.text = 'Image - 图片缩放样式（Gif图）';
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

        this.loadResImage(layout, 'loading', true);
        this.loadRemoteImage(layout, 'https://pt-starimg.didistatic.com/static/starimg/img/Jol6rzZIH41610532807417.gif', true);

        this.appendChild(titleView);
        this.appendChild(layout);
    }

    loadResImage(layout, resId, isGif) {
        let subLayout1 = new View();
        subLayout1.style = {
            alignItems: 'center',
        }
        let img1 = new Image();
        if (isGif) {
            img1.gifSrc = resId;
        } else {
            img1.src = resId;
        }

        img1.style = {
            width: 70,
            height: 50,
            backgroundColor: '#FF000022',
        };

        let text1 = new Text();
        text1.text = 'origin(默认)';
        text1.style = {
            fontSize: 12,
            textAlign: 'center',
        };

        let subLayout2 = new View();
        subLayout2.style = {
            alignItems: 'center',
            marginLeft: 10,
        }
        let img2 = new Image();
        if (isGif) {
            img2.gifSrc = resId;
        } else {
            img2.src = resId;
        }
        img2.style = {
            width: 70,
            height: 50,
            backgroundColor: '#FF000022',
            resize: 'contain',
        };

        let text2 = new Text();
        text2.text = 'contain';
        text2.style = {
            fontSize: 12,
            textAlign: 'center',
        };

        let subLayout3 = new View();
        subLayout3.style = {
            alignItems: 'center',
            marginLeft: 10,
        }
        let img3 = new Image();
        if (isGif) {
            img3.gifSrc = resId;
        } else {
            img3.src = resId;
        }
        img3.style = {
            width: 70,
            height: 50,
            backgroundColor: '#FF000022',
            resize: 'cover',
        };

        let text3 = new Text();
        text3.text = 'cover';
        text3.style = {
            fontSize: 12,
            textAlign: 'center',
        };

        let subLayout4 = new View();
        subLayout4.style = {
            alignItems: 'center',
            marginLeft: 10,
        }
        let img4 = new Image();
        if (isGif) {
            img4.gifSrc = resId;
        } else {
            img4.src = resId;
        }
        img4.style = {
            width: 70,
            height: 50,
            backgroundColor: '#FF000022',
            resize: 'stretch',
        };

        let text4 = new Text();
        text4.text = 'stretch';
        text4.style = {
            fontSize: 12,
            textAlign: 'center',
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
    }

    loadRemoteImage(layout, url, isGif) {
        let subLayout5 = new View();
        subLayout5.style = {
            alignItems: 'center',
            marginTop: 10,
        }
        let img5 = new Image();
        if (isGif) {
            img5.gifSrc = url;
        } else {
            img5.src = url;
        }
        img5.style = {
            width: 70,
            height: 50,
            backgroundColor: '#FF000022',
        };

        let text5 = new Text();
        text5.text = 'origin(默认)';
        text5.style = {
            fontSize: 12,
            textAlign: 'center',
        };

        let subLayout6 = new View();
        subLayout6.style = {
            alignItems: 'center',
            marginLeft: 10,
            marginTop: 10,
        }
        let img6 = new Image();
        if (isGif) {
            img6.gifSrc = url;
        } else {
            img6.src = url;
        }
        img6.style = {
            width: 70,
            height: 50,
            backgroundColor: '#FF000022',
            resize: 'contain',
        };

        let text6 = new Text();
        text6.text = 'contain';
        text6.style = {
            fontSize: 12,
            textAlign: 'center',
        };

        let subLayout7 = new View();
        subLayout7.style = {
            alignItems: 'center',
            marginLeft: 10,
            marginTop: 10,
        }
        let img7 = new Image();
        if (isGif) {
            img7.gifSrc = url;
        } else {
            img7.src = url;
        }
        img7.style = {
            width: 70,
            height: 50,
            backgroundColor: '#FF000022',
            resize: 'cover',
        };

        let text7 = new Text();
        text7.text = 'cover';
        text7.style = {
            fontSize: 12,
            textAlign: 'center',
        };

        let subLayout8 = new View();
        subLayout8.style = {
            alignItems: 'center',
            marginLeft: 10,
            marginTop: 10,
        }
        let img8 = new Image();
        if (isGif) {
            img8.gifSrc = url;
        } else {
            img8.src = url;
        }
        img8.style = {
            width: 70,
            height: 50,
            backgroundColor: '#FF000022',
            resize: 'stretch',
        };

        let text8 = new Text();
        text8.text = 'stretch';
        text8.style = {
            fontSize: 12,
            textAlign: 'center',
        };

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
    }
}

Hummer.render(new RootView());