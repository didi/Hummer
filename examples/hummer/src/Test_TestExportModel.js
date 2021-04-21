class RootView extends View {
    constructor() {
        super();
        console.log("Hummer.params = " + JSON.stringify(Hummer.params));

        let v = new View();
        v.style = {
            height: 300,
            width: 300,
            backgroundColor: "#FF7A45"
        };
        this.appendChild(v);

        var m = new TestExportModel(1, 2, 3.4, true, {a: 1, b: {c: 'd'}}, [11, "ab"], {v1: 11, v2: 2.2, v3: 'cc'}, (a, b, c, d) => {
            console.log('TestExportModel callback a: ' + a + ", b: " + b + ", c: " + c + ", d: " + d);
        });
        m.floatValue = 1.1;
        m.mapValue = {a: 1, b: {c: "d"}};
        m.listValue = [11, "ab"];
        m.modelValue = {v1: 11, v2: 2.2, v3: 'cc'};

        console.log("floatValue = " + m.floatValue);
        console.log("mapValue = " + JSON.stringify(m.mapValue));
        console.log("listValue = " + JSON.stringify(m.listValue));
        console.log("modelValue = " + JSON.stringify(m.modelValue));

        let ret = m.doFunc(1, 2, 3.4, true, {a: 1, b: {c: 'd'}}, [11, "ab"], {v1: 11, v2: 2.2, v3: 'cc'}, () => {return 'call result'});
        console.log("doFunc ret = " + ret);


        TestExportStaticModel.log("tttttttt");
    }
}

Hummer.render(new RootView());