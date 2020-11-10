class RootView extends View {
    initialize() {
        let environment = Hummer.env;

        this.style = {
            flexDirection: 'column',
            width: environment.availableWidth,
        };

        let scroll = new Scroller();
        scroll.style = {
            width: Hummer.env.availableWidth,
//            showScrollBar: true,
        }

        for (let i = 0; i < 100; i++) {
            let item = new Text();
            item.text = "" + i;
            item.style = {
                backgroundColor: '#FF000022',
                textAlign: 'center',
            };

            let image = new Image();
            image.src = "njimage_demo";
            image.style = {
                width: 100,
                height: 100,
            }
            scroll.appendChild(item);
            scroll.appendChild(image);
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


        // 底部操作按钮
        let btnLayout = new View();
        btnLayout.style = {
            position: 'absolute',
            flexDirection: 'row',
            alignSelf: 'center',
            width: 200,
            bottom: 0,
        };

        let btn1 = new Button();
        btn1.style = {
            height: 50,
            flexGrow: 1,
        };
        btn1.text = "滑到顶部";
        btn1.addEventListener("tap", event => {
             scroll.removeAll();
             for (let i = 0; i < 20; i++) {
                 let item = new Text();
                 item.text = "" + i;
                 item.style = {
                     backgroundColor: '#FF000022',
                     textAlign: 'center',
                 };

                 let image = new Image();
                 image.src = "njimage_demo";
                 image.style = {
                     width: 100,
                     height: 100,
                 }
//                         scroll.appendChild(item);
                 scroll.appendChild(image);
             }
        });

        let btn2 = new Button();
        btn2.style = {
            height: 50,
            flexGrow: 1,
        };
        btn2.text = "滑到底部";
        btn2.addEventListener("tap", event => {
             scroll.scrollToBottom();
        });

        btnLayout.appendChild(btn1);
        btnLayout.appendChild(btn2);
        this.appendChild(btnLayout);
    }
}

Hummer.render(new RootView());