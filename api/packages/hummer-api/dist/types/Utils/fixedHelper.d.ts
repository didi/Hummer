import { HummerElement } from './../HummerElement';
export interface FixedNode {
    node: HummerElement;
    parents: null | Set<number>;
}
export declare const FixedViewCache: Map<number, FixedNode>;
export declare const handleFixedNodeByStyle: (node: HummerElement, newStyle: Record<string, string>) => Boolean;
export declare const registerFixedNode: (node: HummerElement) => void;
export declare const unRegisterFixedNode: (node: HummerElement) => void;
export declare const updateFixedNodeParents: () => void;
export declare const removeChildWithFixed: (node: HummerElement) => void;
