/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line no-var
declare var Hummer: any

declare class View { viewID?: string }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const MemoryProxy: any

declare class NotifyCenter { }

declare class Timer {
    // ...arguments: any[] 忽略
    // eslint-disable-next-line @typescript-eslint/ban-types
    setInterval(handler: Function, timeout?: number);
    clearInterval();
    // eslint-disable-next-line @typescript-eslint/ban-types
    setTimeout(handler: Function, timeout?: number);
    clearTimeout();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const console: any