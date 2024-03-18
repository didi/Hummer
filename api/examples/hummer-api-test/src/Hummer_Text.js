import{View, Text, Hummer} from '../../../packages/hummer-api/dist/hummer-api.es'

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

        let text = new Text();
        // 普通文本
        text.text = 'This is a text!';

        // 富文本（场景1）
        text.richText = {
            text: "xxxx",
            color: '#FF0000',
            fontSize: 20,
        };
       


        this.appendChild(text)
    }

}

Hummer.render(new RootView());