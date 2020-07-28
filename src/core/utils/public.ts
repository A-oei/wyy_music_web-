/**
 判别变量类型
 *@params 参数
 */
export function TypeJudgment(params: any): string {
    return Object.prototype.toString.call(params).split(' ')[1].slice(0, -1).toLocaleLowerCase();
}