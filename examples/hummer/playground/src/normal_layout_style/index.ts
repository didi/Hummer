import { Hummer, View, Text, EventListener } from '@hummer/hummer-front'
import { Page, GroupTitle, GroupContent, OperationLayout } from '../common/CommonLayout';
import { ComponentPage } from '../common/CommonPage'
import { InputPage } from '../input/InputPage';
import { Color } from '../common/CommonColor';
import { Style } from '../common/CommonStyle';

class RootView extends ComponentPage {
  selectedDisplayItemView: View;
  itmeViews: Array<View>;

  constructor() {
    super();
    this.setPageTitle('通用布局样式');
    this.setDisplayViewStyle();
  }

  initContentView() {
    super.initContentView();

    let layoutTitle = new Text();
    layoutTitle.text = '容器属性';
    layoutTitle.style = {
      color: Color.black,
      fontSize: 18,
      marginTop: 32,
      marginLeft: 8,
    }
    this.contentView.appendChild(layoutTitle);

    this.initFlexDirectionSetting(0);
    this.initJustifyContentSetting(0);
    this.initAlignItemsSetting(0);
    this.initAlignContentSetting(0);
    this.initFlexWrapSetting(0);

    let itemTitle = new Text();
    itemTitle.text = '元素属性';
    itemTitle.style = {
      color: Color.black,
      fontSize: 18,
      marginTop: 32,
      marginLeft: 8,
    }
    this.contentView.appendChild(itemTitle);

    this.initFlexGrowSetting(0);
    this.initFlexShrinkSetting(0);
    this.initFlexBasisSetting(0);
    this.initAlignSelfSetting(0);
  }

  setDisplayViewStyle() {
    this.displayView.style = {
      width: '100%',
      height: 180,
      backgroundColor: Color.hm_green + '20',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      overflow: 'hidden',
    }

    this.itmeViews = new Array<View>();
    for (let i = 0; i < 3; i++) {
      let itemView = this.createDiaplayItemView(i, event => {
        this.selectedDisplayItemView = itemView;
        this.selectItemWithBorder(this.itmeViews, i);
      });
      this.itmeViews.push(itemView);
      this.displayView.appendChild(itemView);
    }

    this.selectedDisplayItemView = this.itmeViews[0];
    this.selectItemWithBorder(this.itmeViews, 0);

    // 底部操作区域
    this.initOperationLayout();
  }

  initOperationLayout() {
    let operLayout = new OperationLayout();
    operLayout.style = {
      position: 'absolute',
      bottom: 4,
      right: 4,
      zIndex: 1,
    }
    operLayout.addView.addEventListener('tap', event => {
      let index = this.itmeViews.length;
      let itemView = this.createDiaplayItemView(index, event => {
        this.selectedDisplayItemView = itemView;
        this.selectItemWithBorder(this.itmeViews, index);
      });
      this.itmeViews.push(itemView);
      this.displayView.appendChild(itemView);
    });
    operLayout.removeView.addEventListener('tap', event => {
      if (this.itmeViews.length > 0) {
        this.displayView.removeChild(this.itmeViews.pop());
      }
    });

    this.displayView.appendChild(operLayout);
  }

  createDiaplayItemView(index: number, listener: EventListener) {
    let view = new Text();
    view.text = (index + 1).toString();
    view.style = {
      width: 30 + index % 2 * 10,
      height: 30 + index % 2 * 10,
      textAlign: 'center',
      fontSize: 14,
      color: Color.dark_grey,
    }
    let layout = new View();
    layout.style = {
      backgroundColor: Color.hm_green,
      margin: 4,
      justifyContent: 'center',
      alignItems: 'center',
    }
    layout.addEventListener('tap', listener);
    layout.appendChild(view);
    return layout;
  }

  initFlexDirectionSetting(selectIndex: number = 0) {
    this.contentView.appendChild(new GroupTitle('FlexDirection'));

    let layout = new GroupContent();
    this.contentView.appendChild(layout);

    let views = new Array<View>();
    let flexDirections = ['row', 'column'];
    type FlexDirection = 'row' | 'column';
    flexDirections.forEach((type, i) => {
      let view = new Text();
      view.text = type;
      view.style = {
        ...Style.SelectTextItemStyle,
      }
      views.push(view);

      view.addEventListener('tap', () => {
        this.selectItemWithBorder(views, i);
        this.displayView.style = {
          flexDirection: <FlexDirection>flexDirections[i],
        }
      });

      this.selectItemWithBorder(views, selectIndex);

      layout.appendChild(view);
    });
  }

  initJustifyContentSetting(selectIndex: number = 0) {
    this.contentView.appendChild(new GroupTitle('JustifyContent'));

    let layout = new GroupContent();
    this.contentView.appendChild(layout);

    let views = new Array<View>();
    let justifyContents = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'];
    type JustifyContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
    justifyContents.forEach((type, i) => {
      let view = new Text();
      view.text = type;
      view.style = {
        ...Style.SelectTextItemStyle,
      }
      views.push(view);

      view.addEventListener('tap', () => {
        this.selectItemWithBorder(views, i);
        this.displayView.style = {
          justifyContent: <JustifyContent>justifyContents[i],
        }
      });

      this.selectItemWithBorder(views, selectIndex);

      layout.appendChild(view);
    });
  }

