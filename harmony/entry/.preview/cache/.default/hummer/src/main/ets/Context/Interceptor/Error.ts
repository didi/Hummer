import type { HMContext } from '../HMContext';
export function ErrorInterceptor(context: HMContext, ...args) {
    if (context.config.errorHandler) {
        context.config.errorHandler(context, ...args);
    }
}
