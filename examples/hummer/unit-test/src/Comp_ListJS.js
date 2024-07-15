import{View, Text, ListJS, Hummer} from './../../../../api/packages/hummer-api/dist/hummer-api.es'

const TYPE_TITLE = 1;
const TYPE_ITEM = 2;
const ITEM_COUNT = 100;

let page = 1
class RootView extends View {

    constructor() {
        super();
        this.style = {
            width: '100%',
            height: '100%',
        };

        this.listView = new ListJS();
        this.listView.style = {
            width: '100%',
            height: '100%',
            mode: "list",
            lineSpacing: 14,
            itemSpacing: 7,
            topSpacing: 10,
            leftSpacing: 10,
            rightSpacing: 10,
            bottomSpacing: 10,
        };
       this.listView.showScrollBar = true;
       this.listView.bounces = false;

        this.listView.onRegister = position => {
            if (position % 2 === 0) {
                return TYPE_TITLE;
            } else {
                return TYPE_ITEM;
            }
        
        };
        this.listView.onCreate = type => {
            if (type === TYPE_TITLE) {
                return new TitleCell();
            } else {
                return new ItemCell();
            }
        };
        this.listView.onUpdate = (position, cell) => {
            if (cell instanceof ItemCell) {
                cell.refresh(position);
            }
        };


        // 下拉刷新和加载更多
        let pullRefreshCell = new PullRefreshCell();
        this.listView.refreshView = pullRefreshCell;
        this.listView.onRefresh = state => {
            console.log("PullRefresh: state = " + state);
            if (state == 1) {
                // pullRefreshCell.setHint("下拉刷新");
            } else if (state == 2) {
                pullRefreshCell.setHint("加载中...");
                page = 1;
                this.loadData();
            } else {
                // pullRefreshCell.setHint("加载完成");
            }
        };

        let loadMoreCell = new LoadMoreCell();
        this.listView.loadMoreView = loadMoreCell;

        this.listView.onLoadMore = state => {
             console.log("LoadMore: state = " + state);
             if (state == 1) {
                 loadMoreCell.setHint("加载中...");
                 page++;
                 this.loadMore();
             } else if (state == 2) {
                 loadMoreCell.setHint("没有更多数据");
             } else {
                 loadMoreCell.setHint("加载完成");
             }
        };

        this.listView.addEventListener('scroll', (event) => {
            console.log('state = ' + event.state);
            console.log('offsetX = ' + event.offsetX);
            console.log('offsetY = ' + event.offsetY);
            console.log('dx = ' + event.dx);
            console.log('dy = ' + event.dy);
        })

        this.appendChild(this.listView);
        this.loadData();
    }

    loadData() {
        this.listView.refresh(ITEM_COUNT);
    }


    loadMore() {
        if (page) {
            this.listView.refresh(ITEM_COUNT * page);
        } else {
            this.listView.stopLoadMore(false);
        }
    }
}

class TitleCell extends View {
    constructor() {
        super();
        this.style = {
            width: '100%',
            height: 10,
            backgroundColor: '#dddddd',
        };

        let textView = new Text();
        textView.style = {
            height: 40,
        };
        textView.text = 'Title';

        this.appendChild(textView);
    }
}

class ItemCell extends View {
    constructor() {
        super();
        this.style = {
            width: '100%',
            height: 140,
            backgroundColor: '#FF000022',
        };

        this.textView = new Text();
        this.textView.style = {
            height: 20,
            textAlign: "center",
        };

        let lineView = new View();
        lineView.style = {
            width: '100%',
            height: 0.3,
            backgroundColor: '#999999',
        };

        this.appendChild(this.textView);
    }

    refresh(position) {
        this.textView.text = position.toString();
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