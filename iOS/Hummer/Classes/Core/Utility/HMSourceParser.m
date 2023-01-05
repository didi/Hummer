//
//  HMResourceModel.m
//  Hummer
//
//  Created by 唐佳诚 on 2020/5/7.
//

#import "HMSourceParser.h"

NS_ASSUME_NONNULL_BEGIN

@interface HMSourceParser ()

@end


@implementation HMSourceParser {
    NSString *_source;
}

- (instancetype)initWithSource:(NSString *)source {
    
    self = [super init];
    if (self) {
        _source = source;
        [self parse];
    }
    return self;
}
/**
 * 解析图片路径：
 * test"
 * "xxx.bundle/imageName"
 * "/xxx/xxx/xxx/xx.bundle/imageName"
 * "/sandbox/xxx/xxx/xx/imageName"
 * 解析流程：
 * 1. 获取图片名称
 * 2. 获取bundle(在bundle中的图片分为两种方式读取：)
 *    1. [imageName: inBundle] -> 读取assets中的资源
 *    2. contentFile方式        -> 读取bundle中不再asset中的资源
 * 3. 保存完整file路径，用于兜底读取。
 */

/**
 * sandbox -> bundle Container -> xx.app
 *         -> data Container  -> Documents
 *                            -> Library
 *                            -> ...
 */
- (void)parse {
    
    NSArray *pathComponents = [_source pathComponents];
    //xx/xx/xx/xxx.png -> xxx.png
    NSString *imageName = pathComponents.lastObject;
    NSString *imageWithoutEx = [imageName stringByDeletingPathExtension];
    if (![imageWithoutEx isEqualToString:@"/"]) {
        // iOS13之前 如果imageName为"/"或触发 _UIImageCollectImagePathsForPath进行路径处理，
        // 导致attempt to insert nil object from objects 类型的crash
        
        //phase1 image name
        self.fileName = imageWithoutEx;
    }

    self.extensionName = [imageName pathExtension];
    
    //phase2  get bundle
    NSBundle *mainBundle = [NSBundle mainBundle];
    [pathComponents enumerateObjectsUsingBlock:^(NSString *obj, NSUInteger idx, BOOL *stop) {
        if ([obj.pathExtension.lowercaseString isEqualToString:@"bundle"]) {
            
            NSString *bundlePath = obj;
            NSURL *bundleUrl = [mainBundle URLForResource:bundlePath withExtension:nil];
            if (bundleUrl) {
                self.bundle = [NSBundle bundleWithURL:bundleUrl];
                *stop = YES;
            }
        }
    }];
    
    
    
    //phase3  file
    if ([_source hasPrefix:@"file"]) {
        self.filePath = _source;
    }else{
        //只有imagename 默认读取mainbundle
        if (!self.bundle && self.fileName) {
            self.bundle = mainBundle;
        }
    }

}

- (NSString *)description {
    NSMutableString *description = [NSMutableString stringWithFormat:@"<%@: ", NSStringFromClass([self class])];
    [description appendFormat:@"self.resourceBundle=%@", self.bundle];
    [description appendFormat:@", self.filePath=%@", self.filePath];
    [description appendString:@">"];
    return description;
}

@end

NS_ASSUME_NONNULL_END
