class RootView extends View {
    constructor(...args) {
        let environment = Hummer.env;
        super(...args)
        this.style = {
            marginTop:"88",
            flexDirection: 'column',
            alignItems: 'center',
            width: environment.deviceWidth,
            height: environment.deviceHeight,
        }

        // 阴影只有一种情况
        // 1. 创建圆角路径作为阴影路径
        // 圆角有两种情况
        // 1. cornerRadius
        // 2. 不规则圆角 path
        // 背景色有两种情况
        // 1. 纯色
        // 2. 渐变色

        // 背景色结合圆角存在一种特殊情况
        // 1. 纯色转换 CAShapeLayer

        let titleView = new View();
        titleView.style = {
            marginTop: '15',
            backgroundColor: '#FF0000',
            height: '50',
            width: '100',
            borderRadius: '25',
            shadow: '0 0 5 #00FF00'
        };
        this.appendChild(titleView);

        let titleView1 = new View();
        titleView1.style = {
            marginTop: '15',
            backgroundColor: '#FF0000',
            height: '50',
            width: '100',
            borderRadius: '25 20 15 10',
            shadow: '0 0 5 #00FF00'
        };
        this.appendChild(titleView1);

        let titleView2 = new View();
        titleView2.style = {
            marginTop: '15',
            // 0 是从下向上
            backgroundColor: 'linear-gradient(0deg #FF0000 #00FF00)',
            height: '50',
            width: '100',
            borderRadius: '25',
            shadow: '0 0 5 #00FF00'
        };
        this.appendChild(titleView2);

        let titleView3 = new View();
        titleView3.style = {
            marginTop: '15',
            backgroundColor: 'linear-gradient(0deg #FF0000 #00FF00)',
            height: '50',
            width: '100',
            borderRadius: '25 20 15 10',
            shadow: '0 0 5 #00FF00'
        };
        this.appendChild(titleView3);
    }
}
Hummer.render(new RootView());