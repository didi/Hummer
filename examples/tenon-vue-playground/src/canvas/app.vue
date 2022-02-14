<template>
  <view class="page">
    <CommonPage
      titleText="Canvas"
      :showDisplayLayout="false"
      :showOption="false"
    >
      <template v-slot:content v-if="width && height">
        <ex-canvas
          class="canvas"
          ref="canvas"
          :style="`width: ${width};height: ${height}`"
        ></ex-canvas>
      </template>
    </CommonPage>
  </view>
</template>
<style lang="less" scoped>
.page {
  width: 100%;
  height: 100%;
}
.canvas {
  //   width: 750hm;
  //   height: 1500hm;
  margin-top: 10;
  overflow: hidden;
}
</style>

<script>
import CommonPage from "../component/CommonPage.vue";
export default {
  pageConfig: {
    canScroll: false,
  },
  components: {
    CommonPage,
  },
  data() {
    return {
      width: null,
      height: null,
    };
  },
  created() {
    this.width = Hummer.env.deviceWidth;
    this.height = Hummer.env.deviceHeight;
  },
  mounted() {
    this.$refs.canvas.lineWidth(2);
    this.drawCanvas(
      parseFloat(Hummer.env.deviceWidth),
      parseFloat(Hummer.env.deviceHeight),
      this.$refs.canvas
    );
  },
  methods: {
    drawCanvas(width, height, canvas) {
      this.drawRect(canvas);
      this.drawLines(width, height, canvas);
      this.drawText(width, height, canvas);
      this.drawCircle(width, height, canvas);
      this.drawImage(width, height, canvas);
    },
    drawRect(canvas) {
      //开盘
      let data1 = [85, 135, 60, 131, 151, 153, 88, 117];
      //收盘
      let data2 = [52, 68, 123, 152, 145, 98, 158, 52];
      //最高
      let data3 = [152, 141, 124, 163, 152, 161, 159, 192];
      //最低
      let data4 = [39, 53, 39, 88, 141, 41, 82, 49];

      let width_half = 5;
      let space = 15;
      // canvas.lineColor("#FF0000")
      // canvas.fillRect(80, 300, space * 2, 150)
      // canvas.drawLine(100, 170, 100, 490)
      let start_w = 20;
      for (let i = 0; i < data1.length; i++) {
        let d1 = data1[i];
        let d2 = data2[i];
        let d3 = data3[i];
        let d4 = data4[i];

        if (d2 >= d1) {
          canvas.lineColor("#FF0000");
          canvas.strokeRect(start_w, d1, width_half * 2, d2 - d1);
          canvas.lineColor("#FF0000");
          canvas.drawLine(start_w + width_half, d3, start_w + width_half, d4);
        } else {
          canvas.fillColor("#00FF00");
          canvas.fillRect(start_w, d2, width_half * 2, d1 - d2);
          canvas.lineColor("#00FF00");
          canvas.drawLine(start_w + width_half, d3, start_w + width_half, d4);
        }

        start_w = start_w + width_half * 2 + space;
      }
    },
    drawText(width, height, canvas) {
      let start_w = 1;
      canvas.fontSize(8);
      canvas.fillText("200", start_w, 200 - 10, 40);
      canvas.fillText("150", start_w, 150 - 10, 40);
      canvas.fillText("100", start_w, 100 - 10, 40);
      canvas.fillText("50", start_w, 50 - 10, 40);

      let data = ["8.1", "8.2", "8.3", "8.4", "8.5", "8.6", "8.7", "8.8"];
      let width_half = 5;
      let space = 15;
      let height_bottom = 200;
      start_w = 20;
      canvas.fontSize(10);
      canvas.textColor("#0000FF");
      for (let i = 0; i < data.length; i++) {
        console.log(start_w, height_bottom);
        canvas.fillText(
          data[i],
          start_w,
          height_bottom,
          width_half * 2 + space / 2
        );
        start_w += width_half * 2 + space;
      }
    },
    drawLines(width, height, canvas) {
      this.drawLinesWithNormal(width, height, canvas);
      // this.drawLinesWithPath(width, height, canvas)
    },
    // drawLinesWithPath(width, height, canvas) {
    //     let data = [60, 106, 40, 90, 150];
    //     let path = new CanvasPath()

    //     let start_line = 15
    //     let x = 15
    //     let y = 100;
    //     let space = (width - start_line * 2) / data.length
    //     path.moveTo(x, y)
    //     console.log("y:" + y);
    //     for (let i = 0; i < data.length; i++) {
    //         x += space
    //         y = data[i]
    //         console.log("y:" + y);
    //         path.moveTo(x, y)
    //     }
    //     console.log("path:" + path);
    //     canvas.drawPath(path)
    // }

    drawLinesWithNormal(width, height, canvas) {
      let start_line = 15;
      let data = [
        22, 33, 30, 31, 28, 52, 51, 60, 77, 62, 13, 38, 32, 38, 20, 45, 33, 35,
        20,
      ];
      let space = (width - start_line * 2) / data.length;
      canvas.lineColor("#FF00FF");
      //轴
      console.log(
        start_line,
        0,
        start_line,
        200,
        start_line,
        200,
        width - start_line,
        200
      );
      canvas.drawLine(start_line, 0, start_line, 200);
      canvas.drawLine(start_line, 200, width - start_line, 200);

      let x = start_line;
      let y = 100;
      //数据
      for (let i = 0; i < data.length; i++) {
        let n_x = x + space;
        let n_y = data[i];
        canvas.drawLine(x, y, n_x, n_y);
        x = n_x;
        y = n_y;
      }
    },
    drawImage(width, height, canvas) {
      //资源图片
      // let path = "ic_loading"
      //网络图片
      let path =
        "https://pt-starimg.didistatic.com/static/starimg/img/26sthnf9YK1643269008518.png";
      //绝对路径
      // let path = "file://内部存储/bluetooth/test.jepg"
      canvas.drawImage(path, 180, 330, 50, 50);
    },
    drawCircle(width, height, canvas) {
      canvas.fillCircle(100, 300, 20);
      canvas.strokeCircle(200, 300, 20);
      canvas.arc(300, 300, 20, Math.PI / 4, Math.PI / 5, false);
      canvas.strokeEllipse(100, 400, 300, 500);
      canvas.fillEllipse(100, 600, 300, 700);
    },
  },
};
</script>