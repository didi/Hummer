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
        titleView.text = 'toast';
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
		
        let btn1 = new Button();
        btn1.text = 'Hummer内置toast，默认展示时长2秒';
        btn1.style = {
            padding: 10,
            height: 40,
        };
        btn1.addEventListener('tap', function () {
            Toast.show('Toast测试，默认展示时长 2秒');
            });
        layout.appendChild(btn1);
        
        let btn2 = new Button();
        btn2.text = 'Hummer内置toast，展示3秒';
        btn2.style = {
            padding: 10,
            height: 40,
        };
        btn2.addEventListener('tap', function () {
            Toast.show('Toast测试，展示3秒;Toast测试，展示3秒;Toast测试，展示3秒;Toast测试，展示3秒;Toast测试，展示3秒;Toast测试，展示3秒;Toast测试，展示3秒;Toast测试，展示3秒;', 3000);
            });
        layout.appendChild(btn2);
        
    }
}

Hummer.render(new RootView());
