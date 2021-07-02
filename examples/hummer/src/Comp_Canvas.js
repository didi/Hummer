class RootView extends View {

    initialize() {
        let environment = Hummer.env;
        this.style = {
            width: "100%",
            height: "100%",
        }
        this.drawCanvas(environment.deviceWidth * environment.scale, environment.deviceHeight * environment.scale)
    }

    drawCanvas(width, height) {
        let data = [280, 291, 270, 284, 241, 550, 501, 536, 408, 521, 170, 350, 308, 342, 172, 408, 302, 315, 170];
        let space = (width - 100) / data.length
        let canvas = new CanvasView()
        canvas.style = {
            marginTop: 10,
        }

        //轴
        canvas.drawLine(50, 0, 50, 600)
        canvas.drawLine(50, 600, width - 50, 600)

        canvas.lineColor("#FF00FF")
        // let canvasContext = canvas.canvasContext;
        // canvasContext.lineColor("#00C8F0");

        let path = new CanvasPath()
        path.moveTo(50, 600)
        let x = 50
        let y = 300;
        //数据
        for (let i = 0; i < data.length; i++) {
            let n_x = x + space;
            let n_y = data[i]
            canvas.drawLine(x, y, n_x, n_y)
            path.lineTo(n_x, n_y)
            x = n_x
            y = n_y
        }
        path.close()



        this.appendChild(canvas);
    }
}
Hummer.render(new RootView());