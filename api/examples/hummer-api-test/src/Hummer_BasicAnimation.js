import { View, Hummer, Button, BasicAnimation, KeyframeAnimation } from '../../../packages/hummer-api/dist/hummer-api.es'

export class RootView extends View {
    constructor() {
        super();

        this.style = {
            width: '100%',
            height: '100%',
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 10,
        };


        var animView = new View();
        animView.style = {
            width: 120,
            height: 120,
            backgroundColor: "#FF000080",
        };

        let anim = new BasicAnimation('position');
        anim.value = { x: 120, y: -70 };
        anim.duration = 10;
        anim.delay = 1;
        anim.repeatCount = 2;
        anim.easing = 'linear';

        // scale/scaleX/scaleY
        let anim2 = new BasicAnimation('scale');
        anim2.value = 1.8;
        anim2.duration = 3;
        anim2.delay = 1;
        anim2.repeatCount = 1;
        anim2.easing = 'linear';

        let anim3 = new BasicAnimation('rotationX');
        anim3.value = 180;
        anim3.duration = 3;
        anim3.delay = 1;
        anim3.repeatCount = 1;
        anim3.easing = 'linear';



        var animView2 = new View();
        animView2.style = {
            width: 120,
            height: 120,
            backgroundColor: "#FF000080",
        };
        let keyframeAnim = new KeyframeAnimation('position');
        keyframeAnim.keyframes = [{
            percent: 0,
            value: { x: 0, y: 0 },
        }, {
            percent: 0.2,
            value: { x: 30, y: 0 },
        }, {
            percent: 0.6,
            value: { x: 30, y: 60 },
        }, {
            percent: 0.8,
            value: { x: 100, y: 60 },
        }, {
            percent: 1.0,
            value: { x: 100, y: 0 },
        }];

        keyframeAnim.duration = 3;
        keyframeAnim.delay = 1;
        keyframeAnim.repeatCount = 4;
        keyframeAnim.easing = 'linear';
   

        keyframeAnim.on("start", () => {
            console.log("------动画开始");
        });
        keyframeAnim.on("end", () => {
            console.log("------动画结束");
        });


        let button = new Button()
        button.text = '跳转到下一页'
        button.style = {
            backGroundColor: "#ff0000"
        }
        button.addEventListener('tap', (event) => {

            // animView.addAnimation(anim, 'key1');
            // animView.addAnimation(anim2, 'key2');
            // animView.addAnimation(anim3, 'key3');
            animView2.addAnimation(keyframeAnim, 'key5');

        });

  

        this.appendChild(animView)
        this.appendChild(animView2)
        this.appendChild(button)

    }

}

Hummer.render(new RootView());