import { Hummer, View, Button } from '@hummer/hummer-front'
import { Style } from '../../common/CommonStyle'
import { Color } from '../../common/CommonColor'
import { GamePanel } from './GamePanel';
import { ComponentPage } from '../../common/CommonPage'
class RootView extends ComponentPage {
    isGaming = false;

    constructor() {
        super();
        this.setPageTitle('贪吃蛇');
        this.style = {
            ...Style.FullParentStyle,
            ...Style.CenterStyle,
            backgroundColor: Color.white,
        }
    }
    initDisplayView() {
        // 复写父类方法，去除DisplayView
    }

    initContentView() {
        this.initGame();
    }
    /**
     * 初始化游戏
     */
    initGame() {
        let panel = new GamePanel();
        let container = new View;
        container.style = {
            width: '100%',
            flexGrow:1,
            justifyContent: 'center',
            alignItems: 'center',
        }
        container.appendChild(panel);

        this.addEventListener('swipe', (e: any) => {
            panel.changeDirection(e.direction);
        });

        let btn = new Button();
        btn.style = {
            width: 100,
            height: 40,
            marginTop: 40,
            backgroundColor: Color.hm_blue,
            fontSize: 18,
            color: Color.white,
        }
        btn.text = "开始游戏";
        btn.addEventListener('tap', (e) => {
            if (!this.isGaming) {
                btn.text = "重新开始";
                this.isGaming = true;
                panel.startGame();
            } else {
                panel.restartGame();
            }
        });
        container.appendChild(btn);
        this.appendChild(container);
    }
}

Hummer.render(new RootView());