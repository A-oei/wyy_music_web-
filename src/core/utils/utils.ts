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
        console.log(previous,'previousprevious')
        console.log(now - previous,'previous')
        if (now - previous > delay) {
            fn();
            previous = now;
            console.log(previous,"previouspreviouspreviousprevious")
        }
    }()
}

export {
    debounce,
    throttle
}
