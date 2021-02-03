class RootView extends View {
    initialize() {
        let environment = Hummer.env;
        this.style = {
            width: environment.availableWidth,
            height: environment.availableHeight,
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
        };

        var animView = new View();
        animView.style = {
            top: 60,
            left: 10,
            width: 120,
            height: 120,
            backgroundColor: "#FF000080",
            borderRadius: 10,
            transitionDelay: '5',
            transitionDuration: ['5'],
            transitionProperty: 'all',
            transitionTimingFunction: 'linear'
        };

        var isKeyFrame = false;

        var layout0 = new View();
        layout0.style = {
            flexDirection: 'row',
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
            animView.style = {
                transform: 'translate(200px,200px)'
            };
        });

        var button2 = new Button();
        button2.style = {
            width: 150,
            height: 40,
            fontSize: 16,
        };
        button2.text = "缩放 (scale)";
        button2.addEventListener("tap", (event) => {
            animView.style = {
                transform: 'scale(0.5,5)'
            };
        });

        var button3 = new Button();
        button3.style = {
            width: 150,
            height: 40,
            fontSize: 16,
        };
        button3.text = "旋转 (rotate)";
        button3.addEventListener("tap", (event) => {
            animView.style = {
                transform: 'rotateY(180)'
            };
        });

        var button4 = new Button();
        button4.style = {
            width: 150,
            height: 40,
            fontSize: 16,
        };
        button4.text = "错切 (skew)";
        button4.addEventListener("tap", (event) => {
            animView.style = {
                transform: 'skew(30, 20)'
            };
        });

        var button5 = new Button();
        button5.style = {
            width: 150,
            height: 40,
            fontSize: 16,
        };
        button5.text = "宽度(width)";
        button5.addEventListener("tap", (event) => {
            animView.style = {
                width: 200,
            };
        });


        var button6 = new Button();
        button6.style = {
            width: 150,
            height: 40,
            fontSize: 16,
        };
        button6.text = "高度(height)";
        button6.addEventListener("tap", (event) => {
            animView.style = {
                height: 100,
            };
        });

        var button7 = new Button();
        button7.style = {
            width: 150,
            height: 40,
            fontSize: 16,
        };
        button7.text = "宽度和高度";
        button7.addEventListener("tap", (event) => {
            animView.style = {
                height: "100px",
                width: "200px",
            };
        });

        var button8 = new Button();
        button8.style = {
            width: 150,
            height: 40,
            fontSize: 16,
        };
        button8.text = "透明度 (opacity)";
        button8.addEventListener("tap", (event) => {
            animView.style = {
                opacity: 0.5,
            };
        });

        var button9 = new Button();
        button9.style = {
            width: 150,
            height: 40,
            fontSize: 16,
        };
        button9.text = "背景颜色渐变";
        button9.addEventListener("tap", (event) => {
            animView.style = {
                backgroundColor: "#0000ff80",
            };
        });

        var button10 = new Button();
        button10.style = {
            width: 150,
            height: 40,
            fontSize: 16,
        };
        button10.text = "所有一起执行";
        button10.addEventListener("tap", (event) => {
            animView.style = {
                transform: 'translate(20,20),scale(0.5,5),rotateY(180),skew(30, 20)',
                height: 100,
                width: 200,
                opacity: 0.5,
                backgroundColor: "#0000ff80",
            };
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



        layout1.appendChild(button1);
        layout1.appendChild(button2);
        layout1.appendChild(button3);
        layout1.appendChild(button4);
        layout1.appendChild(button5);
        layout1.appendChild(button6);
        layout1.appendChild(button7);
        layout1.appendChild(button8);
        layout1.appendChild(button9);
        layout1.appendChild(button10);

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
                anim.value = { x: 120, y: -70 };
                anim.easing = "linear";
            } else {
                anim = new KeyframeAnimation("position");
                anim.keyframes = [{
                    percent: 0,
                    value: { x: 0, y: 0 },
                    easing: "linear"
                }, {
                    percent: 0.2,
                    value: { x: 30, y: 0 },
                    easing: "linear"
                }, {
                    percent: 0.6,
                    value: { x: 30, y: 60 },
                    easing: "linear"
                }, {
                    percent: 0.8,
                    value: { x: 100, y: 60 },
                    easing: "linear"
                }, {
                    percent: 1.0,
                    value: { x: 100, y: 0 },
                    easing: "linear"
                }];
            }
            anim.duration = 1;
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
                anim.easing = "linear";
            } else {
                anim = new KeyframeAnimation(type);
                anim.keyframes = [{
                    percent: 0.2,
                    value: "0.5",
                    easing: "linear"
                }, {
                    percent: 0.4,
                    value: "1.1",
                    easing: "linear"
                }, {
                    percent: 1,
                    value: "1.8",
                    easing: "linear"
                }];
            }
            anim.duration = 0.3;
            animView.addAnimation(anim, "xx");
        }

        // 旋转动画
        function animRotation(type) {
            var anim;
            if (!isKeyFrame) {
                anim = new BasicAnimation(type);
                anim.value = "360";
                anim.easing = "linear";
            } else {
                anim = new KeyframeAnimation(type);
                anim.keyframes = [{
                    percent: 0.2,
                    value: "180",
                    easing: "linear"
                }, {
                    percent: 0.4,
                    value: "270",
                    easing: "linear"
                }, {
                    percent: 1,
                    value: "360",
                    easing: "linear"
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
                anim.easing = "linear";
            } else {
                anim = new KeyframeAnimation("opacity");
                anim.keyframes = [{
                    percent: 0.2,
                    value: "0.5",
                    easing: "linear"
                }, {
                    percent: 1,
                    value: "1",
                    easing: "linear"
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
                anim.value = "#0000ff80";
                anim.easing = "linear";
            } else {
                anim = new KeyframeAnimation("backgroundColor");
                anim.keyframes = [{
                    percent: 0.2,
                    value: "#ff000080",
                    easing: "linear"
                }, {
                    percent: 0.4,
                    value: "#ffffff80",
                    easing: "linear"
                }, {
                    percent: 1,
                    value: "#0000ff80",
                    easing: "linear"
                }];
            }
            anim.duration = 1;
            animView.addAnimation(anim, "xx");
        }

        // 宽度和高度动画
        function animWidthHeight() {
            var anim1;
            var anim2;

            if (!isKeyFrame) {
                anim1 = new BasicAnimation("width");
                anim1.from = 50;
                anim1.value = 200;
                anim1.easing = "linear";
                anim2 = new BasicAnimation("height");
                anim2.from = 50;
                anim2.value = 200;
                anim2.easing = "linear";
            } else {
                anim1 = new KeyframeAnimation("width");
                anim1.keyframes = [{
                    percent: 0.2,
                    value: 170,
                }, {
                    percent: 0.4,
                    value: 200,
                }, {
                    percent: 1,
                    value: 150,
                }];
                anim2 = new KeyframeAnimation("height");
                anim2.keyframes = [{
                    percent: 0.2,
                    value: 170,
                }, {
                    percent: 0.4,
                    value: 200,
                }, {
                    percent: 1,
                    value: 150,
                }];
            }
            anim1.duration = 1;
            animView.addAnimation(anim1, "xx1");
            anim2.duration = 1;
            animView.addAnimation(anim2, "xx2");
        }
        function animSkew() {
            var anim;

            if (!isKeyFrame) {
                anim = new BasicAnimation("skew");
                anim.value = { x: 45, y: 60 };
                anim.easing = "linear";
            } else {
                anim = new KeyframeAnimation("skew");
                anim.keyframes = [{
                    percent: 0,
                    value: { x: 0, y: 0 },
                    easing: "linear"
                }, {
                    percent: 0.2,
                    value: { x: 30, y: 0 },
                    easing: "linear"
                }, {
                    percent: 0.6,
                    value: { x: 0, y: 30 },
                    easing: "linear"
                }, {
                    percent: 0.8,
                    value: { x: 30, y: 30 },
                    easing: "linear"
                }, {
                    percent: 1.0,
                    value: { x: 0, y: 0 },
                    easing: "linear"
                }];
            }
            anim.duration = 1;
            animView.addAnimation(anim, "xx1");

        }

    }
}

Hummer.render(new RootView());

