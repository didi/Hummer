import { Hummer, View, KeyframeAnimation } from '@hummer/hummer-front'
import { Style } from '../../../common/CommonStyle'
import { Color } from '../../../common/CommonColor'
import { ComponentPage } from '../../../common/CommonPage'
class RootView extends ComponentPage {
    constructor() {
        super();
        this.setPageTitle('水波纹效果');
        this.style = {
            ...Style.FullParentStyle,
            backgroundColor: Color.white,
        }
    }
    initDisplayView() {
        // 复写父类方法，去除DisplayView
    }
    initContentView() {
        this.showRippleAnim();
    }
    /**
     * 水波纹动画
     */
    showRippleAnim() {
        let innerView = new View;
        innerView.style = {
            position: 'absolute',
            width: 36,
            height: 36,
            backgroundColor: Color.hm_green,
            borderRadius: 18,
        }

        let outerView = new View;
        outerView.style = {
            position: 'absolute',
            width: 100,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Color.hm_green + '22',
            borderRadius: 50,
            borderWidth: 4,
            borderColor: Color.hm_green,
            borderStyle: 'solid',
        }

        let layout = new View();
        layout.style = {
            width: 100,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
        }
        let container = new View;
        container.style = {
            width: '100%',
            flexGrow: 1,
            ...Style.CenterStyle,
        }
        layout.appendChild(innerView);
        layout.appendChild(outerView);
        container.appendChild(layout);
        this.appendChild(container);

        let anim = new KeyframeAnimation("scale");
        anim.keyframes = [{
            percent: 0,
            value: 1,
            easing: "ease-in-out"
        }, {
            percent: 0.5,
            value: 2,
            easing: "ease-in-out"
        }, {
            percent: 1,
            value: 1,
            easing: "ease-in-out"
        }];
        anim.repeatCount = -1;
        anim.duration = 1;
        outerView.addAnimation(anim, 'scaleKey1');
    }
}

Hummer.render(new RootView());