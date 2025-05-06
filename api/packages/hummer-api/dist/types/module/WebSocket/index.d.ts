import { HummerComponent } from "../../HummerComponent";
export declare class WebSocket extends HummerComponent {
    protected _url_?: string;
    protected __onopen__?: Function;
    protected __onmessage__?: Function;
    protected __onclose__?: Function;
    protected __onerror__?: Function;
    constructor(url: string);
    set onopen(onopen: Function | undefined);
    get onopen(): Function | undefined;
    set onmessage(onmessage: Function | undefined);
    get onmessage(): Function | undefined;
    set onclose(onclose: Function | undefined);
    get onclose(): Function | undefined;
    set onerror(onerror: Function | undefined);
    get onerror(): Function | undefined;
    connect(url: string): void;
    close(): void;
    send(data: string): void;
}
