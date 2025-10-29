//
//  HMDefineConcat.h
//  Pods
//
//  Created by GY on 2024/9/20.
//

#ifndef HMDefineConcat_h
#define HMDefineConcat_h

#define __HM_CONCAT2(a, b) a##b

//## 的特性 ( 阻止另一个宏的展开 ),需要中间层
#define HM_CONCAT(a, b) __HM_CONCAT2(a, b)


#endif /* HMDefineConcat_h */
