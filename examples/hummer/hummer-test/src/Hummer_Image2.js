// import { View, Text, Navigator } from '../../../packages/hummer-api/dist/hummer-api.cjs.js'

// const { View, Text } = require('../../../packages/hummer-api/dist/hummer-api.cjs.js')
import{View, Image, Hummer} from './../../../../api/packages/hummer-api/dist/hummer-api.es'

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


        let text1 = new Image();
        this.text1 = text1;
        text1.src = "https://img-hxy021.didistatic.com/static/starimg/img/jcYlCi9q771709538836363.jpeg";

        text1.style = {
            height: 90,
            backgroundColor: "#F2f2f2",
            textColor: "#2e2e22"
        }

        let text2 = new Image();
        this.text2 = text2;
        text2.src = "https://img-hxy021.didistatic.com/static/starimg/img/zQH87n4QmS1709538875705.png";

        text2.style = {
            height: 46,
            width: 180,
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
        this.count = 1;
    }

    

    changeTextNew() {
        this.count++;
        if (this.count%2==0){
            this.text1.src = "https://img-hxy021.didistatic.com/static/starimg/img/zQH87n4QmS1709538875705.png";
        } else{
            this.text1.src = "https://img-hxy021.didistatic.com/static/starimg/img/jcYlCi9q771709538836363.jpeg";
        }  
       
    }
}

Hummer.render(new RootView());