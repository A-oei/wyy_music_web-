export interface TopItem {
    value: string,
    path: string
}

const topTLists: TopItem[] = [
    {value: "发现音乐", path: "/"},
    {value: "我的音乐", path: "/my"},
    {value: "朋友", path: "/friend"},
    {value: "商城", path: "https://music.163.com/store/product"},
    {value: "音乐人", path: "https://music.163.com/nmusician/web/index"},
    {value: "下载客户端", path: "/download"}
];

const topBLists: TopItem[] = [
    {
        value: "推荐",
        path: "/friend"
    }, {
        value: "排行榜",
        path: "/friend"
    }, {
        value: "歌单",
        path: "/friend"
    }, {
        value: "主播电台",
        path: "/friend"
    }, {
        value: "歌手",
        path: "/friend"
    }, {
        value: "新碟上架",
        path: "/friend"
    }
];

const popularCategorie: TopItem[] = [
    {
        value: "华语",
        path: "/"
    },
    {
        value: "流行",
        path: "/"
    },
    {
        value: "摇滚",
        path: "/"
    },
    {
        value: "民谣",
        path: "/"
    },
    {
        value: "电子",
        path: "/"
    },
]

export {topTLists, topBLists,popularCategorie}
