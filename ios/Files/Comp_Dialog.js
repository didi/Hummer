class RootView extends View {
    initialize() {
        let environment = Hummer.env;
        this.style = {
            flexDirection: 'column',
            width: environment.availableWidth,
            height: environment.availableHeight,
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
            marginTop: 90,
        }

        this.testPhone();
    }

    testPhone() {
		
        let titleView = new Text();
        titleView.text = 'Hummer Dialog';
        titleView.style = {
            color: '#333333',
            fontSize: 16,
        };

        let layout = new View();
        layout.style = {
            padding: 10,
            borderWidth: 1,
            borderColor: '#22222222',
        };
		this.appendChild(titleView);
		this.appendChild(layout);

        let btn = new Button();
        btn.text = 'Hummer dialog测试 alert无回调';
        btn.style = {
			padding: 10,
            height: 40,
        };
        btn.addEventListener('tap', function () {
            let dialog = new Dialog();
            dialog.alert("test");
        });
        layout.appendChild(btn);
		
        let btn1 = new Button();
        btn1.text = 'Hummer dialog测试 alert有回调';
        btn1.style = {
            padding: 10,
            height: 40,
        };
        btn1.addEventListener('tap', function () {
            let dialog = new Dialog();
            dialog.alert("Hummer dialog测试 alert有回调", "OK1111", () => {
                Toast.show('OK1111 click');
            });
        });
        layout.appendChild(btn1);
        
        let btn2 = new Button();
        btn2.text = 'Hummer dialog测试 confirm无回调';
        btn2.style = {
            padding: 10,
            height: 40,
        };
        btn2.addEventListener('tap', function () {
            let dialog = new Dialog();
            dialog.confirm("Hummer dialog测试 confirm无回调");
        });
        layout.appendChild(btn2);
        
        let btn3 = new Button();
        btn3.text = 'Hummer dialog测试 confirm有回调';
        btn3.style = {
            padding: 10,
            height: 40,
        };
        btn3.addEventListener('tap', function () {
            let dialog = new Dialog();
            dialog.confirm("test", "OK", "Cancel",
            () => {
                Toast.show('ok click');
            }, () => {
                Toast.show('cancel click');
            });
        });
        layout.appendChild(btn3);
        
    }
}

Hummer.render(new RootView());
