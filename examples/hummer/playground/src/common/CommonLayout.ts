import { View, Text, Image, Navigator, Scroller } from "@hummer/hummer-front"
import { Color } from './CommonColor'
import { Style } from './CommonStyle'
import { Img } from './CommonResource'

export class Page extends View {
    titleBar = new TitleBar();

    constructor() {
        super();
        this.style = Style.FullParentStyle;
        this.appendChild(this.titleBar);
    }

    public setPageTitle(title: string) {
        this.titleBar.setTitle(title);
    }
}

export class TitleBar extends View {
    titleView = new Text();

    constructor() {
        super();

        this.style = {
            flexDirection: 'row',
            width: '100%',
            height: 52,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F8F8F8D2',
        }

        let image = new Image();
        image.style = {
            width: 22,
            height: 22,
            resize: 'contain',
        }
        image.src = Img.NavigatorBack;
        let imageWrapper = new View();
        imageWrapper.style = {
            position: 'absolute',
            left: 0,
            width: 40,
            height: 40,
            padding: 8,
            marginLeft: 4,
        }
        imageWrapper.appendChild(image);
        imageWrapper.addEventListener('tap', (evnet) => {
            Navigator.popPage();
        })

        this.titleView.style = {
            color: '#000000',
            fontSize: 20,
        }

        let line = new View();
        line.style = {
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: '1px',
            backgroundColor: '#00000040',
        }

        this.appendChild(imageWrapper);
        this.appendChild(this.titleView);
        this.appendChild(line);
    }

    public setTitle(title: string) {
        this.titleView.text = title;
    }
}

export class NormalContentView extends View {
    constructor() {
        super();

        this.style = {
            width: '100%',
            flexGrow: 1,
            backgroundColor: '#EEEEEE70',
        }
    }
}

export class ScrollContentView extends Scroller {
    constructor() {
        super();

        this.style = {
            width: '100%',
            flexGrow: 1,
            flexShrink: 1,
            backgroundColor: '#EEEEEE70',
        }
    }
}

export class GroupTitle extends Text {
    constructor(title: string) {
        super();

        this.style = {
            color: Color.grey,
            fontSize: 14,
            marginLeft: 16,
            marginTop: 24,
            marginBottom: 4,
        }
        this.text = title;
    }
}

export class GroupContent extends View {
    constructor() {
        super();

        this.style = {
            flexDirection: 'row',
            width: '100%',
            flexWrap: 'wrap',
            backgroundColor: '#FFFFFF',
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 4,
            paddingBottom: 4,
        }
    }
}

export class OperationLayout extends View {
    public addView;
    public removeView;

    constructor() {
        super();

        this.style = {
            flexDirection: 'row',
        }

        this.addView = new Text();
        this.addView.text = '＋';
        this.addView.style = {
            width: 30,
            height: 30,
            backgroundColor: Color.white,
            margin: 4,
            color: Color.black,
            fontSize: 18,
            textAlign: 'center',
            shadow: '1 2 12 #00000030',
        }

        this.removeView = new Text();
        this.removeView.text = '－';
        this.removeView.style = {
            width: 30,
            height: 30,
            backgroundColor: Color.white,
            margin: 4,
            color: Color.black,
            fontSize: 18,
            textAlign: 'center',
            shadow: '1 2 12 #00000030',
        }

        this.appendChild(this.addView);
        this.appendChild(this.removeView);
    }
}

export class PullRefreshCell extends View {
    textView: Text;

    constructor() {
        super();
        this.style = {
            width: '100%',
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Color.hm_yellow,
        };

        this.textView = new Text();
        this.textView.text = 'PullRefreshCell';
        this.textView.style = {
            fontSize: 12,
        }

        this.appendChild(this.textView);
    }

    setHint(hint) {
        this.textView.text = hint;
    }
}

export class LoadMoreCell extends View {
    textView: Text;

    constructor() {
        super();
        this.style = {
            width: '100%',
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Color.hm_blue,
        };

        this.textView = new Text();
        this.textView.text = 'LoadMoreCell';
        this.textView.style = {
            fontSize: 12,
        }

        this.appendChild(this.textView);
    }

    setHint(hint) {
        this.textView.text = hint;
    }
}

export class ListTitleCell extends View {
    constructor() {
        super();
        this.style = {
            backgroundColor: Color.green + '40',
        };

        var textView = new Text();
        textView.style = {
            height: 30,
            textAlign: "center",
        };
        textView.text = 'It\'s a title';

        this.appendChild(textView);
    }
}

export class ListItemCell extends View {
    textView: Text;

    constructor() {
        super();
        this.style = {
            backgroundColor: Color.hm_green,
        };

        this.textView = new Text();
        this.textView.style = {
            height: 30,
            textAlign: "center",
        };

        this.appendChild(this.textView);
    }

    refresh(position) {
        this.textView.text = position.toString();
    }
}

export class ListHoriItemCell extends View {
    textView: Text;

    constructor() {
        super();
        this.style = {
            width: 30,
            backgroundColor: Color.hm_green,
        };

        this.textView = new Text();
        this.textView.style = {
            width: 30,
            height: '100%',
            textAlign: "center",
        };

        this.appendChild(this.textView);
    }

    refresh(position) {
        this.textView.text = position.toString();
    }
}

export class GridItemCell extends View {
    textView: Text;

    constructor() {
        super();
        this.style = {
            backgroundColor: Color.hm_green,
        };

        this.textView = new Text();
        this.textView.style = {
            height: 40,
            textAlign: "center",
        };

        this.appendChild(this.textView);
    }

    refresh(position) {
        this.textView.text = position.toString();
    }
}

export class WaterfallItemCell extends View {
    textView: Text;

    constructor() {
        super();
        this.style = {
            backgroundColor: Color.hm_green,
        };

        this.textView = new Text();
        this.textView.style = {
            height: 40,
            textAlign: "center",
        };

        this.appendChild(this.textView);
    }

    refresh(position) {
        this.textView.text = position.toString();
        this.textView.style = { height: Math.random() * 80 + 40 }
    }
}