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
        text.text = "Page 1";

        let btn1 = new Button();
        btn1.text = "go to PageB"
        btn1.style = {
            marginTop: 50,
        };

        btn1.addEventListener('tap', (event) => {           
            this.pushB();
        });

        let btn2 = new Button();
        btn2.text = "popPage"
        btn2.addEventListener('tap', (event) => {
            Navigator.pop(1, true, ()=>{}, (fail)=>{
                console.log('page1 pop1 fail' + JSON.stringify(fail));
            });        
        });

        this.appendChild(text);
        this.appendChild(btn1);
        this.appendChild(btn2);
    }
    pushB(){

        Navigator.push('./Comp_Navigator_New_Page2.js', {"pop":()=>{
        
            console.log("trigger pageA pop event")
            this.pop(1)
        }}, true, (channel)=>{
            channel.emit("pushC");
        },(fail)=>{
            console.log("pageA push PageB fail", fail)
        });     
    }
    pop(cnt){
        Navigator.pop(cnt, true, ()=>{}, (fail)=>{
            console.log("pageA pop fail", fail)
        });
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

        let channel = Hummer.getOpenerEventChannel();
        channel.on("pushB",()=>{
                
            console.log("trigger pushB")            
            this.pushB();
        })
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