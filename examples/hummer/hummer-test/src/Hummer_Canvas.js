import{View, Canvas, Hummer} from './../../../../api/packages/hummer-api/dist/hummer-api.es'


     
function drawRect (canvas){
    //开盘
    let data1 = [85, 135, 60, 131, 151, 153, 88, 117]
    //收盘
    let data2 = [52, 68, 123, 152, 145, 98, 158, 52]
    //最高
    let data3 = [152, 141, 124, 163, 152, 161, 159, 192]
    //最低
    let data4 = [39, 53, 39, 88, 141, 41, 82, 49]

    let width_half = 5
    let space = 15
    // canvas.lineColor("#FF0000")
    // canvas.fillRect(80, 300, space * 2, 150)
    // canvas.drawLine(100, 170, 100, 490)
    let start_w = 20
    for (let i = 0; i < data1.length; i++) {
        let d1 = data1[i]
        let d2 = data2[i]
        let d3 = data3[i]
        let d4 = data4[i]

        if (d2 >= d1) {
            canvas.lineColor("#FF0000")
            canvas.strokeRect(start_w, d1, width_half * 2, d2 - d1)
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

function drawText  (width, height, canvas) {
    let start_w = 1
    canvas.fontSize(8)
    canvas.fillText("200", start_w, 200 - 10, 40)
    canvas.fillText("150", start_w, 150 - 10, 40)
    canvas.fillText("100", start_w, 100 - 10, 40)
    canvas.fillText("50", start_w, 50 - 10, 40)

    let data = ["8.1", "8.2", "8.3", "8.4", "8.5", "8.6", "8.7", "8.8"]
    let width_half = 5
    let space = 15
    let height_bottom = 200
    start_w = 20
    canvas.fontSize(10)
    canvas.textColor("#0000FF")
    for (let i = 0; i < data.length; i++) {
        canvas.fillText(data[i], start_w, height_bottom, (width_half * 2 + space / 2))
        start_w += (width_half * 2 + space)
    }
}



function drawLinesWithNormal (width, height, canvas)  {
    let start_line = 15
    let data = [22, 33, 30, 31, 28, 52, 51, 60, 43, 62, 13, 38, 32, 38, 20, 45, 33, 35, 20];
    let space = (width - start_line * 2) / data.length
    canvas.lineColor("#FF00FF")
    //轴
    canvas.drawLine(start_line, 0, start_line, 200)
    canvas.drawLine(start_line, 200, width - start_line, 200)

    let x = start_line
    let y = 100;
    //数据
    for (let i = 0; i < data.length; i++) {

        let n_x = x + space;
        let n_y = data[i]
        canvas.drawLine(x, y, n_x, n_y)
        x = n_x
        y = n_y
    }
}

function drawLines  (width, height, canvas) {
    drawLinesWithNormal(width, height, canvas)
    // this.drawLinesWithPath(width, height, canvas)
}

function drawImage  (width, height, canvas)  {
    //资源图片
    // let path = "ic_loading"
    //网络图片
    let path = "http://xxx/test.jpg"
    //绝对路径
    // let path = "file://xxx/test.jpg"
    canvas.drawImage(path, 180, 330, 50, 50)

}

function drawCircle (width, height, canvas) {
    canvas.fillCircle(100, 300, 20)
    canvas.strokeCircle(200, 300, 20)
    canvas.arc(300, 300, 20, Math.PI/2, Math.PI, true)
    canvas.strokeEllipse(100, 400, 300, 500)
    canvas.fillEllipse(100, 600, 300, 700)
}

export class RootView extends View {
    constructor() {
        super();

        this.style = {
            width: '100%',
            height: '100%',
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
        };
        let canvas = new Canvas()
        canvas.lineWidth(2.0)
        canvas.style = {
            marginTop: 10,
        }
        // drawRect(canvas)
        drawLines(3, 3, canvas)
        // drawText(4, 4, canvas)
        // drawCircle(5, 5, canvas)
        // drawImage(6, 6, canvas)
        this.appendChild(canvas);
                

    }

}

Hummer.render(new RootView());