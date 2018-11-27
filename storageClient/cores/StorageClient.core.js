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
     * @param {any} value 值
     * @param {String} storageType storage类型
     */
    setStorageItem (storage, key, value, storageType) {
        if (!storage || !key) {
            return;
        }
        const _that = this;
        const _opts = _that.defaultOptions;
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
                obj['size'] = _opts.getBLen(value);
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
        let res = null;
        if (storage && key) {
            
        }
    }
}
