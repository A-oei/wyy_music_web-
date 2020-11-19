import http from "../core/utils/require";

export default {
    get_banner_list(params: { type: number }) {
        return http.get('/banner', params, null)
    },//获取bannerList
    /**
     *@desc 函数说明 获取歌单
     *@params 参数说明 cat tag （华语、古风，默认为全部）
     *@params 参数说明 limit 取出歌单数量
     *@params 参数说明 offset 便宜数量 用于分页
     *@params 参数说明 order 可选值为new和hot，分别对应最新和最热，默认为hot
     */
    get_popular_recommendation(params: { cat: string, limit: number, before: number | string, order: string }) {
        return http.get('/top/playlist/highquality', params, null)
    },//获取推荐歌单
    /**
     *@desc 函数说明 获取歌单详情
     *@params 参数说明 id 歌单id
     *@params 参数说明 s 歌单最近的收藏者个数
     */
    get_popular_recommendation_detail(params: { id: string }) {
        return http.get('/playlist/detail', params, null)
    },
    /**
     *@desc 函数说明 获取新碟上架列表
     *@params 参数说明 limit 取出数量
     *@params 参数说明 offset 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
     *@params 参数说明 area ALL:全部,ZH:华语,EA:欧美,KR:韩国,JP:日本
     *@params 参数说明 type new:全部 hot:热门,默认为 new
     *@params 参数说明 year 年,默认本年
     *@params 参数说明 month 月,默认本月
     */
    get_new_shelves(params: { limit: number, area: string, type: string }) {
        return http.get("/top/album", params, null);
    },
    /**
     *@desc 函数说明 申请榜单信息
     */
    get_top_info() {
        return http.get("/toplist", {}, null)
    },
    /**
     *@desc 函数说明 获取榜单列表
     *@params 参数说明 id 要获取的榜单id
     */
    get_top_list(params: { id: string | number }) {
        return http.get('/top/list', params, null)
    },
    /**
     *@desc 函数说明 获取热门主播数据
     *@params 参数说明 limit 数量
     *@params 参数说明 type hot 热门 new 新晋
     */
    get_popular_anchors(params: { limit: number, type: string }) {
        return http.get("/dj/toplist", params, null)
    }
}

