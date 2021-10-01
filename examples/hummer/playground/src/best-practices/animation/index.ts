import { Hummer, View, Scroller } from '@hummer/hummer-front'
import { MainListItem } from '../../common/CommonLayout'
import { Style } from '../../common/CommonStyle'
import { Color } from '../../common/CommonColor'

class RootView extends Scroller {
  contentView: View;

  constructor() {
    super();
    this.style = {
      ...Style.FullParentStyle,
      backgroundColor: Color.white,
    }

    this.initContentView();
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