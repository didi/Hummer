class RootView extends View {
    initialize() {
        let environment = Hummer.env;

        this.style = {
            flexDirection: 'column',
            width: environment.availableWidth,
        };

        let scroll = new Scroller();
        scroll.style = {
            width: Hummer.env.availableWidth,
            backgroundColor: '#EEEEEE',
//            showScrollBar: true,
        }

        for (let i = 0; i < 100; i++) {
//            let item = new ItemView(i);
            scroll.appendChild(new ItemView(i));
        }


        this.appendChild(scroll);
    }
}

class ItemView extends View {
    initialize(id) {
        this.style = {
            width: '100%',
            backgroundColor: '#FFFFFF',
            marginBottom: 16,
        };

        let titleLayout = new View();
        titleLayout.style = {
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between'
        };

        let subLayout = new View();
        subLayout.style = {
            flexDirection: 'row',
            borderBottomRightRadius: 10,
            shadow: '5px 5px 10px #000000',
        }

        let textId = new Text();
        textId.text = '#' + id;
        textId.style = {
            fontSize: 18,
            color: '#000000',
        };

        let line = new View();
        line.style = {
            width: 1,
            height: 12,
            margin: 8,
            backgroundColor: '#cccccc',
        }

        let textTitle = new Text();
        textTitle.text = '正在匹配附近跑腿员';

        subLayout.appendChild(textId);
        subLayout.appendChild(line);
        subLayout.appendChild(textTitle);

        let textState = new Text();
        textState.text = '待接单';

        titleLayout.appendChild(subLayout);
        titleLayout.appendChild(textState);


        this.appendChild(titleLayout);
        var addr = new AddressView();
        this.appendChild(addr);
    }
}

class AddressView extends View {
    initialize(id) {
        this.style = {
            width: '100%',
            justifyContent: 'space-between',
        };

        let addrView = new Text();
        addrView.text = '地址 15858585858'

        let nameLayout = new View();
        nameLayout.style = {
            flexDirection: 'row',
        };

        let nameView1 = new Text();
        nameView1.text = '姓名 15858585858'

        let nameView2 = new Text();
        nameView2.text = '姓名 15858585858'

        nameLayout.appendChild(nameView1);
        nameLayout.appendChild(nameView2);

        let phoneView = new Text();
        phoneView.text = '15858585858'

        this.appendChild(addrView);
        this.appendChild(nameLayout);
        this.appendChild(phoneView);
    }
}

Hummer.render(new RootView());