import { Hummer, View, Text, Input } from '@hummer/hummer-front'
import { GroupTitle, GroupContent } from '../common/CommonLayout'
import { ComponentPage } from '../common/CommonPage'
import { Color } from '../common/CommonColor'
import { Style } from '../common/CommonStyle'

export class InputPage extends ComponentPage {

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
    layout.style = { paddingLeft: 18 };
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
        (<Input>this.displayView).style = {
          color: textColors[i],
        }
      });

      this.selectItemWithBorder(views, selectIndex);

      layout.appendChild(view);
    });
  }

  initPlaceholderColorSetting(selectIndex: number = 0) {
    this.contentView.appendChild(new GroupTitle('占位提示文本颜色'));

    let layout = new GroupContent();
    layout.style = { paddingLeft: 18 };
    this.contentView.appendChild(layout);

    let views = new Array<View>();
    let placeholderColors: string[] = [Color.transparent_grey, Color.hm_yellow, Color.hm_blue];
    placeholderColors.forEach((color, i) => {
      let view = new View();
      view.style = {
        width: 36,
        height: 20,
        marginTop: 8,
        marginBottom: 8,
        backgroundColor: color,
      }
      views.push(view);

      view.addEventListener('tap', () => {
        this.selectItemWithBorder(views, i);
        (<Input>this.displayView).style = {
          placeholderColor: placeholderColors[i],
        }
      });

      this.selectItemWithBorder(views, selectIndex);

      layout.appendChild(view);
    });
  }

  initCursorColorSetting(selectIndex: number = 0) {
    this.contentView.appendChild(new GroupTitle('光标颜色'));

    let layout = new GroupContent();
    layout.style = { paddingLeft: 18 };
    this.contentView.appendChild(layout);

    let views = new Array<View>();
    let cursorColors: string[] = [Color.black, Color.hm_yellow, Color.hm_blue];
    cursorColors.forEach((color, i) => {
      let view = new View();
      view.style = {
        width: 36,
        height: 20,
        marginTop: 8,
        marginBottom: 8,
        backgroundColor: color,
      }
      views.push(view);

      view.addEventListener('tap', () => {
        this.selectItemWithBorder(views, i);
        (<Input>this.displayView).style = {
          cursorColor: cursorColors[i],
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
      }
      views.push(view);

      view.addEventListener('tap', () => {
        this.selectItemWithBorder(views, i);
        (<Input>this.displayView).style = {
          fontSize: fontSizes[i],
        }
      });

      this.selectItemWithBorder(views, selectIndex);

      layout.appendChild(view);
    });
  }

  initMaxLengthSetting(selectIndex: number = 0) {
    this.contentView.appendChild(new GroupTitle('最大输入长度'));

    let layout = new GroupContent();
    this.contentView.appendChild(layout);

    let views = new Array<View>();
    let maxLengths: number[] = [0, 3, 6, 9];
    maxLengths.forEach((length, i) => {
      let view = new Text();
      view.text = length.toString();
      view.style = {
        ...Style.SelectTextItemStyle,
      }
      views.push(view);

      view.addEventListener('tap', () => {
        this.selectItemWithBorder(views, i);
        (<Input>this.displayView).style = {
          maxLength: maxLengths[i],
        }
      });

      this.selectItemWithBorder(views, selectIndex);

      layout.appendChild(view);
    });
  }

  initTypesSetting(selectIndex: number = 0) {
    this.contentView.appendChild(new GroupTitle('键盘类型'));

    let layout = new GroupContent();
    this.contentView.appendChild(layout);

    let views = new Array<View>();
    let types: string[] = ['default', 'number', 'tel', 'email', 'password'];
    type Type = 'default' | 'number' | 'tel' | 'email' | 'password';
    types.forEach((type, i) => {
      let view = new Text();
      view.text = type.toString();
      view.style = {
        ...Style.SelectTextItemStyle,
      }
      views.push(view);

      view.addEventListener('tap', () => {
        this.selectItemWithBorder(views, i);
        (<Input>this.displayView).style = {
          type: <Type>types[i],
        }
      });

      this.selectItemWithBorder(views, selectIndex);

      layout.appendChild(view);
    });
  }

  initReturnKeyTypesSetting(selectIndex: number = 0) {
    this.contentView.appendChild(new GroupTitle('键盘返回按钮类型'));

    let layout = new GroupContent();
    this.contentView.appendChild(layout);

    let views = new Array<View>();
    let returnKeyTypes: string[] = ['done', 'go', 'next', 'search', 'send'];
    type ReturnKeyTypes = 'done' | 'go' | 'next' | 'search' | 'send';
    returnKeyTypes.forEach((type, i) => {
      let view = new Text();
      view.text = type.toString();
      view.style = {
        ...Style.SelectTextItemStyle,
      }
      views.push(view);

      view.addEventListener('tap', () => {
        this.selectItemWithBorder(views, i);
        (<Input>this.displayView).style = {
          returnKeyType: <ReturnKeyTypes>returnKeyTypes[i],
        }
      });

      this.selectItemWithBorder(views, selectIndex);

      layout.appendChild(view);
    });
  }

  initFocusSetting(selectIndex: number = 1) {
    this.contentView.appendChild(new GroupTitle('焦点'));

    let layout = new GroupContent();
    this.contentView.appendChild(layout);

    let views = new Array<View>();
    let focuses: string[] = ['focus', 'unfocus'];
    focuses.forEach((focus, i) => {
      let view = new Text();
      view.text = focus;
      view.style = {
        ...Style.SelectTextItemStyle,
      }
      views.push(view);

      view.addEventListener('tap', () => {
        this.selectItemWithBorder(views, i);
        (<Input>this.displayView).focused = focuses[i] === 'focus';
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