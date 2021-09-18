import { Hummer, View, Text } from '@hummer/hummer-front'
import { Page, ScrollContentView, GroupTitle, GroupContent } from '../../common/CommonLayout'
import { Color } from '../../common/CommonColor'
import { Style } from '../../common/CommonStyle'
import { Img } from '../../common/CommonResource'

class RootView extends Page {
  contentView: View;

  constructor() {
    super();
    this.setPageTitle('通用视图样式');
    this.initContentView();
  }

  initContentView() {
    this.contentView = new ScrollContentView();
    this.appendChild(this.contentView);

    this.initBackgroundGroup();
    this.initBorderShadowGroup();
    this.initCornerRadiusShadowGroup();
    this.initOpacityGroup();
    this.initVisibilityGroup();
    this.initOverflowGroup();
    this.initZIndexGroup();
  }

  initBackgroundGroup() {
    this.contentView.appendChild(new GroupTitle('背景'));

    let layout = new GroupContent();
    this.contentView.appendChild(layout);

    let view1 = new View();
    view1.style = Style.SquareItemStyle;
    layout.appendChild(view1);

    let view2 = new View();
    view2.style = {
      ...Style.SquareItemStyle,
      backgroundColor: Color.hm_linear_gradient,
    }
    layout.appendChild(view2);

    let view3 = new View();
    view3.style = {
      ...Style.SquareItemStyle,
      backgroundImage: Img.hummerLogo,
    }
    layout.appendChild(view3);
  }

  initBorderShadowGroup() {
    this.contentView.appendChild(new GroupTitle('边框 & 阴影'));

    let layout = new GroupContent();
    this.contentView.appendChild(layout);

    let view1 = new View();
    view1.style = {
      ...Style.SquareItemStyle,
      ...Style.ItemBorderStyle,
      ...Style.ItemShadowStyle,
    }
    layout.appendChild(view1);

    let view2 = new View();
    view2.style = {
      ...Style.SquareItemStyle,
      ...Style.ItemBorderStyle,
      ...Style.ItemShadowStyle,
      borderStyle: 'dashed',
    }
    layout.appendChild(view2);

    let view3 = new View();
    view3.style = {
      ...Style.SquareItemStyle,
      ...Style.ItemBorderStyle,
      ...Style.ItemShadowStyle,
      borderStyle: 'dotted',
    }
    layout.appendChild(view3);

    let view4 = new View();
    view4.style = {
      ...Style.SquareItemStyle,
      ...Style.ItemBorderLeftStyle,
      ...Style.ItemBorderTopStyle,
      ...Style.ItemBorderRightStyle,
      ...Style.ItemBorderBottomStyle,
      ...Style.ItemShadowStyle,
      backgroundColor: Color.hm_linear_gradient,
      borderLeftColor: '#FF0080',
      borderTopColor: '#FF8000',
      borderRightColor: '#0080FF',
      borderBottomColor: '#008000',
      borderLeftWidth: 4,
      borderTopWidth: 6,
      borderRightWidth: 8,
      borderBottomWidth: 6,
    }
    layout.appendChild(view4);

    let view5 = new View();
    view5.style = {
      ...Style.SquareItemStyle,
      ...Style.ItemBorderLeftStyle,
      ...Style.ItemBorderTopStyle,
      ...Style.ItemBorderRightStyle,
      ...Style.ItemBorderBottomStyle,
      ...Style.ItemShadowStyle,
      backgroundColor: Color.hm_linear_gradient,
      borderLeftColor: '#FF0080',
      borderTopColor: '#FF8000',
      borderRightColor: '#0080FF',
      borderBottomColor: '#008000',
      borderLeftWidth: 4,
      borderTopWidth: 6,
      borderRightWidth: 8,
      borderBottomWidth: 6,
      borderTopLeftRadius: 12,
      borderBottomRightRadius: 12,
    }
    layout.appendChild(view5);
  }

  initCornerRadiusShadowGroup() {
    this.contentView.appendChild(new GroupTitle('圆角 & 阴影'));

    let layout = new GroupContent();
    this.contentView.appendChild(layout);

    let view1 = new View();
    view1.style = {
      ...Style.SquareItemStyle,
      ...Style.ItemShadowStyle,
    }
    layout.appendChild(view1);

    let view2 = new View();
    view2.style = {
      ...Style.SquareItemStyle,
      ...Style.ItemShadowStyle,
      borderTopLeftRadius: 10,
      borderBottomRightRadius: 10,
    }
    layout.appendChild(view2);

    let view3 = new View();
    view3.style = {
      ...Style.RoundItemStyle,
      ...Style.ItemShadowStyle,
    }
    layout.appendChild(view3);

    let view4 = new View();
    view4.style = {
      ...Style.CircleItemStyle,
      ...Style.ItemShadowStyle,
      backgroundColor: Color.hm_linear_gradient,
    }
    layout.appendChild(view4);
  }

