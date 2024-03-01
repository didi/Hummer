// import { View, Text, Navigator } from '../../../packages/hummer-api/dist/hummer-api.cjs.js'

const { View, Text, Navigator } = require('../../../packages/hummer-api/dist/hummer-api.cjs.js')

const { Document, Memory } = require('../../../packages/hummer-api/dist/hummer-api.cjs.js')


class RootView extends View {
    constructor() {
        super();

        this.style = {
            width: '100%',
            height: '100%',
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 10,
        };

        let text = new Text();
        text.text = "HelloWord"

        text.style = {
            textColor: "#2e2e2e"
        }

        this.appendChild(text);
    }
}

Document.render(new RootView());