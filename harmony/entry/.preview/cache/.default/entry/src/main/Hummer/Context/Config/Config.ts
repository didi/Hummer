import type Base from '../../Components/Base';
import type { HMContext } from '../HMContext';
import type { IHMNavigator } from './IHMNavigator';
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
