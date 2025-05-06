import type Base from '../../Components/Base';
import type { IHMNavigator } from '../../Interface/IHMNavigator';
import type { HMContext } from '../HMContext';
export type ComponentRegistry = Record<string, typeof Base>;
export const HummerDefaultNamespace = "hummer_default_namespace_";
export type ErrorHandler = (context: HMContext, ...args: any[]) => any;
export type HMContextConfig = {
    nameSpace: string;
    componentRegistry?: ComponentRegistry;
    navigatorAdapter?: IHMNavigator;
    exceptionHandler?: ErrorHandler;
    errorHandler?: ErrorHandler;
};
export const DefaultConfig: HMContextConfig = {
    nameSpace: HummerDefaultNamespace,
};
