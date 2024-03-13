import{View, Input,TextArea, Hummer} from './../../../packages/hummer-api/dist/hummer-api.es'

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

        let input = new Input();
        input.text = 'hummer api text';
        input.placeholder = '11122hummer api placeholder';
        input.focused = true;
        input.maxLength = 5;
        input.style = {
            width: 120,
            height: 300,
            type: 'number',
            color: '#ffffff',
            placeholderColor: '#00ff00',
            cursorColor: '#0000ff',
            textAlign: 'center',
            maxLength: 5,
            returnKeyType: 'done'
        };

   

        input.addEventListener('input', (event) => {
            console.log("hummer input state11111:" + JSON.stringify(event));
        });

        input.addEventListener('input', (event) => {
            console.log("hummer input state222222:" + JSON.stringify(event));
        });
        
        let input2 = new Input();
        input2.placeholder = 'input2input2input2input2哈哈';
        input2.style = {
            width: 200,
            height: 60,
            type: 'number',
            color: '#ffffff'
        };




        let textArea = new TextArea();
        textArea.text = 'hummer api text';
        textArea.placeholder = '11122hummer api placeholder';
        textArea.focused = true;
        textArea.maxLength = 5;
        textArea.style = {
            width: 150,
            height: 600,
            color: '#ffffff',
            placeholderColor: '#00ff00',
            cursorColor: '#0000ff',
            textAlign: 'center',
            returnKeyType: 'done'
        };

   

        textArea.addEventListener('input', (event) => {
            console.log("hummer textArea state11111:" + JSON.stringify(event));
        });

        textArea.addEventListener('input', (event) => {
            console.log("hummer textArea state222222:" + JSON.stringify(event));
        });
        

        this.appendChild(input);
        this.appendChild(input2)
        this.appendChild(textArea)
    }

}

Hummer.render(new RootView());