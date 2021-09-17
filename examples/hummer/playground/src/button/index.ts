import { Hummer, View, Text, Button } from '@hummer/hummer-front'
import { GroupTitle, GroupContent } from '../common/CommonLayout'
import { ComponentPage } from '../common/CommonPage'
import { Color } from '../common/CommonColor'
import { Style } from '../common/CommonStyle'

class RootView extends ComponentPage {
  constructor() {
    super();
    this.setPageTitle('Button')
  }

  initContentView() {
    super.initContentView();

    // 通用
    this.initBackgroundSetting(0);
    this.initCornerRadiusSetting(0);
    this.initBorderSetting(0);
    this.initShadowSetting(0);

    // Button
    this.initTextAlignSetting(1);
    this.initFontColorSetting(0);
    this.initFontSizeSetting(2);
    this.initEnableSetting(0);
  }

  createDisplayView(): View {
    let displayView = new Button();
    displayView.text = 'This is a Button!';
    displayView.style = {
      width: 220,
      backgroundColor: Color.hm_green,
      textAlign: 'center',
      fontSize: 22,
      color: Color.black,
    }
    displayView.pressed = {
      backgroundColor: '#FF0000',
      color: '#FFFF00',
    };
    displayView.disabled = {
      backgroundColor: '#EEEEEE',
      color: '#CCCCCC',
    };
    return displayView;
  }

  initTextAlignSetting(selectIndex: number = 1) {
    this.contentView.appendChild(new GroupTitle('文本对齐'));

    let layout = new GroupContent();
    layout.style = { paddingLeft: 18 };
    this.contentView.appendChild(layout);

    let views = new Array<View>();
    let textAligns = ['left', 'center', 'right'];
    type TextAlign = 'left' | 'center' | 'right';
    textAligns.forEach((align, i) => {
      let view = new Text();
      view.text = align;
      view.style = {
        ...Style.SelectColorTextItemStyle,
        textAlign: <TextAlign>align,
      }
      views.push(view);

      view.addEventListener('tap', () => {
        this.selectItemWithBorder(views, i);
        (<Text>this.displayView).style = {
          textAlign: <TextAlign>textAligns[i],
        }
      });

      this.selectItemWithBorder(views, selectIndex);

      layout.appendChild(view);
    });
  }

  initFontColorSetting(selectIndex: number = 0) {
    this.contentView.appendChild(new GroupTitle('文本颜色'));

    let layout = new GroupContent();
    layout.style = { paddingLeft: 20 };
    this.contentView.appendChild(layout);

    let views = new Array<View>();
    let textColors: string[] = [Color.black, Color.hm_yellow, Color.hm_blue];
    textColors.forEach((color, i) => {
      let view = new View();
      view.style = {
        ...Style.SelectColorItemStyle,
        backgroundColor: color,
      }
      views.push(view);

      view.addEventListener('tap', () => {
        this.selectItemWithBorder(views, i);
        (<Button>this.displayView).style = {
          color: textColors[i],
        }
      });

      this.selectItemWithBorder(views, selectIndex);

      layout.appendChild(view);
    });
  }

  initFontSizeSetting(selectIndex: number = 2) {
    this.contentView.appendChild(new GroupTitle('文本大小'));

    let layout = new GroupContent();
    this.contentView.appendChild(layout);

    let views = new Array<View>();
    let fontSizes: number[] = [10, 16, 22, 28];
    fontSizes.forEach((size, i) => {
      let view = new Text();
      view.text = size.toString();
      view.style = {
        ...Style.SelectTextItemStyle,
        fontSize: size / 1.5,
      }
      views.push(view);

      view.addEventListener('tap', () => {
        this.selectItemWithBorder(views, i);
        (<Button>this.displayView).style = {
          fontSize: fontSizes[i],
        }
      });

      this.selectItemWithBorder(views, selectIndex);

      layout.appendChild(view);
    });
  }

  initEnableSetting(selectIndex: number = 0) {
    this.contentView.appendChild(new GroupTitle('可用性'));

    let layout = new GroupContent();
    layout.style = {
      marginBottom: 32,
    }
    this.contentView.appendChild(layout);

    let views = new Array<View>();
    let enables: string[] = ['enable', 'disable'];
    enables.forEach((enable, i) => {
      let view = new Text();
      view.text = enable;
      view.style = {
        ...Style.SelectTextItemStyle,
        color: enable !== 'disable' ? Color.black : Color.light_grey,
      }
      views.push(view);

      view.addEventListener('tap', () => {
        this.selectItemWithBorder(views, i);
        this.displayView.enabled = enables[i] !== 'disable';
      });

      this.selectItemWithBorder(views, selectIndex);

      layout.appendChild(view);
    });
  }
}

Hummer.render(new RootView());