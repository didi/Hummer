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
        text.text = "pageA";        
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
        console.log("pageA -- onLoad");
        UnitTest.appendResult("pageA onLoad");
    }

    onAppear() {
        // 页面显示
        console.log("pageA -- onAppear");
        UnitTest.appendResult("pageA onAppear");
    }

    onDisappear() {
        // 页面隐藏
        console.log("pageA -- onDisappear");
        UnitTest.appendResult("pageA onDisappear");
    }

    onUnload() {
        // 页面销毁
        console.log("pageA -- onUnload");
        UnitTest.appendResult("pageA onUnload");

    }
}

Hummer.render(new RootView());