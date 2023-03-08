
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNUmsdkSpec.h"

@interface Umsdk : NSObject <NativeUmsdkSpec>
#else
#import <React/RCTBridgeModule.h>

@interface Umsdk : NSObject <RCTBridgeModule>
#endif

@end
