/**
 * storage的支持判断
 * @exports
 * @public
 */
export const storageJudge = {
    /**
     * 判断浏览器是否支持sessionStorage
     * @returns {Boolean} 是否支持sessionStorage
     */
    isSess () {
        const _key = 'testKey';
        const _value = 'testValue';
        let res = true;

        try {
            window.sessionStorage.setItem(_key, _value);
            window.sessionStorage.removeItem(_key);
        } catch (err) {
            res = false;
        }
        storageJudge.isSess = function () {
            return res;
        }
        
        return res;
    },
    /**
     * 判断浏览器是否支持localStorage
     * @returns {Boolean} 是否支持localStorage
     */
    isLocal () {
        const _key = 'testKey';
        const _value = 'testValue';
        let res = true;

        try {
            window.localStorage.setItem(_key, _value);
            window.localStorage.removeItem(_key);
        } catch (err) {
            res = false;
        }
        storageJudge.isLocal = function () {
            return res;
        }
        
        return res;
    }
};
