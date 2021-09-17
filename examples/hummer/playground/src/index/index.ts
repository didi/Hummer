import { Hummer, View, Text, Scroller, Image, Navigator } from '@hummer/hummer-front'
import { Style } from '../common/CommonStyle'
import { Color } from '../common/CommonColor'
import { Img } from '../common/CommonResource'

class RootView extends Scroller {
  contentView: View;

  constructor() {
    super();
    this.style = {
      ...Style.FullParentStyle,
      backgroundColor: Color.white,
    }

    this.initTopBackground();
    this.initLogoView();
    this.initContentView();
  }

  initTopBackground() {
    let view = new View();
    view.style = {
      width: '100%',
      height: 218,
      backgroundColor: Color.hm_linear_gradient,
    }
    this.appendChild(view);
  }

  initLogoView() {
    let layout = new View();
    layout.style = {
      width: '90%',
      height: 190,
      marginTop: -150,
      alignSelf: 'center',
      backgroundColor: Color.white,
      borderRadius: 8,
      shadow: '1 2 12 #00000014',
      ...Style.CenterStyle,
    }

    let image = new Image();
    image.style = {
      width: 180,
      height: 80,
      resize: 'contain',
    }
    image.src = Img.hummerLogo;

    let text = new Text();
    text.style = {
      color: '#292A36',
      fontSize: 11,
      marginTop: 24,
    }
    text.text = "超轻量动态化跨端框架Hummer组件库";

    layout.appendChild(image);
    layout.appendChild(text);
    this.appendChild(layout);
  }

  initContentView() {
    this.contentView = new View();
    this.contentView.style = {
      width: '100%',
      flexGrow: 1,
      padding: 18,
    }
    this.appendChild(this.contentView);

    this.initCommonViewStyle();
    this.initViewComponents();
  }

  initCommonViewStyle() {
    this.initGroupTitle('通用样式');
    this.initItem("通用布局样式", 'normal_layout_style.js');
    this.initItem("通用视图样式", 'normal_view_style.js');
  }

  initViewComponents() {
    this.initGroupTitle('视图组件');
    this.initItem("View", 'view.js');
    this.initItem("Text", 'text.js');
    this.initItem("Button", 'button.js');
    this.initItem("Image", 'image.js');
    this.initItem("Switch", 'switch.js');
    this.initItem("Input", 'input.js');
    this.initItem("TextArea", 'textarea.js');
    this.initItem("Scroller", 'scroller.js');
    this.initItem("HorizontalScroller", 'hscroller.js');
    this.initItem("List", 'list.js');
    this.initItem("ViewPager", 'view_pager.js');
  }

  initGroupTitle(title: string) {
    let text = new Text();
    text.style = {
      color: '#9B9B9B',
      fontSize: 13,
      marginTop: 24,
      marginBottom: 3,
      marginLeft: 20,
    }
    text.text = title;
    this.contentView.appendChild(text);
  }

  initItem(title: string, dstPageName: string) {
    let layout = new View();
    layout.style = {
      flexDirection: 'row',
      height: 64,
      marginTop: 10,
      backgroundColor: '#FFFFFF',
      shadow: '1 2 12 #00000014',
      borderRadius: 8,
      justifyContent: 'space-between',
      alignItems: 'center',
    }

    let text = new Text();
    text.style = {
      color: '#1F1944',
      fontSize: 18,
      marginLeft: 21,
    }
    text.text = title;

    let image = new Image();
    image.style = {
      width: 16,
      height: 16,
      marginRight: 24,
      resize: 'contain',
    }
    image.src = Img.ListRightArrow;

    layout.appendChild(text);
    layout.appendChild(image);
    this.contentView.appendChild(layout);

    layout.addEventListener('tap', (event) => {
      let page = {
        url: './' + dstPageName,
      }
      Navigator.openPage(page, null);
    })
  }
}

Hummer.render(new RootView());