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
        text.text = "pageD";        
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
        console.log("pageD -- onLoad");
        UnitTest.appendResult("pageD onLoad");
    }

    onAppear() {
        // 页面显示
        console.log("pageD -- onAppear");
        UnitTest.appendResult("pageD onAppear");
    }

    onDisappear() {
        // 页面隐藏
        console.log("pageD -- onDisappear");
        UnitTest.appendResult("pageD onDisappear");
    }

    onUnload() {
        // 页面销毁
        console.log("pageD -- onUnload");
        UnitTest.appendResult("pageD onUnload");

    }
}

Hummer.render(new RootView());