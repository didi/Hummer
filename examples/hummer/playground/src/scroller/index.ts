import { Hummer, View, Text, Scroller } from '@hummer/hummer-front'
import { NormalContentView, OperationLayout, PullRefreshCell, LoadMoreCell } from '../common/CommonLayout';
import { ComponentPage } from '../common/CommonPage'
import { Color } from '../common/CommonColor'

class RootView extends ComponentPage {
  containers: Array<View>;

  constructor() {
    super();
    this.setPageTitle('Scroller');
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

    // 初始化Scroller的容器（4个）
    this.initScrollerContainers();

    this.initScroller1();
    this.initScroller2();
    this.initScroller3();
    this.initScroller4();
  }

  initScrollerContainers() {
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

  initViewOperationLayout(container: View, dstLayout: View, itmeViews: Array<View>) {
    let operLayout = new OperationLayout();
    operLayout.style = {
      position: 'absolute',
      bottom: 4,
      right: 4,
      zIndex: 1,
      overflow: 'visible',
    }
    operLayout.addView.addEventListener('tap', event => {
      let item = new Text();
      item.text = itmeViews.length.toString();
      item.style = {
        width: 30 + itmeViews.length * 20,
        height: 30,
        margin: 6,
        backgroundColor: Color.hm_green,
        textAlign: 'center',
      };
      dstLayout.appendChild(item);

      itmeViews.push(item);
    });
    operLayout.removeView.addEventListener('tap', event => {
      if (itmeViews.length > 0) {
        dstLayout.removeChild(itmeViews.pop());
      }
    });
    container.appendChild(operLayout);
  }

  initScrollerOperationLayout(container: View, scroller: Scroller) {
    let operLayout = new OperationLayout();
    operLayout.style = {
      position: 'absolute',
      bottom: 4,
      right: 4,
      zIndex: 1,
      overflow: 'visible',
    }
    operLayout.addView.text = '▲';
    operLayout.addView.addEventListener('tap', event => {
      scroller.scrollToTop();
    });
    operLayout.removeView.text = '▼';
    operLayout.removeView.addEventListener('tap', event => {
      scroller.scrollToBottom();
    });
    container.appendChild(operLayout);
  }

  initScroller1() {
    let scroller = new Scroller();
    scroller.style = {
      backgroundColor: Color.hm_green + '20',
      alignSelf: 'flex-start',
    }

    let itmeViews: Array<View> = new Array();
    for (let i = 0; i < 3; i++) {
      let item = new Text();
      item.text = i.toString();
      item.style = {
        width: 30 + i * 20,
        height: 30,
        margin: 6,
        backgroundColor: Color.hm_green,
        textAlign: 'center',
      };
      scroller.appendChild(item);

      itmeViews.push(item);
    }

    // 解决阴影被裁切问题
    let scrollerWrapper = new View();
    scrollerWrapper.appendChild(scroller);

    this.containers[0].appendChild(scrollerWrapper);

    // 底部操作区域
    this.initViewOperationLayout(this.containers[0], scroller, itmeViews);
  }

  initScroller2() {
    let scroller = new Scroller();
    scroller.style = {
      width: '100%',
      height: '100%',
      backgroundColor: Color.hm_green + '20',
    }

    let itmeViews: Array<View> = new Array();
    for (let i = 0; i < 3; i++) {
      let item = new Text();
      item.text = i.toString();
      item.style = {
        width: 30 + i * 20,
        height: 30,
        margin: 6,
        backgroundColor: Color.hm_green,
        textAlign: 'center',
      };
      scroller.appendChild(item);

      itmeViews.push(item);
    }

    // 解决阴影被裁切问题
    let scrollerWrapper = new View();
    scrollerWrapper.appendChild(scroller);

    this.containers[1].appendChild(scrollerWrapper);

    // 底部操作区域
    this.initViewOperationLayout(this.containers[1], scroller, itmeViews);
  }

  initScroller3() {
    let scroller = new Scroller();
    scroller.style = {
      width: '100%',
      height: '100%',
      alignSelf: 'flex-start',
    }

    for (let i = 0; i < 20; i++) {
      let item = new Text();
      item.text = i.toString();
      item.style = {
        height: 30,
        margin: 6,
        backgroundColor: Color.hm_green,
        textAlign: 'center',
      };
      scroller.appendChild(item);
    }

    // 解决阴影被裁切问题
    let scrollerWrapper = new View();
    scrollerWrapper.appendChild(scroller);

    this.containers[2].appendChild(scrollerWrapper);

    // 底部操作区域
    this.initScrollerOperationLayout(this.containers[2], scroller);
  }

  initScroller4() {
    let scroller = new Scroller();
    scroller.style = {
      width: '100%',
      height: '100%',
      alignSelf: 'flex-start',
    }

    // 解决阴影被裁切问题
    let scrollerWrapper = new View();
    scrollerWrapper.appendChild(scroller);

    this.containers[3].appendChild(scrollerWrapper);

    // 下拉刷新和加载更多
    let page = 0;
    let pullRefreshCell = new PullRefreshCell();
    scroller.refreshView = pullRefreshCell;

    scroller.onRefresh = (state: any) => {
      console.log("PullRefresh: state = " + state);
      if (state == 1) {
        pullRefreshCell.setHint("下拉刷新");
      } else if (state == 2) {
        pullRefreshCell.setHint("加载中...");
        page = 0;
        this.loadData(scroller);
      } else {
        pullRefreshCell.setHint("加载完成");
      }
    };

    let loadMoreCell = new LoadMoreCell();
    scroller.loadMoreView = loadMoreCell;

    scroller.onLoadMore = (state: any) => {
      console.log("LoadMore: state = " + state);
      if (state == 1) {
        loadMoreCell.setHint("加载中...");
        page++;
        this.loadMore(scroller, page);
      } else if (state == 2) {
        loadMoreCell.setHint("没有更多数据了");
      } else {
        loadMoreCell.setHint("加载完成");
      }
    };

    // 加载数据
    this.loadData(scroller);
  }

  loadData(scroller: Scroller) {
    scroller.removeAll();

    setTimeout(() => {
      for (let i = 0; i < 5; i++) {
        let item = new Text();
        item.text = i.toString();
        item.style = {
          height: 30,
          margin: 6,
          backgroundColor: Color.hm_green,
          textAlign: 'center',
        };
        scroller.appendChild(item);
      }

      scroller.stopPullRefresh();
    }, 300);
  }

  loadMore(scroller: Scroller, page: number) {
    if (page < 5) {
      setTimeout(() => {
        scroller.stopLoadMore(true);

        for (let i = 0; i < 5; i++) {
          let item = new Text();
          item.text = (i + page * 3).toString();
          item.style = {
            height: 30,
            margin: 6,
            flexGrow: 1,
            backgroundColor: Color.hm_green,
            textAlign: 'center',
          };
          scroller.appendChild(item);
        }
      }, 300);
    } else {
      // 到最后一页
      scroller.stopLoadMore(false);
    }
  }
}

Hummer.render(new RootView());