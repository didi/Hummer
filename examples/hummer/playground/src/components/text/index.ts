import { Hummer, View, Text } from '@hummer/hummer-front'
import { GroupTitle, GroupContent } from '../../common/CommonLayout'
import { ComponentPage } from '../../common/CommonPage'
import { Color } from '../../common/CommonColor'
import { Style } from '../../common/CommonStyle'


class RootView extends ComponentPage {
  constructor() {
    super();
    this.setPageTitle('Text')
  }

  initContentView() {
    super.initContentView();

    // 通用
    this.initBackgroundSetting(0);
    this.initCornerRadiusSetting(0);
    this.initBorderSetting(0);
    this.initShadowSetting(0);

    // Text
    this.initTextAlignSetting(1);
    this.initFontColorSetting(0);
    this.initFontSizeSetting(2);
    this.initFontStyleSetting(0);
    this.initTextDecorationSetting(0);
    this.initTextOverflowSetting(0);
    this.initTextLineClampSetting(0);
    this.initLetterSpacingSetting(0);
    this.initlineSpacingSetting(1);
  }

  createDisplayView(): View {
    let displayView = new Text();
    displayView.text = 'This is a Text!\nThis is a Text!\nThis is a Text!\nThis is a Text!';
    displayView.style = {
      width: 220,
      minHeight: 120,
      backgroundColor: Color.hm_green,
      textAlign: 'center',
      fontSize: 22,
      color: Color.black,
    }
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
        (<Text>this.displayView).style = {
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
        (<Text>this.displayView).style = {
          fontSize: fontSizes[i],
        }
      });

      this.selectItemWithBorder(views, selectIndex);

      layout.appendChild(view);
    });
  }

  initFontStyleSetting(selectIndex: number = 0) {
    this.contentView.appendChild(new GroupTitle('文本样式'));

    let layout = new GroupContent();
    this.contentView.appendChild(layout);

    let views = new Array<View>();
    let fontStyles: string[] = ['normal', 'bold', 'italic', 'bold & italic'];
    fontStyles.forEach((style, i) => {
      let view = new Text();
      view.text = style;
      view.style = {
        ...Style.SelectTextItemStyle,
        fontWeight: style === 'bold' || style === 'bold & italic' ? 'bold' : 'normal',
        fontStyle: style === 'italic' || style === 'bold & italic' ? 'italic' : 'normal',
      }
      views.push(view);

      view.addEventListener('tap', () => {
        this.selectItemWithBorder(views, i);
        (<Text>this.displayView).style = {
          fontWeight: fontStyles[i] === 'bold' || fontStyles[i] === 'bold & italic' ? 'bold' : 'normal',
          fontStyle: fontStyles[i] === 'italic' || fontStyles[i] === 'bold & italic' ? 'italic' : 'normal',
        }
      });

      this.selectItemWithBorder(views, selectIndex);

      layout.appendChild(view);
    });
  }

  initTextDecorationSetting(selectIndex: number = 0) {
    this.contentView.appendChild(new GroupTitle('文本装饰'));

    let layout = new GroupContent();
    this.contentView.appendChild(layout);

    let views = new Array<View>();
    let textDecorations = ['none', 'underline', 'line-through'];
    type TextDecoration = 'none' | 'underline' | 'line-through';
    textDecorations.forEach((decoration, i) => {
      let view = new Text();
      view.text = decoration;
      view.style = {
        ...Style.SelectTextItemStyle,
        textDecoration: <TextDecoration>decoration,
      }
      views.push(view);

      view.addEventListener('tap', () => {
        this.selectItemWithBorder(views, i);
        (<Text>this.displayView).style = {
          textDecoration: <TextDecoration>textDecorations[i],
        }
      });

      this.selectItemWithBorder(views, selectIndex);

      layout.appendChild(view);
    });
  }

  initTextOverflowSetting(selectIndex: number = 0) {
    this.contentView.appendChild(new GroupTitle('文本省略'));

    let layout = new GroupContent();
    this.contentView.appendChild(layout);

    let views = new Array<View>();
    let textOverflows = ['ellipsis', 'clip'];
    type TextOverflow = 'ellipsis' | 'clip';
    textOverflows.forEach((overflow, i) => {
      let view = new Text();
      view.text = overflow === 'ellipsis' ? overflow + '...' : overflow;
      view.style = {
        ...Style.SelectTextItemStyle,
      }
      views.push(view);

      view.addEventListener('tap', () => {
        this.selectItemWithBorder(views, i);
        (<Text>this.displayView).style = {
          textOverflow: <TextOverflow>textOverflows[i],
        }
      });

      this.selectItemWithBorder(views, selectIndex);

      layout.appendChild(view);
    });
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

  initLetterSpacingSetting(selectIndex: number = 0) {
    this.contentView.appendChild(new GroupTitle('字间距'));

    let layout = new GroupContent();
    this.contentView.appendChild(layout);

    let views = new Array<View>();
    let letterSpacings: number[] = [0, 0.5, 1];
    letterSpacings.forEach((spacing, i) => {
      let view = new Text();
      view.text = spacing.toString();
      view.style = {
        ...Style.SelectTextItemStyle,
      }
      views.push(view);

      view.addEventListener('tap', () => {
        this.selectItemWithBorder(views, i);
        (<Text>this.displayView).style = {
          letterSpacing: letterSpacings[i],
        }
      });

      this.selectItemWithBorder(views, selectIndex);

      layout.appendChild(view);
    });
  }

  initlineSpacingSetting(selectIndex: number = 1) {
    this.contentView.appendChild(new GroupTitle('行间距'));

    let layout = new GroupContent();
    layout.style = {
      marginBottom: 32,
    }
    this.contentView.appendChild(layout);

    let views = new Array<View>();
    let lineSpacings: number[] = [0.5, 1, 1.5, 2];
    lineSpacings.forEach((spacing, i) => {
      let view = new Text();
      view.text = spacing.toString();
      view.style = {
        ...Style.SelectTextItemStyle,
      }
      views.push(view);

      view.addEventListener('tap', () => {
        this.selectItemWithBorder(views, i);
        (<Text>this.displayView).style = {
          lineSpacingMulti: lineSpacings[i],
        }
      });

      this.selectItemWithBorder(views, 1);

      layout.appendChild(view);
    });
  }
}

Hummer.render(new RootView());