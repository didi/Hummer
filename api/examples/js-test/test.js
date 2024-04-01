import { View, Text, Navigator } from '../../packages/hummer-api/dist/hummer-api.cjs.js'

import { Memory } from '../../packages/hummer-api/dist/hummer-api.cjs.js'

import { Document } from '../../packages/hummer-api/dist/hummer-api.cjs.js'

// const { Memory } = require('../../packages/hummer-api/dist/hummer-api.cjs.js')


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
    }
}
Document.render(new RootView());