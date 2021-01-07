class RootView extends View {
    initialize() {
        this.style = {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        }

        this.testLoading();
    }

    testLoading() {
        let view1 = new View;
        view1.style = {
          width: 10,
          height: 10,
          backgroundColor: '#333333',
          borderRadius: 5,
          opacity: 0.5,
        }
        this.doLoadingAnimation(view1, 0);

        let view2 = new View;
        view2.style = {
          width: 10,
          height: 10,
          backgroundColor: '#333333',
          borderRadius: 5,
          opacity: 0.5,
        }
        this.doLoadingAnimation(view2, 300);

        let view3 = new View;
        view3.style = {
          width: 10,
          height: 10,
          backgroundColor: '#333333',
          borderRadius: 5,
          opacity: 0.5,
        }
        this.doLoadingAnimation(view3, 600);

        let layout = new View;
        layout.style = {
          flexDirection: 'row',
          width: 50,
          justifyContent: 'space-between',
        }

        layout.appendChild(view1);
        layout.appendChild(view2);
        layout.appendChild(view3);
        this.appendChild(layout);
    }

    doLoadingAnimation(view, delay) {
        setTimeout(() => {
            let anim1 = new KeyframeAnimation("opacity");
            anim1.keyframes = [{
                  percent: 0,
                  value: 1,
                  easing: "ease-in-out"
            }, {
                percent: 0.2,
                value: 0.5,
                easing: "ease-in-out"
            }, {
                percent: 1,
                value: 0.5,
                easing: "ease-in-out"
            }];
            anim1.repeatCount = -1;
            anim1.duration = 1;

            let anim2 = new KeyframeAnimation("scale");
            anim2.keyframes = [{
                  percent: 0,
                  value: 1.3,
                  easing: "ease-in-out"
            }, {
                percent: 0.2,
                value: 1,
                easing: "ease-in-out"
            }, {
                percent: 1,
                value: 1,
                easing: "ease-in-out"
            }];
            anim2.repeatCount = -1;
            anim2.duration = 1;

            view.addAnimation(anim1, 'opacityKey1');
            view.addAnimation(anim2, 'scaleKey1');
        }, delay);
    }
}

Hummer.render(new RootView());