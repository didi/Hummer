const { Button } = require("@hummer/hummer-front");
const { HMXDeviceInfo } = require('@didi/hummerx-api')

class RootView extends View {
    constructor() {
        super();

        this.style = {
            width: '100%',
            height: '100%',
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 10,
        };


        let scrollView = new Scroller();
        scrollView.style = {
            height: 200,
            width: '100%',
            paddingTop: 10,
            paddingBottom: 10,
            marginTop: 20,
            backgroundColor: '#f2f2f2',
        };

        this.scrollView = scrollView;
        this.index = 1;
        this.callbacks = [];



        this.createButton("isSimReady", () => {
            var data = HMXDeviceInfo.isSimReady();
             this.showLog("HMXDeviceInfo.isSimReady() = " + data);

        })

        this.createButton("isDataOn", () => {
            var ok = HMXDeviceInfo.isDataOn();
            this.showLog("HMXDeviceInfo.isDataOn() = " + ok);
        })

        this.createButton("isAirplaneModeOn", () => {
            var ok = HMXDeviceInfo.isAirplaneModeOn();
            this.showLog("HMXDeviceInfo.isAirplaneModeOn() = " + ok);
        })

        this.createButton("isNetworkAvailable", () => {
            var ok = HMXDeviceInfo.isNetworkAvailable();
            this.showLog("HMXDeviceInfo.isNetworkAvailable" + "() = " + ok);
        })

        this.createButton("isScreenLocked", () => {
            var ok = HMXDeviceInfo.isScreenLocked();
            this.showLog("HMXDeviceInfo.isScreenLocked() = " + ok);
        })

        this.createButton("getDiskFreeSpace", () => {
            var ok = HMXDeviceInfo.getDiskFreeSpace();
            this.showLog("HMXDeviceInfo.getDiskFreeSpace() = " + ok);
        })

        this.createButton("checkAccelerometer", () => {
            var ok = HMXDeviceInfo.checkAccelerometer();
            this.showLog("HMXDeviceInfo.checkAccelerometer() = " + ok);
        })

        this.createButton("checkGyroscope", () => {
            var ok = HMXDeviceInfo.checkGyroscope();
            this.showLog("HMXDeviceInfo.checkGyroscope() = " + ok);
        })

        this.createButton("checkMagneticField", () => {
            var ok = HMXDeviceInfo.checkMagneticField();
            this.showLog("HMXDeviceInfo.checkMagneticField() = " + ok);
        })

        this.appendChild(scrollView)
        this.callAll();

    }


    callAll() {
        this.callbacks.forEach((callback) => {
            callback();
        })

    }

    createButton(text, callback) {
        let button = new Button();
        button.text = text;
        button.style = {
            width: '60%',
            height: 30,
            marginLeft: 10,
            marginRight: 10,
            marginTop: 5,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#a2a2a2',
            backgroundColor: '#e2e2e2',
        }
        button.addEventListener("tap", (event) => {
            callback()
        })
        this.appendChild(button);
        this.callbacks.push(callback);
    }


    showLog(msg) {
        console.log("msg:" + msg+"\n");

        let textView = new Text();
        textView.text = this.index + ": " + msg;
        textView.style = {
            color: '#242424',
            textAlign: 'left',
            marginLeft: 10,
            marginRight: 10,
            fontSize: 10,
        };
        this.scrollView.appendChild(textView);
        this.scrollView.scrollToBottom();
        this.index++;
    }
}


Hummer.render(new RootView());
