import { Hummer, View, Text, Button, Toast, BasicAnimation, KeyframeAnimation } from '@hummer/hummer-front'

var board = new Array();
var added = new Array();
var score = 0;
var top = 240;

function newgame() {
    //初始化棋盘格
    init();
    //在随机两个各自声称的数字
    generateOneNumber();
    generateOneNumber();
}

function init() {
    score = 0;

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var gridCell = $("#grid-cell-" + i + "-" + j);

            gridCell.style = {
                top: getPosTop(i, j),
                left: getPosLeft(i, j),
            }
        }
    }

    for (var i = 0; i < 4; i++) {//初始化格子数组
        board[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
        }
    }

    for (var i = 0; i < 4; i++) {//初始化判定合并的数组
        added[i] = new Array();
        for (var j = 0; j < 4; j++) {
            added[i][j] = 0;
        }
    }

    updateBoardView();//通知前端对board二位数组进行设定。
}

function updateBoardView() {//更新数组的前端样式
    for (var key in globalMap) {
        if (key.startsWith("#number-cell-")) {
            $('#grid-container').removeChild(globalMap[key]);
        }
    }

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var theNumberCell = new Text();
            theNumberCell.style = {
                position: 'absolute',
                textAlign: 'center',
                fontSize: 26,
                fontWeight: 'bold',
                borderRadius: 5,
            }
            globalMap['#number-cell-' + i + '-' + j] = theNumberCell;
            $("#grid-container").appendChild(theNumberCell);

            if (board[i][j] == 0) {
                theNumberCell.style = {
                    width: 0,
                    height: 0,
                    top: getPosTop(i, j),
                    left: getPosLeft(i, j),
                }
            } else {
                theNumberCell.style = {
                    width: CELL_SIZE,
                    height: CELL_SIZE,
                    top: getPosTop(i, j),
                    left: getPosLeft(i, j),
                    backgroundColor: getNumberBackgroundColor(board[i][j]),
                    color: getNumberColor(board[i][j]),
                }
                theNumberCell.text = board[i][j].toString();
            }
        }
    }
}

function generateOneNumber() {//生成随机的格子
    if (nospace(board))
        return false;

    //随机一个位置
    var randx = Math.floor(Math.random() * 4);
    var randy = Math.floor(Math.random() * 4);
    while (true) {
        if (board[randx][randy] == 0)
            break;
        randx = Math.floor(Math.random() * 4);
        randy = Math.floor(Math.random() * 4);
    }
    //随机一个数字
    var randNumber = Math.random() < 0.5 ? 2 : 4;
    //在随机位置显示随机数字
    board[randx][randy] = randNumber;
    showNumberWithAnimation(randx, randy, randNumber);
    return true;
}

//事件响应循环
var swipeCallback = function (event) {
    var keyCode = event.direction;
    switch (keyCode) {
        // case 37://left
        case 2://left
            if (moveLeft()) {
                getScore();
                generateOneNumber();//每次新增一个数字就可能出现游戏结束
                setTimeout(() => { isgameover() }, 400);//300毫秒
            }
            break;
        // case 38://up
        case 4://up
            if (moveUp()) {
                getScore();
                generateOneNumber();//每次新增一个数字就可能出现游戏结束
                setTimeout(() => { isgameover() }, 400);
            }
            break;
        // case 39://right
        case 1://right
            if (moveRight()) {
                getScore();
                generateOneNumber();//每次新增一个数字就可能出现游戏结束
                setTimeout(() => { isgameover() }, 400);
            }
            break;
        // case 40://down
        case 8://down
            if (moveDown()) {
                getScore();
                generateOneNumber();//每次新增一个数字就可能出现游戏结束
                setTimeout(() => { isgameover() }, 400);
            }
            break;

    }
}

function isgameover() {
    if (nospace(board) && nomove(board)) {
        gameover();
    }
}

function gameover() {
    Toast.show('Game Over!');
}

function isaddedArray() {//将判断能否合并的数组值置为0
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            added[i][j] = 0;
        }
    }
}

function moveLeft() {//更多地细节信息
    //判断格子是否能够向左移动
    if (!canMoveLeft(board))
        return false;

    isaddedArray();

    //真正的moveLeft函数//标准
    for (var i = 0; i < 4; i++)
        for (var j = 1; j < 4; j++) {//第一列的数字不可能向左移动
            if (board[i][j] != 0) {
                //(i,j)左侧的元素
                for (var k = 0; k < j; k++) {
                    //落脚位置的数字是否为空 && 中间没有障碍物
                    if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        break;
                    }
                    //落脚位置的数字和本来的数字相等 && 中间没有障碍物
                    else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        //add
                        if (added[i][k] != 0) {//目标落脚点是否完成过合并
                            board[i][k + 1] = board[i][j];
                            board[i][j] = 0;
                        }
                        else {
                            board[i][k] += board[i][j];
                            board[i][j] = 0;
                            added[i][k] = 1;
                            score += board[i][k];
                        }
                        break;
                    }
                }
            }
        }
    setTimeout(updateBoardView, 200);
    return true;
}

