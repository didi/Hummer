import { Hummer, View, Text, Image, ViewPager, ViewPagerStyle } from '@hummer/hummer-front'
import { NormalContentView, OperationLayout } from '../common/CommonLayout';
import { ComponentPage } from '../common/CommonPage'
import { Color } from '../common/CommonColor'

class RootView extends ComponentPage {
  containers: Array<View>;
  data1: Array<string>;
  data2: Array<number>;

  constructor() {
    super();
    this.setPageTitle('ViewPager');
  }

  initData() {
    this.data1 = [
      'https://pt-starimg.didistatic.com/static/starimg/img/WjRyAMkJbL1607860816543.jpg',
      'https://pt-starimg.didistatic.com/static/starimg/img/jEv0wHEGSj1607860825566.png',
      'https://pt-starimg.didistatic.com/static/starimg/img/5IR0XHVxGa1607861443454.png',
    ];

    this.data2 = [0, 1, 2, 3, 4];
  }

  initDisplayView() {
    // 复写父类方法，去除DisplayView
  }

  initContentView() {
    this.contentView = new NormalContentView();
    this.contentView.style = {
      padding: 8,
      flexShrink: 1,
    };
    this.appendChild(this.contentView);

    // 初始化ViewPager的容器（4个）
    this.initViewPagerContainers();

    this.initViewPager1();
    this.initViewPager2();
    this.initViewPager3();
    this.initViewPager4();
  }

  initViewPagerContainers() {
    let c1 = new View();
    c1.style = {
      height: '25%',
      margin: 8,
      flexShrink: 1,
      backgroundColor: Color.white,
      justifyContent: 'center',
      alignItems: 'center',
    }
    let c2 = new View();
    c2.style = {
      height: '25%',
      margin: 8,
      flexShrink: 1,
      backgroundColor: Color.white,
      justifyContent: 'center',
      alignItems: 'center',
    }
    let c3 = new View();
    c3.style = {
      height: '25%',
      margin: 8,
      flexShrink: 1,
      backgroundColor: Color.white,
      justifyContent: 'center',
      alignItems: 'center',
    }
    let c4 = new View();
    c4.style = {
      height: '25%',
      margin: 8,
      flexShrink: 1,
      backgroundColor: Color.white,
      justifyContent: 'center',
      alignItems: 'center',
    }

    this.contentView.appendChild(c1);
    this.contentView.appendChild(c2);
    this.contentView.appendChild(c3);
    this.contentView.appendChild(c4);

    this.containers = new Array();
    this.containers.push(c1);
    this.containers.push(c2);
    this.containers.push(c3);
    this.containers.push(c4);
  }

  initScrollerOperationLayout(container: View, viewPager: ViewPager) {
    let operLayout = new OperationLayout();
    operLayout.style = {
      position: 'absolute',
      bottom: 4,
      right: 4,
      zIndex: 1,
      overflow: 'visible',
    }
    operLayout.addView.text = '1';
    operLayout.addView.addEventListener('tap', event => {
      viewPager.setCurrentItem(1)
    });
    operLayout.removeView.text = '3';
    operLayout.removeView.addEventListener('tap', event => {
      viewPager.setCurrentItem(3)
    });
    container.appendChild(operLayout);
  }

  initViewPager1() {
    let pager = new ViewPager();
    pager.style = {
      width: '100%',
      height: '100%',
      canLoop: true,
      autoPlay: true,
      loopInterval: 2000,
    };

    pager.onPageChange((current, total) => {
      console.log("ViewPager onPageChange, index: " + (current + 1) + "/" + total);
    });
    pager.onItemClick((position) => {
      console.log("ViewPager onItemClick, position: " + position);
    });

    pager.onItemView((position, view) => {
      let image = <Image>view;
      if (!image) {
        image = new Image();
        image.style = {
          resize: 'cover',
        }
      }
      image.src = this.data1[position];
      return image;
    });

    pager.data = this.data1;

    this.containers[0].appendChild(pager);
  }

  initViewPager2() {
    let colors = [Color.hm_green, Color.hm_yellow, Color.hm_blue, Color.hm_orange, Color.hm_purple]

    let pager = new ViewPager();
    pager.style = {
      width: '100%',
      height: '100%',
      // canLoop: true,
      // autoPlay: true,
      loopInterval: 2000,
      borderRadius: 20,
    };
    pager.onPageChange((current, total) => {
      console.log("ViewPager2 onPageChange, index: " + (current + 1) + "/" + total);
    });
    pager.onItemClick((position) => {
      console.log("ViewPager2 onItemClick, position: " + position);
    });
    pager.onItemView((position, view) => {
      console.log("ViewPager2 onItemView, position: " + position + ", view = " + view);
      let textView = <Text>view;
      if (!textView) {
        textView = new Text();
        textView.style = {
          margin: 50,
          textAlign: 'center',
          fontSize: 30,
        }
      }
      textView.text = this.data2[position].toString();
      textView.style = { backgroundColor: colors[position] }
      return textView;
    });

    pager.data = this.data2;

    this.containers[1].appendChild(pager);

    this.initScrollerOperationLayout(this.containers[1], pager)
  }

  initViewPager3() {
    let pager = new ViewPager();
    pager.style = {
      width: '100%',
      height: '100%',
      itemSpacing: 20,
      edgeSpacing: 40,
      canLoop: true,
      autoPlay: true,
      loopInterval: 2000,
      backgroundColor: Color.hm_green + '20',
    };

    pager.onPageChange((current, total) => {
      console.log("ViewPager onPageChange, index: " + (current + 1) + "/" + total);
    });
    pager.onItemClick((position) => {
      console.log("ViewPager onItemClick, position: " + position);
    });

    pager.onItemView((position, view) => {
      let image = <Image>view;
      if (!image) {
        image = new Image();
        image.style = {
          resize: 'cover',
          borderRadius: 20,
        }
      }
      image.src = this.data1[position];
      return image;
    });

    pager.data = this.data1;

    this.containers[2].appendChild(pager);
  }

  initViewPager4() {
    let colors = [Color.hm_green, Color.hm_yellow, Color.hm_blue, Color.hm_orange, Color.hm_purple]

    let pager = new ViewPager();
    pager.style = {
      width: '100%',
      height: '100%',
      itemSpacing: 20,
      edgeSpacing: 40,
      canLoop: true,
      // autoPlay: true,
      loopInterval: 2000,
      backgroundColor: Color.hm_green + '20',
    };
    pager.onPageChange((current, total) => {
      console.log("ViewPager2 onPageChange, index: " + (current + 1) + "/" + total);
    });
    pager.onItemClick((position) => {
      console.log("ViewPager2 onItemClick, position: " + position);
    });
    pager.onItemView((position, view) => {
      console.log("ViewPager2 onItemView, position: " + position + ", view = " + view);
      let textView = <Text>view;
      if (!textView) {
        textView = new Text();
        textView.style = {
          backgroundColor: Color.hm_green,
          textAlign: 'center',
          fontSize: 30,
        }
      }
      textView.text = this.data2[position].toString();
      textView.style = { backgroundColor: colors[position] }
      return textView;
    });

    pager.data = this.data2;

    this.containers[3].appendChild(pager);

    this.initScrollerOperationLayout(this.containers[3], pager)
  }
}

Hummer.render(new RootView());