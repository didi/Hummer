import { HummerElement } from "../../HummerElement";
export declare class Canvas extends HummerElement {
    constructor(id?: string, name?: string, props?: any);
    lineWidth(widthValue: number): void;
    lineColor(colorHex: string): void;
    lineCap(value: number): void;
    lineJoin(value: number): void;
    drawLine(fraomX: number, fromY: number, toX: number, toY: number): void;
    strokeRect(x: number, y: number, w: number, h: number): void;
    strokeEllipse(x: number, y: number, trailX: number, trailY: number): void;
    strokeCircle(x: number, y: number, radius: number): void;
    arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, clockwise: boolean): void;
    fillColor(colorHex: string): void;
    fillRect(x: number, y: number, w: number, h: number): void;
    fillEllipse(x: number, y: number, trailX: number, trailY: number): void;
    fillCircle(x: number, y: number, radius: number): void;
    fontSize(size: number): void;
    textColor(colorHex: string): void;
    fillText(text: string, x: number, y: number, maxWidth: number): void;
    drawImage(src: string, x: number, y: number, width: number, height: number): void;
}
