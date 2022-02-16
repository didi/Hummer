import { Hummer, View, Text, KeyframeAnimation } from '@hummer/hummer-front'
import { Style } from '../../common/CommonStyle'
import { Color } from '../../common/CommonColor'
import { ComponentPage } from '../../common/CommonPage'
class RootView extends ComponentPage {
    constructor() {
        super();
        this.setPageTitle('跑马灯文字效果');
        this.style = {
            ...Style.FullParentStyle,
            backgroundColor: Color.white,
        }
    }
    initDisplayView() {
        // 复写父类方法，去除DisplayView
    }
    initContentView() {
        let container = new View;
        container.style = {
            width: '100%',
            flexGrow: 1,
            ...Style.CenterStyle,
        }
        let v = new MargueeView(['Hummer', 'Tenon', 'DiDi']);
        container.appendChild(v);
        this.appendChild(container);
    }
}

class MargueeView extends View {
    tv1: Text;
    tv2: Text;
    anim1: KeyframeAnimation;
    anim2: KeyframeAnimation;
    anim3: KeyframeAnimation;
    anim4: KeyframeAnimation;
    data: string[];
    curIndex: number;

    constructor(data: string[]) {
        super();

        this.style = {
            width: '100%',
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Color.hm_green,
            overflow: 'hidden',
        }

        this.data = data;
        this.curIndex = 0;

        this.tv1 = new Text();
        this.tv1.text = this.data[this.curIndex];
        this.tv1.style = {
            position: 'absolute',
            fontSize: 30,
            color: '#000000',
        };

        this.tv2 = new Text();
        this.tv2.text = this.data[this.getNextIndex(this.curIndex)];
        this.tv2.style = {
            position: 'absolute',
            fontSize: 30,
            color: '#000000',
            // marginTop: 40,
            opacity: 0,
        };

        this.appendChild(this.tv1);
        this.appendChild(this.tv2);

        this.initAnims();

        setInterval(() => {
            this.doAnim(this.tv1, this.tv2);
        }, 2000);
    }

    private initAnims() {
        this.anim1 = new KeyframeAnimation('position');
        this.anim1.keyframes = [{
            percent: 0,
            value: { x: 0, y: 0 },
        }, {
            percent: 1,
            value: { x: 0, y: -40 },
        }];
        this.anim1.duration = 0.3;
        this.anim1.easing = 'ease-out';

        this.anim2 = new KeyframeAnimation('opacity');
        this.anim2.keyframes = [{
            percent: 0,
            value: 1,
        }, {
            percent: 1,
            value: 0,
        }];
        this.anim2.duration = 0.3;
        this.anim2.easing = 'ease-out';

        this.anim3 = new KeyframeAnimation('position');
        this.anim3.keyframes = [{
            percent: 0,
            value: { x: 0, y: 40 },
        }, {
            percent: 1,
            value: { x: 0, y: 0 },
        }];
        this.anim3.duration = 0.3;
        this.anim3.easing = 'ease-out';
        this.anim3.on('end', () => {
            this.tv1.style = {
                transform: 'translate(0, 40)',
            }
        });

        this.anim4 = new KeyframeAnimation('opacity');
        this.anim4.keyframes = [{
            percent: 0,
            value: 0,
        }, {
            percent: 1,
            value: 1,
        }];
        this.anim4.duration = 0.3;
        this.anim4.easing = 'ease-out';

        this.anim1.on('end', () => {
            this.curIndex = this.getNextIndex(this.curIndex);
        });
    }

    private doAnim(tv1, tv2) {
        tv1.text = this.data[this.curIndex];
        tv2.text = this.data[this.getNextIndex(this.curIndex)];

        tv1.addAnimation(this.anim1, 'key1');
        tv1.addAnimation(this.anim2, 'key2');
        tv2.addAnimation(this.anim3, 'key3');
        tv2.addAnimation(this.anim4, 'key4');
    }

    private getNextIndex(curIndex) {
        return (curIndex + 1) % this.data.length;
    }
}

Hummer.render(new RootView());