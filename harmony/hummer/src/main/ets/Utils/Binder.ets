import { BasicAnimation,
  dispatchAnimationEndEvent,
  dispatchAnimationStartEvent,
  getAnimationStyle, Keyframe, KeyframeAnimation } from '../Components/Module/Animation';
import { HMNode } from '../Components/Node';
import { HMEntranceController } from '../HMEntrance';
import {CallEts} from './CallEts'
import { HUMMER_NO_UICONTEXT_ERROR, invalidArg } from './Error';
import { isUndefined } from './is';

export function bindTs2EtsFunc(){
  CallEts.bind(px2vp, 'px2vp');
  CallEts.bind(vp2px, 'vp2px');
  CallEts.bind(addBasicAnimation, 'addBasicAnimation');
  CallEts.bind(addKeyframeAnimation, 'addKeyframeAnimation');

}

function addBasicAnimation(node:HMNode, data:BasicAnimation, key:string){

  const style = getAnimationStyle(node, data.property, data.value);
  if(!style){
    return;
  }
  let repeatCount = data.repeatCount;
  const duration = isUndefined(data.duration) ? 0 : data.duration;
  const delay = isUndefined(data.delay) ? 0 : data.delay;
  if(isUndefined(repeatCount) || repeatCount == 0){
    repeatCount = 1;
  }
  dispatchAnimationStartEvent(node, key);
  animateTo({
    duration: duration * 1000,
    delay: delay * 1000,
    iterations:repeatCount,
    curve:convertToCurve(data.easing),
    onFinish:() => {
      dispatchAnimationEndEvent(node, key);
    }
  },()=>{
    node.setStyles(style);
  })
}

function addKeyframeAnimation(node:HMNode, data:KeyframeAnimation, key:string){

  let repeatCount = data.repeatCount;
  const duration = isUndefined(data.duration) ? 0 : data.duration;
  const delay = isUndefined(data.delay) ? 0 : data.delay * 1000;
  if(isUndefined(repeatCount) || repeatCount == 0){
    repeatCount = 1;
  }

  const uiContext = HMEntranceController.getController(node.context)?.uiContext;
  if(!uiContext){
    node.context.handleError(HUMMER_NO_UICONTEXT_ERROR);
    return;
  }

  const curve = convertToCurve(data.easing);
  const keyframes = new Array<KeyframeState>();
  const totalDuration = duration * 1000;
  const length = data.keyframes.length;
  let preFrame : Keyframe = {percent:0,value:NaN};
  for (let i = 0;i <length;i++){
    const frame = data.keyframes[i];
    let percent = isUndefined(preFrame) ? frame.percent : (frame.percent - preFrame.percent);
    if(i == length - 1 && frame.percent != 1){
      percent = 1 - preFrame.percent;
    }
    const frameDuration = percent * totalDuration;
    preFrame = frame;
    const setStyle = ()=>{
      const _style = getAnimationStyle(node, data.property, frame.value);
      if(_style){
        node.setStyles(_style);
      }
    }
    const keyframeState : KeyframeState = {
      duration: frameDuration,
      curve: curve,
      event:setStyle
    }
    keyframes.push(keyframeState);
  }

  dispatchAnimationStartEvent(node, key);
  uiContext.keyframeAnimateTo(
    {
      delay: delay,
      iterations:repeatCount,
      onFinish:() => {
        dispatchAnimationEndEvent(node, key);
      }
    },
    keyframes)
}

function convertToCurve(easing:string) : Curve{

  switch (easing) {
    case 'linear':
          return Curve.Linear
    case 'ease':
      return Curve.Ease

    case 'ease-in':

      return Curve.EaseIn
    case 'ease-out':

      return Curve.EaseOut
    case 'ease-in-out':

      return Curve.EaseInOut
    default:
      return Curve.Ease
  }
}

