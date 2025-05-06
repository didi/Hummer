import { HMEntranceController } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/HMEntrance";
import type { PageInfo } from '../../Interface/Page';
import type { HMAny } from '../../Utils/Utils';
import { Component } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Components/Component";
import type { Env } from './Env';
export class HMHummer extends Component {
    private getPageInfo(): PageInfo | undefined {
        const controller = HMEntranceController.getController(this.context);
        return controller?.pageData?.pageInfo;
    }
    private setPageResult(param: HMAny) {
        const controller = HMEntranceController.getController(this.context);
        if (controller && controller.pageData) {
            controller.pageData.result = param;
        }
        else {
            this.context.handleError("找不到 HMEntranceController");
        }
    }
    private getEnv(): Env {
        return this.context.env;
    }
}
