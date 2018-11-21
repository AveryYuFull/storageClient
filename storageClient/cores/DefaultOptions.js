import extend from '../utils/extend';

export default class DefaultOpts {
    defaultOps = null;

    constructor (opts) {
        const _that = this;
        _that.setDefaultOpts(opts);
    }

    setDefaultOpts (opts) {
        const _that = this;
        if (opts) {
            _that.defaultOps = extend({}, _that.defaultOps || {}, opts);
        }
    }

    getOpts (...args) {
        const _that = this;
        let _opts = args && args[0];

        if (_opts) {
            _opts = extend.apply(null, [].concat.apply([{}, _that.defaultOps || {}], args || []));
        } else {
            _opts = extend({}, _that.defaultOps);
        }
        return _opts;
    }
}
