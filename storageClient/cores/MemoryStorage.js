export default class MemoryStorage {
    /**
     * 缓存的数据对象
     * @private
     */
    _paramCache = null;

    /**
     * 缓存的数据对象
     * @private
     */
    static _paramCache = null;

    constructor (_key) {
        const _that = this;
        _that._key = _key;
        _that._paramCache = MemoryStorage._paramCache = MemoryStorage._paramCache  || {};
        _that._paramCache[`_${_key}_`] = _that._paramCache[`_${_key}_`] || {};
    }

    /**
     * 已存数据个数
     *
     * @readonly
     * @memberof MemoryStorage
     */
    get length () {
        const _that = this;
        let keys = Object.keys(_that._paramCache[`_${_that._key}_`]);
        return (keys && keys.length) || 0;
    }

    /**
     * 已存的数据key
     *
     * @param {number} [index=0]
     * @returns
     * @memberof MemoryStorage
     */
    key (index = 0) {
        const _that = this;
        let keys = Object.keys(_that._paramCache[`_${_that._key}_`]);
        return keys && keys[index];
    }

    /**
     * 存储数据
     * @param {String} key 键
     * @param {String} value 值
     */
    setItem (key, value) {
        const _that = this;
        const _value = (value || '') + '';
        if (key) {
            _that._paramCache[`_${_that._key}_`][`_${key}`] = _value;
        }
    }

    /**
     * 获取数据
     * @param {String} key 键
     * @returns {String} 返回结果
     */
    getItem (key) {
        const _that = this;
        let res;
        if (key) {
            res = _that._paramCache[`_${_that._key}_`][`_${key}`];
        }
        return res;
    }

    /**
     * 移除数据
     *
     * @param {*} key
     * @memberof MemoryStorage
     */
    removeItem (key) {
        const _that = this;
        if (key) {
            _that._paramCache[`_${_that._key}_`][`_${key}`] = undefined;
            delete _that._paramCache[`_${_that._key}_`][`_${key}`];
        }
    }

    /**
     * 清除数据
     *
     * @memberof MemoryStorage
     */
    clear () {
        const _that = this;
        _that._paramCache[`_${_that._key}_`] = {};
    }
}
