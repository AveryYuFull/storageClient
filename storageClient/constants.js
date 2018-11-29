import { storageJudge } from './utils/storageJudge';

/**
 * 默认配置参数
 */
export const DEFAULT_CONFIG = {
    isSetTime: false, // 是否记录当前更新访问时间
    timeout: null, // 超时访问时间
    storageJudge: storageJudge, // 判断浏览器是否支持sessionStorage、localStorage
    getBLen: getBLen, // 获取字符串字节数
    storageKey: null // 创建MemoryStorage分类的key
}
