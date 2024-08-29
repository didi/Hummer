import HMBase from '../../Components/Base';
import { IHMNavigator } from '../../Interface/IHMNavigator';
import { HMContext } from '../HMContext';

export type ComponentRegistry = Record<string, typeof HMBase>
export const HummerDefaultNamespace = "hummer_default_namespace_";

export type ErrorHandler = (context:HMContext, ...args: any[]) => any

export type HMContextConfig = {
  nameSpace: string,
  componentRegistry? : ComponentRegistry
  navigatorAdapter? : IHMNavigator
  exceptionHandler? : ErrorHandler
  errorHandler? : ErrorHandler
};

export const DefaultConfig : HMContextConfig = {
  nameSpace: HummerDefaultNamespace,
}

