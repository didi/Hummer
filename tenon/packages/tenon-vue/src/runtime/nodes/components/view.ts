import {View as ViewComponent} from '@hummer/hummer-front'
import {Base} from '../Base'
import {NODE_VIEW} from '@hummer/tenon-utils'

export class View extends Base{
  __NAME = NODE_VIEW

  constructor(isView:boolean = true){
    super();
    if(!isView){
      return
    }
    this.element = new ViewComponent();
  }
}
