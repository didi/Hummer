import {View as ViewComponent} from '@hummer/hummer-front'
import {Base} from '../Base'
import {NODE_ANCHOR} from '@hummer/tenon-utils'

export class Anchor extends Base{
  __NAME = NODE_ANCHOR

  constructor(){
    super();
    this.element = new ViewComponent();
    this.element.style = {
      display: "none"
    }
  }
}
