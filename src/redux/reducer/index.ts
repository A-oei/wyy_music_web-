import {SongInfo, HistoryItem, HistoryType} from "../../core/utils/type";

//定义初始化变量
let currentState = {
    bottomPlayerVisible: true,//底部的播放器是否展示
    songId: "",//歌曲id
};

//播放进度条数据
let playerSchedule = {
    rate: 0,//播放进度
    playTime: "0:00"//播放时长
}

//当前播放歌曲信息
let songInfo = {
    id: "",//id
    name: "",//歌曲名称
    cover: "http://s4.music.126.net/style/web2/img/default/default_album.jpg",//封面
    singer: "",//歌手
    duration: 0,//播放时长
    lyric:"",//歌词
};
let lyric = "";//歌词

//历史记录
let historyList = {
    ids: [],
    list: []
}

interface Action {
    type?: string,
    visible?: boolean,
    id?: string,
    songInfo?: SongInfo,
    rate: number,
    playTime: string,
    historyList: HistoryType
    lyric: string
}

function reducer(state: Action = {...currentState, songInfo, historyList, ...playerSchedule, lyric}, action: Action) {
    switch (action.type) {
        //设置歌曲信息
        case 'SET_SONG_INFO':
            return {...state, songInfo: action.songInfo}
        //底部播放器是否展示
        case 'CHANGE_BOTTOM_PLAYER_VISIBLE':
            return {...state, bottomPlayerVisible: action.visible,songId:action.id};
        //设置歌曲播放进度
        case 'SEND_PLAY_RATE':
            return {...state, rate: action.rate.toFixed(3), playTime: action.playTime}
        //设置播放历史记录
        case 'SEND_HISTORY':
            return {...state, historyList: action.historyList}
        // 设置歌词
        case 'SEND_LYRIC':
            return {...state, lyric: action.lyric}
        default:
            return state;
    }
}

export {reducer};
