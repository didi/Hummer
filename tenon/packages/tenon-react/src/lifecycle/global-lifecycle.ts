import {LifeCycle, lifeCycles, triggerLifeCycle} from './index'

export const GlobalLifeCycles:Record<LifeCycle, Function> = initGlobalLifeCycle()

function initGlobalLifeCycle():Record<LifeCycle, Function>{
  let globalLifeCycle:any= {}
  lifeCycles.forEach((lifecycle: LifeCycle) => {
    globalLifeCycle[lifecycle] = function(){
      return triggerLifeCycle(lifecycle)
    }
  })

  return globalLifeCycle
}