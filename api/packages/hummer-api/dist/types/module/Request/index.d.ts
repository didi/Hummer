import { HummerComponent } from "../../HummerComponent";
export declare class Request extends HummerComponent {
    protected _url: string;
    protected _method: string;
    protected _timeout: number;
    protected _header: object | undefined;
    protected _param: object | undefined;
    constructor(props?: any);
    set url(value: string);
    get url(): string;
    set method(value: string);
    get method(): string;
    set timeout(value: number);
    get timeout(): number;
    set header(value: object | undefined);
    get header(): object | undefined;
    set param(value: object | undefined);
    get param(): object | undefined;
    send(callback: (response: Response) => void): void;
}
