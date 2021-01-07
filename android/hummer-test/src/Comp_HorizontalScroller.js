class RootView extends View {
    constructor() {
        super();
        this.style = {
            width: '100%',
            height: '100%',
        };

        let scroll = new HorizontalScroller();
//        scroll.showScrollBar = true;

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