// ID Count
let count = 0;
// 操作面板
let playground;
// 选中ID
let selectViewId;
let idText;
let btnAdd;
let btnDelete;
let btnPosition;
let btnDisplay;

class RootView extends View {
  initialize() {
    let environment = Hummer.env;
    this.style = {
      flexDirection: "column",
      width: environment.availableWidth,
      height: environment.availableHeight,
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 10
    };
    this.operator();
    this.playground();
  }

  operator() {
    let layout = new View();
    layout.style = {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      borderWidth: 1,
      borderColor: "#22222222"
    };

    // 元素id
    idText = new Text();
    idText.text = "元素id";
    idText.style = {
      display: "block",
      width: 100
    };
    layout.appendChild(idText);

    // 操作列表
    let operation = new View();
    operation.style = {
      display: "block",
      width: 200
    };
    layout.appendChild(operation);
    // 通用样式
    let btnCss = {
      display: "block",
      borderWidth: 1,
      borderColor: "#22222222",
      padding: 4,
      margin: 4,
      textAlign: 'center'
    };
    // 添加节点
    btnAdd = new Text();
    btnAdd.text = "添加节点";
    btnAdd.style = btnCss;
    btnAdd.addEventListener("tap", event => {
      let view = this.genView();
      if (selectViewId && selectViewId !== 0) {
        let exitView = playground.getElementById(selectViewId);
        playground.insertBefore(view, exitView);
      } else {
        playground.appendChild(view);
      }
    });
    operation.appendChild(btnAdd);
    // 删除节点
    btnDelete = new Text();
    btnDelete.text = "删除节点";
    btnDelete.style = btnCss;
    btnDelete.addEventListener("tap", event => {
      if (selectViewId && selectViewId !== 0) {
        let exitView = playground.getElementById(selectViewId);
        playground.removeChild(exitView)
      }
    });
    operation.appendChild(btnDelete);
    // 更新position
    btnPosition = new Text();
    btnPosition.text = "更新position";
    btnPosition.style = btnCss;
    btnPosition.addEventListener("tap", event => {
      let exitView;
      if (selectViewId != 0) {
        exitView = playground.getElementById(selectViewId);
      } else {
        exitView = playground;
      }
      if (exitView) {
        let oldPostion = exitView.style["position"];
        if (!oldPostion || oldPostion == "fixed") {
          exitView.style = {
            position: "relative"
          }
        } else {
          exitView.style = {
            position: "fixed"
          }
        }
      }
      this.updateOpetation(selectViewId, exitView);
    });
    operation.appendChild(btnPosition);
    // 更新display
    btnDisplay = new Text();
    btnDisplay.text = "更新display";
    btnDisplay.style = btnCss;
    btnDisplay.addEventListener("tap", event => {
      let exitView;
      if (selectViewId != 0) {
        exitView = playground.getElementById(selectViewId);
      }
      if (exitView) {
        let oldDisplay = exitView.style["display"];
        let newDislpay = null;
        if (!oldDisplay || oldDisplay == "flex") {
          newDislpay = "block";
        } else if (oldDisplay == "block") {
          newDislpay = "inline"; 
        } else if (oldDisplay == "inline") {
          newDislpay = "inline-block"; 
        } else if (oldDisplay == "inline-block") {
          newDislpay = "block"; 
        }
        if (newDislpay) {
          exitView.style = {
            display: `${newDislpay}`
          }
        }
      }
      this.updateOpetation(selectViewId, exitView);
    });
    operation.appendChild(btnDisplay);

    this.appendChild(layout);
  }

  playground() {
    let id = count;
    count++;
    playground = new View(`${id}`);
    playground.style = {
      display: "block",
      position: "relative",
      padding: 10,
      borderWidth: 1,
      borderColor: "#22222222"
    };
    playground.addEventListener("tap", event => {
      this.updateOpetation(id, playground)
    });
    this.appendChild(playground);
  }

  genView() {
    let id = count;
    count++;
    let v = new Text(`${id}`);
    v.text = `${id}`;
    v.style = {
      display: "block",
      position: "relative",
      borderWidth: 1,
      borderColor: "#22222222",
      padding: 4,
      margin: 4,
      textAlign: 'center',
      height: 50,
      width: 50
    };
    v.addEventListener("tap", event => {
      this.updateOpetation(id, v)
    });
    return v;
  }

  updateOpetation(id, v) {
    selectViewId = `${id}`;
    idText.text = `元素：${selectViewId}`;
    btnPosition.text = `position：${v.style["position"]}`;
    btnDisplay.text = `display：${v.style["display"]}`;
  }
  
}

Hummer.render(new RootView());
