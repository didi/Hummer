import { Hummer, View, Text, TextArea } from '@hummer/hummer-front'
import { GroupTitle, GroupContent } from '../common/CommonLayout'
import { InputPage } from '../input/InputPage'
import { Color } from '../common/CommonColor'
import { Style } from '../common/CommonStyle'

class RootView extends InputPage {
  constructor() {
    super();
    this.setPageTitle('TextArea')
  }

  initContentView() {
    super.initContentView();

    // 通用
    this.initBackgroundSetting(0);
    this.initCornerRadiusSetting(0);
    this.initBorderSetting(0);
    this.initShadowSetting(0);

    // TextArea
    this.initTextLineClampSetting(0);
    this.initTextAlignSetting(1);
    this.initFontColorSetting(3);
    this.initPlaceholderColorSetting(3);
    this.initCursorColorSetting(3);
    this.initFocusSetting(1);
    this.initFontSizeSetting(2);
    this.initMaxLengthSetting(0);
    this.initTypesSetting(0);
    this.initReturnKeyTypesSetting(0);
    this.initEnableSetting(0);
  }

  createDisplayView(): View {
    let displayView = new TextArea();
    displayView.placeholder = 'This is a TextArea!';
    displayView.style = {
      backgroundColor: Color.hm_green,
      fontSize: 22,
      color: Color.black,
      placeholderColor: Color.transparent_grey,
    }
    return displayView;
  }

  initTextLineClampSetting(selectIndex: number = 0) {
    this.contentView.appendChild(new GroupTitle('文本行数'));

    let layout = new GroupContent();
    this.contentView.appendChild(layout);

    let views = new Array<View>();
    let textLineClamps: number[] = [0, 1, 2, 3];
    textLineClamps.forEach((lineClamp, i) => {
      let view = new Text();
      view.text = lineClamp.toString();
      view.style = {
        ...Style.SelectTextItemStyle,
      }
      views.push(view);

      view.addEventListener('tap', () => {
        this.selectItemWithBorder(views, i);
        (<Text>this.displayView).style = {
          textLineClamp: textLineClamps[i],
        }
      });

      this.selectItemWithBorder(views, selectIndex);

      layout.appendChild(view);
    });
  }
}

Hummer.render(new RootView());