class RootView extends View {
    initialize() {
        let environment = Hummer.env;

        this.style = {
            flexDirection: 'column',
            width: environment.availableWidth,
        };

        let scroll = new HorizontalScroller();
        scroll.style = {
            width: Hummer.env.availableWidth,
//            showScrollBar: true,
        }

        for (let i = 0; i < 20; i++) {
            let item = new Text();
            item.text = "" + i;
            item.style = {
                width: 120,
                height: 120,
                margin: 15,
                backgroundColor: '#FF000022',
                textAlign: 'center',
                flexGrow: 1,
            };
            scroll.appendChild(item);
        }
        scroll.updateContentSize();

        scroll.addEventListener('scroll', (event) => {
            console.log('state = ' + event.state);
            console.log('offsetX = ' + event.offsetX);
            console.log('offsetY = ' + event.offsetY);
            console.log('dx = ' + event.dx);
            console.log('dy = ' + event.dy);
        })
        scroll.setOnScrollToTopListener(() => {
            console.log('ScrollToTop!');
        })
        scroll.setOnScrollToBottomListener(() => {
            console.log('ScrollToBottom!');
        })

        this.appendChild(scroll);
    }
}

Hummer.render(new RootView());