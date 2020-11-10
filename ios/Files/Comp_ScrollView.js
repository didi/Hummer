class RootView extends View {
    initialize() {
        let environment = Hummer.env;
        this.style = {
            flexDirection: 'column',
            marginTop: 88,
        };

        let scroll = new VerticalScrollView();
        scroll.style = {
            width: Hummer.env.availableWidth,
        }

        for (let i = 0; i < 20; i++) {
            let item = new Text();
            item.text = "" + i;
            item.style = {
                height: 120,
                margin: 15,
                backgroundColor: '#FF000022',
                textAlign: 'center',
            };
            scroll.appendChild(item);
        }

        scroll.addEventListener('scroll', (event) => {
            console.log('state = ' + event.state);
            console.log('dx = ' + event.deltaX);
            console.log('dy = ' + event.deltaY);
        })
        scroll.setOnScrollToTopListener(() => {
            console.log('ScrollToTop!');
        })
        scroll.setOnScrollToBottomListener(() => {
            console.log('ScrollToBottom!');
        })
        scroll.updateContentSize()
        this.appendChild(scroll)
    }
}

Hummer.render(new RootView());