class RootView extends View {
    constructor() {
        super();
        console.log("Hummer.params = " + JSON.stringify(Hummer.params));

        this.style = {
            width: '100%',
            height: '100%',
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
        };

        let textInfo = "";
        let textView = new Text();
        this.appendChild(textView);

        var m = new TestExportModel(1, 2, 3.4, true, {
            a: 1,
            b: {
                c: 'd'
            }
        }, [11, "ab"], {
            v1: 11,
            v2: 2.2,
            v3: 'cc'
        }, (a, b, c, d) => {
            console.log('TestExportModel callback a: ' + a + ", b: " + b + ", c: " + c + ", d: " + d);
        });
        m.floatValue = 1.1;
        m.mapValue = {
            a: 1,
            b: {
                c: "d"
            }
        };
        m.listValue = [11, "ab"];
        m.modelValue = {
            v1: 11,
            v2: 2.2,
            v3: 'cc'
        };

        console.log("floatValue = " + m.floatValue);
        console.log("mapValue = " + JSON.stringify(m.mapValue));
        console.log("listValue = " + JSON.stringify(m.listValue));
        console.log("modelValue = " + JSON.stringify(m.modelValue));

        textInfo += "m = " + JSON.stringify(m) + "\n\n";

        let ret = m.doFunc(1, 2, 3.4, true, {
            a: 1,
            b: {
                c: 'd'
            }
        }, [11, "ab"], {
            v1: 11,
            v2: 2.2,
            v3: 'cc'
        }, () => {
            return 'call result'
        });
        console.log("doFunc ret = " + ret);

        textInfo += "doFunc ret = " + ret + "\n\n";
        textView.text = textInfo;


        TestExportStaticModel.log("tttttttt");
    }
}

Hummer.render(new RootView());