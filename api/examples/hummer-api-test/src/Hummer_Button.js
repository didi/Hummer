import{View, Button, Hummer} from '../../../packages/hummer-api/dist/hummer-api.es'

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

        let button = new Button();
        button.text = '按钮文案';
       
        button.style = {
            width: 60,
            height: 40,
            fontFamily: 'New Times Roma',
            fontSize: 16,
            color: '#000000',
        };
        

        button.pressedStyle = {
            backgroundColor: '#FF0000',
            color: '#FFFF00',
        };
        
        button.disabledStyle = {
            backgroundColor: '#0000FF',
            color: '#00FFFF',
        };

   

        button.addEventListener('tap', (event) => {
            console.log('my button clicked');
        });



        this.appendChild(button)
    }

}

Hummer.render(new RootView());