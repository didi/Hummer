import UnitTest from "./navigatorTest/unitTest"
const PageAURL = "Unit_Test_PageA.js"
const PageBURL = "Unit_Test_PageB.js"
const PageCURL = "Unit_Test_PageC.js"
const PageDURL = "Unit_Test_PageD.js"

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
            this.testCase1();
        });

        let btn2 = new Button();
        btn2.text = "Case2：A -> B -> C -> A -> 首页"
        btn2.style = {
            marginTop: 10,
        };
        btn2.addEventListener('tap', (event) => {
            this.testCase2();  
        });


        let btn3 = new Button();
        btn3.text = "Case3：A -> B -> C -> 首页"
        btn3.style = {
            marginTop: 10,
        };
        btn3.addEventListener('tap', (event) => {
            this.testCase3();

        });


        let btn4 = new Button();
        btn4.text = "Case4：A -> B -> C -> 关闭C -> D -> 首页"
        btn4.style = {
            marginTop: 10,
        };
        btn4.addEventListener('tap', (event) => {
            this.testCase4();
        });

        let btn5 = new Button();
        btn5.text = "Case5：A -> B -> C -> 关闭C,B,A -> D -> 首页"
        btn5.style = {
            marginTop: 10,
        };
        btn5.addEventListener('tap', (event) => {
            this.testCase5();
        });

        let btn6 = new Button();
        btn6.text = "Case6：异常跳转"
        btn6.style = {
            marginTop: 10,
        };
        btn6.addEventListener('tap', (event) => {
            this.testCase6() 
        });

        let btn7 = new Button();
        btn7.text = "Case7：push参数检查"
        btn7.style = {
            marginTop: 10,
        };
        btn7.addEventListener('tap', (event) => {
            this.testCase7() 
        });
        let btn8 = new Button();
        btn8.text = "Case8：pop参数检查"
        btn8.style = {
            marginTop: 10,
        };
        btn8.addEventListener('tap', (event) => {
            this.testCase8() 
        });

        let btn9 = new Button();
        btn9.text = "Case9：replace参数检查"
        btn9.style = {
            marginTop: 10,
        };
        btn9.addEventListener('tap', (event) => {
            this.testCase9() 
        });

        this.appendChild(text);
        this.appendChild(btn1);
        this.appendChild(btn2);
        this.appendChild(btn3);
        this.appendChild(btn4);
        this.appendChild(btn5);
        this.appendChild(btn6);
        this.appendChild(btn7);
        this.appendChild(btn8);
        this.appendChild(btn9);


    }

    onCreate() {
        // 页面创建
        console.log("-- onCreate");
    }

    onAppear() {
        // 页面显示
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

    testCase1(){
        UnitTest.start("1");
            if(!this.checkPages([])){return}
            Navigator.push('./Unit_Test_PageA.js', {}, true, (channel)=>{
                channel.emit("setTitle", "PageA");
                if(!this.checkPages([PageAURL])){return}
                
                Navigator.push('./Unit_Test_PageB.js', {}, true, (channel)=>{
                    channel.emit("setTitle", "PageB");
                    if(!this.checkPages([PageAURL, PageBURL])){return}

                    Navigator.push('./Unit_Test_PageC.js', {}, true, (channel)=>{
                        channel.emit("setTitle", "PageC");
                        if(!this.checkPages([PageAURL, PageBURL, PageCURL])){return}

                        Navigator.pop(1, true, ()=>{
                            if(!this.checkPages([PageAURL, PageBURL])){return}
                            Navigator.pop(1, true, ()=>{
                                if(!this.checkPages([PageAURL])){return}
                                Navigator.pop(1, true, ()=>{
                                    if(!this.checkPages([])){return}
                                    this.checkCase1();
                                },this.pushPopReplaceFailed);
                            },this.pushPopReplaceFailed);
                        },this.pushPopReplaceFailed);
                    }, this.pushPopReplaceFailed)
                }, this.pushPopReplaceFailed)
            }, this.pushPopReplaceFailed);  
    }
    testCase2(){
        UnitTest.start("2");
            if(!this.checkPages([])){return}
            Navigator.push('./Unit_Test_PageA.js', {}, true, (channel)=>{
                channel.emit("setTitle", "PageA");
                if(!this.checkPages([PageAURL])){return}
                
                Navigator.push('./Unit_Test_PageB.js', {}, true, (channel)=>{
                    channel.emit("setTitle", "PageB");
                    if(!this.checkPages([PageAURL, PageBURL])){return}

                    Navigator.push('./Unit_Test_PageC.js', {}, true, (channel)=>{
                        channel.emit("setTitle", "PageC");
                        if(!this.checkPages([PageAURL, PageBURL, PageCURL])){return}

                        Navigator.pop(2, true, ()=>{
                            if(!this.checkPages([PageAURL])){return}
                            Navigator.pop(1, true, ()=>{
                                if(!this.checkPages([])){return}
                                    this.checkCase2();
                            }, (fail)=>{
                                console.log('page3 pop2 fail' + JSON.stringify(fail));
                            });
                        }, (fail)=>{
                            console.log('page3 pop2 fail' + JSON.stringify(fail));
                        });
                    })
                })
            });  
    }
    testCase3(){
        UnitTest.start("3");
            if(!this.checkPages([])){return}
            Navigator.push('./Unit_Test_PageA.js', {}, true, (channel)=>{
                channel.emit("setTitle", "PageA");
                if(!this.checkPages([PageAURL])){return}
                
                Navigator.push('./Unit_Test_PageB.js', {}, true, (channel)=>{
                    channel.emit("setTitle", "PageB");
                    if(!this.checkPages([PageAURL, PageBURL])){return}

                    Navigator.push('./Unit_Test_PageC.js', {}, true, (channel)=>{
                        channel.emit("setTitle", "PageC");
                        if(!this.checkPages([PageAURL, PageBURL, PageCURL])){return}

                        Navigator.pop(3, true, ()=>{
                            if(!this.checkPages([])){return}
                            this.checkCase3();
                        }, (fail)=>{
                            console.log('page3 pop2 fail' + JSON.stringify(fail));
                        });
                    })
                })
            });  
    }
    testCase4(){
        UnitTest.start("4");
        UnitTest.start("5");
        let timeout = new Promise((resolve, reject)=>{
            setTimeout(() => {
                reject("timeout");
            }, 5000);
        });      
        let promise = new Promise((resolve, reject)=>{
            if(!this.checkPages([])){
                reject();
                return;
            }
            Navigator.push('./Unit_Test_PageA.js', {}, true, (channel)=>{
                if(!this.checkPages([PageAURL])){
                    reject();
                    return;
                }
                resolve();
            },(fail)=>{
                reject("pushA fail，reason:"+JSON.stringify(fail));
            });  
        }).then(()=>{
            return new Promise((resolve, reject)=>{
                Navigator.push('./Unit_Test_PageB.js', {}, true, (channel)=>{
                    if(!this.checkPages([PageAURL, PageBURL])){
                        reject();
                        return;
                    }
                    resolve();
                },(fail)=>{
                    reject("pushB fail，reason:"+JSON.stringify(fail));
                })
            })            
        }).then(()=>{
            return new Promise((resolve, reject)=>{
                Navigator.push('./Unit_Test_PageC.js', {}, true, (channel)=>{
                    if(!this.checkPages([PageAURL, PageBURL, PageCURL])){
                        reject();
                        return;
                    }
                    resolve();
                },(fail)=>{
                    reject("pushC fail，reason:"+JSON.stringify(fail));
                })            
            })
        }).then(()=>{
            return new Promise((resolve, reject)=>{
                Navigator.replace('./Unit_Test_PageD.js' , 1, true, ()=>{
                    if(!this.checkPages([PageAURL, PageBURL, PageDURL])){
                        reject();
                        return;
                    }
                    resolve()
                }, (fail)=>{
                    reject("replaceD fail，reason:"+JSON.stringify(fail));
                });
            });
        }).then(()=>{
            return new Promise((resolve, reject)=>{                            
                Navigator.pop(99, true, ()=>{
                    if(!this.checkPages([])){
                        reject();
                        return;
                    }
                    resolve()
                }, (fail)=>{
                    reject("pop fail，reason:"+JSON.stringify(fail));
                });
            });
        })
        Promise.race([timeout, promise]).then((value) => {
            this.checkCase4()  
        }).catch((e)=>{
            if(e == "timeout"){
                this.showDialog("case4失败", "有未触发的回调事件");                                          
            }else if(e){
                this.showDialog("case4失败",e);
            }
        });               
    }
    testCase5(){
        UnitTest.start("5");
        let timeout = new Promise((resolve)=>{
            setTimeout(() => {
                resolve("timeout");
            }, 5000);
        });      
        let promise = new Promise((resolve, reject)=>{
            if(!this.checkPages([])){
                reject();
                return;
            }
            Navigator.push('./Unit_Test_PageA.js', {}, true, (channel)=>{
                if(!this.checkPages([PageAURL])){
                    reject();
                    return;
                }
                resolve();
            },(fail)=>{
                reject("pushA fail，reason:"+JSON.stringify(fail));
            });  
        }).then(()=>{
            return new Promise((resolve, reject)=>{
                Navigator.push('./Unit_Test_PageB.js', {}, true, (channel)=>{
                    if(!this.checkPages([PageAURL, PageBURL])){
                        reject();
                        return;
                    }
                    resolve();
                },(fail)=>{
                    reject("pushB fail，reason:"+JSON.stringify(fail));
                })
            })            
        }).then(()=>{
            return new Promise((resolve, reject)=>{
                Navigator.push('./Unit_Test_PageC.js', {}, true, (channel)=>{
                    if(!this.checkPages([PageAURL, PageBURL, PageCURL])){
                        reject();
                        return;
                    }
                    resolve();
                },(fail)=>{
                    reject("pushC fail，reason:"+JSON.stringify(fail));
                })            
            })
        }).then(()=>{
            return new Promise((resolve, reject)=>{
                Navigator.replace('./Unit_Test_PageD.js' , 3, true, ()=>{
                    if(!this.checkPages([PageDURL])){
                        reject();
                        return;
                    }
                    resolve()
                }, (fail)=>{
                    reject("replaceD fail，reason:"+JSON.stringify(fail));
                });
            });
        }).then(()=>{
            return new Promise((resolve, reject)=>{                            
                Navigator.pop(99, true, ()=>{
                    if(!this.checkPages([])){
                        reject();
                        return;
                    }
                    resolve()
                }, (fail)=>{
                    console.log('page3 pop2 fail' + JSON.stringify(fail));
                });
            });
        }).then(()=>{
            return new Promise((resolve, reject)=>{     
                if(this.checkCase5()){
                    resolve();
                }else{
                    reject();
                }                            
            });
        }).catch((e)=>{
            if(e){
                this.showDialog("case5失败",e);                                          
            }
        })
        Promise.race([timeout, promise]).then((value) => {
            if(value == "timeout"){
                this.showDialog("case5失败", "有未触发的回调事件");                                          
           }
        });           
    }
    /// 连续跳转
    testCase6(){
        UnitTest.start("6");        
        if(!this.checkPages([])){return}
        let exceptionCnt = 0;
        let res = ()=>{
            exceptionCnt++;
            if(exceptionCnt == 4){
                this.checkCase6();
            }
            if(exceptionCnt > 4){
                this.showDialog("case6失败","回调次数异常");                                          
            }
        }
        Navigator.push('./Unit_Test_PageA.js', {}, true, (channel)=>{
            if(!this.checkPages([PageAURL])){return}
            Navigator.pop(3, true, ()=>{
                if(!this.checkPages([])){return}
                res();                     
            }, (fail)=>{
                this.showDialog("case6失败","页面返回失败");                                          
            });
        },(fail)=>{
            this.showDialog("case6失败","连续两次操作导航，第一次应当成功");                                          
        });
        Navigator.push('./Unit_Test_PageB.js', {}, true, (channel)=>{
            if(!this.checkPages([PageAURL])){return}
            this.showDialog("case6失败","连续多次操作导航，第二次应当失败，并返回 errno = 1003000");                                          
        },(fail)=>{
            if(fail && fail.errno == 1003000){
                res();                     
            }else{
                this.showDialog("case6失败","push 失败回调 errno 应当为 1003000，当前为"+JSON.stringify(fail));
            }
        });  

        Navigator.pop(3, true, ()=>{
            this.showDialog("case6失败","连续多次操作导航，第二次应当失败，并返回 errno = 1003000");        
        }, (fail)=>{
            if(fail && fail.errno == 1003000){
                res();                     
            }else{
                this.showDialog("case6失败","pop 失败回调 errno 应当为 1003000，当前为"+JSON.stringify(fail));
            }
        });

        Navigator.replace('./Unit_Test_PageB.js', 3, true, ()=>{
            this.showDialog("case6失败","连续多次操作导航，第二次应当失败，并返回 errno = 1003000");        
        }, (fail)=>{
            if(fail && fail.errno == 1003000){
                res();                     
            }else{
                this.showDialog("case6失败","replace 失败回调 errno 应当为 1003000，当前为"+JSON.stringify(fail));
            }
        });
    }
     /// push 参数检测
     testCase7(){
        UnitTest.start("7");  
        let timeout = new Promise((resolve)=>{
            setTimeout(() => {
                resolve("timeout");
            }, 2000);
        });      
        let promise = new Promise((resolve, reject)=>{
            Navigator.push('./Unit_Test_PageA', {}, true, (channel)=>{
                reject("不应触发成功回调");
            },(fail)=>{
                if(fail && fail.errno == 1003000){
                    resolve();
                }else{
                    reject("无法创建容器应返回 errno 应当为 1003000，当前为"+JSON.stringify(fail));
                }
            });
        }).then(()=>{
            return new Promise((resolve, reject)=>{
                Navigator.push(null, {}, 2, (channel)=>{
                    reject("不应触发成功回调");
                },(fail)=>{
                    if(fail && fail.errno == 1000000){
                        resolve();
                    }else{
                        reject("无法创建容器应返回 errno 应当为 1000000"+JSON.stringify(fail));
                    }
                });
            })           
        }).then(()=>{
            Toast.show('case7 passed!');
        }).catch((msg)=>{
            this.showDialog("case7失败", msg);                                          
        })
        Promise.race([timeout, promise]).then((value) => {
            if(value == "timeout"){
                this.showDialog("case9失败", "有未触发的回调事件");                                          
           }
        });
    }
    /// pop 参数检测
    testCase8(){
        UnitTest.start("8"); 
        let timeout = new Promise((resolve)=>{
            setTimeout(() => {
                resolve("timeout");
            }, 2000);
        });           
        let promise = new Promise((resolve, reject)=>{
            Navigator.pop(3, true, ()=>{
                reject("仅剩一个容器，期望为无法pop，并返回 errno = 1003000")
            }, (fail)=>{
                if(fail && fail.errno == 1003000){
                    resolve();
                }else{
                    reject("仅剩一个容器无法pop，应返回 errno 应当为 1003000，当前为"+JSON.stringify(fail));
                }
            });        
        }).then(()=>{
            return new Promise((resolve, reject)=>{
                Navigator.pop("2", true, ()=>{
                    reject("delta参数不为number，期望为无法pop，并返回 errno = 1000000")
                }, (fail)=>{
                    if(fail && fail.errno == 1000000){
                        resolve();
                    }else{
                        reject("pop失败，应返回 errno = 1000000，当前为"+JSON.stringify(fail))
                    }
                });
            });            
        }).then(()=>{
            Toast.show('case8 passed!');
        }).catch((msg)=>{
            this.showDialog("case8失败", msg);                                          
        })
        Promise.race([timeout, promise]).then((value) => {
            if(value == "timeout"){
                this.showDialog("case9失败", "有未触发的回调事件");                                          
           }
        });
    }
    /// replace 参数检测
    testCase9(){
        UnitTest.start("7");      
        let timeout = new Promise((resolve)=>{
            setTimeout(() => {
                resolve("timeout");
            }, 2000);
        });
        let promise = new Promise((resolve, reject)=>{
            Navigator.replace('./Unit_Test_PageD' ,1, true, ()=>{
                reject("不应触发成功回调");
            },(fail)=>{
                if(fail && fail.errno == 1003000){
                    resolve();
                }else{
                    reject("无法创建容器或无hummer栈标记，应返回 errno 应当为 1003000，当前为"+JSON.stringify(fail));
                }
            });
        }).then(()=>{
            return new Promise((resolve, reject)=>{
                Navigator.replace(null ,1, true, ()=>{
                    reject("不应触发成功回调");
                },(fail)=>{
                    if(fail && fail.errno == 1000000){
                        resolve();
                    }else{
                        reject("url 参数不合法，errno 应当为 1000000"+JSON.stringify(fail));
                    }
                });
            })           
        }).then(()=>{
            return new Promise((resolve, reject)=>{
                Navigator.replace('./Unit_Test_PageD' , '2', true, ()=>{
                    reject("不应触发成功回调");
                },(fail)=>{
                    if(fail && fail.errno == 1000000){
                        resolve();
                    }else{
                        reject("delta 参数不合法，errno 应当为 1000000"+JSON.stringify(fail));
                    }
                });
            })           
        }).then(()=>{
            Toast.show('case9 passed!');
        }).catch((msg)=>{
            this.showDialog("case7失败", msg);                                          
        })
        Promise.race([timeout, promise]).then((value) => {
           if(value == "timeout"){
                this.showDialog("case9失败", "有未触发的回调事件");                                          
           }
        });
    }
    checkCase1(){
        let array = UnitTest.getResult();
        console.log("专项测试case1 array",array);
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
        console.log("专项测试case2 array",array);
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
        console.log("专项测试case3 array",array);
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
        console.log("专项测试case4 array",array);
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
            dialog.alert("Case4未通过", content, () => {
            });
        }else{
            Toast.show('Case4 Passed!!');
        }
        return passed
    }
    checkCase5(){
        let array = UnitTest.getResult();
        console.log("专项测试case5 array",array);
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
            let content = array[idx] + '不满足期望' + expectArray[idx];
            this.showDialog("Case5未通过",content)
        }else{
            Toast.show('Case5 Passed!!');
        }
        return passed
    }
    checkCase6(){
        let array = UnitTest.getResult();
        console.log("checkCase6 array",array);
        let expectArray = [
        'pageA onLoad',
        'pageA onAppear',
        'pageA onDisappear',
        'pageA onUnload',];

        let idx = 0;
        let passed = array.every((ele, index, arr)=>{
            idx = index;
            return ele == expectArray[index];
        })
        if(!passed){
        // 显示提示对话框
            let content = array[idx] + '不满足期望' + expectArray[idx];
            this.showDialog("Case6未通过",content)
        }else{
            Toast.show('Case6 Passed!!');
        }
    }

    checkPages(expectPages){
        let array = Navigator.getPages();
        let idx = 0;
        let url = undefined;
        let expectUrl = undefined;
        let passed = array.every((ele, index, arr)=>{
            expectUrl = expectPages[index];
            url = ele.url;
            return url.endsWith(expectUrl)
        })
        if(!passed){
        // 显示提示对话框
            let content = url + '不满足期望' + expectUrl;
            this.showDialog("checkPages 未通过",content)
        }
        return passed
    }
    pushPopReplaceFailed(fail){
        let content = JSON.stringify(fail);
        let dialog = new Dialog();            
            dialog.alert("跳转失败", content, () => {
        });
    }
    showDialog(title, msg){
        let dialog = new Dialog();
        dialog.confirm(title, msg);
    }
}

Hummer.render(new RootView());