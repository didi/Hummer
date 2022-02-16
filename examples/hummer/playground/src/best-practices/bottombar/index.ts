import { Hummer, View, Text, Scroller } from '@hummer/hummer-front'
import { Style } from '../../common/CommonStyle'
import { Color } from '../../common/CommonColor'
import { ComponentPage } from '../../common/CommonPage'
class RootView extends ComponentPage {
  contentView: View;

  constructor() {
    super();
    this.setPageTitle('底部栏系列');
    this.style = {
      ...Style.FullParentStyle,
      backgroundColor: Color.white,
    }
  }
  initDisplayView() {
    // 复写父类方法，去除DisplayView
  }
  initContentView() {
    this.showBottomBar1();
    this.showBottomBar2();
  }
  /**
   * 底部栏（通过 position: 'absolute' + bottom: 0 实现）
   */
  showBottomBar1() {
    let bottomLayout = new View();
    bottomLayout.style = {
      position: 'absolute', // 关键点
      bottom: 0, // 关键点
      width: '100%',
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Color.hm_green,
    }

    let textView = new Text();
    textView.text = '底部栏（absolute + bottom: 0）';
    textView.style = {
      fontSize: 18,
      color: Color.black,
    }

    bottomLayout.appendChild(textView);
    this.appendChild(bottomLayout);
  }

  /**
   * 底部栏（通过 flexGrow: 1 实现，并通过 marginBottom 来设置底部外边距）
   */
  showBottomBar2() {
    let contentLayout = new View();
    contentLayout.style = {
      width: '100%',
      flexGrow: 1, // 关键点
    }

    let bottomLayout = new View();
    bottomLayout.style = {
      width: '100%',
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Color.hm_blue,
      marginBottom: 60, // 关键点
    }

    let textView = new Text();
    textView.text = '底部栏（flexGrow: 1）';
    textView.style = {
      fontSize: 18,
      color: Color.black,
    }

    this.appendChild(contentLayout);
    bottomLayout.appendChild(textView);
    this.appendChild(bottomLayout);
  }
}

Hummer.render(new RootView());