class RootView extends View {
    initialize() {
        let environment = Hummer.env;
        this.style = {
            marginTop:"88",
            width: environment.deviceWidth,
            height: environment.deviceHeight,
        };

        var isKeyFrame = false;

        var layout0 = new View();
        layout0.style = {
            flexDirection: 'row',
            width: environment.deviceWidth,
        };

        var layout1 = new View();
        layout1.style = {
            flexGrow: 1,
        };

        var layout2 = new View();
        layout2.style = {
            flexGrow: 1,
            alignItems: 'flex-end',
        };

        var button1 = new Button();
        button1.style = {
            width: 150,
            height: 40,
            fontSize: 16,
        };
        button1.text = "平移 (position)";
        button1.addEventListener("tap", (event) => {
            animTranslation('position');
        });

        var button2 = new Button();
        button2.style = {
            width: 150,
            height: 40,
            fontSize: 16,
        };
        button2.text = "缩放 (scale)";
        button2.addEventListener("tap", (event) => {
            animScale("scale");
        });

        var button3 = new Button();
        button3.style = {
            width: 150,
            height: 40,
            fontSize: 16,
        };
        button3.text = "缩放 (scaleX)";
        button3.addEventListener("tap", (event) => {
            animScale("scaleX");
        });

        var button4 = new Button();
        button4.style = {
            width: 150,
            height: 40,
            fontSize: 16,
        };
        button4.text = "缩放 (scaleY)";
        button4.addEventListener("tap", (event) => {
            animScale("scaleY");
        });

        var button5 = new Button();
        button5.style = {
            width: 150,
            height: 40,
            fontSize: 16,
        };
        button5.text = "旋转 (rotationX)";
        button5.addEventListener("tap", (event) => {
            animRotation("rotationX");
        });

        var button6 = new Button();
        button6.style = {
            width: 150,
            height: 40,
            fontSize: 16,
        };
        button6.text = "旋转 (rotationY)";
        button6.addEventListener("tap", (event) => {
            animRotation("rotationY");
        });

        var button7 = new Button();
        button7.style = {
            width: 150,
            height: 40,
            fontSize: 16,
        };
        button7.text = "旋转 (rotationZ)";
        button7.addEventListener("tap", (event) => {
            animRotation("rotationZ");
        });

        var button8 = new Button("button8");
        button8.style = {
            width: 150,
            height: 40,
            fontSize: 16,
        };
        button8.text = "透明度 (opacity)";
        button8.addEventListener("tap", (event) => {
            animAlpha();
        });

        var button9 = new Button();
        button9.style = {
            width: 150,
            height: 40,
            fontSize: 16,
        };
        button9.text = "背景颜色渐变";
        button9.addEventListener("tap", (event) => {
            animBackgroundColor();
        });

        var button31 = new Button();
        button31.style = {
            width: 120,
            height: 40,
            fontSize: 16,
        };
        button31.text = "取消某个动画";
        button31.addEventListener("tap", (event) => {
            animView.removeAnimationForKey("xx");
        });

        var button32 = new Button();
        button32.style = {
            width: 120,
            height: 40,
            fontSize: 16,
        };
        button32.text = "取消所有动画";
        button32.addEventListener("tap", (event) => {
            animView.removeAllAnimation();
        });

        var animView = new View();
        animView.style = {
            top: 60,
            left: 20,
            width: 120,
            height: 120,
            backgroundColor: "#FF000080",
        };

        layout1.appendChild(button1);
        layout1.appendChild(button2);
        layout1.appendChild(button3);
        layout1.appendChild(button4);
        layout1.appendChild(button5);
        layout1.appendChild(button6);
        layout1.appendChild(button7);
        layout1.appendChild(button8);
        layout1.appendChild(button9);
        layout2.appendChild(button31);
        layout2.appendChild(button32);

        layout0.appendChild(layout1);
        layout0.appendChild(layout2);
        this.appendChild(layout0);
        this.appendChild(animView);

        // 平移动画
        function animTranslation() {
            var anim;
            if (!isKeyFrame) {
                anim = new BasicAnimation("position");
                anim.value = { x: 120, y: -40 };
                anim.timeFunction = "linear";
            } else {
                anim = new KeyframeAnimation("position");
                anim.keyframes = [{
                    percent: 0,
                    value: { x: 0, y: 0 },
                    timeFunction: "linear"
                }, {
                    percent: 0.2,
                    value: { x: 30, y: 0 },
                    timeFunction: "linear"
                }, {
                    percent: 0.6,
                    value: { x: 30, y: 60 },
                    timeFunction: "linear"
                }, {
                    percent: 0.8,
                    value: { x: 100, y: 60 },
                    timeFunction: "linear"
                }, {
                    percent: 1.0,
                    value: { x: 100, y: 0 },
                    timeFunction: "linear"
                }];
            }
            anim.duration = 2;
            anim.on("start", function () {
                console.log("position anim start");
            });
            anim.on("end", function () {
                console.log("position anim end");
            });
            animView.addAnimation(anim, "xx");
        }

        // 缩放动画
        function animScale(type) {
            var anim;
            if (!isKeyFrame) {
                anim = new BasicAnimation(type);
                anim.value = "1.8";
                anim.timeFunction = "linear";
            } else {
                anim = new KeyframeAnimation(type);
                anim.keyframes = [{
                    percent: 0.2,
                    value: "0.5",
                    timeFunction: "linear"
                }, {
                    percent: 0.4,
                    value: "1.1",
                    timeFunction: "linear"
                }, {
                    percent: 1,
                    value: "1.8",
                    timeFunction: "linear"
                }];
            }
            anim.duration = 0.3;
            animView.addAnimation(anim, "transform.trans");
        }

        // 旋转动画
        function animRotation(type) {
            var anim;
            if (!isKeyFrame) {
                anim = new BasicAnimation(type);
                anim.value = "360";
                anim.timeFunction = "linear";
            } else {
                anim = new KeyframeAnimation(type);
                anim.keyframes = [{
                    percent: 0.2,
                    value: "180",
                    timeFunction: "linear"
                }, {
                    percent: 0.4,
                    value: "270",
                    timeFunction: "linear"
                }, {
                    percent: 1,
                    value: "360",
                    timeFunction: "linear"
                }];
            }
            anim.duration = 0.3;
            animView.addAnimation(anim, "xx");
        }

        // 透明度动画
        function animAlpha() {
            var anim;
            if (!isKeyFrame) {
                anim = new BasicAnimation("opacity");
                anim.value = "0.5";
                anim.timeFunction = "linear";
            } else {
                anim = new KeyframeAnimation("opacity");
                anim.keyframes = [{
                    percent: 0.2,
                    value: "0.5",
                    timeFunction: "linear"
                }, {
                    percent: 1,
                    value: "1",
                    timeFunction: "linear"
                }];
            }
            anim.duration = 0.3;
            animView.addAnimation(anim, "xx");
        }

        // 背景色渐变动画
        function animBackgroundColor() {
            var anim;
            if (!isKeyFrame) {
                anim = new BasicAnimation("backgroundColor");
                anim.value = "#800000ff";
                anim.timeFunction = "linear";
            } else {
                anim = new KeyframeAnimation("backgroundColor");
                anim.keyframes = [{
                    percent: 0.2,
                    value: "#80ff0000",
                    timeFunction: "linear"
                }, {
                    percent: 0.4,
                    value: "#80ffffff",
                    timeFunction: "linear"
                }, {
                    percent: 1,
                    value: "#800000ff",
                    timeFunction: "linear"
                }];
            }
            anim.duration = 1;
            animView.addAnimation(anim, "xx");
        }
    }
}

Hummer.render(new RootView());

