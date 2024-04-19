import{View, Text, Hummer} from '../../../packages/hummer-api/dist/hummer-api.es'

class RootView extends View {
    constructor() {
        super();

        this.style = {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        }

        let textView = new Text();
        textView.text = "~ Hello Hummer~";
        textView.style = {
            fontSize: 20,
        }

        this.appendChild(textView);


        let layout = new View();
        layout.style = {
            width: 100,
            height: 80,
            backgroundColor: '#FF000022',
        };

        let view = new View();
        view.style = {
            width: 80,
            height: 80,
            borderWidth: 10,
            borderRadius: 10,
            borderColor: '#22222222',
            alignItems: 'flex-start',
            backgroundColor: '#00FF0022',
        };

        layout.appendChild(view);
        this.appendChild(layout);

    }
}

Hummer.render(new RootView());