/**
 *@Description 防抖函数
 *@params fn 需要防抖的方法
 *@params wait 需要等待的时间
 *@return
 */
function debounce(fn: any, wait: number) {
    let timer: any = null;
    return function () {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(fn, wait);
    }
}

/**
 *@Description 节流函数
 *@params    fn执行函数
 *@return    delay相隔多长时间执行一次
 */

function throttle(fn: any, delay: number) {

    var previous = 0;
    return function () {
        var now = new Date().getTime();
        console.log(previous, 'previousprevious')
        console.log(now - previous, 'previous')
        if (now - previous > delay) {
            fn();
            previous = now;
            console.log(previous, "previouspreviouspreviousprevious")
        }
    }()
}

/**
 *@desc 函数说明 秒=》分钟
 *@params 参数说明 time 需要转化的秒
 */
function second2minute(time: number) {
    let t = Math.ceil(time);
    let s: number | string = t % 60, m: number | string = Math.floor(t / 60);
    m = m > 0 ? m : "00";
    s = s >= 10 ? s : "0" + s;
    return m + ':' + s;
}

export {
    debounce,
    throttle,
    second2minute
}
