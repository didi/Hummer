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
            backgroundColor:"#FF0000",
        };

        let view = new View();
      
       
      
        this.appendChild(view)
    }

}

Hummer.render(new RootView());