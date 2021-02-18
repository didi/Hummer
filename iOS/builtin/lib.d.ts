declare class View { viewID?: string }

declare interface Timer {
    // eslint-disable-next-line @typescript-eslint/ban-types
    setInterval(handler: Function, timeout?: number);
    clearInterval();
    // eslint-disable-next-line @typescript-eslint/ban-types
    setTimeout(handler: Function, timeout?: number);
    clearTimeout();
}