class RootView extends NJView {
    initialize() {
        this.style = {
            'width': '1200',
            'height':"1200",
            'backgroundColor' : '#220000ff'
        };

        var button1 = new NJButton("button1");
        button1.style = {
            top: "10",
            left: "10",
            width: "150",
            height: "40",
            onNormal: {backgroundColor: '#eeeeee',color: '#000000'},
            onPress: {backgroundColor: '#eeeeee', color: '#000000'},
            onDisable: {backgroundColor: '#eeeeee',color: '#000000'},
            fontSize : '16',
            textAlign: "center",
        };
        button1.title = "拨打电话(直接拨打)";
//        button.disabled = false;
        var func = function() {
            var model = new NJModel();
            model.callPhone1("10086");
        }
        button1.addClickEvent(func);

        var button2 = new NJButton("button2");
        button2.style = {
            top: "20",
            left: "10",
            width: "150",
            height: "40",
            onNormal: {backgroundColor: '#eeeeee',color: '#000000'},
            onPress: {backgroundColor: '#eeeeee', color: '#000000'},
            onDisable: {backgroundColor: '#eeeeee',color: '#000000'},
            fontSize : '16',
            textAlign: "center",
        };
        button2.title = "拨打电话(拨号界面)";
//        button.disabled = false;
        var func = function() {
            var model = new NJModel();
            model.callPhone2("10086");
        }
        button2.addClickEvent(func);

        var button3 = new NJButton("button3");
        button3.style = {
            top: "30",
            left: "10",
            width: "150",
            height: "40",
            onNormal: {backgroundColor: '#eeeeee',color: '#000000'},
            onPress: {backgroundColor: '#eeeeee', color: '#000000'},
            onDisable: {backgroundColor: '#eeeeee',color: '#000000'},
            fontSize : '16',
            textAlign: "center",
        };
        button3.title = "打开相机";
//        button.disabled = false;
        var func = function() {
            var model = new NJModel();
            model.openCamera();
        }
        button3.addClickEvent(func);

        var button4 = new NJButton("button4");
        button4.style = {
            top: "40",
            left: "10",
            width: "150",
            height: "40",
            onNormal: {backgroundColor: '#eeeeee',color: '#000000'},
            onPress: {backgroundColor: '#eeeeee', color: '#000000'},
            onDisable: {backgroundColor: '#eeeeee',color: '#000000'},
            fontSize : '16',
            textAlign: "center",
        };
        button4.title = "打开相册";
//        button.disabled = false;
        var func = function() {
            var model = new NJModel();
            model.openAlbum();
        }
        button4.addClickEvent(func);


        this.addSubview(button1);
        this.addSubview(button2);
        this.addSubview(button3);
        this.addSubview(button4);
    }
}

NativeJS.render(new RootView('rootid'));

