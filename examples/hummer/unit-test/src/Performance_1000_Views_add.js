import { View, Text, Memory, Button, Hummer } from '../../../../api/packages/hummer-api/dist/hummer-api.es'


class RootView extends View {
    constructor() {
        super();

        this.style = {
            width: '100%',
            height: '100%',
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
        }

        this.init();
    }

    init() {
        let titleView = new Text();
        titleView.text = '1000 Views add';
        titleView.style = {
            color: '#333333',
            fontSize: 16,
        };

        let layout = new View();
        layout.style = {
            padding: 10,
            borderWidth: 1,
            borderColor: '#22222222',
        };

        this.infoText = new Text();

        this.test();

        layout.appendChild(this.infoText);
        this.appendChild(titleView);
        this.appendChild(layout);
    }

    test() {
        let timeCost1 = 0;
        let timeCost2 = 0;
        let timeCost3 = 0;
        let timeCost4 = 0;
        let timeCost5 = 0;

        let startTime1 = new Date().getTime();
        for (let i = 0; i < 1000; i++) {
            let view = new View();
        }
        timeCost1 += new Date().getTime() - startTime1;

        let view = new View();
        for (let i = 0; i < 1000; i++) {
            // let startTime1 = new Date().getTime();
            // let view = new View();
            // timeCost1 += new Date().getTime() - startTime1;

            let startTime2 = new Date().getTime();
            view.style = {
                backgroundColor: '#FF000022',
            }
            timeCost2 += new Date().getTime() - startTime2;

            let startTime3 = new Date().getTime();
            this.appendChild(view);
            timeCost3 += new Date().getTime() - startTime3;

            // let startTime4 = new Date().getTime();
            // view.empty();
            // Memory.removeAll();
            // Memory.get("2");
            // timeCost4 += new Date().getTime() - startTime4;
        }

        let startTime4 = new Date().getTime();
        for (let i = 0; i < 1000; i++) {
            Memory.removeAll();
        }

        timeCost4 += new Date().getTime() - startTime4;

        let data = {
            d1: "12345",
            // d2: "12345",
            // d3: "12345",
            // d4: "12345",
            // d5: "12345",
            // d6: "12345",
            // d7: "12345",
            // d8: "12345",
            // d9: "12345",
            // d10: "12345",
            // d11: "12345",
            // d12: "12345",
            // d13: "12345",
            // d14: "12345",
            // d15: "12345",
            // d16: "12345",
            // d17: "12345",
            // d18: "12345",
            // d19: "12345",
            // d20: "12345",
            // d21: "12345",
            // d22: "12345",
            // d23: "12345",
            // d24: "12345",
            // d25: "12345",
            // d26: "12345",
            // d27: "12345",
            // d28: "12345",
            // d29: "12345",
            // d30: "12345",
            list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        }
        let startTime5 = new Date().getTime();
        for (let i = 0; i < 1000; i++) {
            Memory.set("d", data);
        }

        timeCost5 += new Date().getTime() - startTime5;

        let info = 'new views, total time cost: ' + timeCost1 + ' ms\n';
        info += 'setStyle, total time cost: ' + timeCost2 + ' ms\n';
        info += 'appendChild, total time cost: ' + timeCost3 + ' ms\n';
        info += '空方法layout, total time cost: ' + timeCost4 + ' ms\n';
        info += '非空方法layout, total time cost: ' + timeCost5 + ' ms';
        this.infoText.text = info;
        console.log(info);
    }
}

let startTime0 = new Date().getTime();

Hummer.render(new RootView());

let timeCost0 = new Date().getTime() - startTime0;
let info = 'render time cost: ' + timeCost0 + ' ms';
console.log(info);