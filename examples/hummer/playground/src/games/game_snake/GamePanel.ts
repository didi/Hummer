import { View, Toast } from '@hummer/hummer-front'
import { Color } from '../../common/CommonColor';

var CELL_SIZE = 16;
var CELL_COUNT_H = 18;
var CELL_COUNT_V = 30;

export class GamePanel extends View {
    direction: string;
    snake: SnakeCell[];
    food: Food;
    timer: number;
    gameOverCallback: Function

    constructor() {
        super();

        this.style = {
            width: CELL_SIZE * CELL_COUNT_H,
            height: CELL_SIZE * CELL_COUNT_V,
            borderWidth: 2,
            borderColor: Color.hm_green,
        }

        this.initPanel();
    }

    private initPanel() {
        this.direction = 'right';
        this.removeAll();
        this.initSnake();
        this.initFood();
    }

    private initSnake() {
        this.snake = [
            new SnakeCell(2, 0), // 蛇头，第一个点
            new SnakeCell(1, 0), // 蛇体，第二个点
            new SnakeCell(0, 0), // 蛇尾，第三个点
        ];
        for (var i = 0; i < this.snake.length; i++) {
            this.appendChild(this.snake[i]);
        }
    }

    private initFood() {
        this.food = new Food();
        this.appendChild(this.food);
    }

    /**
     * 开始游戏
     */
    public startGame() {
        if (this.timer) {
            clearInterval(this.timer);
        }
        this.timer = setInterval(() => {
            this.run(this.food);
        }, 300);
    }

    /**
     * 重新开始游戏
     */
    public restartGame() {
        this.initPanel();
        this.startGame();
    }

    /**
     * 改变蛇的方向（不允许返回，如：向上的时候不能向下）
     */
    public changeDirection(directionKey: number) {
        switch (directionKey) {
            case 4:
                if (this.direction != 'down') {
                    this.direction = "up";
                }
                break;
            case 8:
                if (this.direction != "up") {
                    this.direction = "down";
                }
                break;
            case 2:
                if (this.direction != "right") {
                    this.direction = "left";
                }
                break;
            case 1:
                if (this.direction != "left") {
                    this.direction = "right";
                }
                break;
        }
    }

    /**
     * 向前走
     */
    private forward() {
        // 处理蛇头之后的点
        for (var i = this.snake.length - 1; i > 0; i--) {
            this.snake[i].x = this.snake[i - 1].x;
            this.snake[i].y = this.snake[i - 1].y;
        }
        // 根据方向处理蛇头
        switch (this.direction) {
            case "left":
                this.snake[0].x -= 1;
                break;
            case "right":
                this.snake[0].x += 1;
                break;
            case "up":
                this.snake[0].y -= 1;
                break;
            case "down":
                this.snake[0].y += 1;
                break;
        }
    }

    /**
     * 处理出界的情况
     */
    private checkOutside(): boolean {
        if (this.snake[0].x < 0 || this.snake[0].x > CELL_COUNT_H - 1 || this.snake[0].y < 0 || this.snake[0].y > CELL_COUNT_V - 1) {
            clearInterval(this.timer);
            // this.initPanel();
            Toast.show("你瞎吗？撞死了！");
            return true;
        }
        return false;
    }

    /**
     * 处理撞到自己的情况（从第五个开始与头判断，因为前四个永远撞不到）
     */
    private checkHitSelf(): boolean {
        for (var i = 4; i < this.snake.length; i++) {
            if (this.snake[0].x == this.snake[i].x && this.snake[0].y == this.snake[i].y) {
                clearInterval(this.timer);
                // this.initPanel();
                Toast.show("傻子！你怎么能吃自己呢？");
                return true;
            }
        }
        return false;
    }

    /**
     * 处理吃掉食物的情况（蛇头和食物坐标重合）
     */
    private checkEatFood(food: Food) {
        if (this.snake[0].x == food.x && this.snake[0].y == food.y) {
            // 蛇加一节
            let s = new SnakeCell();
            this.snake.push(s);
            this.appendChild(s);
            // 更新食物位置
            food.refresh();
        }
    }

    /**
     * 更新位置
     */
    private refresh() {
        for (var i = 0; i < this.snake.length; i++) {
            this.snake[i].refresh();
        }
    }

    private run(food: Food) {
        this.forward();

        // 出界或撞到自己，游戏结束
        if (this.checkOutside() || this.checkHitSelf()) {
            return;
        }

        // 吃掉食物
        this.checkEatFood(food);

        // 刷新位置
        this.refresh();
    }
}

class SnakeCell extends View {
    width: number = CELL_SIZE;
    height: number = CELL_SIZE;
    x: number;
    y: number;

    constructor(x?: number, y?: number) {
        super();

        this.x = x;
        this.y = y;

        this.style = {
            position: 'absolute',
            width: this.width,
            height: this.height,
            borderRadius: CELL_SIZE / 2,
            backgroundColor: Color.hm_blue,
            left: this.x * this.width,
            top: this.y * this.height,
        }
    }

    public refresh() {
        this.style = {
            left: this.x * this.width,
            top: this.y * this.height,
            visibility: this.x >= 0 ? 'visible' : 'hidden',
        }
    }
}

class Food extends View {
    width: number = CELL_SIZE;
    height: number = CELL_SIZE;
    x: number;
    y: number;

    constructor() {
        super();

        this.style = {
            position: 'absolute',
            width: this.width,
            height: this.width,
            backgroundColor: Color.red,
        }

        this.refresh();
    }

    public refresh() {
        this.x = Math.floor(Math.random() * CELL_COUNT_H);
        this.y = Math.floor(Math.random() * CELL_COUNT_V);

        this.style = {
            left: this.x * this.width,
            top: this.y * this.height,
        }
    }
}