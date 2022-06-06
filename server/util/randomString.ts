export default () => {
    const base =
        '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    const len = 6;
    let result = '';
    for (let i = 0; i < len; i++) {
        const rnum = Math.floor(Math.random() * base.length);
        result += base.substring(rnum, rnum + 1);
    }
    return result;
};
