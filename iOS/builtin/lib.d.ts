declare var Hummer: any

declare class View { viewID?: string }

declare var MemoryProxy: any

declare class NotifyCenter { }

declare class Timer {
    // ...arguments: any[] 忽略
    setInterval(handler: Function, timeout?: number);
    clearInterval();
    setTimeout(handler: Function, timeout?: number);
    clearTimeout();
}

declare var console: any