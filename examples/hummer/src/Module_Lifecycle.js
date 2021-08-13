class RootView extends View {
    constructor() {
        super();

        this.style = {
            width: '100%',
            height: '100%',
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
            justifyContent: 'center',
            alignItems: 'center',
        }

        this.info = "";
        this.infoView = new Text();
        this.appendChild(this.infoView);
    }

    onCreate() {
        // 页面创建
        this.info += "onCreate\n";
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
        this.info += "onDisappear\n";
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