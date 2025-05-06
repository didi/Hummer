export function ErrorInterceptor(context, ...args) {
    if (context.config.errorHandler) {
        context.config.errorHandler(context, ...args);
    }
}
//# sourceMappingURL=Error.js.map