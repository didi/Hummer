//
//  HMResourceModel.m
//  Hummer
//
//  Created by 唐佳诚 on 2020/5/7.
//

#import "HMResourceModel.h"

@implementation HMLocalResourceModel{
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
 * 解析路径：
 * test"
 * "xxx.bundle/sourceName"
 * "/xxx/xxx/xxx/xx.bundle/sourceName"
 * "/sandbox/xxx/xxx/xx/sourceName"
 * 解析流程：
 * 1. 获取资源名称
 * 2. 获取bundle(在bundle中的图片分为两种方式读取：)
 *    1. [imageName: inBundle] -> 读取assets中的资源
 *    2. contentFile方式        -> 读取bundle中不再asset中的资源
 * 3. 保存完整file路径，用于兜底读取。
 *
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
        self.sourceName = imageWithoutEx;
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
    if ([_source hasPrefix:@"file"] || [_source hasPrefix:@"/"]) {
        self.filePath = _source;
    }else{
        //只有imagename 默认读取mainbundle
        if (!self.bundle && self.sourceName) {
            self.bundle = mainBundle;
        }
    }

}


- (NSString *)description {
    NSMutableString *description = [NSMutableString stringWithFormat:@"<%@: ", NSStringFromClass([self class])];
    [description appendFormat:@"bundle=%@", self.bundle];
    [description appendFormat:@", filePath=%@", self.filePath];
    [description appendFormat:@", sourceName=%@", self.sourceName];
    [description appendFormat:@", extensionName=%@", self.extensionName];
    [description appendString:@">"];
    return description;
}

@end
