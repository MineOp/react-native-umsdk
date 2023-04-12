import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-umsdk' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

  /**
   * crashEvent 友盟监听崩溃后发送通知到js
   * const ReactEventEmit = NativeModules.Umsdk;

  const myReactEventEmit = new NativeEventEmitter(ReactEventEmit);

  this.listener = myReactEventEmit.addListener('crashEvent', (data: { result: string }) => {

        console.warn('====== cashierSuccess ======= ' + JSON.stringify(data));

        this.process(data.result);

      });
   */
const Umsdk = NativeModules.Umsdk
  ? NativeModules.Umsdk
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function multiply(a: number, b: number): Promise<number> {
  return Umsdk.multiply(a, b);
}
/**
 *初始化友盟
 *
 * @export
 * @param {string} a 友盟key
 * @param {string} b 设置channel
 * @returns {Promise<number>}
 */
export function initKey(a: string, b: string): Promise<number> {
  return Umsdk.initKey(a, b);
}

/**
 *自定义错误上传
 *
 * @export
 * @param {string} a 页面
 * @param {string} b 方法
 * @returns {Promise<number>}
 */
export function reportCusError(a: string, b: string): Promise<number> {
  return Umsdk.initKey(a, b);
}