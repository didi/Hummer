import {h} from '@hummer/tenon-vue'
import DemoComponent from './demo-component'
export default{
  name: 'test',
  render(){
    return h("view", [h("text", "test"), h(DemoComponent)])
  }
}