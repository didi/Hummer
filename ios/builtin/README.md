## 打包流程
1. npm install
2. npm run build
3. 复制 dist/main.js 到 built_in.js

## 补丁
由于 Safari 闭包捕获检测存在问题，如下代码
```
class TestA { }
let testA = new TestA();
let typeof2;
function typeof1(obj) {
    typeof2 = function (obj2) {
        return typeof obj2;
    };

    return typeof2(obj);
};
typeof1(testA);
```
正常情况下 typeof2 是纯函数，但是 Safari 检测为闭包并且捕获所有 arguments，导致 obj 无法释放，而 obj 可能是导出的原生对象，因此需要做一次补丁

### 应用补丁`
```
patch -b node_modules/@babel/runtime/helpers/typeof.js typeof.patch
```

### 补丁制作
```
diff -u node_modules/@babel/runtime/helpers/typeof.js typeof.js > typeof.patch
```