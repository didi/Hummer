class RootView extends View {
    initialize() {
        let environment = Hummer.env;

        let data = [
            'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3207781657,3460758070&fm=27&gp=0.jpg',
            'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2735633715,2749454924&fm=27&gp=0.jpg',
            'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3464499095,1074840881&fm=27&gp=0.jpg',
        ]

        this.style = {
            flexDirection: 'column',
            width: environment.availableWidth,
            height: environment.availableHeight,
        };

        let titleView = new Text();
        titleView.text = 'ViewPager';
        titleView.style = {
            color: '#333333',
            fontSize: 16,
            margin: 10,
        };

        let layout = new View();
        layout.style = {
            width: environment.availableWidth,
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
        };

        let pager = new ViewPager("pager");
        pager.style = {
            width: environment.availableWidth,
            height: 170,
            itemSpacing: 20,
            edgeSpacing: 40,
            canLoop: true,
            autoPlay: true,
            loopInterval: 2000,
            borderRadius:20,
        };
        pager.onPageChange((current, total) => {
            console.log("ViewPager onPageChange, index: " + (current + 1) + "/" + total);
        });
        pager.onItemClick((position) => {
            console.log("ViewPager onItemClick, position: " + position);
        });

        pager.onItemView((position, view) => {
            let image = view;
            if (!image) {
                image = new Image();
                image.style = {
                    resize: 'cover',
                    borderRadius: 20,
                }
            }
            image.src = data[position];
            return image;
        });

        pager.data = data;

        pager.setCurrentItem(1);

        layout.appendChild(pager);
        this.appendChild(titleView);
        this.appendChild(layout);


        // 底部tap切换按钮
        let tabLayout = new View();
        tabLayout.style = {
            flexDirection: 'row',
            alignSelf: 'center',
            width: 200,
        };

        let btn1 = new Button();
        btn1.style = {
            height: 50,
            flexGrow: 1,
        };
        btn1.text = "Tab 1";
        btn1.addEventListener("tap", event => {
             pager.setCurrentItem(0);
        });

        let btn2 = new Button();
        btn2.style = {
            height: 50,
            flexGrow: 1,
        };
        btn2.text = "Tab 2";
        btn2.addEventListener("tap", event => {
             pager.setCurrentItem(1);
        });

        tabLayout.appendChild(btn1);
        tabLayout.appendChild(btn2);
        this.appendChild(tabLayout);
    }
}

Hummer.render(new RootView());