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

        this.testChild();
    }

    testChild() {
        let childViews = new Array();
        this.viewId = 0;

        let titleView = new Text();
        titleView.text = 'View - 动态添加和删除子View';
        titleView.style = {
            color: '#333333',
            fontSize: 16,
        };

        let viewLayout = new View();
        viewLayout.style = {
            flexDirection: 'row',
            padding: 5,
            borderWidth: 1,
            borderColor: '#22222222',
            flexWrap: 'wrap',
        };

        let view = new View();
        view.style = {
            width: 60,
            height: 60,
            backgroundColor: '#FF0000',
            margin: 5,
        };

        let btnLayout = new View();
        btnLayout.style = {
            flexDirection: 'row',
            marginTop: 10,
            flexWrap: 'wrap',
        };

        // appendChild
        let btnAppendChild = new Button();
        btnAppendChild.text = 'appendChild';
        btnAppendChild.style = {
            width: 110,
            height: 40,
        };
        btnAppendChild.addEventListener('tap', (event) => {
            let text = this.makeTextView(childViews);
            viewLayout.appendChild(text);

            childViews.push(text);
            this.printViewIds(viewIdsText, childViews);
        });

        // removeChild
        let btnRemoveChild = new Button();
        btnRemoveChild.text = 'removeChild';
        btnRemoveChild.style = {
            width: 110,
            height: 40,
        };
        btnRemoveChild.addEventListener('tap', (event) => {
            viewLayout.removeChild(childViews[0]);

            childViews.shift();
            this.printViewIds(viewIdsText, childViews);
        });

        // insertBefore
        let btnInsertBefore = new Button();
        btnInsertBefore.text = 'insertBefore';
        btnInsertBefore.style = {
            width: 110,
            height: 40,
        };
        btnInsertBefore.addEventListener('tap', (event) => {
            let text = this.makeTextView(childViews);
            viewLayout.insertBefore(text, childViews[1]);

            childViews.splice(1, 0, text);
            this.printViewIds(viewIdsText, childViews);
        });

        // replaceChild
        let btnReplaceChild = new Button();
        btnReplaceChild.text = 'replaceChild';
        btnReplaceChild.style = {
            width: 110,
            height: 40,
        };
        btnReplaceChild.addEventListener('tap', (event) => {
            let text = this.makeTextView(childViews);
            viewLayout.replaceChild(text, childViews[1]);

            childViews.splice(1, 1, text);
            this.printViewIds(viewIdsText, childViews);
        });

        // removeAll
        let btnRemoveAll = new Button();
        btnRemoveAll.text = 'removeAll';
        btnRemoveAll.style = {
            width: 110,
            height: 40,
        };
        btnRemoveAll.addEventListener('tap', (event) => {
            viewLayout.removeAll();
            childViews.splice(0, childViews.length);

            this.printViewIds(viewIdsText, childViews);
        });

        // removeAll
        let btnGetElementById = new Button();
        btnGetElementById.text = 'getElementById';
        btnGetElementById.style = {
            width: 130,
            height: 40,
        };
        btnGetElementById.addEventListener('tap', (event) => {
            let lastViewId = this.viewId - 1;
            let lastChild = viewLayout.getElementById('' + lastViewId);
            viewIdsText.text = 'lastChild.text = ' + lastChild.text + ", viewId = " + lastViewId;
        });

        let viewIdsText = new Text();
        viewIdsText.style = {
            margin: 5,
        };

        viewLayout.appendChild(view);
        btnLayout.appendChild(btnAppendChild);
        btnLayout.appendChild(btnRemoveChild);
        btnLayout.appendChild(btnInsertBefore);
        btnLayout.appendChild(btnReplaceChild);
        btnLayout.appendChild(btnRemoveAll);
        btnLayout.appendChild(btnGetElementById);
        this.appendChild(titleView);
        this.appendChild(viewLayout);
        this.appendChild(btnLayout);
        this.appendChild(viewIdsText);
    }

    makeTextView(childViews) {
        let text = new Text('' + this.viewId);
        text.style = {
            width: 60,
            height: 60,
            backgroundColor: '#0000FF',
            margin: 5,
            color: '#FFFFFF',
            textAlign: 'center',
        };
        text.text = '' + this.viewId++;
        return text;
    }

    printViewIds(viewIdsText, childViews) {
        let str = 'viewId array: [';
        childViews.forEach((child, index) => {
            str = str.concat(child.text);
            if (index < childViews.length - 1) {
                str = str.concat(', ');
            }
        });
        str = str.concat(']');
        viewIdsText.text = str;
    }
}

Hummer.render(new RootView());