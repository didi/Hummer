import { Hummer, View, Image, Text, Scroller, Navigator, Toast } from '@hummer/hummer-front'
import { Style } from '../../common/CommonStyle'
import { Color } from '../../common/CommonColor'
import { Img } from '../../common/CommonResource'
import { ComponentPage } from '../../common/CommonPage'
class RootView extends ComponentPage {
  contentView: View;

  constructor() {
    super();
    this.setPageTitle('标题栏系列');
    this.style = {
      ...Style.FullParentStyle,
      backgroundColor: Color.white,
    }
  }
  initDisplayView() {
    // 复写父类方法，去除DisplayView
  }
  initContentView(){
    this.showNormalTitleBar();
    this.showTitleBarWithMargin();
    this.showTitleBarWithBackMenu();
    this.showTitleBarWithBackMenuBadge();
  }
  /**
   * 标题栏（仅文字，居中）
   */
  showNormalTitleBar() {
    let titleLayout = new View();
    titleLayout.style = {
      width: '100%',
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Color.hm_green,
    }

    let titleView = new Text();
    titleView.text = '标题栏（文本居中）';
    titleView.style = {
      fontSize: 18,
      color: Color.black,
    }

    titleLayout.appendChild(titleView);
    this.appendChild(titleLayout);
  }

  /**
   * 标题栏（有外边距）
   */
  showTitleBarWithMargin() {
    let titleLayout = new View();
    titleLayout.style = {
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
      alignSelf: 'stretch', // 关键点
      backgroundColor: Color.hm_blue,
    }

    let titleView = new Text();
    titleView.text = '标题栏（外边距）';
    titleView.style = {
      fontSize: 18,
      color: Color.black,
    }

    titleLayout.appendChild(titleView);
    this.appendChild(titleLayout);
  }

  /**
   * 标题栏（有【返回】按钮和【菜单】按钮）
   */
  showTitleBarWithBackMenu() {
    let titleLayout = new View();
    titleLayout.style = {
      flexDirection: 'row',
      width: '100%',
      height: 60,
      alignItems: 'center',
      backgroundColor: Color.hm_green,
    }

    let backView = new Image();
    backView.style = {
      width: 24,
      height: 24,
      marginLeft: 16,
      resize: 'contain',
    }
    backView.src = Img.NavigatorBack;
    backView.addEventListener('tap', event => {
      Navigator.popPage();
    })

    let titleView = new Text();
    titleView.text = '标题栏（按钮）';
    titleView.style = {
      fontSize: 18,
      textAlign: 'center',
      flexGrow: 1, // 关键点
      color: Color.black,
    }

    let menuView = new Image();
    menuView.style = {
      width: 24,
      height: 24,
      marginRight: 20,
      resize: 'contain',
    }
    menuView.src = Img.MenuIcon;
    menuView.addEventListener('tap', event => {
      Toast.show('menu click')
    })

    titleLayout.appendChild(backView);
    titleLayout.appendChild(titleView);
    titleLayout.appendChild(menuView);
    this.appendChild(titleLayout);
  }

  /**
   * 标题栏（有【返回】按钮、【菜单】按钮和【小红点】）
   */
  showTitleBarWithBackMenuBadge() {
    let titleLayout = new View();
    titleLayout.style = {
      flexDirection: 'row',
      width: '100%',
      height: 60,
      alignItems: 'center',
      backgroundColor: Color.hm_blue,
    }

    let backLayout = new View();
    backLayout.style = {
      marginLeft: 16,
    }
    backLayout.addEventListener('tap', event => {
      Navigator.popPage();
    })

    let backView = new Image();
    backView.style = {
      width: 24,
      height: 24,
      resize: 'contain',
    }
    backView.src = Img.NavigatorBack;

    backLayout.appendChild(backView);

    let titleView = new Text();
    titleView.text = '标题栏（按钮 + 小红点）';
    titleView.style = {
      fontSize: 18,
      textAlign: 'center',
      flexGrow: 1,
      color: Color.black,
    }

    let menuLayout = new View();
    menuLayout.style = {
      flexDirection: 'row',
      marginRight: 8,
    }
    menuLayout.addEventListener('tap', event => {
      Toast.show('menu click')
    })

    let menuView = new Image();
    menuView.style = {
      width: 24,
      height: 24,
      resize: 'contain',
    }
    menuView.src = Img.MenuIcon;

    let badgeView = new Text();
    badgeView.text = '111'
    badgeView.style = {
      height: 16,
      minWidth: 16,
      marginTop: -6, // 关键点
      marginLeft: -12, // 关键点
      padding: 4, // 关键点
      backgroundColor: '#FF0000',
      borderRadius: 8,
      textAlign: 'center',
      fontSize: 10,
      color: '#FFFFFF',
    }
    menuLayout.appendChild(menuView);
    menuLayout.appendChild(badgeView);

    titleLayout.appendChild(backLayout);
    titleLayout.appendChild(titleView);
    titleLayout.appendChild(menuLayout);
    this.appendChild(titleLayout);
  }
}

Hummer.render(new RootView());