  initAlignItemsSetting(selectIndex: number = 0) {
    this.contentView.appendChild(new GroupTitle('AlignItems'));

    let layout = new GroupContent();
    this.contentView.appendChild(layout);

    let views = new Array<View>();
    let alignItemses = ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'];
    type AlignItems = 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
    alignItemses.forEach((type, i) => {
      let view = new Text();
      view.text = type;
      view.style = {
        ...Style.SelectTextItemStyle,
      }
      views.push(view);

      view.addEventListener('tap', () => {
        this.selectItemWithBorder(views, i);
        this.displayView.style = {
          alignItems: <AlignItems>alignItemses[i],
        }
      });

      this.selectItemWithBorder(views, selectIndex);

      layout.appendChild(view);
    });
  }

  initAlignContentSetting(selectIndex: number = 0) {
    this.contentView.appendChild(new GroupTitle('AlignContent'));

    let layout = new GroupContent();
    this.contentView.appendChild(layout);

    let views = new Array<View>();
    let alignContents = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'stretch'];
    type AlignContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'stretch';
    alignContents.forEach((type, i) => {
      let view = new Text();
      view.text = type;
      view.style = {
        ...Style.SelectTextItemStyle,
      }
      views.push(view);

      view.addEventListener('tap', () => {
        this.selectItemWithBorder(views, i);
        this.displayView.style = {
          alignContent: <AlignContent>alignContents[i],
        }
      });

      this.selectItemWithBorder(views, selectIndex);

      layout.appendChild(view);
    });
  }

  initFlexWrapSetting(selectIndex: number = 0) {
    this.contentView.appendChild(new GroupTitle('FlexWrap'));

    let layout = new GroupContent();
    this.contentView.appendChild(layout);

    let views = new Array<View>();
    let flexWraps = ['nowrap', 'wrap', 'wrap-reverse'];
    type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
    flexWraps.forEach((type, i) => {
      let view = new Text();
      view.text = type;
      view.style = {
        ...Style.SelectTextItemStyle,
      }
      views.push(view);

      view.addEventListener('tap', () => {
        this.selectItemWithBorder(views, i);
        this.displayView.style = {
          flexWrap: <FlexWrap>flexWraps[i],
        }
      });

      this.selectItemWithBorder(views, selectIndex);

      layout.appendChild(view);
    });
  }

  initFlexGrowSetting(selectIndex: number = 0) {
    this.contentView.appendChild(new GroupTitle('FlexGrow'));

    let layout = new GroupContent();
    this.contentView.appendChild(layout);

    let views = new Array<View>();
    let flexGrows: number[] = [0, 1];
    flexGrows.forEach((type, i) => {
      let view = new Text();
      view.text = type.toString();
      view.style = {
        ...Style.SelectTextItemStyle,
      }
      views.push(view);

      view.addEventListener('tap', () => {
        this.selectItemWithBorder(views, i);
        if (this.selectedDisplayItemView) {
          this.selectedDisplayItemView.style = {
            flexGrow: flexGrows[i],
          }
        }
      });

      this.selectItemWithBorder(views, selectIndex);

      layout.appendChild(view);
    });
  }

  initFlexShrinkSetting(selectIndex: number = 0) {
    this.contentView.appendChild(new GroupTitle('FlexShrink'));

    let layout = new GroupContent();
    this.contentView.appendChild(layout);

    let views = new Array<View>();
    let flexShrinks: number[] = [0, 1];
    flexShrinks.forEach((type, i) => {
      let view = new Text();
      view.text = type.toString();
      view.style = {
        ...Style.SelectTextItemStyle,
      }
      views.push(view);

      view.addEventListener('tap', () => {
        this.selectItemWithBorder(views, i);
        if (this.selectedDisplayItemView) {
          this.selectedDisplayItemView.style = {
            flexShrink: flexShrinks[i],
          }
        }
      });

      this.selectItemWithBorder(views, selectIndex);

      layout.appendChild(view);
    });
  }

  initFlexBasisSetting(selectIndex: number = 0) {
    this.contentView.appendChild(new GroupTitle('FlexBasis'));

    let layout = new GroupContent();
    this.contentView.appendChild(layout);

    let views = new Array<View>();
    let flexBasises: string[] = ['auto', '20', '40', '60'];
    flexBasises.forEach((type, i) => {
      let view = new Text();
      view.text = type;
      view.style = {
        ...Style.SelectTextItemStyle,
      }
      views.push(view);

      view.addEventListener('tap', () => {
        this.selectItemWithBorder(views, i);
        if (this.selectedDisplayItemView) {
          this.selectedDisplayItemView.style = {
            flexBasis: flexBasises[i],
          }
        }
      });

      this.selectItemWithBorder(views, selectIndex);

      layout.appendChild(view);
    });
  }

  initAlignSelfSetting(selectIndex: number = 0) {
    this.contentView.appendChild(new GroupTitle('AlignSelf'));

    let layout = new GroupContent();
    layout.style = {
      marginBottom: 32,
    }
    this.contentView.appendChild(layout);

    let views = new Array<View>();
    let alignSelfes: string[] = ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'];
    type AlignSelf = 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
    alignSelfes.forEach((type, i) => {
      let view = new Text();
      view.text = type;
      view.style = {
        ...Style.SelectTextItemStyle,
      }
      views.push(view);

      view.addEventListener('tap', () => {
        this.selectItemWithBorder(views, i);
        if (this.selectedDisplayItemView) {
          this.selectedDisplayItemView.style = {
            alignSelf: <AlignSelf>alignSelfes[i],
          }
        }
      });

      this.selectItemWithBorder(views, selectIndex);

      layout.appendChild(view);
    });
  }
}

Hummer.render(new RootView());