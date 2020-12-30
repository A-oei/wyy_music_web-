// 数据请求方法
export type Method =
    | "get"
    | "GET"
    | "post"
    | "POST"
    | "delete"
    | "DELETE"
    | "put"
    | "PUT";

// 请求基础配置
export interface BaseConfig {
    baseURL?: string,
    timeout?: number,
    headers?: object,
    withCredentials?: boolean
}

//广告轮播props数据
export interface BannerCarouselType {
    width: number,
    bannerList: any[],
    bannerNumber: number,
    setBannerBackgroundImg?: any
}

//歌单props数据
export interface SongItemType {
    title: string,
    plays: string,
    imgUrl: string,
}

//title栏props数据
export interface TitleColumnType {
    title: string,
    link: string,
    slot?: any
}

//榜单props数据
export interface HomeTopType {
    headerImg?: string,
    headerTitle?: string,
    lists: { name: string }[]
}

//热门主播数据
export interface PopularAnchors {
    name: string,
    picUrl: string,
    rcmdtext: string,
    other?: any
}

//当前播放歌曲信息
export interface SongInfo {
    name: string,//歌曲名称
    singer: string,//歌手
    cover: string,//封面
    duration: number,//歌曲时长
}

//历史记录歌曲信息
export interface HistoryItem {
    name: string,//歌曲名称
    singer: string,//歌手
    duration: number,//时长
    lyric?: string,//歌词
}
//历史记录
export interface HistoryType {
    ids: string[],//历史记录id集合
    list: HistoryItem[]//历史记录信息集合
}
