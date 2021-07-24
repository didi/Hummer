//
// Created by XiaoFeng on 2020-02-19.
//

#include <PromiseProcessor.h>

void processJsAsyncTasksLoop(JSContext *ctx) {
    JSContext *ctx1;
    int err;

    /* execute the pending jobs */
    for(;;) {
        err = JS_ExecutePendingJob(JS_GetRuntime(ctx), &ctx1);
        if (err <= 0) {
            break;
        }
    }
}
