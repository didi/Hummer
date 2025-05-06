import { HMEntranceController } from "@bundle:com.example.hummer/entry/src/main/Hummer/HMEntrance";
import type { HMAny } from '../../Utils/Utils';
import { Component } from "@bundle:com.example.hummer/entry/src/main/Hummer/Components/Component";
import type { Env } from './Env';
export class HMHummer extends Component {
    private getPageInfo() {
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
