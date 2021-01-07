class RootView extends View {
    initialize() {
        let environment = Hummer.env;
        this.style = {
            flexDirection: 'column',
            width: environment.availableWidth,
            height: environment.availableHeight,
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

        for (let i = 0; i < 1000; i++) {
            let startTime1 = new Date().getTime();
            let view = new View();
            timeCost1 += new Date().getTime() - startTime1;

            let startTime2 = new Date().getTime();
            view.style = {
                backgroundColor: '#FF000022',
            }
            timeCost2 += new Date().getTime() - startTime2;

            let startTime3 = new Date().getTime();
            this.appendChild(view);
            timeCost3 += new Date().getTime() - startTime3;

            let startTime4 = new Date().getTime();
            view.empty();
            timeCost4 += new Date().getTime() - startTime4;
        }

        let info = 'new views, total time cost: ' + timeCost1 + ' ms\n';
        info += 'setStyle, total time cost: ' + timeCost2 + ' ms\n';
        info += 'appendChild, total time cost: ' + timeCost3 + ' ms\n';
        info += '空方法layout, total time cost: ' + timeCost4 + ' ms';
        this.infoText.text = info;
        console.log(info);
    }
}

let startTime0 = new Date().getTime();

Hummer.render(new RootView());

let timeCost0 = new Date().getTime() - startTime0;
let info = 'render time cost: ' + timeCost0 + ' ms';
console.log(info);

