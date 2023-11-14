import UnitTest from "./navigatorTest/unitTest"

class RootView extends View {
    constructor() {
        super();

        this.style = {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        }

        let text = new Text();
        text.text = "pageB";        
        this.appendChild(text);
        this.text = text;
    }

    onCreate() {
        // 页面创建
        console.log("-- onCreate");
        let channel = Hummer.getOpenerEventChannel(); 
        channel.on("setTitle",(title)=>{
            this.text = title;
        })

    }

    onLoad() {
        // 页面创建
        console.log("pageB -- onLoad");
        UnitTest.appendResult("pageB onLoad");
    }

    onAppear() {
        // 页面显示
        console.log("pageB -- onAppear");
        UnitTest.appendResult("pageB onAppear");
    }

    onDisappear() {
        // 页面隐藏
        console.log("pageB -- onDisappear");
        UnitTest.appendResult("pageB onDisappear");
    }

    onUnload() {
        // 页面销毁
        console.log("pageB -- onUnload");
        UnitTest.appendResult("pageB onUnload");

    }
}

Hummer.render(new RootView());