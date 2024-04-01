import{View, Text, Hummer, Button} from '../../../packages/hummer-api/dist/hummer-api.es'

export class RootView extends View {
    constructor() {
        super();

        this.style = {
            width: '100%',
            height: '100%',
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
        };

        // let text = new Text();
        // text.style = {
        //     color: '#F0F0F0',
        //     textAlign: 'center',
        //     fontSize: 20,
        // };
        
        // // 普通文本
        // text.text = 'This is a text!';
        

        // let text2 = new Text();
        // text2.style = {
        //     color: '#F0F0F0',
        //     textAlign: 'center',
        //     fontSize: 20,
        // };
        // // 富文本（场景1）
        // text2.richText = {
        //     text: "xxxx",
        //     color: '#FF0000',
        //     fontSize: 20,
        // };
        
        // let text3 = new Text();
        // text3.style = {
        //     color: '#F0F0F0',
        //     textAlign: 'center',
        //     fontSize: 20,
        // };
        // // 富文本（场景2）
        // text3.richText = [
        //     {
        //         text: "1111",
        //         color: '#00FF00',
        //         fontSize: '40',
        //         href: 'http://www.baidu.com',
        //         hrefColor: '#0000FF',
        //     },
        //     {
        //         text: "2222", //相当于图片显示前的占位文本
        //         color: '#00FF00',
        //         fontSize: '16',
        //         image: "http://b-ssl.duitang.com/uploads/item/201503/08/20150308143143_wCVJF.jpeg",
        //         imageWidth: 100,
        //         imageHeight: 100,
        //         imageAlign: 'center',
        //     },
        //     {
        //         text: "3333",
        //         image: 'ic_loading',
        //         imageWidth: 20,
        //         imageHeight: 20,
        //         imageAlign: 'center',
        //         color: '#0000FF',
        //         fontSize: '10',
        //     }
        // ];


        let button = new Button();
 

        button.style = {
            width: 60,
            height: 40,
            fontFamily: 'New Times Roma',
            color: '#000000',
        };
        
        button.text = "2eedddf"

        

        let text4 = new Text();
        text4.style = {
            color: '#FF0000',
            textAlign: 'center',
            fontSize: 20,
        };
        // 富文本（场景3）
        text4.richText = [
            "1111",
            {
                text: "2222", //相当于图片显示前的占位文本
                color: '#00FF00',
                fontSize: '16',
                image: "http://b-ssl.duitang.com/uploads/item/201503/08/20150308143143_wCVJF.jpeg",
                imageWidth: 100,
                imageHeight: 100,
                imageAlign: 'center',
            },
            "3333"
        ];

        button.addEventListener('tap', (event) => {
            console.log('my button clicked');
            text4.richText[0] = '223344444'
            text4.richText[1].imageWidth = 200
        });
        // this.appendChild(text)
        // this.appendChild(text2)
        this.appendChild(button)
        this.appendChild(text4)
    }

}

Hummer.render(new RootView());