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
        text.text = "Page 3";

        let btn1 = new Button();
        btn1.text = "go to root"
        btn1.style = {
            marginTop: 50,
        };
        btn1.addEventListener('tap', (event) => {
            Navigator.pop(3, true, ()=>{}, (fail)=>{
                console.log('page3 pop2 fail' + JSON.stringify(fail));
            });
        });

        let btn2 = new Button();
        btn2.text = "popPage"
        btn2.addEventListener('tap', (event) => {
            this.popB();
        });

        let btn3 = new Button();
        btn3.text = "replace page3"
        btn3.addEventListener('tap', (event) => {
            Navigator.replace('./Comp_Navigator_New_Page3.js',3, true);
        });

        this.appendChild(text);
        this.appendChild(btn1);
        this.appendChild(btn2);
        this.appendChild(btn3);

        console.log('Page info: ' + JSON.stringify(Hummer.pageInfo));

        Hummer.pageResult = {
            key1: 333.3,
            key2: "444"
        };
    }
    pop(cnt){
        Navigator.pop(cnt, true, ()=>{
            let channel = Hummer.getOpenerEventChannel();
            let testCase = Memory.get("testCase");
            if(testCase == '1'){
                channel.emit("popA");
            }else if(testCase == '2'){
                Navigator.pop(10, true)
            }else if(testCase == '3'){
                Navigator.pop(10, true)
            }
        }, (fail)=>{
            console.log('pageC popB fail' + JSON.stringify(fail));
        });
    }

    replace(cnt){
        Navigator.replace('./Comp_Navigator_New_Page4.js' ,cnt, true, ()=>{
            let channel = Hummer.getOpenerEventChannel();
            let testCase = Memory.get("testCase");
            if(testCase == '1'){
                channel.emit("popA");
            }else if(testCase == '2'){
                Navigator.pop(10, true)
            }else if(testCase == '3'){
                Navigator.pop(10, true)
            }
        }, (fail)=>{
            console.log('pageC popB fail' + JSON.stringify(fail));
        });
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

        let channel = Hummer.getOpenerEventChannel();
        channel.on("popOrReplace",()=>{
            console.log("trigger popOrReplace")
            let testCase = Memory.get("testCase");
            if(testCase == '1'){
                this.pop(1);
            }else if(testCase == '2'){
                this.pop(2);
            }else if(testCase == '3'){
                this.pop(3);
            }else if(testCase == '4'){
                setTimeout(() => {
                    this.replace(1);
                }, 0);
            }else if(testCase == '5'){
                setTimeout(() => {
                    this.replace(3);
                }, 0);
            }
        })
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