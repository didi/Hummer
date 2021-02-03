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
            justifyContent: 'center',
            alignItems: 'center',
        }

        this.infoView = new Text();
        this.infoView.style = {
            width: environment.availableWidth,
            height: 200,
            textAlign: 'center',
        }

        this.appendChild(this.infoView);
    }

    onCreate() {
        // 页面创建
        this.info = "onCreate\n";
        this.infoView.text = this.info;
        console.log('-- onCreate');
    }

    onAppear() {
        // 页面显示
        this.info += "onAppear\n";
        this.infoView.text = this.info;
        console.log('-- onAppear');
    }

    onDisappear() {
        // 页面隐藏
        this.info = "onDisappear\n";
        this.infoView.text = this.info;
        console.log('-- onDisappear');
    }

    onDestroy() {
        // 页面销毁
        this.info += "onDestroy\n";
        this.infoView.text = this.info;
        console.log('-- onDestroy');
    }
}

Hummer.render(new RootView());