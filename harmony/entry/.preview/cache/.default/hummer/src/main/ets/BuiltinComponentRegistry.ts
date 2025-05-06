import { HMDialog } from "@bundle:com.example.hummer/entry@hummer/ets/Components/Module/Dialog";
import { HMRequest } from "@bundle:com.example.hummer/entry@hummer/ets/Components/Module/Request";
import { HMToast } from "@bundle:com.example.hummer/entry@hummer/ets/Components/Module/Toast";
import { HMStorage } from "@bundle:com.example.hummer/entry@hummer/ets/Components/Module/Storage";
import { HMMemory } from "@bundle:com.example.hummer/entry@hummer/ets/Components/Module/Memory";
import { HMNotifyCenter } from "@bundle:com.example.hummer/entry@hummer/ets/Components/Module/NotifyCenter";
import { HMHummer } from "@bundle:com.example.hummer/entry@hummer/ets/Components/Module/Hummer";
import type { ComponentRegistry } from './Context/Config/Config';
import { ComponentName } from "@bundle:com.example.hummer/entry@hummer/ets/Components/ComponentName";
import { HMNavigator } from "@bundle:com.example.hummer/entry@hummer/ets/Components/Module/Navigator";
export function getETSBuiltinComponentRegistry(): ComponentRegistry {
    const builtinComponentRegistry: ComponentRegistry = {
        [ComponentName.Toast]: HMToast,
        [ComponentName.Dialog]: HMDialog,
        [ComponentName.Request]: HMRequest,
        [ComponentName.Storage]: HMStorage,
        [ComponentName.Memory]: HMMemory,
        [ComponentName.NotifyCenter]: HMNotifyCenter,
        [ComponentName.Hummer]: HMHummer,
        [ComponentName.Navigator]: HMNavigator,
    };
    return builtinComponentRegistry;
}
