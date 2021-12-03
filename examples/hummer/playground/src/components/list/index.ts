import { Hummer, View, List, ScrollEvent } from '@hummer/hummer-front'
import { NormalContentView, ListTitleCell, ListItemCell, ListHoriItemCell, GridItemCell, WaterfallItemCell, PullRefreshCell, LoadMoreCell } from '../../common/CommonLayout';
import { ComponentPage } from '../../common/CommonPage'
import { Color } from '../../common/CommonColor'

const TYPE_TITLE = 1;
const TYPE_ITEM = 2;
const ITEM_COUNT = 20;

class RootView extends ComponentPage {
  containers: Array<View>;

  constructor() {
    super();
    this.setPageTitle('List');
  }

  initDisplayView() {
    // 复写父类方法，去除DisplayView
  }

  initContentView() {
    this.contentView = new NormalContentView();
    this.contentView.style = {
      padding: 4,
      flexShrink: 1,
    };
    this.appendChild(this.contentView);

    // 初始化List的容器（4个）
    this.initListContainers();

    this.initList1();
    this.initList2();
    this.initList3();
    this.initList4();
  }

  initListContainers() {
    let c1 = new View();
    c1.style = {
      width: '50%',
      margin: 4,
      flexShrink: 1,
      backgroundColor: Color.white,
    }
    let c2 = new View();
    c2.style = {
      width: '50%',
      margin: 4,
      flexShrink: 1,
      backgroundColor: Color.white,
    }
    let row1 = new View();
    row1.style = {
      flexDirection: 'row',
      width: '100%',
      height: '50%',
    }
    row1.appendChild(c1);
    row1.appendChild(c2);
    this.contentView.appendChild(row1);

    let c3 = new View();
    c3.style = {
      width: '50%',
      margin: 4,
      flexShrink: 1,
      backgroundColor: Color.white,
    }
    let c4 = new View();
    c4.style = {
      width: '50%',
      margin: 4,
      flexShrink: 1,
      backgroundColor: Color.white,
    }
    let row2 = new View();
    row2.style = {
      flexDirection: 'row',
      width: '100%',
      height: '50%',
      flexShrink: 1,
    }
    row2.appendChild(c3);
    row2.appendChild(c4);
    this.contentView.appendChild(row2);

    this.containers = new Array();
    this.containers.push(c1);
    this.containers.push(c2);
    this.containers.push(c3);
    this.containers.push(c4);
  }

  initList1() {
    let listView = new List();
    listView.style = {
      width: '100%',
      height: '100%',
      mode: "list",
      // scrollDirection: "vertical",
      // scrollDirection: "horizontal",
      lineSpacing: 4,
      topSpacing: 8,
      leftSpacing: 8,
      rightSpacing: 8,
      bottomSpacing: 8,
      showScrollBar: true,
    };
    listView.onRegister = position => {
      console.log("TypeCallback: position = " + position);
      if (position % 2 === 0) {
        return TYPE_TITLE;
      } else {
        return TYPE_ITEM;
      }
    };
    listView.onCreate = type => {
      console.log("CreateCallback: type = " + type);
      if (type === TYPE_TITLE) {
        return new ListTitleCell();
      } else {
        return new ListItemCell();
      }
    };
    listView.onUpdate = (position, cell) => {
      console.log("UpdateCallback: position = " + position + ", cell = " + cell);
      if (cell instanceof ListItemCell) {
        cell.refresh(position);
      }
    };

    // 下拉刷新和加载更多
    let page = 0;
    let pullRefreshCell = new PullRefreshCell();
    listView.refreshView = pullRefreshCell;

    listView.onRefresh = state => {
      console.log("PullRefresh: state = " + state);
      if (state == 1) {
        pullRefreshCell.setHint("下拉刷新");
      } else if (state == 2) {
        pullRefreshCell.setHint("加载中...");
        page = 0;
        this.loadData(listView);
      } else {
        pullRefreshCell.setHint("加载完成");
      }
    };

    let loadMoreCell = new LoadMoreCell();
    listView.loadMoreView = loadMoreCell;

    listView.onLoadMore = state => {
      console.log("LoadMore: state = " + state);
      if (state == 1) {
        loadMoreCell.setHint("加载中...");
        page++;
        this.loadMore(listView, page);
      } else if (state == 2) {
        loadMoreCell.setHint("没有更多数据了");
      } else {
        loadMoreCell.setHint("加载完成");
      }
    };

    listView.addEventListener('scroll', (event: ScrollEvent) => {
      console.log('state = ' + event.state);
      console.log('offsetX = ' + event.offsetX);
      console.log('offsetY = ' + event.offsetY);
      console.log('dx = ' + event.dx);
      console.log('dy = ' + event.dy);
    })

    this.containers[0].appendChild(listView);

    this.loadData(listView);
  }

