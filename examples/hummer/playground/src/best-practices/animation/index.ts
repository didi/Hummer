import { Hummer, View, Scroller } from '@hummer/hummer-front'
import { MainListItem } from '../../common/CommonLayout'
import { Style } from '../../common/CommonStyle'
import { Color } from '../../common/CommonColor'
import { ComponentPage } from '../../common/CommonPage'
class RootView extends ComponentPage {
  contentView: View;

  constructor() {
    super();
    this.setPageTitle('动画系列');
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

    this.initItem("水波纹效果", 'animation_ripple.js');
    this.initItem("Loading 效果", 'animation_loading.js');
  }

  initItem(title: string, dstPageName: string) {
    let itemView = new MainListItem(title, dstPageName);
    this.contentView.appendChild(itemView);
  }
}

Hummer.render(new RootView());