function moveRight() {//更多地细节信息
    //判断格子是否能够向右移动
    if (!canMoveRight(board))
        return false;

    isaddedArray();

    //真正的moveRight函数//标准
    for (var i = 0; i < 4; i++)
        for (var j = 2; j >= 0; j--) {//最后一列的数字不可能向右移动
            if (board[i][j] != 0) {
                //(i,j)右侧的元素
                for (var k = 3; k > j; k--) {
                    //落脚位置的数字是否为空 && 中间没有障碍物
                    if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        break;
                    }
                    //落脚位置的数字和本来的数字相等 && 中间没有障碍物
                    else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        //add
                        if (added[i][k] != 0) {
                            board[i][k - 1] = board[i][j];
                            board[i][j] = 0;
                        }
                        else {
                            board[i][k] += board[i][j];
                            board[i][j] = 0;
                            added[i][k] = 1;
                            score += board[i][k];
                        }
                        break;
                    }
                }
            }
        }
    setTimeout(updateBoardView, 200);
    return true;
}

function moveUp() {//更多地细节信息
    //判断格子是否能够向上移动
    if (!canMoveUp(board))
        return false;

    isaddedArray();
    //真正的moveUp函数//标准
    for (var j = 0; j < 4; j++)
        for (var i = 1; i < 4; i++) {//第一行的数字不可能向上移动
            if (board[i][j] != 0) {
                //(i,j)上面的元素
                for (var k = 0; k < i; k++) {
                    //落脚位置的数字是否为空 && 中间没有障碍物
                    if (board[k][j] == 0 && noBlockVertical(j, k, i, board)) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        break;
                    }
                    //落脚位置的数字和本来的数字相等 && 中间没有障碍物
                    else if (board[k][j] == board[i][j] && noBlockVertical(j, k, i, board)) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        //add
                        if (added[k][j] != 0) {
                            board[k + 1][j] = board[i][j];
                            board[i][j] = 0;
                        }
                        else {
                            board[k][j] += board[i][j];
                            board[i][j] = 0;
                            added[k][j] = 1;
                            score += board[k][j];
                        }
                        break;
                    }
                }
            }
        }
    setTimeout(updateBoardView, 200);
    return true;
}

function moveDown() {//更多地细节信息
    //判断格子是否能够向下移动
    if (!canMoveDown(board))
        return false;

    isaddedArray();

    //真正的moveDown函数//标准
    for (var j = 0; j < 4; j++)
        for (var i = 2; i >= 0; i--) {//最后一行的数字不可能向下移动
            if (board[i][j] != 0) {
                //(i,j)上面的元素
                for (var k = 3; k > i; k--) {
                    //落脚位置的数字是否为空 && 中间没有障碍物
                    if (board[k][j] == 0 && noBlockVertical(j, i, k, board)) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        break;
                    }
                    //落脚位置的数字和本来的数字相等 && 中间没有障碍物
                    else if (board[k][j] == board[i][j] && noBlockVertical(j, i, k, board)) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        //add
                        if (added[k][j] != 0) {
                            board[k - 1][j] = board[i][j];
                            board[i][j] = 0;
                        }
                        else {
                            board[k][j] += board[i][j];
                            board[i][j] = 0;
                            added[k][j] = 1;
                            score += board[k][j];
                        }
                        break;
                    }
                }
            }
        }
    setTimeout(updateBoardView, 200);
    return true;
}


/**
 * support 2048
 */

function getPosTop(i, j) {
    return CELL_SPACE + i * (CELL_SIZE + CELL_SPACE);
}

function getPosLeft(i, j) {
    return CELL_SPACE + j * (CELL_SIZE + CELL_SPACE);
}

function getNumberBackgroundColor(number) {
    switch (number) {
        case 2:
            return "#eee4da";
            break;
        case 4:
            return "#eee4da";
            break;
        case 8:
            return "#f26179";
            break;
        case 16:
            return "#f59563";
            break;
        case 32:
            return "#f67c5f";
            break;
        case 64:
            return "#f65e36";
            break;
        case 128:
            return "#edcf72";
            break;
        case 256:
            return "#edcc61";
            break;
        case 512:
            return "#99cc00";
            break;
        case 1024:
            return "#3365a5";
            break;
        case 2048:
            return "#0099cc";
            break;
        case 4096:
            return "#00a6bc";
            break;
        case 8192:
            return "#9933cc";
            break;
    }
    return "#000000";
}

function getNumberColor(number) {
    if (number <= 4) {
        return "#776e65";
    }
    return "#FFFFFF";
}

function getScore() {
    // document.getElementById("score").innerHTML=score;
    $('score').text = score.toString();
}

