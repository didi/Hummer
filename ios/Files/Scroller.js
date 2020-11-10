class RootView extends View {
    constructor() {
        super()
        this.style = {
            marginTop: 88,
        };

        let textArea = new TextArea();
        textArea.style = {
            minHeight: 100,
            backgroundColor: '##ff0000'
        }
        this.appendChild(textArea);
        textArea.placeholder = '侧福晋的抗衰老荆防颗粒时代峻峰';
        textArea.addEventListener('input', (event) => {
            console.log('text = ' + event.text);
            console.log('state = ' + event.state);
        })
    }
}

Hummer.render(new RootView());