import { Hummer, View, KeyframeAnimation } from '@hummer/hummer-front'
import { Style } from '../../../common/CommonStyle'
import { Color } from '../../../common/CommonColor'
import { ComponentPage } from '../../../common/CommonPage'
class RootView extends ComponentPage {
    constructor() {
        super();
        this.setPageTitle('Loading 效果');
        this.style = {
            ...Style.FullParentStyle,
            backgroundColor: Color.white,
        }
    }

    initDisplayView() {
        // 复写父类方法，去除DisplayView
    }

    initContentView() {
        this.showLoadingAnim();
    }
    /**
     * Loading 动画
     */
    showLoadingAnim() {
        let layout = new View;
        let container = new View;
        layout.style = {
            flexDirection: 'row',
            width: 80,
            ...Style.CenterStyle,
            justifyContent: 'space-between',
        }
        container.style = {
            width: '100%',
            flexGrow:1,
            ...Style.CenterStyle,
        }

        for (let i = 0; i < 3; i++) {
            let v = new View;
            v.style = {
                width: 20,
                height: 20,
                backgroundColor: Color.hm_green,
                borderRadius: 10,
                opacity: 0.5,
            }
            layout.appendChild(v);
            this.doLoadingAnimation(v, i * 300);
        }
        container.appendChild(layout);
        this.appendChild(container);
    }

    doLoadingAnimation(view, delay) {
        setTimeout(() => {
            let anim1 = new KeyframeAnimation("opacity");
            anim1.keyframes = [{
                percent: 0,
                value: 0.5,
                easing: "ease-out"
            }, {
                percent: 0.1,
                value: 1,
                easing: "ease-in"
            }, {
                percent: 0.4,
                value: 0.5,
                easing: "ease-out"
            }, {
                percent: 1,
                value: 0.5,
                easing: "ease-out"
            }];
            anim1.repeatCount = -1;
            anim1.duration = 1;

            let anim2 = new KeyframeAnimation("scale");
            anim2.keyframes = [{
                percent: 0,
                value: 1,
                easing: "ease-out"
            }, {
                percent: 0.1,
                value: 1.3,
                easing: "ease-in"
            }, {
                percent: 0.4,
                value: 1,
                easing: "ease-out"
            }, {
                percent: 1,
                value: 1,
                easing: "ease-out"
            }];
            anim2.repeatCount = -1;
            anim2.duration = 1;

            view.addAnimation(anim1, 'opacityKey');
            view.addAnimation(anim2, 'scaleKey');
        }, delay);
    }
}

Hummer.render(new RootView());