# Tenon React

Tenon React 是 Hummer React 的核心运行时，用于 Tenon React 项目中使用。

## 开发中

## HostConfig
定制化协调器，需要实现的 Config 对象

### 属性
#### `HostContext:String`
节点上下文信息

#### `Container: Object`
document || element
根节点或者子节点

#### `Instance`
Element

#### `TextInstance`
文本实例

#### `isPrimaryRenderer`
false

#### `warnsIfNotActing`
#### `scheduleTimeout`
#### `cancelTimeout`
#### `noTimeout`
#### `now`
#### `supportsMutation`
#### `supportsPersistence`


### 方法
#### `getRootHostContext(rootContainerInstance: Container): HostContext`
获取根节点上下文

#### `getChildHostContext(parentHostContext: HostContext,type: stringrootContainerInstance: Container,): HostContext`
获取子节点上下文

#### `getPublicInstance(instance: Instance):*`
获取当前的实例

#### `prepareForCommit(containerInfo: Container): Object | null`
#### `resetAfterCommit(containerInfo: Container): void`

#### `beforeActiveInstanceBlur(internalInstanceHandle: Object): void`

#### `afterActiveInstanceBlur(): void`


#### `createInstance(type: string,props: Props,rootContainerInstance: Container,hostContext: HostContext,internalInstanceHandle: Object,): Instance`
创建实例

#### `appendInitialChild(parentInstance: Instance,child: Instance | TextInstance,): void`
添加初始化节点

#### `finalizeInitialChildren(domElement: Instance,type: string,props: Props,rootContainerInstance: Container,hostContext: HostContext,): boolean`

#### `prepareUpdate(domElement: Instance,type: string,oldProps: Props,newProps: Props,rootContainerInstance: Container,hostContext: HostContext,): null | Array<mixed>`

#### `shouldSetTextContent(type: string, props: Props): boolean`
是否应该设定文本内容

#### `createTextInstance(text: string,rootContainerInstance: Container,hostContext: HostContext,internalInstanceHandle: Object,): TextInstance`
创建文本对象

### Mutation
#### `supportsMutation`

#### `commitMount(domElement: Instance,type: string,newProps: Props,internalInstanceHandle: Object,): void`

#### `commitUpdate(domElement: Instance,updatePayload: Array<mixed>,type: string,oldProps: Props,newProps: Props,internalInstanceHandle: Object,): void`

#### `resetTextContent(domElement: Instance): void`
重置文本内容

#### `commitTextUpdate(textInstance: TextInstance,oldText: string,newText: string,): void`
提交文本更新

#### `appendChild(parentInstance: Instance,child: Instance | TextInstance,): void`
添加节点

#### `appendChildToContainer(container: Container,child: Instance | TextInstance,): void`
容器中添加节点

#### `appendChildToContainer(container: Container,child: Instance | TextInstance,): void`
容器中添加节点

#### `insertBefore(parentInstance: Instance,child: Instance | TextInstance,beforeChild: Instance | TextInstance | SuspenseInstance,): void`
根据锚点插入节点

#### `insertInContainerBefore(container: Container,child: Instance | TextInstance,beforeChild: Instance | TextInstance | SuspenseInstance,): void`
容器中根据锚点插入节点

#### `insertInContainerBefore(container: Container,child: Instance | TextInstance,beforeChild: Instance | TextInstance | SuspenseInstance,): void`
容器中根据锚点插入节点

#### `removeChild(parentInstance: Instance,child: Instance | TextInstance | SuspenseInstance,): void `
删除节点

#### `removeChildFromContainer(container: Container,child: Instance | TextInstance | SuspenseInstance,): void`
从容器中删除节点

#### `clearSuspenseBoundary(parentInstance: Instance,suspenseInstance: SuspenseInstance,): void`

#### `clearSuspenseBoundaryFromContainer(container: Container,suspenseInstance: SuspenseInstance,): void`

#### `hideInstance(instance: Instance): void`
隐藏元素
#### `hideTextInstance(textInstance: TextInstance): void`
隐藏文本元素
#### `unhideInstance(instance: Instance, props: Props): void`
展示元素

#### `unhideTextInstance(textInstance: TextInstance,text: string,): void`
展示文本元素

#### `clearContainer(container: Container): void`
清除容器

### Hydration
#### `supportsHydration`
false

### Other
#### `getFundamentalComponentInstance(fundamentalInstance: ReactDOMFundamentalComponentInstance,): Instance`

#### `mountFundamentalComponent(fundamentalInstance: ReactDOMFundamentalComponentInstance,): void`

#### `shouldUpdateFundamentalComponent(fundamentalInstance: ReactDOMFundamentalComponentInstance,): boolean`

#### `updateFundamentalComponent(fundamentalInstance: ReactDOMFundamentalComponentInstance,): void`

#### `unmountFundamentalComponent(fundamentalInstance: ReactDOMFundamentalComponentInstance,): void`

#### `getInstanceFromNode(node: HTMLElement): null | Object`

#### `makeClientId(): OpaqueIDType`

#### `makeClientIdInDEV(warnOnAccessInDEV: () => void): OpaqueIDType`

#### `isOpaqueHydratingObject(value: mixed): boolean`

#### `makeOpaqueHydratingObject(attemptToReadValue: () => void,): OpaqueIDType`

#### `preparePortalMount(portalInstance: Instance): void`

#### `prepareScopeUpdate(scopeInstance: ReactScopeInstance,internalInstanceHandle: Object,): void`

#### `getInstanceFromScope(scopeInstance: ReactScopeInstance,): null | Object`