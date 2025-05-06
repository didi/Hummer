import { HMDialog } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Components/Module/Dialog";
import { HMRequest } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Components/Module/Request";
import { HMToast } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Components/Module/Toast";
import { HMStorage } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Components/Module/Storage";
import { HMMemory } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Components/Module/Memory";
import { HMNotifyCenter } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Components/Module/NotifyCenter";
import { HMHummer } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Components/Module/Hummer";
import { Node } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Components/Node";
import type { ComponentRegistry } from './Context/Config/Config';
import { ComponentName } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Components/ComponentName";
import { HMNavigator } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Components/Module/Navigator";
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
