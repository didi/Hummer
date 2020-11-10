class RootView extends View {
    initialize() {
        let environment = Hummer.env;
        this.style = {
            width: '100%',
            height: '100%',
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
        }

        this.testCase1();
        this.testCase2();
        this.testCase3();
    }

    testCase1() {
        let titleView = new Text();
        titleView.text = 'RichText - 场景1';
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
        text1.richText = {
            text: "xxxx",
            textColor: '#FF0000',
            image: "http://b-ssl.duitang.com/uploads/item/201503/08/20150308143143_wCVJF.jpeg",
            imageWidth: 100,
            imageHeight: 100,
        }
        text1.style = {
            color: '#FFFFFF',
        };

        layout.appendChild(text1);
        this.appendChild(titleView);
        this.appendChild(layout);
    }

    testCase2() {
        let titleView = new Text();
        titleView.text = 'RichText - 场景2';
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
        text1.richText = [
             {
                 text: "1111",
                 color: '#00FF00',
                 fontSize: '40',
                 href: 'http://www.baidu.com',
                 hrefColor: '#0000FF',
             },
             {
                 text: "2222",
 //                color: '#00FF00',
                 fontSize: '16',
                 image: "http://b-ssl.duitang.com/uploads/item/201503/08/20150308143143_wCVJF.jpeg",
                 imageWidth: 100,
                 imageHeight: 100,
 //                imageAlign: 'top',
                 imageAlign: 'center',
                 href: 'http://www.baidu.com',
             },
             {
                 text: "3333",
                 image: 'ic_loading',
                 imageWidth: 20,
                 imageHeight: 20,
 //                imageAlign: 'top',
                 imageAlign: 'center',
 //                imageAlign: 'bottom',
 //                color: '#0000FF',
 //                fontSize: '10',
             },
             {
                 text: "4444 4444",
                 color: '#FF0000',
                 fontSize: '60',
                 backgroundColor: '#00FF0022',
             },
             {
                 text: "5555",
                 image: 'ic_loading',
                 imageWidth: 100,
                 imageHeight: 100,
 //                imageAlign: 'top',
                 imageAlign: 'center',
                 href: 'http://www.baidu.com',
//                 imageAlign: 'bottom',
 //                textColor: '#0000FF',
 //                fontSize: '10',
             },
              {
                  text: "6666",
                  color: '#00FF00',
                  backgroundColor: '#0000FF22',
                  fontSize: '30',
                  fontWeight: 'bold',
                  fontStyle: 'italic',
                  textDecoration: 'underline',
              }
         ]
        text1.style = {
            backgroundColor: '#FF000022',
        };

        layout.appendChild(text1);
        this.appendChild(titleView);
        this.appendChild(layout);
    }

    testCase3() {
        let titleView = new Text();
        titleView.text = 'RichText - 场景3';
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
        text1.richText = [
             "1111",
             {
                 text: "2222",
 //                color: '#00FF00',
                 fontSize: '16',
                 image: "http://b-ssl.duitang.com/uploads/item/201503/08/20150308143143_wCVJF.jpeg",
                 imageWidth: 100,
                 imageHeight: 100,
 //                imageAlign: 'top',
                 imageAlign: 'center',
             },
             "3333"
         ]
        text1.style = {
            backgroundColor: '#FF000022',
        };

        layout.appendChild(text1);
        this.appendChild(titleView);
        this.appendChild(layout);
    }
}

Hummer.render(new RootView());

