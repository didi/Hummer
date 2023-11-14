function appendResult(result){
    let array = Memory.get("testResult");
    array.push(result);
    Memory.set("testResult", array);
}
function appendPages(result){
    let array = Memory.get("testGetPages");
    array.push(result);
    Memory.set("testGetPages", array);
}
function getPages(){
    let array = Memory.get("testGetPages");
    return array;
}
function getResult(){
    let array = Memory.get("testResult");
    return array;
}
function start(testCase){
    
    Memory.set("testResult", []);
    Memory.set("testGetPages", []);
    Memory.set("testCase", testCase);

}
function getCase(){

    let testCase = Memory.get("testCase");
    return testCase;
}

export default {appendResult, getCase, getResult, start, getPages, appendPages}
