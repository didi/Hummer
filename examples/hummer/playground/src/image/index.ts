import { Hummer, View, Text, Image } from '@hummer/hummer-front'
import { GroupTitle, GroupContent } from '../common/CommonLayout'
import { ComponentPage } from '../common/CommonPage'
import { Color } from '../common/CommonColor'
import { Style } from '../common/CommonStyle'
import { Img } from '../common/CommonResource'

class RootView extends ComponentPage {
  constructor() {
    super();
    this.setPageTitle('Image')
  }

  initContentView() {
    super.initContentView();

    // 通用
    this.initBackgroundSetting(0);
    this.initCornerRadiusSetting(0);
    this.initBorderSetting(0);
    this.initShadowSetting(0);

    // Image
    this.initResizeSetting(0);
  }

  createDisplayView(): View {
    let displayView = new Image();
    displayView.style = {
      width: 240,
      height: 140,
      backgroundColor: Color.hm_green,
    }
    displayView.src = Img.hummerLogo;
    return displayView;
  }

  initResizeSetting(selectIndex: number = 0) {
    this.contentView.appendChild(new GroupTitle('拉伸模式'));

    let layout = new GroupContent();
    this.contentView.appendChild(layout);

    let views = new Array<View>();
    let resizes = ['origin', 'contain', 'cover', 'stretch'];
    type Resize = 'origin' | 'contain' | 'cover' | 'stretch';
    resizes.forEach((resize, i) => {
      let view = new Text();
      view.text = resize;
      view.style = {
        ...Style.SelectTextItemStyle,
      }
      views.push(view);

      view.addEventListener('tap', () => {
        this.selectItemWithBorder(views, i);
        (<Image>this.displayView).style = {
          resize: <Resize>resize,
        }
      });

      this.selectItemWithBorder(views, selectIndex);

      layout.appendChild(view);
    });
  }
}

Hummer.render(new RootView());