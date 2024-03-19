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
        // button.disabled = true

    
        button.style = {
            width: 60,
            height: 40,
            fontFamily: 'New Times Roma',
            color: '#000000',
        };
        
        button.pressed= {
            backgroundColor: '#FF0000',
            color: '#FFFF00',
        };
        
        // button.disabled = {
        //     backgroundColor: '#0000FF',
        //     color: '#00FFFF',
        // };

        button.addEventListener('tap', (event) => {
            console.log('my button clicked');
            button.text =  button.text + "1"
        });



        this.appendChild(button)
    }

}

Hummer.render(new RootView());