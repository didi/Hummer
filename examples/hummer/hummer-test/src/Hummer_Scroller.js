import{View, Scroller,Text, Button, Hummer} from './../../../../api/packages/hummer-api/dist/hummer-api.es'

class RootView extends View {
    constructor() {
        super();
        this.style = {
            width: '100%',
            height: '100%',
        };

        this.scroll = new Scroller();
        this.scroll.style = {
            width: '100%',
            height: '100%',
//            showScrollBar: true,
        }

        this.scroll.showScrollBar = true

        this.scroll.bounces = true


        for (let i = 0; i < 10; i++) {
            let item = new Text();
            item.text = "文本：" + i;
            
            item.style = {
                height: 120,
                margin: 15,
                fontSize: 20,
                backgroundColor: '#eeeeee',
                textAlign: 'center',
            };
            this.scroll.appendChild(item);
        }



        // 暂时还未实现 @恩泽
        // 下拉刷新和加载更多
        // this.page = 1;
        // let pullRefreshCell = new PullRefreshCell();
        // this.scroll.refreshView = pullRefreshCell;

        // this.scroll.onRefresh = state => {
        //     console.log("PullRefresh: state = " + state);
        //     if (state == 1) {
        //         pullRefreshCell.setHint("下拉刷新");
        //     } else if (state == 2) {
        //         pullRefreshCell.setHint("加载中...");
        //         this.page = 1;
        //         this.loadData();
        //     } else {
        //         pullRefreshCell.setHint("加载完成");
        //     }
        // };

        // let loadMoreCell = new LoadMoreCell();
        // this.scroll.loadMoreView = loadMoreCell;

        // this.scroll.onLoadMore = state => {
        //      console.log("LoadMore: state = " + state);
        //      if (state == 1) {
        //          loadMoreCell.setHint("加载中...");
        //          this.page++;
        //          this.loadMore();
        //      } else if (state == 2) {
        //          loadMoreCell.setHint("没有更多数据");
        //      } else {
        //          loadMoreCell.setHint("加载完成");
        //      }
        // };

        // this.scroll.addEventListener('scroll', (event) => {
        //     console.log('state = ' + event.state);
        //     console.log('offsetX = ' + event.offsetX);
        //     console.log('offsetY = ' + event.offsetY);
        //     console.log('dx = ' + event.dx);
        //     console.log('dy = ' + event.dy);
        // })
        // this.scroll.setOnScrollToTopListener(() => {
        //     console.log('ScrollToTop!');
        // })
        // this.scroll.setOnScrollToBottomListener(() => {
        //     console.log('ScrollToBottom!');
        // })

        this.appendChild(this.scroll);


        // 底部操作按钮
        let btnLayout = new View();
        btnLayout.style = {
            position: 'absolute',
            flexDirection: 'row',
            alignSelf: 'center',
            width: 400,
            height: 60,
            fontSize: 18,
            bottom: 0,
        };

        let btn1 = new Button();
        btn1.style = {
            height: 30,
            fontSize: 18,
            flexGrow: 1,
        };
        btn1.text = "滑到顶部";
        btn1.addEventListener("tap", event => {
             this.scroll.scrollToTop();
        });

        let btn2 = new Button();
        btn2.style = {
            height: 30,
            flexGrow: 1,
            fontSize: 18,
        };
        btn2.text = "滑到底部";
        btn2.addEventListener("tap", event => {
             this.scroll.scrollToBottom();
        });

        btnLayout.appendChild(btn1);
        btnLayout.appendChild(btn2);
        this.appendChild(btnLayout);
    }

    loadData() {
        setTimeout(() => {
            // do something
            this.scroll.stopPullRefresh();
        }, 300);
    }

    loadMore() {
        if (this.page < 1000) {
            setTimeout(() => {
                this.scroll.stopLoadMore(true);
                // do something
            }, 300);
        } else {
            this.scroll.stopLoadMore(false);
        }
    }
}

class PullRefreshCell extends View {
    constructor() {
        super();
        this.style = {
            width: '100%',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FFFF00',
        };

        this.textView = new Text();
        this.textView.text = 'PullRefreshCell';

        this.appendChild(this.textView);
    }

    setHint(hint) {
        this.textView.text = hint;
    }
}

class LoadMoreCell extends View {
    constructor() {
        super();
        this.style = {
            width: '100%',
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#00FF00',
        };

        this.textView = new Text();
        this.textView.text = 'LoadMoreCell';

        this.appendChild(this.textView);
    }

    setHint(hint) {
        this.textView.text = hint;
    }
}

Hummer.render(new RootView());
