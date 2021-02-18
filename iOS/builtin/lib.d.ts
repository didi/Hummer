declare class View { viewID?: string }

declare interface Timer {
    setInterval(handler: () => void, timeout?: number);
    clearInterval();
    setTimeout(handler: () => void, timeout?: number);
    clearTimeout();
}