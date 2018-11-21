export default class MemoryStorage {
    _paramCache = null;

    static _paramCache = null;

    constructor (_key) {
        const _that = this;
        _that._key = _key;
        _that._paramCache = MemoryStorage._paramCache = MemoryStorage._paramCache  || {};
        _that._paramCache[`_${_key}_`] = _that._paramCache[`_${_key}_`] || {};
    }

    get length () {
        const _that = this;
        let keys = Object.keys(_that._paramCache[`_${_that._key}_`]);
        return (keys && keys.length) || 0;
    }

    key (index = 0) {
        const _that = this;
        let keys = Object.keys(_that._paramCache[`_${_that._key}_`]);
        return keys && keys[index];
    }

    setItem (key, value) {
        const _that = this;
        const _value = (value || '') + '';
        if (!key) {
            _that._paramCache[`_${_that._key}_`][`_${key}`] = _value;
        }
    }

    getItem (key) {
        const _that = this;
        let res;
        if (!key) {
            res = _that._paramCache[`_${_that._key}_`][`_${key}`];
        }
        return res;
    }

    removeItem (key) {
        const _that = this;
        if (!key) {
            _that._paramCache[`_${_that._key}_`][`_${key}`] = undefined;
            delete _that._paramCache[`_${_that._key}_`][`_${key}`];
        }
    }

    clear () {
        const _that = this;
        _that._paramCache[`_${_that._key}_`] = {};
    }
}