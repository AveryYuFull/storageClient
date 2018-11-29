/**
 * 获取字符串的字节数
 * @param {String} str 字符串
 * @returns {Number} 返回字符串的字节数
 * @exports
 */
export default function getBLen (str) {
    let bLen = 0;
    let _str = ((str || '') + '')
        .replace(/[^\x00-\xff]+/g, ($s1) => {
            bLen += $s1.length;
            return '';
        });

    return _str.length + ((bLen * 2) || 0);
}