//在随机生成数字的时候判断16宫格中是否还有空间
function nospace(board) {
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++)
            if (board[i][j] == 0)
                return false;
    return true;
}

//实现功能判断
function canMoveLeft(board) {
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++)
            if (board[i][j] != 0 && j != 0)
                if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j])
                    return true;

    return false;
}

function canMoveRight(board) {
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++)
            if (board[i][j] != 0 && j != 3)
                if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j])
                    return true;

    return false;
}

function canMoveUp(board) {
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++)
            if (board[i][j] != 0 && i != 0)
                if (board[i - 1][j] == 0 || board[i - 1][j] == board[i][j])
                    return true;
    return false;
}

function canMoveDown(board) {
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++)
            if (board[i][j] != 0 && i != 3)
                if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j])
                    return true;
    return false;
}

//判断水平方向是否有障碍物
function noBlockHorizontal(row, col1, col2, board) {
    for (var i = col1 + 1; i < col2; i++)
        if (board[row][i] != 0)
            return false;
    return true;
}

//判断竖直方向是否有障碍物
function noBlockVertical(col, row1, row2, board) {
    for (var i = row1 + 1; i < row2; i++)
        if (board[i][col] != 0)
            return false;
    return true;
}
//最后收尾
function nomove(board) {
    if (canMoveLeft(board) || canMoveRight(board) || canMoveUp(board) || canMoveDown(board))
        return false;
    return true;
}





/**
 * show Animation 2048
 */

function showNumberWithAnimation(i, j, randNumber) {//实现随机数字的样式变动

    var numberCell = $('#number-cell-' + i + '-' + j);

    numberCell.style = {
        backgroundColor: getNumberBackgroundColor(randNumber),
        color: getNumberColor(randNumber),
        width: CELL_SIZE,
        height: CELL_SIZE,
    }
    numberCell.text = randNumber.toString();

    let anim = new KeyframeAnimation('scale');
    anim.keyframes = [{
        percent: 0,
        value: 0.4,
    }, {
        percent: 1,
        value: 1,
    }];
    anim.duration = 0.2;
    numberCell.addAnimation(anim, "xx");
}

function showMoveAnimation(fromx, fromy, tox, toy) {//实现移动格子的样式变动
    var numberCell = $('#number-cell-' + fromx + '-' + fromy);

    var anim = new BasicAnimation("position");
    anim.value = {
        x: getPosLeft(tox, toy) - getPosLeft(fromx, fromy),
        y: getPosTop(tox, toy) - getPosTop(fromx, fromy)
    };
    console.log(anim.value);
    anim.duration = 0.2;
    numberCell.addAnimation(anim, "xx");
}





/**
 * hummer
 */

class RootView extends View {
    constructor() {
        super();

        this.style = {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
        }

        this.addEventListener('swipe', swipeCallback);

        let title = new Text();
        title.text = '2048';
        title.style = {
            fontSize: 40,
            fontWeight: 'bold',
            color: '#15D0B4',
        }

        this.appendChild(title);

        let restartBtn = new Button();
        restartBtn.text = '重新开始';
        restartBtn.style = {
            width: 90,
            height: 40,
            backgroundColor: '#4A90E2',
            borderRadius: 4,
            margin: 20,
            color: '#FFFFFF',
            fontSize: 16,
        }
        restartBtn.addEventListener('tap', () => {
            newgame();
        })
        this.appendChild(restartBtn);

        let scoreLayout = new View();
        scoreLayout.style = {
            flexDirection: 'row',
            marginBottom: 14,
        }
        let scoreLabel = new Text();
        scoreLabel.text = '分数：';
        scoreLabel.style = {
            fontSize: 18,
        }
        let score = new Text();
        score.text = '0';
        score.style = {
            fontSize: 34,
            fontWeight: 'bold',
            color: '#15D0B4',
        }
        scoreLayout.appendChild(scoreLabel);
        scoreLayout.appendChild(score);
        this.appendChild(scoreLayout);
        globalMap['score'] = score;

        let boxLayout = new View();
        boxLayout.style = {
            width: BOX_SIZE,
            height: BOX_SIZE,
            backgroundColor: '#bbada0',
            borderRadius: 8,
        }
        globalMap['#grid-container'] = boxLayout;

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let cell = new View();
                cell.style = {
                    position: 'absolute',
                    width: CELL_SIZE,
                    height: CELL_SIZE,
                    backgroundColor: '#ccc0b3',
                    borderRadius: 5,
                };
                globalMap['#grid-cell-' + i + '-' + j] = cell;
                boxLayout.appendChild(cell);
            }
        }
        this.appendChild(boxLayout);
    }
}

function $(id) {
    return globalMap[id];
}


var BOX_SIZE = 300;
var CELL_SIZE = 60;
var CELL_SPACE = (300 - 60 * 4) / 5;
var globalMap = {};

Hummer.render(new RootView());

newgame();