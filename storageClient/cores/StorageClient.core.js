import { DEFAULT_CONFIG } from '../constants';
import DefaultOptions from './DefaultOptions';
import MemoryStorage from './MemoryStorage';

export default class StorageCore extends DefaultOptions {
    // 默认参数
    defaultOptions = DEFAULT_CONFIG;

    /**
     * 缓存的storage对象
     *
     * @memberof StorageCore
     * @private
     */
    _cacheStorage = null;

    constructor (opts) {
        super(opts);

        const _that = this;
        _that.setDefaultOpts(opts);
    }

    /**
     * 获取storage
     * @param {String} key 存storage的key
     * @param {String} storageType storage类型（l代表localStorage, s代表sessionStorage, 其他代表暂存）
     * @returns {MemoryStorage|Storage} 返回storage对象
     * @private
     */
    _getStorage (key, storageType) {
        const _that = this;
        let res = null;
        const _opts = _that.defaultOptions;
        const _storageJudge = _opts.storageJudge;

        if (key) {
            const _cacheStorage = _that._cacheStorage = _that._cacheStorage || new MemoryStorage('_get-new-storage_');
            const _cacheKey = key;
            const _storageKey = _cacheKey + '_' + (storageType || 'd');

            res = _cacheStorage.getItem(_storageKey);
            if (!res) {
                if (storageType === 's') {
                    if (_storageJudge && _storageJudge.isSession()) {
                        res = window.sessionStorage;
                    }
                } else if (storageType === 'l') {
                    if (_storageJudge && _storageJudge.isLocal()) {
                        res = window.localStorage;
                    }
                }

                if (!res) {
                    res = new MemoryStorage(_cacheKey);
                }
                _cacheStorage.setItem(_storageKey, res);
            }
        }

        return null;
    }

    /**
     * 获取storage的值
     * @param {MemoryStorage|Storage} storage storage对象
     * @param {String} key key值
     * @param {any} value 值
     * @param {String} storageType storage类型
     */
    _updateStorageItem(storage, key, value, storageType) {
        if (!storage || !key ||
            value instanceof Object) {
            return;
        }

        const _that = this;
        const _opts = _that.defaultOptions;
        const _storageJudge = _opts.storageJudge;
        if ((storageType === 's' && _storageJudge && _storageJudge.isSess()) ||
            (storageType === 'l' && _storageJudge && _storageJudge.isLocal())) {
            storage.setItem(key, JSON.stringify(value));
        } else {
            storage.setItem(key, value);
        }
    }

    /**
     * 获取storage的值
     * @param {MemoryStorage|Storage} storage storage对象
     * @param {String} key key值
     * @param {String} storageType storage类型
     * @returns {Object} 返回对象
     * 
     * @memberof StorageCore
     * @private
     */
    _readStorageItem (storage, key, storageType) {
        const _that = this;
        let res = null;
        if (storage && key) {
            res = storage.getItem(key);
            if (storageType === 'l' || storageType === 's') {
                try {
                    res = JSON.parse(res);
                } catch (err) {
                    _that.removeStorageItem(storage, key);
                    res = null;
                }
            }
        }
        return res;
    }

    /**
     * 获取storage的值
     * @param {MemoryStorage|Storage} storage storage对象
     * @param {String} key key值
     * @param {any} value 值
     * @param {String} storageType storage类型
     * @param {Object} opts 可选配置参数
     */
    setStorageItem (storage, key, value, storageType, opts) {
        if (!storage || !key) {
            return;
        }
        const _that = this;
        const _opts = _that.getOpts(opts);
        let obj = {
            size: 0
        };
        if (typeof value !== 'undefined') {
            obj['_key_'] = value;
            if (_opts.isSetTime || typeof _opts.timeout === 'number') {
                obj['ctime'] = (new Date()).getTime();
                obj['atime'] = (new Date()).getTime();
                if (typeof _opts.timeout === 'number') {
                    obj['timeout'] = _opts.timeout;
                }
            }
            if (_opts.getBLen instanceof Function) {
                obj['size'] = _opts.getBLen(JSON.stringify(value));
            }
        }
        _that.updateStorageItem(storage, key, obj, storageType);
    }

    /**
     * 获取storage的值
     * @param {MemoryStorage|Storage} storage storage对象
     * @param {String} key key值
     * @param {Boolean} isDel 获取完值是否删除
     * @param {String} storageType storage类型
     *
     * @returns {Object} 返回获取到值
     * @protected
     * @exports
     */
    getStorageItem (storage, key, isDel, storageType) {
        const _that = this;
        let res = null;

        if (storage && key) {
            res = _that._readStorageItem(storage, key, storageType);
            if (res) {
                if (isDel) {
                    _that.removeStorageItem(storage, key);
                    res = null;
                } else {
                    const _timeout = res.timeout;
                    const _ctime = res.ctime;
                    const _nowTime = (new Date()).getTime();
                    if (typeof _timeout !== 'undefined' && typeof _ctime !== 'undefined' &&
                        _nowTime - _ctime > _timeout) {
                        _that.removeStorageItem(storage, key);
                        res = null;
                    } else {
                        res.atime = _nowTime;
                        _that.updateStorageItem(storage, key, res, storageType);
                    }
                }
            }
        }
        return res;
    }

    /**
     * 清除storage指定项
     * @param {MemoryStorage|Storage} storage storage对象
     * @param {String} key key值
     * 
     * @protected
     * @exports
     */
    removeStorageItem (storage, key) {
        if (storage && key) {
            storage.removeItem(key);
        }
    }

    /**
     * 清除整个storage
     * @param {MemoryStorage|Storage} storage 对象
     * 
     * @protected
     * @exports
     */
    clear (storage) {
        if (storage) {
            storage.clear();
        }
    }

    /**
     * 获取session的storage
     * @returns {Storage} 返回获取到storage对象
     */
    getSessionStorage () {
        const _that = this;
        let session = _that._getStorage('_session_', 's');

        _that.getSessionStorage = function () {
            return session;
        }

        return session;
    }

    /**
     * 获取local的storage
     * @returns {Storage} 返回获取到storage对象
     */
    getLocalStorage () {
        const _that = this;
        let local = _that._getStorage('_local_', 'l');

        _that.getLocalStorage = function () {
            return local;
        }

        return local;
    }

    /**
     * 获取暂存的storage
     * @param {Object} opts 配置对象
     * @returns {Storage} 返回获取到storage对象
     */
    getMemoryStorage (opts) {
        const _that = this;
        const _storageKey = opts.storageKey;
        return _that._getStorage('_data_' + _storageKey || '', 'd');
    }
}
