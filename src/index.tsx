import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-umsdk' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';
/**
 * 初始化 UMA 相关信息
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
 * @param {string} a 简单修改测试自动化发布
 * @param {string} b 方法
 * @returns {Promise<number>}
 */
export function reportCusError(a: string, b: string) {
  return Umsdk.reportCusError(a, b);
}
