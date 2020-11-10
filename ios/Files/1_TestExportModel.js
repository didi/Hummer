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

        this.removeChild(v3);
        this.appendChild(v3);


        var model = new TestExportModel();
        model.map = {aaa: 111, bbb : {ccc : "tttt"}}
        model.style = {aaa: 111, bbb : {ccc : "tttt"}}
        model.text = "111";
        model.array = ["ccc", 111];
        model.floatValue = 0.3;
        var ret = model.getElementById("1111", 1, 1, {qqq: "111", zzz: 222}, ["wwww"]);
        console.log(ret);

        console.log("model = " + JSON.stringify(model));
        console.log("text = " + model.text);
        console.log("array = " + model.array);
        console.log("array2 = " + JSON.stringify(model.array));
        console.log("array[0] = " + model.array[0]);
        console.log("array[1] = " + model.array[1]);
        console.log("style = " + model.style);
        console.log("map = " + JSON.stringify(model.map));
        console.log("map.aaa = " + model.map.aaa);
        console.log("map.bbb = " + model.map.bbb);
        console.log("floatValue = " + model.floatValue);


        TestExportStaticModel.log("tttttttt");

        this.test = "testtttttt";
    }

    onTestBase(msg, b, d, i) {
        console.log("onTestBase, msg: " + msg + ", b: " + b + ", d: " + d + ", i: " + i);
    }

    onTestCollection(p1, p2) {
        console.log("onTestCollection, p1: " + JSON.stringify(p1) + ", p2: " + JSON.stringify(p2));
    }
}

Hummer.render(new RootView());