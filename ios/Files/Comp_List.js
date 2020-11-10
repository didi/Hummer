const TYPE_TITLE = 1;
const TYPE_ITEM = 2;

const ITEM_COUNT = 20;

class RootView extends View {
    initialize() {
        super.initialize();
        var environment = Hummer.env;
        this.style = {
            position: 'absolute',
            left: '0',
            right: '0',
            top: '88',
            bottom: '0',
        };

        this.listView = new List();
        this.listView.style = {
            flexGrow: 1,
            // mode: "list",
            // mode: "grid",
            mode: "waterfall",
            column: 3,
            // scrollDirection: "horizontal",
            lineSpacing: 14,
            itemSpacing: 7,
            leftSpacing: '10',
            rightSpacing: '10',
            topSpacing: '10',
            bottomSpacing: "10"
        };
        this.listView.onRegister = position => {
            console.log("TypeCallback: position = " + position);
            if (position % 2 === 0) {
                return TYPE_TITLE;
            } else {
                return TYPE_ITEM;
            }
        };
        this.listView.onCreate = type => {
            console.log("CreateCallback: type = " + type);
            if (type === TYPE_TITLE) {
                return new TitleCell();
            } else {
                return new ItemCell();
            }

        };
        this.listView.onUpdate = (position, cell) => {
            console.log("UpdateCallback: position = " + position + ", cell = " + cell);
            if (cell instanceof ItemCell) {
                cell.refresh(position);
            } else {
                cell.update(position)
            }
        };
        // this.listView.addEventListener('scroll', e => {
        //     console.log('list scroll');
        // })

        this.page = 1;

        let pullRefreshCell = new PullRefreshCell();
        this.listView.refreshView = pullRefreshCell;

        this.listView.onRefresh = state => {
            console.log("PullRefresh: state = " + state);
            if (state == 1) {
                pullRefreshCell.setHint("下拉刷新...");
            } else if (state == 2) {
                pullRefreshCell.setHint("加载中...");
                this.page = 1;
                this.loadData();
            }
        };

        let loadMoreCell = new LoadMoreCell();
        this.listView.loadMoreView = loadMoreCell;

        this.listView.onLoadMore = state => {
            console.log("LoadMore: state = " + state);
            if (state == 0) {
                loadMoreCell.setHint("上拉加载...");
            } else if (state == 1) {
                loadMoreCell.setHint("加载中...");
                this.page++;
                this.loadMore();
            } else {
                // this.endLoad
                loadMoreCell.setHint("没有更多...");
            }
        };

        this.listView.addEventListener('scroll', (event) => {
            console.log('state = ' + event.state);
            console.log('dx = ' + event.dx);
            console.log('dy = ' + event.dy);
        })

        this.appendChild(this.listView);

        this.listView.refresh(ITEM_COUNT);

    }

    loadData() {
        new Timer().setTimeout(() => {
            this.listView.stopPullRefresh();
            this.listView.refresh(ITEM_COUNT);
        }, 1000);
    }

    loadMore() {
        new Timer().setTimeout(() => {
            if (this.page < 4) {
                this.listView.stopLoadMore(true);
                this.listView.refresh(ITEM_COUNT * this.page);
            } else {
                this.listView.stopLoadMore(false);
            }
        }, 500);
    }
}

class TitleCell extends View {
    initialize() {

        let topLayout = new View();
        topLayout.style = {
            paddingTop: '20',
            paddingBottom: '20',
            backgroundColor: '#0000ff',
        };


        // let lineView = new View();
        // lineView.style = {
        //     height: '1px',
        //     backgroundColor: '#ff001B'
        // };

        var textView = new Text();
        textView.text = 'Title';
        textView.style = {
            color: '#000000',
            width: 100,
            height: 30,
            textAlign: 'center'
        };
        topLayout.appendChild(textView)
        this.textView = textView

        this.appendChild(topLayout);
    }

    update(index) {
        this.textView.text = 'Title' + index
    }
}

class ItemCell extends View {
    initialize() {
        this.style = {
            backgroundColor: '#FF0022',
            justifyContent: "center",
            alignItems: "center"
        };

        this.textView = new Text();
        this.textView.text = "1111";
        this.textView.style = {
            minWidth: 100,
            height: 200,
            textAlign: "center",
        };
        this.appendChild(this.textView);
    }

    refresh(position) {
        this.textView.text = position.toString();
    }
}

class PullRefreshCell extends View {
    initialize() {
        var environment = Hummer.env;

        this.style = {
            backgroundColor: '#FF0000',
        };

        this.textView = new Text();
        this.textView.style = {
            backgroundColor: '#FF0000',
            width: environment.availableWidth,
            height: 50,
            textAlign: "center"
        };
        this.textView.text = 'PullRefreshCell';

        this.appendChild(this.textView);
    }

    setHint(hint) {
        this.textView.text = hint;
    }
}

class LoadMoreCell extends View {
    initialize() {
        var environment = Hummer.env;

        this.style = {
            backgroundColor: '#FF000044',
        };

        this.textView = new Text();
        this.textView.style = {
            backgroundColor: '#FF0000',
            width: environment.availableWidth,
            height: 50,
            textAlign: "center"
        };
        this.textView.text = 'LoadMoreCell';

        this.appendChild(this.textView);
    }

    setHint(hint) {
        this.textView.text = hint;
    }
}

Hummer.render(new RootView());