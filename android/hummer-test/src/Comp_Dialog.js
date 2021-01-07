class RootView extends View {
    initialize() {
        let environment = Hummer.env;
        this.style = {
            width: environment.availableWidth,
            height: environment.availableHeight,
            justifyContent: 'center',
            alignItems: 'center',
        }

        let btn1 = new Button();
        btn1.text = "show Alert"
        btn1.addEventListener('tap', (event) => {
            this.showAlertDialog();
        });

        let btn2 = new Button();
        btn2.text = "show Confirm"
        btn2.addEventListener('tap', (event) => {
            this.showConfirmDialog();
        });

        let btn3 = new Button();
        btn3.text = "show Loading"
        btn3.addEventListener('tap', (event) => {
            this.showLoadingDialog();
        });

        let btn4 = new Button();
        btn4.text = "show Custom"
        btn4.addEventListener('tap', (event) => {
            this.showCustomDialog();
        });

        this.appendChild(btn1);
        this.appendChild(btn2);
        this.appendChild(btn3);
        this.appendChild(btn4);
    }

    showAlertDialog() {
        let dialog = new Dialog();
        dialog.cancelable = false;
//        dialog.alert("test");
        dialog.alert("test", "xxx", () => {
            Toast.show('ok click');
        });
    }

    showConfirmDialog() {
        let dialog = new Dialog();
        dialog.cancelable = false;
//        dialog.confirm("test");
        dialog.confirm("test title", "test msg", "xxx", "yyy",
            () => {
                Toast.show('ok click');
            }, () => {
                Toast.show('cancel click');
            });
    }

    showLoadingDialog() {
        let dialog = new Dialog();
        dialog.loading("加载中...");
//        dialog.loading("测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字");
    }

    showCustomDialog() {
        let layout = new View();
        layout.style = {
            width: 300,
            backgroundColor: "#FFFFFF",
            borderRadius: 10,
        }

        let textView = new Text();
        textView.text = "这是对话框内容"
        textView.style = {
            marginTop: 30,
            marginLeft: 16,
            marginRight: 16,
            marginBottom: 20,
            textAlign: "center",
            fontSize: 14,
        }

        let lineView = new View();
        lineView.style = {
            width: '100%',
            height: 0.5,
            backgroundColor: '#CCCCCC',
        }

        let subLayout = new View();
        subLayout.style = {
            flexDirection: 'row',
            width: "100%",
            height: 50,
        }

        let btn1 = new Text();
        btn1.text = "取消";
        btn1.style = {
            flexGrow: 1,
            textAlign: "center",
        }

        let lineView2 = new View();
        lineView2.style = {
            width: 0.5,
            height: '100%',
            backgroundColor: '#CCCCCC',
        }

        let btn2 = new Text();
        btn2.text = "确定";
        btn2.style = {
            flexGrow: 1,
            textAlign: "center",
        }

        subLayout.appendChild(btn1);
        subLayout.appendChild(lineView2);
        subLayout.appendChild(btn2);
        layout.appendChild(textView);
        layout.appendChild(lineView);
        layout.appendChild(subLayout);

        let dialog = new Dialog();
        dialog.custom(layout);

        btn1.addEventListener("tap", (event) => {
            dialog.dismiss();
        })
        btn2.addEventListener("tap", (event) => {
            dialog.dismiss();
        })
    }
}

Hummer.render(new RootView());

