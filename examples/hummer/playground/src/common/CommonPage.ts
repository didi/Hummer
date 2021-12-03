import { View, Text } from '@hummer/hummer-front'
import { Page, ScrollContentView, GroupTitle, GroupContent } from './CommonLayout';
import { Style } from './CommonStyle';
import { Color } from './CommonColor';
import { Img } from './CommonResource';

export class ComponentPage extends Page {
  contentView: View;
  displayView: View;

  constructor() {
    super();
    this.initData();
    this.initDisplayView();
    this.initContentView();
  }

  initData() {

  }

  initContentView() {
    this.contentView = new ScrollContentView();
    this.appendChild(this.contentView);
  }

  createDisplayView(): View {
    return new View();
  }

  initDisplayView() {
    let displayLayout = new View();
    displayLayout.style = {
      width: '100%',
      padding: 24,
      backgroundColor: Color.white,
      ...Style.CenterStyle,
    }

    this.displayView = this.createDisplayView();

    displayLayout.appendChild(this.displayView);
    this.appendChild(displayLayout);
  }

  selectItemWithBorder(views: View[], selectIndex: number) {
    views.forEach((v, i) => {
      v.style = {
        borderWidth: selectIndex == i ? 1.5 : 0,
        borderColor: selectIndex == i ? Color.red : Color.transparent,
      }
    });
  }

  selectItemWithBackground(views: View[], selectIndex: number) {
    views.forEach((v, i) => {
      v.style = {
        backgroundColor: selectIndex == i ? Color.red : Color.hm_green,
      }
    });
  }

  initBackgroundSetting(selectIndex: number = 0) {
    this.contentView.appendChild(new GroupTitle('背景'));

    let layout = new GroupContent();
    layout.style = { paddingLeft: 20 };
    this.contentView.appendChild(layout);

    let views = new Array<View>();
    let bgColors = [Color.hm_green, Color.hm_yellow, Color.hm_linear_gradient, Img.hummerLogo, Color.transparent];
    bgColors.forEach((color, i) => {
      let view = new Text();
      view.style = {
        ...Style.SelectColorItemStyle,
        fontSize: 10,
        color: Color.black,
        textAlign: 'center',
      }
      if (i == 3) {
        view.style = { backgroundImage: color }
      } else if (i == 4) {
        view.text = '无';
        view.style = { backgroundColor: Color.hm_green + '20' }
      } else {
        view.style = { backgroundColor: color, }
      }
      views.push(view);

      view.addEventListener('tap', () => {
        this.selectItemWithBorder(views, i);
        if (i == 3) {
          this.displayView.style = { backgroundImage: bgColors[i] }
        } else {
          this.displayView.style = { backgroundColor: bgColors[i] }
        }
      });

      this.selectItemWithBorder(views, selectIndex);

      layout.appendChild(view);
    });
  }

  initCornerRadiusSetting(selectIndex: number = 0) {
    this.contentView.appendChild(new GroupTitle('圆角'));

    let layout = new GroupContent();
    this.contentView.appendChild(layout);

    let views = new Array<View>();
    let cornerRadiuses = [0, 25, 50];
    cornerRadiuses.forEach((radius, i) => {
      let view = new View();
      view.style = {
        ...Style.SelectSquareItemStyle,
        borderRadius: radius * 3 / 10,
        borderColor: Color.black,
      }
      views.push(view);

      view.addEventListener('tap', () => {
        this.selectItemWithBorder(views, i);
        this.displayView.style = {
          borderRadius: cornerRadiuses[i],
        }
      });

      this.selectItemWithBorder(views, selectIndex);

      layout.appendChild(view);
    });
  }

  initBorderSetting(selectIndex: number = 0) {
    this.contentView.appendChild(new GroupTitle('边框'));

    let layout = new GroupContent();
    this.contentView.appendChild(layout);

    let views = new Array<View>();
    let borderStyles = ['none', 'solid', 'dashed', 'dotted'];
    type BorderStyle = 'solid' | 'dashed' | 'dotted';
    borderStyles.forEach((style, i) => {
      let view = new View();
      view.style = {
        ...Style.SelectSquareItemStyle,
        borderStyle: <BorderStyle>style,
        borderColor: Color.black,
        borderWidth: 1,
      }
      views.push(view);

      view.addEventListener('tap', () => {
        this.selectItemWithBackground(views, i);
        this.displayView.style = {
          borderStyle: <BorderStyle>borderStyles[i],
          borderColor: i == 0 ? Color.transparent : Color.black,
          borderWidth: i == 0 ? 0 : 2,
        }
      });

      this.selectItemWithBackground(views, selectIndex);

      layout.appendChild(view);
    });
  }

  initShadowSetting(selectIndex: number = 0) {
    this.contentView.appendChild(new GroupTitle('阴影'));

    let layout = new GroupContent();
    this.contentView.appendChild(layout);

    let views = new Array<View>();
    let shadows: string[] = ['none', '2 2 5 #000000', '2 2 5 #FF0000', '2 2 5 #0000FF'];
    shadows.forEach((shadow, i) => {
      let view = new View();
      view.style = {
        ...Style.SelectSquareItemStyle,
        shadow: shadow === 'none' ? '0 0 0 #00000000' : shadow,
      }
      views.push(view);

      view.addEventListener('tap', () => {
        this.selectItemWithBorder(views, i);
        this.displayView.style = {
          shadow: shadows[i] === 'none' ? '0 0 0 #00000000' : shadows[i],
        }
      });

      this.selectItemWithBorder(views, selectIndex);

      layout.appendChild(view);
    });
  }
}