import { Hummer, View } from '@hummer/hummer-front'
import { ComponentPage } from '../common/CommonPage'
import { Color } from '../common/CommonColor'

class RootView extends ComponentPage {
  constructor() {
    super();
    this.setPageTitle('View');
  }

  initContentView() {
    super.initContentView();

    // 通用
    this.initBackgroundSetting(0);
    this.initCornerRadiusSetting(0);
    this.initBorderSetting(0);
    this.initShadowSetting(0);
  }

  createDisplayView(): View {
    let displayView = new View();
    displayView.style = {
      width: 100,
      height: 100,
      backgroundColor: Color.hm_green,
    }
    return displayView;
  }
}

Hummer.render(new RootView());