import{View, Hummer, Toast} from './../../../../api/packages/hummer-api/dist/hummer-api.es'

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

       
        Toast.show("弹窗内容");

        Toast.show("弹窗内容3秒", 3000);
        
        // Toast.custom(new View());
        
        // Toast.custom(new View(), 3000);


    }

}

Hummer.render(new RootView());