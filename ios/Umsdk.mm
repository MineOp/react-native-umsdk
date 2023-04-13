#import "Umsdk.h"
#import <UMCommon/UMCommon.h>
#import <React/RCTViewManager.h>
//导入UMAPM的OC的头文件
#import <UMAPM/UMLaunch.h>
#import <UMAPM/UMCrashConfigure.h>
#import <UMAPM/UMAPMConfig.h>
@implementation Umsdk
RCT_EXPORT_MODULE()


// Example method
// See // https://reactnative.dev/docs/native-modules-ios
RCT_REMAP_METHOD(multiply,
                 multiplyWithA:(double)a withB:(double)b
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    NSNumber *result = @(a * b);
    
    resolve(result);
}

RCT_REMAP_METHOD(initKey,
                 key:(NSString *)key withChanel:(NSString *)channel
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    /**
     *  初始化友盟SDK key+渠道
     *
     *
     *
     *  */
    [UMConfigure initWithAppkey:key channel:channel];
    [UMCrashConfigure setCrashCBBlock:^NSString*_Nullable{
        /**
         崩溃回调
         */
        [self sendEventWithName:@"crashEvent" body:@{@"result": @"crash"}];
        return @"崩溃时自定义字符串";
    }];
    NSNumber *result = @(1);
    
    resolve(result);
}
RCT_REMAP_METHOD(reportCusError,
                 page:(NSString *)page method:(NSString *)method
                 )
{
    /**
     *  上报自定义错误 页面+错误方法
     *  @name  名称   长度限制256字节以内，超过截断。
     *  @reason  错误原因 长度限制256字节以内，超过截断。
     *  @stackTrace  堆栈 长度限制100*1024字节以内，超过截断。
     *
     *  @example:
     *  // 日志类型唯一标识
     *  */
    NSString* name = @"myUnity";
    NSString* reason = @"csharp exception";
    
    NSArray* stackTrace = [NSArray arrayWithObjects:
                           page,
                           method,
                           nil];
    
    [UMCrashConfigure reportExceptionWithName:name reason:reason stackTrace:stackTrace];
    NSNumber *result = @(1);
    
    resolve(result);
}
-(NSArray *)supportedEvents{
    
    return @[@"crashEvent"];
    
}
// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
(const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeUmsdkSpecJSI>(params);
}
#endif

@end
