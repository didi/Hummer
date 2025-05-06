import type { HMContext, IContentProvider } from '@didi-orangelab/hummer';
export class DynamicImportContentProvider implements IContentProvider {
    render(context: HMContext) {
        const filePath = urlToFilePathMap[context.baseUrl];
        import(filePath).then((ns: any) => {
            ns.renderFunc(context.harmonyRuntime.hummerObject, context.harmonyRuntime.globalObject);
        }).catch((e: Error) => {
            context.handleError('动态import模块失败：' + context.baseUrl + JSON.stringify(e));
        });
    }
}
const urlToFilePathMap: Record<string, string> = {
    './index.js': './indexEntry', './second.js': './secondEntry',
};
