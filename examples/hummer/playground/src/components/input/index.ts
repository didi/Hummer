import { Hummer, View, Input } from '@hummer/hummer-front'
import { InputPage } from './InputPage'
import { Color } from '../../common/CommonColor'

class RootView extends InputPage {
  constructor() {
    super();
    this.setPageTitle('Input')
  }

  initContentView() {
    super.initContentView();

    // 通用
    this.initBackgroundSetting(0);
    this.initCornerRadiusSetting(0);
    this.initBorderSetting(0);
    this.initShadowSetting(0);

    // Input
    this.initTextAlignSetting(1);
    this.initFontColorSetting(0);
    this.initPlaceholderColorSetting(0);
    this.initCursorColorSetting(0);
    this.initFocusSetting(1);
    this.initFontSizeSetting(2);
    this.initMaxLengthSetting(0);
    this.initTypesSetting(0);
    this.initReturnKeyTypesSetting(0);
    this.initEnableSetting(0);
  }

  createDisplayView(): View {
    let displayView = new Input();
    displayView.placeholder = 'This is an Input!';
    displayView.style = {
      backgroundColor: Color.hm_green,
      fontSize: 22,
      color: Color.black,
      placeholderColor: Color.transparent_grey,
    }
    return displayView;
  }
}

Hummer.render(new RootView());