import { Base } from '@hummer/tenon-vue'

const { DGHMCircleProgress } = __GLOBAL__

class CircleProgress extends Base {
  constructor() {
    super()
    this.element = new DGHMCircleProgress()
  }
  _setAttribute(key, value) {
    switch (key) {
      case 'normal-color':
        this.element.style = {
          normalColor: value
        }
        break;
      case 'highlightColor':
        this.element.style = {
          highlightColor: value
        }
        break;
      case 'circleStyle':
        this.element.style = {
          circleStyle: value
        }
        break;
      case 'circleWidth':
        this.element.style = {
          circleWidth: value
        }
        break;
      case 'allProgress':
        this.element.allProgress = value
        break;
      case 'currentProgress':
          this.element.allProgress = value
          break;
      default:
        break;
    }
  }
  redraw(){
    this.element.redraw()
  }
}
export default {
  name: 'circle-progress',
  factory() {
    return new CircleProgress()
  }
}