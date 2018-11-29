import StorageCore from './StorageClient.core';
import { DEFAULT_CONFIG } from '../constants';

export default class StorageClient extends StorageCore {
    /**
     * 默认配置参数
     */
    defaultOptions = DEFAULT_CONFIG;

    constructor (opts) {
        super(opts);
        
        const _that = this;
        _that.setDefaultOpts(opts);
    }

    /**
     * 存储值到暂存中
     * @param {String} key key值
     * @param {Object} value 值
     * @param {Object} opts 可选配置参数
     */
    setMemory (key, value, opts) {
        const _that = this;
        _that.setStorageItem(_that.getMemoryStorage(opts), key, value, 'd', opts);
    }

    /**
     * 获取暂存的值
     * @param {String} key key值
     * @param {Boolean} isDel 是否获取完值就删除
     * @param {Object} opts 可选配置参数
     */
    getMemory (key, isDel, opts) {
        const _that = this;
        _that.getStorageItem(_that.getMemoryStorage(opts), key, isDel, 'd');
    }

    /**
     * 清除暂存值
     * @param {String} key key值
     * @param {Object} opts 可选配置参数
     */
    removeMemory (key, opts) {
        const _that = this;
        _that.removeStorageItem(_that.getMemoryStorage(opts), key);
    }

    /**
     * 清除暂存值
     * @param {Object} opts 可选配置参数
     */
    clearMemory (opts) {
        const _that = this;
        _that.clear(_that.getMemoryStorage(opts));
    }

    /**
     * 存储值
     * @param {String} key key值
     * @param {Object} value 值
     * @param {Object} opts 可选配置参数
     */
    setSession (key, value, opts) {
        const _that = this;
        _that.setStorageItem(_that.getSessionStorage(), key, value, 's', opts);
    }

    /**
     * 获取值
     * @param {String} key key值
     * @param {Boolean} isDel 是否获取完值就删除
     */
    getSession (key, isDel) {
        const _that = this;
        _that.getStorageItem(_that.getSessionStorage(), key, isDel, 's');
    }

    /**
     * 清除
     * @param {String} key key值
     * @param {Object} opts 可选配置参数
     */
    removeSession (key, opts) {
        const _that = this;
        _that.removeStorageItem(_that.getSessionStorage(), key);
    }

    /**
     * 清除
     * @param {Object} opts 可选配置参数
     */
    clearSession (opts) {
        const _that = this;
        _that.clear(_that.getSessionStorage());
    }

    /**
     * 存储值
     * @param {String} key key值
     * @param {Object} value 值
     * @param {Object} opts 可选配置参数
     */
    setLocal (key, value, opts) {
        const _that = this;
        _that.setStorageItem(_that.getLocalStorage(), key, value, 'l', opts);
    }

    /**
     * 获取值
     * @param {String} key key值
     * @param {Boolean} isDel 是否获取完值就删除
     */
    getLocal (key, isDel) {
        const _that = this;
        _that.getStorageItem(_that.getLocalStorage(), key, isDel, 'l');
    }

    /**
     * 清除
     * @param {String} key key值
     * @param {Object} opts 可选配置参数
     */
    removeLocal (key, opts) {
        const _that = this;
        _that.removeStorageItem(_that.getLocalStorage(), key);
    }

    /**
     * 清除
     * @param {Object} opts 可选配置参数
     */
    clearLocal (opts) {
        const _that = this;
        _that.clear(_that.getLocalStorage());
    }

    /**
     * 设置Cookie
     *
     * @param {string} key 设置的Cookie名称
     * @param {string} value 设置的Cookie值
     * @param {number} time 设置Cookie失效时间
     * @memberof StorageClient
     */
    setCookie(key, value, time) {
        let expires = '';
        if (typeof value === 'undefined') {
            value = '';
        }

        if (!key) {
            return;
        }
        if (time) {
            let date = new Date();
            date.setTime(date.getTime() + time); // (days * 24 * 60 * 60 * 1000)
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = key + '=' + value + expires + '; path=/';
    }

    /**
     * 获取cookie的值
     *
     * @param {string} key 设置的Cookie名称
     * @returns {string|Null} 返回对应Key的值或null
     * @memberof StorageClient
     */
    getCookie(key) {
        let reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)');
        let _cookie = document.cookie;
        let arr = _cookie && _cookie.match(reg);
        if (arr) {
            return decodeURI(arr[2] || '') || '';
        } else {
            return null;
        }
    }


    /**
     * 移除cookie对应key的值
     *
     * @param {string} key 移除的Cookie的名称
     * @memberof StorageClient
     */
    removeCookie(key) {
        let val = this.getCookie(key);
        if (val !== null) {
            this.setCookie(key, '', -1);
        }
    }

    /**
     * 清除所有Cookie
     */
    clearCookie() {
        let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
            for (let i = 0; i < keys.length; i++) {
                document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString();
            }
        }
    }
    /**
     * 清除全部缓存
     *
     * @memberof StorageClient
     */
    clearAll(options) {
        let _that = this;
        _that.clearMemory(options);
        _that.clearSession();
        _that.clearLocal();
        _that.clearCookie();
    }
}