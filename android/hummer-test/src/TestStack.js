function __typeof__(objClass) {
     if (objClass && objClass.constructor) {
         var strFun = objClass.constructor.toString();
         var className = strFun.substr(0, strFun.indexOf('('));
         className = className.replace('function', '');
         return className.replace(/(^\s*)|(\s*$)/ig, '');
     }
     return typeof(objClass);
 }

function fun_name () {
    var tmp = arguments.callee.toString();
    var re = /function\s*(\w*)/i;
    var matches = re.exec(tmp);
    return matches[1];
}

function functionName(func) {
    // Match:
    // - ^          the beginning of the string
    // - function   the word 'function'
    // - \s+        at least some white space
    // - ([\w\$]+)  capture one or more valid JavaScript identifier characters
    // - \s*        optionally followed by white space (in theory there won't be any here,
    //              so if performance is an issue this can be omitted[1]
    // - \(         followed by an opening brace
    //
    var result = /^function\s+([\w\$]+)\s*\(/.exec( func.toString() )

    return  result  ?  result[ 1 ]  :  '' // for an anonymous function there won't be a match
}


/*
 * 打印 JavaScript 函数调用堆栈
 */
function printCallStack() {
    var i = 0;
    var fun = arguments.callee;
    console.log('fun: ' + fun);
//    console.log('fun2: ' + fun.caller);
//    console.log('fun3: ' + fun.arguments.callee);
//    do {
//        fun = fun.arguments.callee.caller;
//        console.log(++i + ': ' + fun);
//    } while (fun);
}

/**
 * trace
 * @param [int] [count=10]
 */
function trace (count) {
    var caller = arguments.callee.caller;
    var i = 0;
    count = count || 10;
    console.log("***----------------------------------------  ** " + (i + 1));
    while (caller && i < count) {
        console.log(caller.toString());
        caller = caller.caller;
        i++;
        console.log("***---------------------------------------- ** " + (i + 1));
    }
}



// console.log("class: " + this.constructor.toString());
console.log("typeof1: " + typeof(this));
console.log("typeof2: " + __typeof__(this));
console.log("fun_name: " + fun_name());
console.log("functionName: " + functionName(fun_name));