  initOpacityGroup() {
    this.contentView.appendChild(new GroupTitle('透明度'));

    let layout = new GroupContent();
    this.contentView.appendChild(layout);

    let view1 = new Text();
    view1.text = '80%';
    view1.style = {
      ...Style.SquareItemStyle,
      ...Style.SmallTextStyle,
      opacity: 0.8,
    }
    layout.appendChild(view1);

    let view2 = new Text();
    view2.text = '20%',
      view2.style = {
        ...Style.SquareItemStyle,
        ...Style.SmallTextStyle,
        opacity: 0.2,
      }
    layout.appendChild(view2);
  }

  initVisibilityGroup() {
    this.contentView.appendChild(new GroupTitle('可见性'));

    let layout = new GroupContent();
    this.contentView.appendChild(layout);

    let view1 = new View();
    view1.style = {
      ...Style.SquareItemStyle,
      width: '100',
      backgroundColor: '#00A0FF',
    }

    let text1 = new Text();
    text1.text = "display: 'none'";
    text1.style = {
      ...Style.SmallTextStyle,
      backgroundColor: Color.hm_yellow,
    }
    view1.appendChild(text1);

    let textNormal1 = new Text();
    textNormal1.text = 'normal';
    textNormal1.style = {
      ...Style.SmallTextStyle,
      backgroundColor: Color.hm_green,
    }

    view1.appendChild(textNormal1);
    layout.appendChild(view1);

    let view2 = new View();
    view2.style = {
      ...Style.SquareItemStyle,
      width: '100',
      backgroundColor: Color.hm_blue,
    }

    let text2 = new Text();
    text2.text = "visibility: 'hidden'";
    text2.style = {
      ...Style.SmallTextStyle,
      backgroundColor: Color.hm_yellow,
    }
    view2.appendChild(text2);

    let textNormal2 = new Text();
    textNormal2.text = 'normal';
    textNormal2.style = {
      ...Style.SmallTextStyle,
      backgroundColor: Color.hm_green,
    }

    view2.appendChild(textNormal2);
    layout.appendChild(view2);

    let show = true;
    setInterval(() => {
      text1.style = { display: show ? 'none' : 'flex' };
      text2.style = { visibility: show ? 'hidden' : 'visible' };
      show = !show;
    }, 1000);
  }

  initOverflowGroup() {
    this.contentView.appendChild(new GroupTitle('Overflow'));

    let layout = new GroupContent();
    this.contentView.appendChild(layout);

    let view1 = new View();
    view1.style = {
      ...Style.SquareItemStyle,
      justifyContent: 'center',
    }

    let view2 = new View();
    view2.style = {
      width: 40,
      height: 30,
      backgroundColor: Color.hm_yellow,
      marginLeft: 16,
    }

    view1.appendChild(view2)
    layout.appendChild(view1);

    let visible = true;
    setInterval(() => {
      view1.style = { overflow: visible ? 'hidden' : 'visible' };
      visible = !visible;
    }, 1000);
  }

  initZIndexGroup() {
    this.contentView.appendChild(new GroupTitle('zIndex'));

    let layout = new GroupContent();
    layout.style = {
      marginBottom: 32,
    }
    this.contentView.appendChild(layout);

    let view1 = new View();
    view1.style = {
      ...Style.SquareItemStyle,
    }

    let view2 = new View();
    view2.style = {
      width: 40,
      height: 30,
      backgroundColor: Color.hm_yellow,
      marginLeft: -28,
    }

    let subLayout = new View();
    subLayout.style = {
      flexDirection: 'row',
      alignItems: 'center',
    };
    subLayout.appendChild(view1)
    subLayout.appendChild(view2);
    layout.appendChild(subLayout);

    let visible = true;
    setInterval(() => {
      view2.style = { zIndex: visible ? -1 : 1 };
      visible = !visible;
    }, 1000);
  }
}

// 根页面渲染
Hummer.render(new RootView());