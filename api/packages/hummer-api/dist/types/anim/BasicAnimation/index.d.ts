export declare class BasicAnimation {
    value: number | string | Record<string, any>;
    duration: number;
    delay: number;
    repeatCount: number;
    easing: string;
    key: string;
    protected type: string;
    protected property: string;
    private __startFunc__;
    private __endFunc__;
    private __startCallback__;
    private __endCallback__;
    constructor(property: any);
    get startCallback(): Function;
    get endCallback(): Function;
    private _setOnEventListener_;
    on(event: string, eventListener: Function): void;
}
