import { Hummer, View, Button, Toast } from '@hummer/hummer-front'

//定义按键
var KEY_LEFT = 2;
var KEY_RIGHT = 1;
var KEY_ROTATE = 4;
var KEY_ACCELERATE = 8;
var KEY_PAUSE = 13;
var KEY_ONE_STOP = 32;

//定义地图大小
var MAP_R = 18;
var MAP_C = 10;

//定义方块大小
var BLOCK_R = 4;
var BLOCK_C = 4;

//定义各种方块
var BLOCKS = [
    //I
    [
        [[1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]],
        [[0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0]],
        [[1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]],
        [[0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0]]
    ],

    //L
    [
        [[1, 0, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]],
        [[1, 1, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [0, 0, 0, 0]],
        [[1, 1, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]],
        [[1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0]]
    ],

    //J
    [
        [[1, 1, 1, 0],
        [1, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]],
        [[1, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0]],
        [[0, 0, 1, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]],
        [[1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0]]
    ],

    //O
    [
        [[0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]],
        [[0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]],
        [[0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]],
        [[0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]]
    ],

    //S
    [
        [[0, 1, 1, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]],
        [[0, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 0]],
        [[0, 1, 1, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]],
        [[0, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 0]]
    ],

    //T
    [
        [[0, 1, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]],
        [[0, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0]],
        [[0, 0, 0, 0],
        [1, 1, 1, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0]],
        [[0, 1, 0, 0],
        [1, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0]]
    ],

    //Z
    [
        [[1, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]],
        [[0, 1, 0, 0],
        [1, 1, 0, 0],
        [1, 0, 0, 0],
        [0, 0, 0, 0]],
        [[1, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]],
        [[0, 1, 0, 0],
        [1, 1, 0, 0],
        [1, 0, 0, 0],
        [0, 0, 0, 0]]
    ]
];

var map = [];
var colors = ["#800000", "#008000", "#000080", "#F1CA19", "#8484FF", "#930093", "#F80000", "#984B4B"];

var enableShadow = true;
var shadow = { r: 0, c: 0 };

var currR, currC; //方格当前在Space的左顶点位置
var currType; //当前正在落下方块的种类
var currDir = 0; //当前正在落下方块的方向
var pause = false;

function initMap() {
    map = [];
    for (var r = 0; r < MAP_R; r++) {
        map.push([]);
        for (var c = 0; c < MAP_C; c++) {
            map[r][c] = {};
            map[r][c].b = 0;
        }
    }
    currR = currC = currType = currDir = 0;
}

//可以落下
function canFall(currR, currC) {
    for (var c = 0; c < BLOCK_C; c++)
        for (var r = BLOCK_R - 1; r >= 0; r--) {
            if (!BLOCKS[currType][currDir][r][c])
                continue;
            if (currR + r + 1 > MAP_R - 1)
                return false;
            if (map[currR + r + 1][currC + c].b)
                return false;
        }
    return true;
}

//找方块的投影坐标
function makeShadow() {
    shadow.r = currR;
    shadow.c = currC;
    while (canFall(shadow.r, shadow.c)) {
        shadow.r++;
    }
}

//落下状态设置到map
function fall() {
    for (var r = 0; r < BLOCK_R; r++)
        for (var c = 0; c < BLOCK_C; c++)
            if (BLOCKS[currType][currDir][r][c]) {
                map[currR + r][currC + c].b = BLOCKS[currType][currDir][r][c];
                map[currR + r][currC + c].c = currType;
            }
}

//可以左移
function canLeft() {
    for (var r = 0; r < BLOCK_R; r++)
        for (var c = 0; c < BLOCK_C; c++) {
            if (!BLOCKS[currType][currDir][r][c])
                continue;
            if (currC + c - 1 < 0)
                return false;
            if (map[currR + r][currC + c - 1].b)
                return false;
        }
    return true;
}

//可以右移
function canRight() {
    for (var r = 0; r < BLOCK_R; r++)
        for (var c = BLOCK_C - 1; c >= 0; c--) {
            if (!BLOCKS[currType][currDir][r][c])
                continue;
            if (currC + c + 1 > MAP_C - 1)
                return false;
            if (map[currR + r][currC + c + 1].b)
                return false;
        }
    return true;
}

//可以旋转
function canRotate() {
    return true;
}

//获得满行的行位置
function checkFullRows() {
    var rows = [];
    var full;
    for (var r = currR; r < MAP_R; r++) {
        full = true;
        for (var c = 0; full && c < MAP_C; c++)
            full = map[r][c].b;
        if (full)
            rows.push(r);
    }
    return rows;
}

function showPop(rows) {
    for (var i = 0; i < rows.length; i++)
        for (var c = 0; c < MAP_C; c++)
            $(rows[i] + '-' + c).style = {
                backgroundColor: '#00000000',
            }
}

//在map消除指定行位置的行
function popRows(rows) {
    for (var i = 0; i < rows.length; i++)
        for (var r = rows[i] - 1; r >= 0; r--)
            for (var c = 0; c < MAP_C; c++) {
                map[r + 1][c].b = map[r][c].b;
                map[r + 1][c].c = map[r][c].c;
            }
}

var swipeCallback = function (event) {
    var keyCode = event.direction;

    if (keyCode == KEY_LEFT || keyCode == KEY_RIGHT) {
        easeBlock();
        if (enableShadow)
            easeShadow();
        if (keyCode == KEY_LEFT) {
            if (canLeft())
                --currC;
        } else if (keyCode == KEY_RIGHT) {
            if (canRight())
                ++currC;
        }
        drawBlock();
        if (enableShadow) {
            makeShadow();
            drawShadow();
        }
    } else if (keyCode == KEY_ROTATE) {
        if (canRotate()) {
            easeBlock();
            if (enableShadow)
                easeShadow();
            currDir = [1, 2, 3, 0][currDir];
            drawBlock();
            if (enableShadow) {
                makeShadow();
                drawShadow();
            }
        }
    } else if (keyCode == KEY_ACCELERATE) {
        loop();
    } else if (keyCode == KEY_PAUSE) {
        pause = !pause;
        if (pause)
            clearInterval(timer);
        else
            timer = setInterval(loop, 300);
    } else if (keyCode == KEY_ONE_STOP) {
        easeBlock();
        makeShadow();
        currR = shadow.r;
        currC = shadow.c;
        drawBlock();
    }

    //printMapState();
}

function nextBlock() {
    function randInt(n, m) {
        return Math.floor(Math.random() * (m - n)) + n;
    }

    currR = 0;
    currC = MAP_C / 2 - BLOCK_C / 2;
    currType = randInt(0, BLOCKS.length);
    currDir = randInt(0, 4);
}

function printMapState() {
    var debug = $('debug');
    var html = '';
    for (var r = 0; r < MAP_R; r++) {
        for (var c = 0; c < MAP_C; c++)
            html += map[r][c].b;
        html += '</br>';
    }
    debug.innerHTML = html;
}

function loop() {
    if (canFall(currR, currC)) {
        easeBlock();
        ++currR;
        drawBlock();
    } else {
        fall();
        if (currR == 0) {
            drawBlock();
            clearInterval(timer);
            Toast.show('Game Over');
            return;
        }
        var rows = checkFullRows();
        if (rows.length > 0) {
            showPop(rows);
            popRows(rows);
            setTimeout(function () {
                drawMap();
            }, 100);
        }
        if (enableShadow)
            easeShadow();

        drawMap();

        nextBlock();
        drawBlock();
        if (enableShadow) {
            makeShadow();
            drawShadow();
        }
    }
}

function drawMap() {
    for (var r = 0; r < MAP_R; r++)
        for (var c = 0; c < MAP_C; c++) {
            var div = $(r + '-' + c);
            if (map[r][c].b) {
                div.style = {
                    backgroundColor: '#15D0B4',
                };
            } else {
                div.style = {
                    backgroundColor: '#00000000'
                };
            }
        }
}

function drawBlock() {
    for (var r = 0; r < BLOCK_R; r++)
        for (var c = 0; c < BLOCK_C; c++) {
            if (BLOCKS[currType][currDir][r][c]) {
                var div = $((currR + r) + '-' + (currC + c));
                div.style = {
                    backgroundColor: colors[currType],
                }
            }
        }
}

function easeBlock() {
    for (var r = 0; r < BLOCK_R; r++)
        for (var c = 0; c < BLOCK_C; c++) {
            if (BLOCKS[currType][currDir][r][c]) {
                var div = $((currR + r) + '-' + (currC + c));
                div.style = {
                    backgroundColor: '#00000000',
                }
            }
        }
}

function drawShadow() {
    for (var r = 0; r < BLOCK_R; r++)
        for (var c = 0; c < BLOCK_C; c++) {
            if (BLOCKS[currType][currDir][r][c]) {
                var div = $((shadow.r + r) + '-' + (shadow.c + c));
                div.style = {
                    backgroundColor: '#80808014',
                }
            }
        }
}

function easeShadow() {
    for (var r = 0; r < BLOCK_R; r++)
        for (var c = 0; c < BLOCK_C; c++) {
            if (BLOCKS[currType][currDir][r][c]) {
                var div = $((shadow.r + r) + '-' + (shadow.c + c));
                div.style = {
                    backgroundColor: '#00000000',
                }
            }
        }
}

function initUI() {
    var size = 24;

    let space = new View();
    space.style = {
        width: size * MAP_C + (MAP_C + 1) * 3 + 1,
        height: size * MAP_R + (MAP_R + 1) * 3 + 1,
        borderWidth: 2,
        borderColor: '#15D0B4',
    }

    for (var r = 0; r < MAP_R; r++) {
        for (var c = 0; c < MAP_C; c++) {
            let cell = new View();
            cell.style = {
                position: 'absolute',
                top: size * r + (r + 1) * 3,
                left: size * c + (c + 1) * 3,
                width: size,
                height: size,
            }
            space.appendChild(cell);

            let id = r + '-' + c;
            spaceMap[id] = cell;
        }
    }

    rootView.appendChild(space);


    btn = new Button();
    btn.style = {
        width: 100,
        height: 40,
        marginTop: 40,
        backgroundColor: '#4A90E2',
        fontSize: 18,
        color: '#FFFFFF',
    }
    btn.text = "开始游戏";
    btn.addEventListener('tap', (e) => {
        if (!isGaming) {
            btn.text = "重新开始";
            timer = setInterval(loop, 300);
            isGaming = true;
        } else {
            clearInterval(timer);
            rootView.removeAll();
            initUI();
            initGame();
            btn.text = "重新开始";
            timer = setInterval(loop, 300);
            isGaming = true;
        }
    });
    rootView.appendChild(btn);
}

var spaceMap = {};

function $(id) {
    return spaceMap[id];
}

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
    }
}

let btn;
var rootView = new RootView();
Hummer.render(rootView);

function initGame() {
    initMap();
    nextBlock();
    drawBlock();
    makeShadow();
    drawShadow();
    isGaming = false;
}

initUI();
initGame();

var timer;
var isGaming = false;