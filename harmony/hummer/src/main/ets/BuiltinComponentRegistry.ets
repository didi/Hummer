import { HMDialog } from './Components/Module/Dialog';
import { HMRequest } from './Components/Module/Request';
import { HMToast } from './Components/Module/Toast';
import  { HMStorage } from './Components/Module/Storage'
import  { HMMemory } from './Components/Module/Memory'
import { HMNotifyCenter } from './Components/Module/NotifyCenter'
import  { HMHummer } from './Components/Module/Hummer'
import { ComponentRegistry } from './Context/Config/Config';
import { ComponentName } from './Components/ComponentName';
import { HMNavigator } from './Components/Module/Navigator';
import { HMViewNode } from './Components/ets/View/ViewNode';
import { ViewPagerNode } from './Components/ets/ViewPager/ViewPagerNode';

export function getETSBuiltinComponentRegistry() : ComponentRegistry {

  const builtinComponentRegistry : ComponentRegistry = {
    [ComponentName.Toast]:HMToast,
    [ComponentName.View]:HMViewNode,
    [ComponentName.Dialog]:HMDialog,
    [ComponentName.Request]:HMRequest,
    [ComponentName.Storage]:HMStorage,
    [ComponentName.Memory]: HMMemory,
    [ComponentName.NotifyCenter]: HMNotifyCenter,
    [ComponentName.Hummer]: HMHummer,
    [ComponentName.Navigator]:HMNavigator,
    [ComponentName.ViewPager]:ViewPagerNode,
  }
  return builtinComponentRegistry;
}