class RootView extends View {
    initialize() {
        let environment = Hummer.env;
        this.style = {
            width: '100%',
            height: '100%',
            marginTop: 40,
            padding: 20,
        }

        let titleView = new Text();
        titleView.text = "获取验证码"
        titleView.style = {
            fontSize: 20,
            fontWeight: 'bold',
        }

        let descView1 = new Text();
        descView1.text = "验证码已发送到您手机"
        descView1.style = {
            marginTop: 16,
        }
        let descView2 = new Text();
        descView2.text = "+86 15858585858"
        descView2.style = {
            marginTop: 16,
        }

        let verifyCodeView = new VerifyCodeView()
        verifyCodeView.style = {
            marginTop: 32,
        }

        this.appendChild(titleView);
        this.appendChild(descView1);
        this.appendChild(descView2);
        this.appendChild(verifyCodeView);
    }
}

class VerifyCodeView extends View {
    initialize() {
        this.style = {
            flexDirection: 'row',
            width: '80%',
            justifyContent: 'space-between',
        }

        let inputViews = new Array();
        for (let i = 0; i < 6; i++) {
            let input = new Input();
            input.style = {
                width: 40,
                height: 40,
                borderRadius: 3,
                borderWidth: 1,
                borderColor: '#000000',
                textAlign: 'center',
                type: 'number',
                maxLength: 1,
            }

            input.addEventListener('input', (event) => {
                if (event.state == 2) { // 输入中
                    if (event.text) { // 有内容输入
                        if (i < inputViews.length - 1) {
                            inputViews[i + 1].focused = true;
                        } else {
                            inputViews[i].focused = false;
                        }
                    } else { // 无内容输入
                        if (i > 0) {
                            inputViews[i - 1].focused = true;
                        } else {
                            inputViews[0].focused = false;
                        }
                    }
                }
            })

            inputViews.push(input);
            this.appendChild(input);
        }
    }
}

Hummer.render(new RootView());