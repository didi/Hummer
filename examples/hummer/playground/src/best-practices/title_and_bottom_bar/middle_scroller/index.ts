import { Hummer, View, Text, Image, Scroller, Navigator, Toast } from '@hummer/hummer-front'
import { Style } from '../../../common/CommonStyle'
import { Color } from '../../../common/CommonColor'
import { Img } from '../../../common/CommonResource'

class RootView extends View {
  contentView: View;

  constructor() {
    super();
    this.style = {
      ...Style.FullParentStyle,
      backgroundColor: Color.white,
    }

    /**
     * 标题栏 + 中间Scroller + 底部栏（巧用 flexGrow: 1，flexShrink: 1）
     */
    this.showTitleBar();
    this.showMiddleView();
    this.showBottomBar();
  }

  /**
   * 中间部分（Scroller）
   */
  showMiddleView() {
    let contentLayout = new Scroller();
    contentLayout.style = {
      width: '100%',
      flexGrow: 1, // 关键点
      flexShrink: 1, // 关键点（如果内容比较多时不想撑开布局，就用这个属性）
    }

    for (let i = 0; i < 10; i++) {
      let v = new Text();
      v.text = i.toString();
      v.style = {
        width: '100%',
        height: 100,
        fontSize: 20,
        textAlign: 'center',
        color: Color.black,
        backgroundColor: i % 2 == 0 ? '#00FF0010' : '#FF000010',
      }
      contentLayout.appendChild(v);
    }

    this.appendChild(contentLayout);
  }

  /**
   * 标题栏
   */
  showTitleBar() {
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
    titleView.text = '标题栏';
    titleView.style = {
      fontSize: 18,
      textAlign: 'center',
      flexGrow: 1,
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
   * 底部栏
   */
  showBottomBar() {
    let bottomLayout = new View();
    bottomLayout.style = {
      width: '100%',
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Color.hm_blue,
    }

    let textView = new Text();
    textView.text = '底部栏';
    textView.style = {
      fontSize: 18,
      color: Color.black,
    }

    bottomLayout.appendChild(textView);
    this.appendChild(bottomLayout);
  }
}

Hummer.render(new RootView());