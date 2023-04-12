
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNUmsdkSpec.h"
@interface Umsdk : NSObject <NativeUmsdkSpec>
#else
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
@interface Umsdk : RCTEventEmitter <RCTBridgeModule>

#endif

@end
