import { View, Text, Image, Navigator, Scroller, PanEvent } from "@hummer/hummer-front"
import { Color } from './CommonColor'
import { Style } from './CommonStyle'
import { Img } from './CommonResource'
import { gradientColors } from './CommonUtils'

export class ValueSlider extends View {
    private minValue = 0;
    private maxValue = 0;
    private bar = new View();
    private block = new View();
    private listener: Function;
    private width: number;

    constructor() {
        super();

        const BAR_COLOR = '#4387EE';
        const BLOCK_COLOR = '#FFFFFF';
        const BAR_HEIGHT = 3;
        const BLOCK_WIDTH = 16;

        this.style = {
            paddingLeft: BLOCK_WIDTH / 2,
            paddingRight: BLOCK_WIDTH / 2,
        }

        this.getRect(rect => {
            this.width = rect.width;
        })

        this.bar.style = {
            width: '100%',
            height: BAR_HEIGHT,
            backgroundColor: BAR_COLOR,
            marginTop: (BLOCK_WIDTH - BAR_HEIGHT) / 2,
        };

        let offsetX = -BLOCK_WIDTH / 2;

        this.block.style = {
            width: BLOCK_WIDTH,
            height: BLOCK_WIDTH,
            justifyContent: 'center',
            alignItems: 'center',
            shadow: '2px 2px 6px #00000080',
            borderRadius: BLOCK_WIDTH / 2,
            backgroundColor: BLOCK_COLOR,
            marginTop: -(BLOCK_WIDTH + BAR_HEIGHT) / 2,
            transform: `translate(${offsetX},0)`,
        }

        this.block.addEventListener('pan', (event: PanEvent) => {
            if (event.state == 2) {
                offsetX += event.translation.deltaX;
                offsetX = Math.max(offsetX, -BLOCK_WIDTH / 2);
                offsetX = Math.min(offsetX, this.width - BLOCK_WIDTH - BLOCK_WIDTH / 2);
                this.block.style = {
                    transform: `translate(${offsetX},0)`,
                }

                let value = (offsetX + BLOCK_WIDTH / 2) / (this.width - BLOCK_WIDTH) * (this.maxValue - this.minValue) + this.minValue;
                value = Math.floor(value);
                if (this.listener) {
                    this.listener(value)
                }
            }
        });

        this.appendChild(this.bar);
        this.appendChild(this.block);
    }

    /**
     * 设置进度条的颜色
     *
     * @param color 颜色
     */
    public setBarColor(color: string) {
        this.bar.style = {
            backgroundColor: color,
        };
    }

    /**
     * 设置滑块的颜色
     *
     * @param color 颜色
     */
    public setBlockColor(color: string) {
        this.block.style = {
            backgroundColor: color,
        };
    }

    /**
     * 设置进度条的值范围
     *
     * @param min 开始值
     * @param max 结束值
     */
    public setValueRange(min: number, max: number) {
        this.minValue = min;
        this.maxValue = max;
    }

    public setOnValueChangedListener(listener: Function) {
        this.listener = listener;
    }
}

export class ColorSlider extends View {
    private startColor = '#FFFFFF';
    private endColor = '#000000';
    private bar = new View();
    private block = new View();
    private blockCore = new View();
    private listener: Function;
    private colors: Array<string>;
    private width: number;

    constructor() {
        super();

        const BLOCK_MASK_COLOR = '#00000040';
        const BAR_HEIGHT = 6;
        const BLOCK_WIDTH = 22;
        const BLOCK_CORE_WIDTH = 14;

        this.style = {
            paddingLeft: BLOCK_WIDTH / 2,
            paddingRight: BLOCK_WIDTH / 2,
        }

        this.getRect(rect => {
            this.width = rect.width;
            this.colors = gradientColors(this.startColor, this.endColor, this.width, 1);
        })

        this.bar.style = {
            width: '100%',
            height: BAR_HEIGHT,
            backgroundColor: `linear-gradient(90deg ${this.startColor} ${this.endColor})`,
            marginTop: (BLOCK_WIDTH - BAR_HEIGHT) / 2,
        };

        let offsetX = -BLOCK_WIDTH / 2;

        this.block.style = {
            width: BLOCK_WIDTH,
            height: BLOCK_WIDTH,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: BLOCK_WIDTH / 2,
            backgroundColor: BLOCK_MASK_COLOR,
            marginTop: -(BLOCK_WIDTH + BAR_HEIGHT) / 2,
            transform: `translate(${offsetX},0)`,
        }

        this.blockCore.style = {
            width: BLOCK_CORE_WIDTH,
            height: BLOCK_CORE_WIDTH,
            borderRadius: BLOCK_CORE_WIDTH / 2,
        }

        this.block.appendChild(this.blockCore);

        this.block.addEventListener('pan', (event: PanEvent) => {
            if (event.state == 2) {
                offsetX += event.translation.deltaX;
                offsetX = Math.max(offsetX, -BLOCK_WIDTH / 2);
                offsetX = Math.min(offsetX, this.width - BLOCK_WIDTH - BLOCK_WIDTH / 2);
                this.block.style = {
                    transform: `translate(${offsetX},0)`,
                }

                let step = Math.round(offsetX);
                let color = this.colors[step];
                this.blockCore.style = {
                    backgroundColor: color,
                }

                if (this.listener) {
                    this.listener(color)
                }
            }
        });

        this.appendChild(this.bar);
        this.appendChild(this.block);
    }

    /**
     * 设置颜色进度条的颜色范围
     * 
     * @param startColor 开始颜色
     * @param endColor 结束颜色
     */
    public setColorRange(startColor: string, endColor: string) {
        this.startColor = startColor;
        this.endColor = endColor;
        this.bar.style = {
            backgroundColor: `linear-gradient(90deg ${startColor} ${endColor})`,
        };
        this.blockCore.style = {
            backgroundColor: this.startColor,
        }
    }

    public setOnColorChangedListener(listener: Function) {
        this.listener = listener;
    }
}