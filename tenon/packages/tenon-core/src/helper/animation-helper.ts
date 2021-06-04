import {transformUnitValue, getColor} from '@hummer/tenon-utils'
let animationId = 0;
export enum EasingType{
  LINEAR = 'linear',
  EASE = 'ease',
  EASE_IN = 'ease-in',
  EASE_OUT = 'ease-out',
  EASE_IN_OUT = 'ease-in-out'
}
export enum AnimationStyle {
  POSITION = 'position',
  SCALE = 'scale',
  SCALEX = 'scaleX',
  SCALEY = 'scaleY',
  ROTATIONX = 'rotationX',
  ROTATIONY = 'rotationY',
  ROTATIONZ = 'rotationZ',
  OPACITY = 'opacity',
  BACKGROUND_COLOR = 'backgroundColor',
  WIDTH = 'width',
  HEIGHT = 'height'

}

export type Animation =  KeyframeAnimation | BasicAnimation | StepAnimation
export interface BasicAnimation {
  id: string|number,
  styles: Record<string,string|number>,
  duration: number,
  delay: number,
  repeatCount: number,
  easing:EasingType,
  onStart?: Function,
  onEnd?: Function
}

export interface KeyFrame{
  percent: number,
  styles: Record<string,string|number>,
}

export interface KeyframeAnimation{
  id: string|number,
  keyframes: Array<KeyFrame>
  duration: number,
  delay: number,
  repeatCount: number,
  easing: EasingType
  onStart: Function,
  onEnd: Function
}

export interface StepAnimation{
  id: string|number,
  steps: Array<BasicAnimation>,
  onStart?: Function,
  onEnd?: Function,
}


/**
 * 帧动画处理
 * @param element Hummer Element
 * @param animation 动画对象
 */
export function handleKeyframeAnimation(node:any, animation: KeyframeAnimation){
  let {id, onEnd, onStart, keyframes, repeatCount = 1, duration, delay, easing = 'linear'} = animation;
  let {element} = node
  let styles = keyframes[0].styles
  styles = transformStyle(styles);
  let len = Object.keys(styles).length;
  if(!id){
    id = animationId++;
  }
  // 获取需要添加动画的样式
  Object.keys(styles).forEach((key, index) => {
    const ani = new __GLOBAL__.KeyframeAnimation(key);
    let tempKeyframes: any = []
    keyframes.forEach(keyframe => {
      let transformedStyles = transformStyle(keyframe.styles)
      if (transformedStyles[key] !== undefined) {
        tempKeyframes.push({
          percent: keyframe.percent,
          value: transformedStyles[key]
        })
      }
    });
    ani.keyframes = tempKeyframes
    easing && (ani.easing = easing);
    duration && (ani.duration = handleDuration(duration));
    delay && (ani.delay = handleDelay(delay));
    repeatCount && (ani.repeatCount = repeatCount);
    if(index === 0){
      onStart && ani.on("start", () => {
        onStart && onStart();
      });
    }
    onEnd && ani.on("end", () => {
      if(--len <= 0){
        onEnd && onEnd();
      }
    });
    element.addAnimation(ani, id + "_" +key);
  })
}

/**
 * 基础动画处理
 * @param element Hummer Element
 * @param animation 动画对象
 */
export function handleBasicAnimation(node:any, animation: BasicAnimation){
  let {styles, id, duration, delay, repeatCount, easing, onStart, onEnd} = animation
  let {element} = node
  styles = transformStyle(styles);
  if(!id){
    id = animationId++;
  }
  let len = Object.keys(styles).length;
  Object.keys(styles).forEach((key,index) => {
    const ani = new __GLOBAL__.BasicAnimation(key);
    ani.value = styles[key];
    easing && (ani.easing = easing);
    !isNaN(duration) && (ani.duration = handleDuration(duration));
    !isNaN(delay) && (ani.delay = handleDelay(delay));
    !isNaN(repeatCount) && (ani.repeatCount = repeatCount);
    // 多个样式，只针对第一个样式的动画，添加事件
    if(index === 0){
      onStart && ani.on("start", () => {
        onStart && onStart();
      });
    }
    onEnd && ani.on("end", () => {
      if(--len <= 0){
        onEnd && onEnd();
      }
    });

    element.addAnimation(ani, id + "_" +key);
  })
}


/**
 * Step帧动画处理
 * @param element Hummer Element
 * @param animation 动画对象
 */
export function handleStepAnimation(node:any, animation: StepAnimation){
  let {id, onEnd, onStart, steps} = animation;
  let current = Promise.resolve();
  steps && steps.forEach((step,index) => {
    let _onStart:Function
    let _onEnd:Function
    current = current.then(() => {
      return new Promise((resolve) => {
        if(index === 0){
          // 第一帧
          _onStart = () => {
            step.onStart && step.onStart()
            onStart && onStart()
          }
        }
        if(index === steps.length - 1){
          // 最后一帧
          _onEnd = ()=> {
            step.onEnd && step.onEnd()
            onEnd && onEnd()
          }
        }else {
          _onEnd = () => {
            step.onEnd && step.onEnd()
            resolve()
          }
        }
        handleBasicAnimation(node, {
          ...step,
          id: id + "_" + index,
          onStart: _onStart,
          onEnd: _onEnd
        })
      })
    })
  })
}

/**
 * Animation专用的样式转换
 */
function transformStyle(styles:any){
  Object.keys(styles).forEach(key => {
    switch(key){
      case AnimationStyle.POSITION:
        let position = styles[key]
        styles[key] = {
          x: transformUnitValue(position.x),
          y: transformUnitValue(position.y)
        }
        break;
      case AnimationStyle.BACKGROUND_COLOR:
        styles[key] = getColor(styles[key])
        break;
      case AnimationStyle.WIDTH:
        styles[key] = transformUnitValue(styles[key])
        break;
      case AnimationStyle.HEIGHT:
        styles[key] = transformUnitValue(styles[key])
        break;
      default:
        break;
    }
  })
  return styles
}
/**
 * 对外Duration单位ms，转换为Hummer的s
 */
function handleDuration(duration:number){
  return duration / 1000
}

/**
 * 对外Delay单位ms，转换为Hummer的s
 */
function handleDelay(delay:number){
  return delay / 1000
}

export const handleAnimation = (context:any, animation:Animation) =>{
  if((animation as KeyframeAnimation).keyframes){
    handleKeyframeAnimation(context, animation as KeyframeAnimation)
  }
  if((animation as BasicAnimation).styles){
    handleBasicAnimation(context, animation as BasicAnimation)
  }
  if((animation as StepAnimation).steps){
    handleStepAnimation(context, animation as StepAnimation)
  }
}
