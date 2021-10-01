import { Hummer, View, Button } from '@hummer/hummer-front'
import { Style } from '../../common/CommonStyle'
import { Color } from '../../common/CommonColor'
import { GamePanel } from './GamePanel';

class RootView extends View {
    isGaming = false;

    constructor() {
        super();
        this.style = {
            ...Style.FullParentStyle,
            ...Style.CenterStyle,
            backgroundColor: Color.white,
        }

        this.initGame();
    }

    /**
     * 初始化游戏
     */
    initGame() {
        let panel = new GamePanel();
        this.appendChild(panel);

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
        this.appendChild(btn);
    }
}

Hummer.render(new RootView());