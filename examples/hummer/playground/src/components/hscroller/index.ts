import { Hummer, View, Text, HorizontalScroller } from '@hummer/hummer-front'
import { NormalContentView, OperationLayout } from '../../common/CommonLayout';
import { ComponentPage } from '../../common/CommonPage'
import { Color } from '../../common/CommonColor'

class RootView extends ComponentPage {
  containers: Array<View>;

  constructor() {
    super();
    this.setPageTitle('HorizontalScroller');
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
    // this.initScroller4();
  }

  initScrollerContainers() {
    let c1 = new View();
    c1.style = {
      height: '25%',
      margin: 4,
      flexShrink: 1,
      backgroundColor: Color.white,
    }
    let c2 = new View();
    c2.style = {
      height: '25%',
      margin: 4,
      flexShrink: 1,
      backgroundColor: Color.white,
    }
    let c3 = new View();
    c3.style = {
      height: '25%',
      margin: 4,
      flexShrink: 1,
      backgroundColor: Color.white,
    }
    let c4 = new View();
    c4.style = {
      height: '25%',
      margin: 4,
      flexShrink: 1,
      backgroundColor: Color.white,
    }

    this.contentView.appendChild(c1);
    this.contentView.appendChild(c2);
    this.contentView.appendChild(c3);
    // this.contentView.appendChild(c4);

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
        width: 30,
        height: 30 + itmeViews.length * 20,
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

  initScrollerOperationLayout(container: View, scroller: HorizontalScroller) {
    let operLayout = new OperationLayout();
    operLayout.style = {
      position: 'absolute',
      bottom: 4,
      right: 4,
      zIndex: 1,
      overflow: 'visible',
    }
    operLayout.addView.text = '◀';
    operLayout.addView.addEventListener('tap', event => {
      scroller.scrollToTop();
    });
    operLayout.removeView.text = '▶';
    operLayout.removeView.addEventListener('tap', event => {
      scroller.scrollToBottom();
    });
    container.appendChild(operLayout);
  }

  initScroller1() {
    let scroller = new HorizontalScroller();
    scroller.style = {
      backgroundColor: Color.hm_green + '20',
      alignSelf: 'flex-start',
    }

    let itmeViews: Array<View> = new Array();
    for (let i = 0; i < 3; i++) {
      let item = new Text();
      item.text = i.toString();
      item.style = {
        width: 30,
        height: 30 + i * 20,
        margin: 6,
        backgroundColor: Color.hm_green,
        textAlign: 'center',
      };
      scroller.appendChild(item);

      itmeViews.push(item);
    }

    // 解决阴影被裁切问题
    let scrollerWrapper = new View();
    scrollerWrapper.style = {
      width: '100%',
      height: '100%',
    }
    scrollerWrapper.appendChild(scroller);

    this.containers[0].appendChild(scrollerWrapper);

    // 底部操作区域
    this.initViewOperationLayout(this.containers[0], scroller, itmeViews);
  }

  initScroller2() {
    let scroller = new HorizontalScroller();
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
        width: 30,
        height: 30 + i * 20,
        margin: 6,
        backgroundColor: Color.hm_green,
        textAlign: 'center',
      };
      scroller.appendChild(item);

      itmeViews.push(item);
    }

    // 解决阴影被裁切问题
    let scrollerWrapper = new View();
    scrollerWrapper.style = {
      width: '100%',
      height: '100%',
    }
    scrollerWrapper.appendChild(scroller);

    this.containers[1].appendChild(scrollerWrapper);

    // 底部操作区域
    this.initViewOperationLayout(this.containers[1], scroller, itmeViews);
  }

  initScroller3() {
    let scroller = new HorizontalScroller();
    scroller.style = {
      width: '100%',
      height: '100%',
      alignSelf: 'flex-start',
    }

    for (let i = 0; i < 20; i++) {
      let item = new Text();
      item.text = i.toString();
      item.style = {
        width: 30,
        margin: 6,
        backgroundColor: Color.hm_green,
        textAlign: 'center',
      };
      scroller.appendChild(item);
    }

    // 解决阴影被裁切问题
    let scrollerWrapper = new View();
    scrollerWrapper.style = {
      width: '100%',
      height: '100%',
    }
    scrollerWrapper.appendChild(scroller);

    this.containers[2].appendChild(scrollerWrapper);

    // 底部操作区域
    this.initScrollerOperationLayout(this.containers[2], scroller);
  }
}

Hummer.render(new RootView());