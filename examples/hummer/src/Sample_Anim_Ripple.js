class RootView extends View {
    initialize() {
        this.style = {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        }

        this.testRipple();
    }

    testRipple() {
        let innerView = new View;
        innerView.style = {
          position: 'absolute',
          width: 40,
          height: 40,
          backgroundColor: '#800000',
          borderRadius: 20,
        }

        let outerView = new View;
        outerView.style = {
          position: 'absolute',
          width: 100,
          height: 100,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#80000022',
          borderRadius: 50,
          borderWidth: 4,
          borderColor: '#800000',
          borderStyle: 'solid',
        }

        let layout = new View();
        layout.style = {
            width: 100,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
        }
        layout.appendChild(innerView);
        layout.appendChild(outerView);
        this.appendChild(layout);

        let anim = new KeyframeAnimation("scale");
        anim.keyframes = [{
              percent: 0,
              value: 1,
              easing: "ease-in-out"
          },{
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