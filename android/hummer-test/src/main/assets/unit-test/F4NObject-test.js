(function() {
    // 代码

    function create(){
        console.info("JS::create()");
        var t1 = createObject("Test-1",{w:10,H:331});
        var t2 = createObject("Test-2",{w:10,H:332});
        var t3 = createObject("Test-3",{w:10,H:333});


        if (globalThis.test3 == undefined){
            console.info("JS::test3 is undefined.");
            globalThis.test3= t3;
        }

//        if (t1 == undefined){
//          var t1 = createObject("Test-10",{w:10,H:331});
//        }

//        globalThis.test1= t1;
//        globalThis.test2= t2;
//        globalThis.test3= t3;

    }

    create();
//    globalThis.test3= undefined;
})();