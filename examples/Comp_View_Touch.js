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

        this.testAllTouch();

        this.testChildTouch();
    }

    testAllTouch() {
        let titleView = new Text();
        titleView.text = 'View - 所有触控事件';
        titleView.style = {
            color: '#333333',
            fontSize: 16,
        };

        let viewLayout = new View();
        viewLayout.style = {
            flexDirection: 'row',
            padding: 10,
            borderWidth: 1,
            borderColor: '#22222222',
        };

        let view = new View();
        view.style = {
            width: 120,
            height: 120,
            backgroundColor: '#FF000080',
        };

        let touchListener = (event) => {
            infoText.text = this.formatEvent(event);
        }
        let tapListener = (event) => {
            infoText.text = this.formatEvent(event);
        }
        let longPressListener = (event) => {
            infoText.text = this.formatEvent(event);
        }
        let panListener = (event) => {
            infoText.text = this.formatEvent(event);
        }
        let swipeListener = (event) => {
            infoText.text = this.formatEvent(event);
        }
        let pinchListener = (event) => {
            infoText.text = this.formatEvent(event);
        }
//        view.addEventListener('touch', touchListener);
        view.addEventListener('tap', tapListener);
        view.addEventListener('longPress', longPressListener);
        view.addEventListener('pan', panListener);
        view.addEventListener('swipe', swipeListener);
        view.addEventListener('pinch', pinchListener);

        let infoText = new Text();
        infoText.style = {
            marginLeft: 10,
        };

        let btnRemoveAllEvent = new Button();
        btnRemoveAllEvent.text = 'removeAllEvent';
        btnRemoveAllEvent.style = {
            position: 'absolute',
            width: 130,
            height: 40,
            right: 0,
            bottom: 0,
        };
        btnRemoveAllEvent.addEventListener('tap', (event) => {
            view.removeEventListener('tap', tapListener)
            view.removeEventListener('longPress', longPressListener)
            view.removeEventListener('pan', panListener)
            view.removeEventListener('swipe', swipeListener)
            view.removeEventListener('pinch', pinchListener)
        });

        viewLayout.appendChild(view);
        viewLayout.appendChild(infoText);
        viewLayout.appendChild(btnRemoveAllEvent);
        this.appendChild(titleView);
        this.appendChild(viewLayout);
    }

    testChildTouch() {
        let titleView = new Text();
        titleView.text = 'View - 子View间触控事件传递';
        titleView.style = {
            color: '#333333',
            fontSize: 16,
            marginTop: 10,
        };

        let viewLayout = new View();
        viewLayout.style = {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            borderWidth: 1,
            borderColor: '#22222222',
        };

        let view = new View();
        view.style = {
            width: 120,
            height: 120,
            backgroundColor: '#FF000022',
        };
        view.addEventListener('tap', event => {
            infoText.text = '[View] click';
        });

        let text = new Text();
        text.text = "Text"
        text.style = {
            width: 80,
            height: 80,
            backgroundColor: '#FF000022',
            textAlign: 'center',
            color: '#000000',
        };
        text.addEventListener('tap', event => {
            infoText.text = '[Text] click';
        });

        let button = new Button();
        button.text = "Button"
        button.style = {
            position: 'absolute',
            width: 40,
            height: 40,
            backgroundColor: '#FF000022',
            fontSize: 12,
        };
        button.addEventListener('tap', event => {
            infoText.text = '[Button] click';
        });

        let infoText = new Text();
        infoText.style = {
            marginLeft: 10,
        };

        let btnDisable = new Button();
        btnDisable.text = 'set disable';
        btnDisable.style = {
            position: 'absolute',
            width: 130,
            height: 40,
            right: 0,
            bottom: 0,
        };
        btnDisable.addEventListener('tap', (event) => {
            view.enabled = false;
            text.enabled = false;
            button.enabled = false;
        });

        view.appendChild(text);
        view.appendChild(button);
        viewLayout.appendChild(view);
        viewLayout.appendChild(infoText);
        viewLayout.appendChild(btnDisable);
        this.appendChild(titleView);
        this.appendChild(viewLayout);
    }

    formatEvent(event) {
        let type = 'event: [' + event.type + ']\n'
        let state = 'state: ' + event.state + ' - ' + this.formatEventState(event.state) + '\n';
        let position = event.position ? 'position: (' + event.position.x + ', ' + event.position.y + ')\n' : '';
        let direction = event.direction ? 'direction: ' + event.direction + ' - ' + this.formatDirection(event.direction) + '\n' : '';
        let scale = event.scale ? 'scale: ' + event.scale + '\n' : '';
        let timestamp = 'timestamp: ' + event.timestamp + '\n';
        return type + state + position + direction + scale + timestamp;
    }

    formatEventState(state) {
        let strState = '';
        switch(state) {
            case 0:
                strState = 'Normal';
                break;
            case 1:
                strState = 'Began';
                break;
            case 2:
                strState = 'Changed';
                break;
            case 3:
                strState = 'Ended';
                break;
            case 4:
                strState = 'Cancelled';
                break;
            default:
                strState = 'Unknown';
                break;
        }
        return strState;
    }

    formatDirection(direction) {
        let strDirection = '';
        switch(direction) {
            case 1:
                strDirection = 'Right';
                break;
            case 2:
                strDirection = 'Left';
                break;
            case 4:
                strDirection = 'Up';
                break;
            case 8:
                strDirection = 'Down';
                break;
            default:
                strDirection = 'Unknown';
                break;
        }
        return strDirection;
    }
}

Hummer.render(new RootView());