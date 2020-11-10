class ViewCell extends NJView {
    initialize() {
        super.initialize();

        var environment = NativeJSEnvironment.deviceInfo();

        this.style = {
            width: environment.availableWidth,
            height: environment.availableWidth+90,
            backgroundColor: "#0F1419",
            alignItems: "center",
            justifyContent: "center",
        }

        this.constructBaseView();
    }

    constructBaseView() {
        var environment = NativeJSEnvironment.deviceInfo();
        var view = new NJView();
        view.style = {
            width: environment.availableWidth,
            height: environment.availableWidth,
            backgroundColor: "#FF0000",
        }
        this.view = view;
        this.addSubview(view);

        var title = new NJText();
        title.style = {
            width: environment.availableWidth,
            height: 90,
            textAlign: "center",
            backgroundColor: "#FFFFFF",
            color:"#000000",
            fontSize:11,
        };
        this.title = title;
        this.addSubview(title);
    }

    configure(configurationFunc) {
        configurationFunc(this);
    }
}

class RootView extends NJView {
       initialize() {
        super.initialize();
        var listView = new NJList();
        this.addSubview(listView);
        
        var environment = NativeJSEnvironment.deviceInfo();

        this.style = {
            width: environment.availableWidth,
            height: environment.availableHeight,
            flexDirection: 'column',
            backgroundColor : '#FFFFFF'
        };

        listView.style = {
            width: environment.availableWidth,
            height: environment.availableHeight - 50,
            backgroundColor : '#272822'
        };


        listView.setReusableIdentifiers(['textCell']);
        listView.setCreateViewCallback((arg) => {
            return new ViewCell();
        });
        
        listView.setUpdateViewCallback((textView, index) => {
            textView.title.text = "index:"+index;
        });
        
        var cellIdentifiers = new Array();
        for (var i = 0; i < 10000; i++) {
            cellIdentifiers.push('textCell');
        }
        
        listView.setListData(cellIdentifiers);
        listView.refresh();
    }
}
NativeJS.render(new RootView("rootid"));

