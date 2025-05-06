import type Base from '../Components/Base';
import type { IHMNavigator } from './IHMNavigator';
export type ComponentRegistry = Record<string, typeof Base>;
export const HummerDefaultNamespace = "hummer_default_namespace_";
export type HMContextConfig = {
    nameSpace: string;
    componentRegistry?: ComponentRegistry;
    navigatorAdapter?: IHMNavigator;
};
export const DefaultConfig: HMContextConfig = {
    nameSpace: HummerDefaultNamespace,
};
