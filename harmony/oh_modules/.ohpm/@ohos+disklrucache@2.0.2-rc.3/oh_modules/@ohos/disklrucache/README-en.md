# DiskLruCache

**DiskLruCache** is a disk-based Lease Recently Used (LRU) cache library designed for OpenHarmony. It allows access to disk data using the LRU algorithm.

## Introduction

This project is developed based on the open source [DiskLruCache](https://github.com/JakeWharton/DiskLruCache) library. It provides the following features:

- Storing files in the application memory space.
- Storing data of the ArrayBuffer type and file paths.
- Allowing dynamic setting of the storage capacity.

## How to Install

```typescript
ohpm install @ohos/disklrucache
```
## Usage

#### Step 1:

Import **DiskLruCache** on the **index.ets** page of DevEco Studio.

```typescript
import { DiskLruCache } from '@ohos/disklrucache'
```

#### Step 2:

Declare an object on the **Build** page.

```typescript
testDiskLruCache: DiskLruCache = undefined
```

Initialize the object before using it. First, import **Ability** or **Application** and use **GlobalContext.getContext.setObject("context", this.context)** to register the context.

```
import Ability from '@ohos.application.Ability'
export default class MainAbility extends Ability {
    onCreate(want, launchParam) {
        GlobalContext.getContext.setObject("context", this.context)
    }
 }
```

Then, create an object on the page.

```typescript
// Create a folder named diskLruCache with the application cache path and set the disk cache size to 3 MB. (This disk cache size is optional, with a default value of 300 MB and maximum value of 300 MB.)
this.testDiskLruCache = DiskLruCache.create(GlobalContext.getContext.getObject("context"), 3 * 1024 * 1024)
```

#### Step 3:

On the **Build** page, click the **Add** button to save an image file to the disk cache.

Cache a string synchronously.

```typescript
let data: string = "Hello World Simple Example.";
this.testDiskLruCache.set('test', data);
```

Obtain a string from the disk cache synchronously.

```typescript
let data:ArrayBuffer = this.testDiskLruCache.get('test');
console.log(String.fromCharCode.aplly(null, new Uint8Array(data)));
```

Cache a file synchronously.

```typescript
import fs from '@ohos.file.fs';

let path = '/data/storage/el2/base/com.example.disklrucache/entry/files/testFile.txt';
let fd = fs.openSync(path, 0o2);
let length = fs.statSync(path).size;
let data = new ArrayBuffer(length);
fs.readSync(fd, data);
this.testDiskLruCache.set('testFile', data);
```

Obtain a file from the cache synchronously.

```typescript
let data:ArrayBuffer = this.testDiskLruCache.get('testFile');
```

Cache a string asynchronously, and obtain a string from the cache asynchronously.

```typescript
let value: string = "Hello World Simple Example.";
this.testDiskLruCache.setAsync('test', value).then(() => {
    this.testDiskLruCache.getAsync('test').then((data) => {
        console.log(String.fromCharCode.aplly(null, new Uint8Array(data)));
    })
}).catch((err) => {
    console.log('err =' + err);
})
```

Cache a file asynchronously, and obtain a file from the cache asynchronously.

```typescript
import fs from '@ohos.file.fs';

let path = '/data/storage/el2/base/com.example.disklrucache/entry/files/testFile.txt';
let file = fs.openSync(path, 0o2);
let length = fs.statSync(path).size;
let value = new ArrayBuffer(length);
fs.readSync(file.fd, data);
this.testDiskLruCache.setAsync('test', value).then(() => {
  this.testDiskLruCache.getAsync('test').then((data) => {
    console.log(String.fromCharCode.aplly(null, new Uint8Array(data)));
  })
}).catch((err) => {
  console.log('err =' + err);
})
```

#### Step 4:

Perform other operations. For details, see the **index.ets** file.

## Available APIs

### DiskLruCache APIs

| API                                                      | Input Parameter                                       | API Description                                      |
| ------------------------------------------------------------ | ------------------------------------------- | ---------------------------------------------- |
| create(context, maxSize?: number): DiskLruCache              | context, maxSize?: number                   | Creates an object and sets the path and size of the disk cache.|
| setMaxSize(max: number) :void                                | max: number                                 | Sets the maximum size of the disk cache.                              |
| set(key: string, content: ArrayBuffer \| string):void        | key: string, content: ArrayBuffer \| string | Stores data to the disk cache.                              |
| setAsync(key: string, content: ArrayBuffer \| string):Promise<void> | key: string, content: ArrayBuffer \| string | Stores data to the disk cache. This API uses a promise to return the result asynchronously.                          |
| get(key: string): ArrayBuffer                                | key: string                                 | Obtains data of the ArrayBuffer type from the disk cache.                       |
| getAsync(key: string): Promise<ArrayBuffer>                  | key: string                                 | Obtains data of the ArrayBuffer type from the disk cache. This API uses a promise to return the result asynchronously.                   |
| getFileToPath(key: string): string                           | key: string                                 | Obtains the path of a file or folder in the disk cache directory.                          |
| getFileToPathAsync(key: string): Promise<string>             | key: string                                 | Obtains the path of a file or folder in the disk cache directory. This API uses a promise to return the result asynchronously.                      |
| getPath(): string                                            |                                             | Obtains the path of the disk cache directory.                                  |
| deleteCacheDataByKey(key: string): DiskCacheEntry            | key: string                                 | Deletes the data corresponding to the specified key from the disk-based LRU cache.           |
| cleanCacheData()                                             |                                             | Clears all data from the disk-based LRU cache.                          |

## Constraints

**DiskLruCache** has been verified in the following versions:
- DevEco Studio: 4.0(4.0.3.512), SDK: API10 (4.0.10.9)
- DevEco Studio: 3.1 Beta2(3.1.0.400), SDK: API9 Release(3.2.11.9)

## Directory Structure

```
/disklrucache/src/
- main/ets/components
    - cache                  # Code related to the cache
       - CustomMap.ets       # Custom Map encapsulation
       - DiskCacheEntry.ets  # Disk cache entry
       - DiskLruCache.ets    # Disk-based LRU cache policy
       - FileReader.ets      # Code for reading and writing files
       - FileUtils.ets       # File utility class      
/entry/src/
- main/ets     
    - pages                  # List of test pages
       - index.ets           # Testing disk cache page
```

## How to Contribute

If you find any problem when using **DiskLruCache**, submit an [Issue](https://gitee.com/openharmony-sig/ohos_coap/issues) or a [PR](https://gitee.com/openharmony-sig/ohos_coap/pulls) to us.

## License

This project is licensed under [Apache License 2.0](https://gitee.com/openharmony-sig/ohos_coap/blob/master/LICENSE).
