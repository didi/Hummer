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
        text.text = "Page 2";

        let btn1 = new Button();
        btn1.text = "go to Page3"
        btn1.style = {
            marginTop: 50,
        };
        btn1.addEventListener('tap', (event) => {

            this.pushC();
        });

        let btn2 = new Button();
        btn2.text = "popPage"
        btn2.addEventListener('tap', (event) => {
            Navigator.pop(1, true, ()=>{}, (fail)=>{
                console.log('page2 pop1 fail' + JSON.stringify(fail));
            });
        });


        let obj = Memory.get("key1");
        console.log("obj", obj);
        this.appendChild(text);
        this.appendChild(btn1);
        this.appendChild(btn2);

        console.log('Page info: ' + JSON.stringify(Hummer.pageInfo));

        Hummer.pageResult = {
            key1: 111.1,
            key2: "222"
        };
    }
    popA(){
        Navigator.pop(1, true, ()=>{
            console.log("trigger pageB popA event")
            let channel = Hummer.getOpenerEventChannel(); 
            channel.emit("pop")
        }, (fail)=>{
            console.log('pageB popA fail' + JSON.stringify(fail));
        });
    }
    pushC(){

        Navigator.push('./Comp_Navigator_New_Page3.js', {"popA":()=>{     

            this.popA();   
        }}, true, (channel)=>{
            channel.emit("popOrReplace");
        });     
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


        let channel = Hummer.getOpenerEventChannel();
        channel.on("pushC",()=>{
            console.log("trigger pushC")
            this.pushC();
        })
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