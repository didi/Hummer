/** 
 * 计算渐变色的中间值
 * 参考：https://blog.csdn.net/weixin_42448623/article/details/106543513
 * 
 * @param start 开始颜色
 * @param end 结束颜色
 * @param steps 颜色分解次数
 * @param gamma 伽马值（暂时理解为透明一点）
 */
export var gradientColors = function (start, end, steps, gamma) {
    var i, j, ms, me, output = [], so = [];
    gamma = gamma || 1;
    var normalize = function (channel) {
        return Math.pow(channel / 255, gamma);
    };
    start = parseColor(start).map(normalize);
    end = parseColor(end).map(normalize);
    for (i = 0; i < steps; i++) {
        ms = i / (steps - 1);
        me = 1 - ms;
        for (j = 0; j < 3; j++) {
            so[j] = pad(Math.round(Math.pow(start[j] * me + end[j] * ms, 1 / gamma) * 255).toString(16));
        }
        output.push('#' + so.join(''));
    }
    return output;
};

var parseColor = function (hexStr) {
    return hexStr.length === 4 ? hexStr.substr(1).split('').map(function (s) { return 0x11 * parseInt(s, 16); }) : [hexStr.substr(1, 2), hexStr.substr(3, 2), hexStr.substr(5, 2)].map(function (s) { return parseInt(s, 16); })
};

// zero-pad 1 digit to 2
var pad = function (s) {
    return (s.length === 1) ? '0' + s : s;
};