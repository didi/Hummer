/**
 * Copyright (C) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export interface Matrix2 {
    a: number;
    b: number;
    c: number;
    d: number;
    tx: number;
    ty: number;
}

export interface Point {
    x: number;
    y: number;
}

export interface Transform {
    x: number;
    y: number;
    scaleX: number;
    scaleY: number;
    rotation: number;
}

function isUndefined(value: any) {
    return typeof value === "undefined";
}

interface MatrixValue {
    a: number;
    b: number;
    c: number;
    d: number;
    tx: number;
    ty: number;
}

export function multiply(m1: MatrixValue, m2: MatrixValue) {
    return {
        a: m1.a * m2.a + m1.c * m2.b,
        b: m1.b * m2.a + m1.d * m2.b,
        c: m1.a * m2.c + m1.c * m2.d,
        d: m1.b * m2.c + m1.d * m2.d,
        tx: m1.a * m2.tx + m1.c * m2.ty + m1.tx,
        ty: m1.b * m2.tx + m1.d * m2.ty + m1.ty,
    };
}


export class Matrix2D2 {
    static DEG_TO_RAD: number = Math.PI / 180;
    static identity: Matrix2D2 = new Matrix2D2();

    static toMatrix(matrix: [number, number, number, number, number, number]): Matrix2 {
        return {
            a: matrix[0],
            b: matrix[1],
            c: matrix[2],
            d: matrix[3],
            tx: matrix[4],
            ty: matrix[5],
        };
    }

    a: number = 1;
    b: number = 0;
    c: number = 0;
    d: number = 1;
    tx: number = 0;
    ty: number = 0;

    get e() {
        return this.tx;
    }

    get f() {
        return this.ty;
    }

    constructor() {
    }

    setValues(
        a: number = 1,
        b: number = 0,
        c: number = 0,
        d: number = 1,
        tx: number = 0,
        ty: number = 0
    ): Matrix2D2 {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.tx = tx;
        this.ty = ty;
        return this;
    }

    append(a: number, b: number, c: number, d: number, tx: number, ty: number): Matrix2D2 {
        const a1 = this.a;
        const b1 = this.b;
        const c1 = this.c;
        const d1 = this.d;
        if (a != 1 || b != 0 || c != 0 || d != 1) {
            this.a = a1 * a + c1 * b;
            this.b = b1 * a + d1 * b;
            this.c = a1 * c + c1 * d;
            this.d = b1 * c + d1 * d;
        }
        this.tx = a1 * tx + c1 * ty + this.tx;
        this.ty = b1 * tx + d1 * ty + this.ty;

        return this;
    }

    prepend(a: number, b: number, c: number, d: number, tx: number, ty: number): Matrix2D2 {
        const a1 = this.a;
        const c1 = this.c;
        const tx1 = this.tx;

        this.a = a * a1 + c * this.b;
        this.b = b * a1 + d * this.b;
        this.c = a * c1 + c * this.d;
        this.d = b * c1 + d * this.d;
        this.tx = a * tx1 + c * this.ty + tx;
        this.ty = b * tx1 + d * this.ty + ty;

        return this;
    }

    appendMatrix(matrix: Matrix2D2): Matrix2D2 {
        return this.append(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
    }

    prependMatrix(matrix: Matrix2D2): Matrix2D2 {
        return this.prepend(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
    }

    appendTransform(
        x: number,
        y: number,
        scaleX: number,
        scaleY: number,
        rotation: number,
        skewX: number,
        skewY: number,
        regX: number = 0,
        regY: number = 0
    ): Matrix2D2 {
        let cos = 1;
        let sin = 0;

        if (rotation % 360) {
            const r = rotation * Matrix2D2.DEG_TO_RAD;
            cos = Math.cos(r);
            sin = Math.sin(r);
        }

        if (skewX || skewY) {

            skewX *= Matrix2D2.DEG_TO_RAD;
            skewY *= Matrix2D2.DEG_TO_RAD;
            this.append(Math.cos(skewY), Math.sin(skewY), -Math.sin(skewX), Math.cos(skewX), x, y);
            this.append(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, 0, 0);
        } else {
            this.append(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, x, y);
        }

        if (regX || regY) {

            this.tx -= regX * this.a + regY * this.c;
            this.ty -= regX * this.b + regY * this.d;
        }
        return this;
    }

    prependTransform(
        x: number,
        y: number,
        scaleX: number,
        scaleY: number,
        rotation: number,
        skewX: number,
        skewY: number,
        regX: number = 0,
        regY: number = 0
    ): Matrix2D2 {
        let cos = 1;
        let sin = 0;

        if (rotation % 360) {
            const r = rotation * Matrix2D2.DEG_TO_RAD;
            cos = Math.cos(r);
            sin = Math.sin(r);
        }

        if (regX || regY) {

            this.tx -= regX;
            this.ty -= regY;
        }
        if (skewX || skewY) {

            skewX *= Matrix2D2.DEG_TO_RAD;
            skewY *= Matrix2D2.DEG_TO_RAD;
            this.prepend(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, 0, 0);
            this.prepend(Math.cos(skewY), Math.sin(skewY), -Math.sin(skewX), Math.cos(skewX), x, y);
        } else {
            this.prepend(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, x, y);
        }
        return this;
    }

    rotate(angle: number): Matrix2D2;

    rotate(angle: number, cx: number, cy: number): Matrix2D2;

    rotate(angle: number, cx?: number, cy?: number): Matrix2D2 {
        const hasOriginPoint = !isUndefined(cx) && !isUndefined(cy);
        angle = angle * Matrix2D2.DEG_TO_RAD;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        if (hasOriginPoint) {
            this.translate(cx!, cy!);
        }

        const a1 = this.a;
        const b1 = this.b;

        this.a = a1 * cos + this.c * sin;
        this.b = b1 * cos + this.d * sin;
        this.c = -a1 * sin + this.c * cos;
        this.d = -b1 * sin + this.d * cos;

        if (hasOriginPoint) {
            this.translate(-cx!, -cy!);
        }
        return this;
    }

    skew(skewX: number, skewY: number): Matrix2D2 {
        skewX = skewX * Matrix2D2.DEG_TO_RAD;
        skewY = skewY * Matrix2D2.DEG_TO_RAD;

        this.append(1, Math.tan(skewY), Math.tan(skewX), 1, 0, 0);

        return this;
    }

    skewX(skewX: number) {
        return this.skew(skewX, 0);
    }

    skewY(skewY: number) {
        return this.skew(0, skewY);
    }

    scale(x: number): Matrix2D2;

    scale(x: number, y: number): Matrix2D2;

    scale(x: number, y: number, cx: number, cy: number): Matrix2D2;

    scale(x: number, y?: number, cx?: number, cy?: number): Matrix2D2 {
        const hasOriginPoint = !isUndefined(cx) && !isUndefined(cy);
        if (isUndefined(y)) {
            y = x;
        }
        if (hasOriginPoint) {
            this.translate(cx!, cy!);
        }
        this.a *= x;
        this.b *= x;
        this.c *= y!;
        this.d *= y!;
        if (hasOriginPoint) {
            this.translate(-cx!, -cy!);
        }
        return this;
    }

    scaleX(x: number): Matrix2D2;

    scaleX(x: number, cx: number, cy: number): Matrix2D2;

    scaleX(x: number, cx?: number, cy?: number) {
        return this.scale(x, 1, cx!, cy!);
    }

    scaleY(y: number): Matrix2D2;

    scaleY(y: number, cx: number, cy: number): Matrix2D2;

    scaleY(y: number, cx?: number, cy?: number) {
        return this.scale(1, y, cx!, cy!);
    }

    translate(x: number, y = 0): Matrix2D2 {
        this.tx += this.a * x + this.c * y;
        this.ty += this.b * x + this.d * y;
        return this;
    }

    translateX(x: number) {
        return this.translate(x);
    }

    translateY(y: number) {
        return this.translate(0, y);
    }

    flipX(): Matrix2D2 {
        return this.append(1, 0, 0, -1, 0, 0);
    }

    flipY(): Matrix2D2 {
        return this.append(-1, 0, 0, 1, 0, 0);
    }

    flipOrigin(): Matrix2D2 {
        return this.append(-1, 0, 0, -1, 0, 0);
    }

    identity(): Matrix2D2 {
        this.a = this.d = 1;
        this.b = this.c = this.tx = this.ty = 0;
        return this;
    }

    invert(): Matrix2D2 {
        const a1 = this.a;
        const b1 = this.b;
        const c1 = this.c;
        const d1 = this.d;
        const tx1 = this.tx;
        const n = a1 * d1 - b1 * c1;

        this.a = d1 / n;
        this.b = -b1 / n;
        this.c = -c1 / n;
        this.d = a1 / n;
        this.tx = (c1 * this.ty - d1 * tx1) / n;
        this.ty = -(a1 * this.ty - b1 * tx1) / n;
        return this;
    }

    isIdentity(): boolean {
        return (
            this.tx === 0 && this.ty === 0 && this.a === 1 && this.b === 0 && this.c === 0 && this.d === 1
        );
    }

    equals(matrix: Matrix2D2): boolean {
        return (
            this.tx === matrix.tx &&
            this.ty === matrix.ty &&
            this.a === matrix.a &&
            this.b === matrix.b &&
            this.c === matrix.c &&
            this.d === matrix.d
        );
    }

    transformPoint(x: number, y: number, origin?: Point): Point {
        const hasOriginPoint = !isUndefined(origin);

        if (hasOriginPoint) {
            x = x - origin!.x;
            y = y - origin!.y;
        }

        const pt = {} as Point;
        pt.x = x * this.a + y * this.c + this.tx;
        pt.y = x * this.b + y * this.d + this.ty;

        if (hasOriginPoint) {
            pt.x += origin!.x;
            pt.y += origin!.y;
        }

        return pt as Point;
    }

    transformPoints(points: Point[], origin?: Point) {
        return points.map(point => this.transformPoint(point.x, point.y, origin));
    }

    transformPointWithOrigin(x: number, y: number, origin: Point): Point {
        return this.transformPoint(x, y, origin);
    }

    copy(matrix: Matrix2D2): Matrix2D2 {
        return this.setValues(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
    }

    toString(): string {
        return (
            "[Matrix2D2 (a=" +
            this.a +
            " b=" +
            this.b +
            " c=" +
            this.c +
            " d=" +
            this.d +
            " tx=" +
            this.tx +
            " ty=" +
            this.ty +
            ")]"
        );
    }
}

export default Matrix2D2;