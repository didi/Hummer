class RootView extends View {
    initialize() {
        console.log("Hummer.params = " + JSON.stringify(Hummer.params));

        let v1 = new View();
        v1.style = {
            height: 300,
            width: 300,
            backgroundColor: "#FF7A45"
        };
        this.appendChild(v1);

        let v2 = new View();
        v2.style = {
            position: 'absolute',
            height: 200,
            width: 200,
            backgroundColor: "#BBBBBB"
        };
        this.appendChild(v2);

        let v3 = new View();
        v3.style = {
            position: 'absolute',
            height: 100,
            width: 100,
            backgroundColor: "#CCCCCC"
        };
        this.appendChild(v3);

//        this.removeChild(v3);
//        this.appendChild(v3);


        var model = new TestExportModel({qqq: 111}, true, 1.1, 2, {v1: 111, v2: 22.2, v3: '333'}, (aa, bb) => {
            console.log('-- callback aa: ' + aa + ", bb: " + bb);
        });
        model.map = {aaa: 111, bbb : {ccc : "tttt"}}
        model.style = {aaa: 111, bbb : {ccc : "tttt"}}
        model.text = "111";
        model.array = ["ccc", 111];
        model.floatValue = 0.3;
        var ret = model.getElementById("1111", 1, 1, {qqq: "111", zzz: 222}, ["wwww"], {v1: 111, v2: 22.2, v3: '333'});
        console.log(ret);

        console.log("text = " + model.text);
        console.log("array = " + model.array);
        console.log("array[0] = " + model.array[0]);
        console.log("style = " + JSON.stringify(model.style));
        console.log("map = " + JSON.stringify(model.map));
        console.log("map.aaa = " + model.map.aaa);
        console.log("map.bbb = " + model.map.bbb);
        console.log("floatValue = " + model.floatValue);

        let ret2 = model.testObject(true);
        console.log("testObject ret2 = " + ret2);


        TestExportStaticModel.log("tttttttt");
    }
}

Hummer.render(new RootView());