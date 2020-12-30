import React, {useState, useEffect, useLayoutEffect, useRef} from "react";

import {connect} from "react-redux";
import common from "../../services/common";

import {SongInfo, HistoryItem, HistoryType} from "../../core/utils/type";
import {reducer} from "../../redux/reducer";

import {second2minute} from "../../core/utils/utils";


function MusicPlayer(props: any) {

    const {songId, sendSongInfo, sendPlayRate, sendHistory, historyList, sendLyric} = props;

    const musicPlayer = useRef<any>(null)//播放器ref

    //获取歌曲url 播放歌曲 获取歌曲时长
    async function getSongUrl(params: { id: string }) {
        const {data} = await common.getSongUrl({id: params.id});
        const url = data[0]['url']
        musicPlayer.current.src = url;
        musicPlayer.current.load();
        //audio 不能直接更改url地址，需要重新加载
        musicPlayer.current.oncanplay = () => {
            musicPlayer.current.play();
            getSongInfo({ids: params.id, duration: musicPlayer.current.duration})
        }
    }

    //获取歌曲歌手、歌曲名称、封面 信息、歌词
    async function getSongInfo(params: { ids: string, duration: number }) {
        const {privileges, songs} = await common.getSongInfo(params);
        let singer = "";
        songs[0].ar.map((item: { [item: string]: string }) => {
            singer += `${item.name} `;
        })
        //歌曲信息
        const songInfo = {
            id: params.ids,
            name: songs[0].al.name,//歌曲名称
            singer: singer.trim(),//歌手
            cover: songs[0].al.picUrl,//封面
            duration: params.duration,//时长
        }

        setHistoryList(params.ids, {
            name: songs[0].al.name,//歌曲名称
            singer: singer.trim(),//歌手
            duration: params.duration,//时长
        })
        let lyric = await getLyric(params.ids);
        sendLyric(lyric);
        sendSongInfo(songInfo);
        setPlaySchedule(params.duration);

    }

    const playRate = useRef<number | string>(0),
        timer = useRef<any>(),
        playTime = useRef(0);

    function setPlaySchedule<T extends number>(duration: T) {
        playRate.current = 0;
        timer.current && clearInterval(timer.current);
        let d = Math.ceil(duration),
            t = 0;

        timer.current = setInterval(() => {
            if (t <= d) {
                t++;
                playTime.current++;
                let rate = t / d;
                // rate = rate.toFixed(0);
                playRate.current = rate;
                sendPlayRate(rate, playTime.current);
                return;
            }
            clearInterval(timer.current);
            playRate.current = 100;
        }, 1000)
    }

    useEffect(() => {
        if (!songId) return;
        getSongUrl({id: songId});
    }, [songId])

    //存储本地历史记录
    async function setHistoryList(id: string, songInfo: HistoryItem) {
        let historyList: null | string = window.localStorage.getItem("PLAYER_HISTORY_LIST");
        if (!historyList) {
            let lyric = await getLyric(id);
            let obj: HistoryType = {
                ids: [],
                list: [],
            }
            obj.ids.push(id);
            obj.list.push({...songInfo, lyric});
            sendHistory(obj)
            return window.localStorage.setItem("PLAYER_HISTORY_LIST", JSON.stringify(obj))
        }

        let list: HistoryType = JSON.parse(historyList);
        sendHistory(list);
        if (list.ids.includes(id)) return;
        let lyric = await getLyric(id);
        list.ids.push(id);
        list.list.push({...songInfo, lyric});
        sendHistory(list);
        window.localStorage.setItem("PLAYER_HISTORY_LIST", JSON.stringify(list));
    }

    //获取歌词
    async function getLyric(id: string | number) {
        const {lrc} = await common.getLyric({id});
        return Promise.resolve(lrc.lyric);
    }

    return (
        <div className="music-player">
            <audio ref={musicPlayer}
                   id="music"
                   controls>
                您当前的浏览器不支持audio，请更换浏览器
            </audio>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return state;
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        sendSongInfo: (songInfo: SongInfo) => {
            return dispatch({type: "SET_SONG_INFO", songInfo});
        },
        sendPlayRate: (rate: number, time: number) => {
            let playTime = second2minute(time);
            dispatch({type: "SEND_PLAY_RATE", rate, playTime})
        },
        sendHistory: (historyList: HistoryType) => {
            return dispatch({type: "SEND_HISTORY", historyList})
        },
        sendLyric: (lyric: string) => {
            return dispatch({type: "SEND_LYRIC", lyric})
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayer);
