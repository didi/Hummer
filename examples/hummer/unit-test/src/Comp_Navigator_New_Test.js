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
        text.text = "点击开始测试，过程中不要进行任何操作";

        let btn1 = new Button();
        btn1.text = "Case1：A -> B -> C -> B -> A -> 首页"
        btn1.style = {
            marginTop: 10,
        };
        btn1.addEventListener('tap', (event) => {
            UnitTest.start("1");
            Navigator.push('./Comp_Navigator_New_Page1.js', {}, true, (channel)=>{
                channel.emit("pushB");
            });  
        });

        let btn2 = new Button();
        btn2.text = "Case2：A -> B -> C -> A -> 首页"
        btn2.style = {
            marginTop: 10,
        };
        btn2.addEventListener('tap', (event) => {
            UnitTest.start("2");
            Navigator.push('./Comp_Navigator_New_Page1.js', {}, true, (channel)=>{
                channel.emit("pushB");
            });  
        });


        let btn3 = new Button();
        btn3.text = "Case3：A -> B -> C -> 首页"
        btn3.style = {
            marginTop: 10,
        };
        btn3.addEventListener('tap', (event) => {
            UnitTest.start("3");
            Navigator.push('./Comp_Navigator_New_Page1.js', {}, true, (channel)=>{
                channel.emit("pushB");
            });  
        });


        let btn4 = new Button();
        btn4.text = "Case4：A -> B -> C -> 关闭C -> D -> 首页"
        btn4.style = {
            marginTop: 10,
        };
        btn4.addEventListener('tap', (event) => {
            UnitTest.start("4");
            Navigator.push('./Comp_Navigator_New_Page1.js', {}, true, (channel)=>{
                channel.emit("pushB");
            });  
        });

        let btn5 = new Button();
        btn5.text = "Case5：A -> B -> C -> 关闭C,B,A -> D -> 首页"
        btn5.style = {
            marginTop: 10,
        };
        btn5.addEventListener('tap', (event) => {
            UnitTest.start("5");
            Navigator.push('./Comp_Navigator_New_Page1.js', {}, true, (channel)=>{
                channel.emit("pushB");
            });  
        });

        this.appendChild(text);
        this.appendChild(btn1);
        this.appendChild(btn2);
        this.appendChild(btn3);
        this.appendChild(btn4);
        this.appendChild(btn5);

    }

    onCreate() {
        // 页面创建
        console.log("-- onCreate");
    }

    onAppear() {
        // 页面显示
        
        let testCase = UnitTest.getCase();
        if(testCase == '1'){
            this.checkCase1();
        }else  if(testCase == '2'){
            this.checkCase2();
        }else  if(testCase == '3'){
            this.checkCase3();
        }else  if(testCase == '4'){
            this.checkCase4();
        }else  if(testCase == '5'){
            this.checkCase5();
        }
        console.log("-- onAppear");
    }

    onDisappear() {
        // 页面隐藏
        console.log("-- onDisappear");
    }

    onDestroy() {
        // 页面销毁
        console.log("-- onDestroy");
    }

    checkCase1(){
        let array = UnitTest.getResult();
        console.log("checkCase1 array",array);
        let expectArray = [
        'pageA onLoad',
        'pageA onAppear',
        'pageA onDisappear',
        'pageB onLoad',
        'pageB onAppear',
        'pageB onDisappear',
        'pageC onLoad',
        'pageC onAppear',
        'pageC onDisappear',
        'pageC onUnload',
        'pageB onAppear',
        'pageB onDisappear',
        'pageB onUnload',
        'pageA onAppear',
        'pageA onDisappear',
        'pageA onUnload'];

        let idx = 0;
        let passed = array.every((ele, index, arr)=>{
            idx = index;
            return ele == expectArray[index];
        })
        if(!passed){
        // 显示提示对话框
            let dialog = new Dialog();
            let content = array[idx] + '不满足期望' + expectArray[idx];
            dialog.alert("Case1未通过", content, () => {
            });
        }else{
            Toast.show('Case1 Passed!!');
        }
    }
    checkCase2(){
        let array = UnitTest.getResult();
        console.log("checkCase1 array",array);
        let expectArray = [
        'pageA onLoad',
        'pageA onAppear',
        'pageA onDisappear',
        'pageB onLoad',
        'pageB onAppear',
        'pageB onDisappear',
        'pageC onLoad',
        'pageC onAppear',
        'pageC onDisappear',
        'pageC onUnload',
        'pageB onUnload',
        'pageA onAppear',
        'pageA onDisappear',
        'pageA onUnload'];

        let idx = 0;
        let passed = array.every((ele, index, arr)=>{
            idx = index;
            return ele == expectArray[index];
        })
        if(!passed){
        // 显示提示对话框
            let dialog = new Dialog();
            let content = array[idx] + '不满足期望' + expectArray[idx];
            dialog.alert("Case2未通过", content, () => {
            });
        }else{
            Toast.show('Case2 Passed!!');
        }
    }
    checkCase3(){
        let array = UnitTest.getResult();
        console.log("checkCase1 array",array);
        let expectArray = [
        'pageA onLoad',
        'pageA onAppear',
        'pageA onDisappear',
        'pageB onLoad',
        'pageB onAppear',
        'pageB onDisappear',
        'pageC onLoad',
        'pageC onAppear',
        'pageC onDisappear',
        'pageC onUnload',
        'pageB onUnload',
        'pageA onUnload'];

        let idx = 0;
        let passed = array.every((ele, index, arr)=>{
            idx = index;
            return ele == expectArray[index];
        })
        if(!passed){
        // 显示提示对话框
            let dialog = new Dialog();
            let content = array[idx] + '不满足期望' + expectArray[idx];
            dialog.alert("Case3未通过", content, () => {
            });
        }else{
            Toast.show('Case3 Passed!!');
        }
    }
    checkCase4(){
        let array = UnitTest.getResult();
        console.log("checkCase1 array",array);
        let expectArray = [
        'pageA onLoad',
        'pageA onAppear',
        'pageA onDisappear',
        'pageB onLoad',
        'pageB onAppear',
        'pageB onDisappear',
        'pageC onLoad',
        'pageC onAppear',
        'pageC onDisappear',
        'pageC onUnload',
        'pageD onLoad',
        'pageD onAppear',
        'pageD onDisappear',
        'pageD onUnload',
        'pageB onUnload',
        'pageA onUnload'];

        let idx = 0;
        let passed = array.every((ele, index, arr)=>{
            idx = index;
            return ele == expectArray[index];
        })
        if(!passed){
        // 显示提示对话框
            let dialog = new Dialog();
            let content = array[idx] + '不满足期望' + expectArray[idx];
            dialog.alert("Case3未通过", content, () => {
            });
        }else{
            Toast.show('Case3 Passed!!');
        }
    }
    checkCase4(){
        let array = UnitTest.getResult();
        console.log("checkCase4 array",array);
        let expectArray = [
        'pageA onLoad',
        'pageA onAppear',
        'pageA onDisappear',
        'pageB onLoad',
        'pageB onAppear',
        'pageB onDisappear',
        'pageC onLoad',
        'pageC onAppear',
        'pageC onDisappear',
        'pageC onUnload',
        'pageD onLoad',
        'pageD onAppear',
        'pageD onDisappear',
        'pageD onUnload',
        'pageB onUnload',
        'pageA onUnload'];

        let idx = 0;
        let passed = array.every((ele, index, arr)=>{
            idx = index;
            return ele == expectArray[index];
        })
        if(!passed){
        // 显示提示对话框
            let dialog = new Dialog();
            let content = array[idx] + '不满足期望' + expectArray[idx];
            dialog.alert("Case3未通过", content, () => {
            });
        }else{
            Toast.show('Case3 Passed!!');
        }
    }
    checkCase5(){
        let array = UnitTest.getResult();
        console.log("checkCase4 array",array);
        let expectArray = [
        'pageA onLoad',
        'pageA onAppear',
        'pageA onDisappear',
        'pageB onLoad',
        'pageB onAppear',
        'pageB onDisappear',
        'pageC onLoad',
        'pageC onAppear',
        'pageC onDisappear',
        'pageC onUnload',
        'pageB onUnload',
        'pageA onUnload',
        'pageD onLoad',
        'pageD onAppear',
        'pageD onDisappear',
        'pageD onUnload',];

        let idx = 0;
        let passed = array.every((ele, index, arr)=>{
            idx = index;
            return ele == expectArray[index];
        })
        if(!passed){
        // 显示提示对话框
            let dialog = new Dialog();
            let content = array[idx] + '不满足期望' + expectArray[idx];
            dialog.alert("Case3未通过", content, () => {
            });
        }else{
            Toast.show('Case3 Passed!!');
        }
    }
}

Hummer.render(new RootView());