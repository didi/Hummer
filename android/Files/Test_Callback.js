class RootView extends View {
    initialize() {

        console.log("nativeData: " + JSON.stringify(Hummer.nativeData));

        let environment = Hummer.env;
        this.style = {
            flexDirection: 'column',
            width: environment.availableWidth,
            height: environment.availableHeight,
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
        }

        this.testNativeCallJs();
        this.testJsCallNative();
    }

    testNativeCallJs() {
        let titleView = new Text();
        titleView.text = 'Native调用JS';
        titleView.style = {
            color: '#333333',
            fontSize: 16,
        };

        let layout = new View();
        layout.style = {
            padding: 10,
            borderWidth: 1,
            borderColor: '#22222222',
            flexWrap: 'wrap',
        };

        infoText = new Text();
        infoText.text = "";
        infoText.style = {
            width: Hummer.env.availableWidth - 40,
        };

        layout.appendChild(infoText);
        this.appendChild(titleView);
        this.appendChild(layout);
    }

    testJsCallNative() {
        let titleView = new Text();
        titleView.text = 'JS调用Native';
        titleView.style = {
            color: '#333333',
            fontSize: 16,
        };

        let layout = new View();
        layout.style = {
            padding: 10,
            borderWidth: 1,
            borderColor: '#22222222',
            flexWrap: 'wrap',
        };

        let infoText = new Text();
        infoText.style = {
            width: Hummer.env.availableWidth - 40,
        };

        // JS -> Native
        let ret = Test.nativeFunc(111, 222.22, {aa: 11, bb: true}, [55.55, false], (aa, bb) => {
            console.log('-- callback aa: ' + aa + ", bb: " + bb);
        });
        let info = "Test.nativeFunc: " + ret + "\n";

        new Timer().setTimeout(() => {
            // JS -> Native
            ret = this.nativeFunc(111, 222.22);
            info += "this.nativeFunc: " + ret;

            infoText.text = info;
        }, 1000);

        infoText.text = info;

        layout.appendChild(infoText);
        this.appendChild(titleView);
        this.appendChild(layout);
    }

    // Native -> JS
    onTestBase(p1, p2, p3, p4) {
        infoText.text += "this.onTestBase: p1 = " + p1 + ", p2 = " + p2 + ", p3 = " + p3 + ", p4 = " + p4 + "\n";
        return "111"
    }

    // Native -> JS
    onTestCollection(p1, p2) {
        infoText.text += "this.onTestCollection: p1 = " + JSON.stringify(p1) + ", p2 = " + JSON.stringify(p2);
        return "222"
    }
}

var infoText;

// Native -> JS
function onTestBase(p1, p2, p3, p4) {
    infoText.text += "Global.onTestBase: p1 = " + p1 + ", p2 = " + p2 + ", p3 = " + p3 + ", p4 = " + p4 + "\n";
    return "333"
}

// Native -> JS
function onTestCollection(p1, p2) {
    infoText.text += "Global.onTestCollection: p1 = " + JSON.stringify(p1) + ", p2 = " + JSON.stringify(p2) + "\n";
    return "444"
}

Hummer.render(new RootView());