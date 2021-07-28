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

        let canvas = new CanvasView()
        canvas.lineWidth(2.0)
        canvas.style = {
            marginTop: 10,
        }
        this.drawRect(canvas)
        this.drawLines(width, height, canvas)
        this.drawText(width, height, canvas)

        this.appendChild(canvas);
    }

    drawRect(canvas) {
        //开盘
        let data1 = [260, 400, 180, 392, 547, 156, 259, 357]
        //收盘
        let data2 = [136, 200, 367, 456, 523, 278, 365, 156]
        //最高
        let data3 = [456, 523, 368, 489, 555, 302, 459, 489]
        //最低
        let data4 = [102, 159, 147, 269, 425, 132, 245, 122]

        let width_half = 20
        let space = 50
        // canvas.lineColor("#FF0000")
        // canvas.fillRect(80, 300, space * 2, 150)
        // canvas.drawLine(100, 170, 100, 490)
        let start_w = 70
        for (let i = 0; i < data1.length; i++) {
            let d1 = data1[i]
            let d2 = data2[i]
            let d3 = data3[i]
            let d4 = data4[i]

            if (d2 >= d1) {
                canvas.fillColor("#FF0000")
                canvas.fillRect(start_w, d1, width_half * 2, d2 - d1)
                canvas.lineColor("#FF0000")
                canvas.drawLine(start_w + width_half, d3, start_w + width_half, d4)
            } else {
                canvas.fillColor("#00FF00")
                canvas.fillRect(start_w, d2, width_half * 2, d1 - d2)
                canvas.lineColor("#00FF00")
                canvas.drawLine(start_w + width_half, d3, start_w + width_half, d4)
            }

            start_w = start_w + width_half * 2 + space
        }
    }

    deawText(width, height, canvas) {
        canvas.fillText(10, 100, "600", 40)
        canvas.fillText(10, 200, "500", 40)
        canvas.fillText(10, 300, "400", 40)
        canvas.fillText(10, 400, "300", 40)
        canvas.fillText(10, 500, "200", 40)
        canvas.fillText(10, 600, "100", 40)
    }

    drawLines(width, height, canvas) {
        let data = [200, 291, 270, 284, 241, 550, 501, 536, 408, 521, 170, 350, 308, 342, 172, 408, 302, 315, 170];
        let space = (width - 100) / data.length
        canvas.lineColor("#FF00FF")
        //轴
        canvas.drawLine(50, 0, 50, 600)
        canvas.drawLine(50, 600, width - 50, 600)

        // let canvasContext = canvas.canvasContext;
        // canvasContext.lineColor("#00C8F0");

        // let path = new CanvasPath()
        // path.moveTo(50, 600)
        let x = 50
        let y = 300;
        //数据
        for (let i = 0; i < data.length; i++) {
            let n_x = x + space;
            let n_y = data[i]
            canvas.drawLine(x, y, n_x, n_y)
            // path.lineTo(n_x, n_y)
            x = n_x
            y = n_y
        }
        // path.close()
    }
}
Hummer.render(new RootView());