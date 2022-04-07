import { Hummer, View, Scroller } from '@hummer/hummer-front'
import { MainListItem } from '../../common/CommonLayout'
import { ComponentPage } from '../../common/CommonPage'
import { Style } from '../../common/CommonStyle'
import { Color } from '../../common/CommonColor'

class RootView extends ComponentPage {
  contentView: View;

  constructor() {
    super();
    this.setPageTitle('标题栏 + 底部栏');
    this.style = {
      ...Style.FullParentStyle,
      backgroundColor: Color.white,
    }
  }
  initDisplayView() {
    // 复写父类方法，去除DisplayView
  }
  initContentView() {
    this.contentView = new View();
    this.contentView.style = {
      width: '100%',
      flexGrow: 1,
      padding: 18,
    }
    this.appendChild(this.contentView);

    this.initItem("中间是普通 View", 'middle_view.js');
    this.initItem("中间是 Scroller", 'middle_scroller.js');
  }

  initItem(title: string, dstPageName: string) {
    let itemView = new MainListItem(title, dstPageName);
    this.contentView.appendChild(itemView);
  }
}

Hummer.render(new RootView());