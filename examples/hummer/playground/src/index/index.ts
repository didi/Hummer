import { Hummer, View, Text, Scroller, Image } from '@hummer/hummer-front'
import { MainListGroupTitle, MainListItem } from '../common/CommonLayout'
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

    this.initNormalStyle();
    this.initViewComponents();
    this.initBestPractices();
    this.initGames();
  }

  initNormalStyle() {
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

  initBestPractices() {
    this.initGroupTitle('最佳实践');
    this.initItem("标题栏系列", 'titlebar.js');
    this.initItem("底部栏系列", 'bottombar.js');
    this.initItem("标题栏 + 底部栏", 'title_and_bottom_bar.js');
    this.initItem("动画系列", 'animation.js');
    this.initItem("跑马灯文字效果", 'marquee.js');
    this.initItem("价格居中 + 标签", 'price_flag.js');
    this.initItem("验证码页面", 'verification_code.js');
  }

  initGames() {
    this.initGroupTitle('小游戏');
    this.initItem("2048", 'game_2048.js');
    this.initItem("贪吃蛇", 'game_snake.js');
    this.initItem("俄罗斯方块", 'game_tetris.js');
  }

  initGroupTitle(title: string) {
    let titleView = new MainListGroupTitle(title);
    this.contentView.appendChild(titleView);
  }

  initItem(title: string, dstPageName: string) {
    let itemView = new MainListItem(title, dstPageName);
    this.contentView.appendChild(itemView);
  }
}

Hummer.render(new RootView());