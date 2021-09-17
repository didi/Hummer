import { Hummer, View, Text, Switch } from '@hummer/hummer-front'
import { GroupTitle, GroupContent } from '../common/CommonLayout'
import { ComponentPage } from '../common/CommonPage'
import { Color } from '../common/CommonColor'
import { Style } from '../common/CommonStyle'

class RootView extends ComponentPage {
  constructor() {
    super();
    this.setPageTitle('Switch')
  }

  initContentView() {
    super.initContentView();

    // 通用
    this.initBackgroundSetting(4);
    this.initCornerRadiusSetting(0);
    this.initBorderSetting(0);
    this.initShadowSetting(0);

    // Switch
    this.initThumbColorSetting(2);
    this.initOnColorSetting(0);
    this.initOffColorSetting(1);
    this.initCheckSetting(0);
  }

  createDisplayView(): View {
    let displayView = new Switch();
    displayView.checked = true;
    displayView.style = {
      thumbColor: Color.hm_blue,
      onColor: Color.hm_green,
      offColor: Color.hm_yellow,
    }

    return displayView;
  }

  initThumbColorSetting(selectIndex: number = 2) {
    this.contentView.appendChild(new GroupTitle('滑块颜色'));

    let layout = new GroupContent();
    layout.style = { paddingLeft: 20 };
    this.contentView.appendChild(layout);

    let views = new Array<View>();
    let thumbColors: string[] = [Color.hm_green, Color.hm_yellow, Color.hm_blue];
    thumbColors.forEach((color, i) => {
      let view = new View();
      view.style = {
        ...Style.SelectColorItemStyle,
        backgroundColor: color,
      }
      views.push(view);

      view.addEventListener('tap', () => {
        this.selectItemWithBorder(views, i);
        (<Switch>this.displayView).style = {
          thumbColor: thumbColors[i],
        }
      });

      this.selectItemWithBorder(views, selectIndex);

      layout.appendChild(view);
    });
  }

  initOnColorSetting(selectIndex: number = 0) {
    this.contentView.appendChild(new GroupTitle('打开时的颜色'));

    let layout = new GroupContent();
    layout.style = { paddingLeft: 20 };
    this.contentView.appendChild(layout);

    let views = new Array<View>();
    let onColors: string[] = [Color.hm_green, Color.hm_yellow, Color.hm_blue];
    onColors.forEach((color, i) => {
      let view = new View();
      view.style = {
        ...Style.SelectColorItemStyle,
        backgroundColor: color,
      }
      views.push(view);

      view.addEventListener('tap', () => {
        this.selectItemWithBorder(views, i);
        (<Switch>this.displayView).style = {
          onColor: onColors[i],
        }
      });

      this.selectItemWithBorder(views, selectIndex);

      layout.appendChild(view);
    });
  }

  initOffColorSetting(selectIndex: number = 1) {
    this.contentView.appendChild(new GroupTitle('关闭时的颜色'));

    let layout = new GroupContent();
    layout.style = { paddingLeft: 20 };
    this.contentView.appendChild(layout);

    let views = new Array<View>();
    let offColors: string[] = [Color.hm_green, Color.hm_yellow, Color.hm_blue];
    offColors.forEach((color, i) => {
      let view = new View();
      view.style = {
        ...Style.SelectColorItemStyle,
        backgroundColor: color,
      }
      views.push(view);

      view.addEventListener('tap', () => {
        this.selectItemWithBorder(views, i);
        (<Switch>this.displayView).style = {
          offColor: offColors[i],
        }
      });

      this.selectItemWithBorder(views, selectIndex);

      layout.appendChild(view);
    });
  }

  initCheckSetting(selectIndex: number = 0) {
    this.contentView.appendChild(new GroupTitle('开关'));

    let layout = new GroupContent();
    layout.style = {
      marginBottom: 32,
    }
    this.contentView.appendChild(layout);

    let views = new Array<View>();
    let checkes: string[] = ['开', '关'];
    checkes.forEach((check, i) => {
      let view = new Text();
      view.text = check;
      view.style = {
        ...Style.SelectTextItemStyle,
        color: check !== '关' ? Color.black : Color.light_grey,
      }
      views.push(view);

      view.addEventListener('tap', () => {
        this.selectItemWithBorder(views, i);
        (<Switch>this.displayView).checked = checkes[i] !== '关';
      });

      this.selectItemWithBorder(views, selectIndex);

      layout.appendChild(view);
    });
  }
}

Hummer.render(new RootView());