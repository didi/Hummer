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
        text.text = "pageC";        
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
        console.log("pageC -- onLoad");
        UnitTest.appendResult("pageC onLoad");
    }

    onAppear() {
        // 页面显示
        console.log("pageC -- onAppear");
        UnitTest.appendResult("pageC onAppear");
    }

    onDisappear() {
        // 页面隐藏
        console.log("pageC -- onDisappear");
        UnitTest.appendResult("pageC onDisappear");
    }

    onUnload() {
        // 页面销毁
        console.log("pageC -- onUnload");
        UnitTest.appendResult("pageC onUnload");

    }
}

Hummer.render(new RootView());