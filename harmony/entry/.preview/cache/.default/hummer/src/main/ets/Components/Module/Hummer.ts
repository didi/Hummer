import { HMEntranceController } from "@bundle:com.example.hummer/entry@hummer/ets/HMEntrance";
import type { PageInfo } from '../../Interface/Page';
import type { HMAny } from '../../Utils/Utils';
import { HMComponent } from "@bundle:com.example.hummer/entry@hummer/ets/Components/Component";
import type { Env } from './Env';
export class HMHummer extends HMComponent {
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
