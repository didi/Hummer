import { ComponentName } from '../ComponentName';
import { HMNode } from '../Node';
import { HMContext } from '../../Context/HMContext';
import HMImage from './Image/Image';
import HMScroller from './Scroller/Scroller';
import View from './View/View'
import HMButton from './Button/Button'
import HMTextInput from './Input/TextInput'
import HMTextArea from './Input/TextArea'
import HMText from './Text/Text';
import HMList from './List/List';
import HMViewPager from './ViewPager/ViewPager';


export type ComponentWrappedBuilder = WrappedBuilder<[ctx: ComponentBuilderContext]>;

export interface ComponentBuilderContext {
  hmContext: HMContext
  tag: string
  node:HMNode
  customComponentBuilder? : ComponentWrappedBuilder
}

@Builder
export function componentFactoryBuilder (ctx: ComponentBuilderContext) {

  if(ctx.tag === ComponentName.View){
    View({builderContext: ctx})
  }else if(ctx.tag === ComponentName.Image){
    HMImage({builderContext: ctx})
  }else if(ctx.tag === ComponentName.Scroller){
    HMScroller({builderContext: ctx})
  }else if(ctx.tag === ComponentName.Button){
    HMButton({builderContext: ctx})
  }else if(ctx.tag === ComponentName.Scroller){
    HMScroller({builderContext: ctx, scrollDirection: ScrollDirection.Vertical})
  }else if(ctx.tag === ComponentName.HorizontalScroller){
    HMScroller({builderContext: ctx, scrollDirection: ScrollDirection.Horizontal})
  }else if(ctx.tag === ComponentName.TextInput){
    HMTextInput({builderContext: ctx})
  }else if(ctx.tag === ComponentName.TextArea){
    HMTextArea({builderContext: ctx})
  }else if(ctx.tag === ComponentName.Text){
    HMText({builderContext: ctx})
  }else if(ctx.tag === ComponentName.List){
    HMList({builderContext: ctx})
  }else if(ctx.tag === ComponentName.ViewPager){
    HMViewPager({builderContext: ctx})
  }


  else if(ctx.tag !== ''){
    ctx.customComponentBuilder?.builder(ctx);
  }
}