  initList2() {
    let listView = new List();
    listView.style = {
      width: '100%',
      height: '100%',
      mode: "grid",
      column: 4,
      // scrollDirection: "vertical",
      // scrollDirection: "horizontal",
      lineSpacing: 4,
      itemSpacing: 4,
      topSpacing: 8,
      leftSpacing: 8,
      rightSpacing: 8,
      bottomSpacing: 8,
      showScrollBar: true,
    };
    listView.onCreate = type => {
      return new GridItemCell();
    };
    listView.onUpdate = (position, cell) => {
      if (cell instanceof GridItemCell) {
        cell.refresh(position);
      }
    };

    // 下拉刷新和加载更多
    let page = 0;
    let pullRefreshCell = new PullRefreshCell();
    listView.refreshView = pullRefreshCell;

    listView.onRefresh = state => {
      console.log("PullRefresh: state = " + state);
      if (state == 1) {
        pullRefreshCell.setHint("下拉刷新");
      } else if (state == 2) {
        pullRefreshCell.setHint("加载中...");
        page = 0;
        this.loadData(listView);
      } else {
        pullRefreshCell.setHint("加载完成");
      }
    };

    let loadMoreCell = new LoadMoreCell();
    listView.loadMoreView = loadMoreCell;

    listView.onLoadMore = state => {
      console.log("LoadMore: state = " + state);
      if (state == 1) {
        loadMoreCell.setHint("加载中...");
        page++;
        this.loadMore(listView, page);
      } else if (state == 2) {
        loadMoreCell.setHint("没有更多数据了");
      } else {
        loadMoreCell.setHint("加载完成");
      }
    };

    this.containers[1].appendChild(listView);

    this.loadData(listView);
  }

  initList3() {
    let listView = new List();
    listView.style = {
      width: '100%',
      height: '100%',
      mode: "waterfall",
      column: 3,
      // scrollDirection: "vertical",
      // scrollDirection: "horizontal",
      lineSpacing: 4,
      itemSpacing: 4,
      topSpacing: 8,
      leftSpacing: 8,
      rightSpacing: 8,
      bottomSpacing: 8,
    };
    listView.onCreate = type => {
      return new WaterfallItemCell();
    };
    listView.onUpdate = (position, cell) => {
      if (cell instanceof WaterfallItemCell) {
        cell.refresh(position);
      }
    };

    // 下拉刷新和加载更多
    let page = 0;
    let pullRefreshCell = new PullRefreshCell();
    listView.refreshView = pullRefreshCell;

    listView.onRefresh = state => {
      console.log("PullRefresh: state = " + state);
      if (state == 1) {
        pullRefreshCell.setHint("下拉刷新");
      } else if (state == 2) {
        pullRefreshCell.setHint("加载中...");
        page = 0;
        this.loadData(listView);
      } else {
        pullRefreshCell.setHint("加载完成");
      }
    };

    let loadMoreCell = new LoadMoreCell();
    listView.loadMoreView = loadMoreCell;

    listView.onLoadMore = state => {
      console.log("LoadMore: state = " + state);
      if (state == 1) {
        loadMoreCell.setHint("加载中...");
        page++;
        this.loadMore(listView, page);
      } else if (state == 2) {
        loadMoreCell.setHint("没有更多数据了");
      } else {
        loadMoreCell.setHint("加载完成");
      }
    };

    this.containers[2].appendChild(listView);

    this.loadData(listView);
  }

  initList4() {
    let listView = new List();
    listView.style = {
      width: '100%',
      height: '100%',
      mode: "list",
      column: 3,
      // scrollDirection: "vertical",
      scrollDirection: "horizontal",
      lineSpacing: 4,
      // itemSpacing: 4,
      topSpacing: 8,
      leftSpacing: 8,
      rightSpacing: 8,
      bottomSpacing: 8,
    };
    listView.onCreate = type => {
      return new ListHoriItemCell();
    };
    listView.onUpdate = (position, cell) => {
      if (cell instanceof ListHoriItemCell) {
        cell.refresh(position);
      }
    };

    // 下拉刷新和加载更多
    let page = 0;
    let pullRefreshCell = new PullRefreshCell();
    listView.refreshView = pullRefreshCell;

    listView.onRefresh = state => {
      console.log("PullRefresh: state = " + state);
      if (state == 1) {
        pullRefreshCell.setHint("下拉刷新");
      } else if (state == 2) {
        pullRefreshCell.setHint("加载中...");
        page = 0;
        this.loadData(listView);
      } else {
        pullRefreshCell.setHint("加载完成");
      }
    };

    let loadMoreCell = new LoadMoreCell();
    listView.loadMoreView = loadMoreCell;

    listView.onLoadMore = state => {
      console.log("LoadMore: state = " + state);
      if (state == 1) {
        loadMoreCell.setHint("加载中...");
        page++;
        this.loadMore(listView, page);
      } else if (state == 2) {
        loadMoreCell.setHint("没有更多数据了");
      } else {
        loadMoreCell.setHint("加载完成");
      }
    };

    this.containers[3].appendChild(listView);

    this.loadData(listView);
  }

  loadData(listView: List) {
    setTimeout(() => {
      listView.refresh(ITEM_COUNT);
      listView.stopPullRefresh();
    }, 300);
  }

  loadMore(listView: List, page: number) {
    if (page < 5) {
      setTimeout(() => {
        listView.stopLoadMore(true);
        listView.refresh(ITEM_COUNT * page);
      }, 300);
    } else {
      listView.stopLoadMore(false);
    }
  }
}

Hummer.render(new RootView());