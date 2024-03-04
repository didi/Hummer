// import { View, Text, Navigator } from '../../../packages/hummer-api/dist/hummer-api.cjs.js'

// const { View, Text } = require('../../../packages/hummer-api/dist/hummer-api.cjs.js')
// import{View, Text, Document as Hummer} from './../../../packages/hummer-api/dist/hummer-api.es'

// const { Document: Hummer } = require('../../../packages/hummer-api/dist/hummer-api.cjs.js')

export class RootView extends View {
    constructor() {
        super();

        this.style = {
            width: '100%',
            height: '100%',
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 10,
        };

        let text1 = new Text();
        this.text1 = text1;
        text1.text = "HelloWord";

        text1.style = {
            height: 56,
            backgroundColor: "#F2f2f2",
            textColor: "#2e2e22"
        }

        let text2 = new Text();
        this.text2 = text2;
        text2.text = "点击我修改文案";

        text2.style = {
            height: 48,
            width: 183,
            marginTop: 45,
            padding: 30,
            backgroundColor: "#F2f2ff",
            color: "#2e2e2e",
            fontSize: 20

        }


        text2.addEventListener("tap", (event) => {
            this.changeTextNew();
        })

        this.appendChild(text1);
        this.appendChild(text2);
    }


    changeTextNew() {
        this.text1.text = this.text1.text + "X";
    }
}

Hummer.render(new RootView());