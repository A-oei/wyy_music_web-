import http from "../core/utils/require";

export default {
    /**
     *@desc 函数说明 获取歌曲详细信息
     *@params 参数说明 ids 传入音乐 id(支持多个 id, 用 , 隔开)
     */
    getSongInfo(params: { ids: string }) {
        return http.get('/song/detail', params, null)
    },
    /**
     *@desc 函数说明 获取歌曲url
     *@params 参数说明 id 音乐id
     *@params 参数说明 br 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
     */
    getSongUrl(params: { id: string }) {
        return http.get('/song/url', params, null)
    },
    /**
     *@desc 函数说明 获取歌词
     *@params 参数说明 id: 音乐 id
     */
    getLyric(params: { id: string | number }) {
        return http.get('/lyric', params, null)
    }
}
