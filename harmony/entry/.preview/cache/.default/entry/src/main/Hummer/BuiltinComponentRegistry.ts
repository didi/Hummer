import { HMDialog } from "@bundle:com.example.hummer/entry/src/main/Hummer/Components/Module/Dialog";
import { HMRequest } from "@bundle:com.example.hummer/entry/src/main/Hummer/Components/Module/Request";
import { HMToast } from "@bundle:com.example.hummer/entry/src/main/Hummer/Components/Module/Toast";
import { HMStorage } from "@bundle:com.example.hummer/entry/src/main/Hummer/Components/Module/Storage";
import { HMMemory } from "@bundle:com.example.hummer/entry/src/main/Hummer/Components/Module/Memory";
import { HMNotifyCenter } from "@bundle:com.example.hummer/entry/src/main/Hummer/Components/Module/NotifyCenter";
import { HMHummer } from "@bundle:com.example.hummer/entry/src/main/Hummer/Components/Module/Hummer";
import { Node } from "@bundle:com.example.hummer/entry/src/main/Hummer/Components/Node";
import type { ComponentRegistry } from './Context/Config/Config';
import { ComponentName } from "@bundle:com.example.hummer/entry/src/main/Hummer/Components/ComponentName";
import { HMNavigator } from "@bundle:com.example.hummer/entry/src/main/Hummer/Components/Module/Navigator";
export function getETSBuiltinComponentRegistry(): ComponentRegistry {
    const builtinComponentRegistry: ComponentRegistry = {
        [ComponentName.View]: Node,
        [ComponentName.Image]: Node,
        [ComponentName.Scroller]: Node,
        [ComponentName.HorizontalScroller]: Node,
        [ComponentName.Button]: Node,
        [ComponentName.Text]: Node,
        [ComponentName.TextInput]: Node,
        [ComponentName.TextArea]: Node,
        [ComponentName.Toast]: HMToast,
        [ComponentName.Dialog]: HMDialog,
        [ComponentName.Request]: HMRequest,
        [ComponentName.Storage]: HMStorage,
        [ComponentName.Memory]: HMMemory,
        [ComponentName.NotifyCenter]: HMNotifyCenter,
        [ComponentName.Hummer]: HMHummer,
        [ComponentName.Navigator]: HMNavigator,
        [ComponentName.List]: Node,
        [ComponentName.Swiper]: Node
    };
    return builtinComponentRegistry;
}
