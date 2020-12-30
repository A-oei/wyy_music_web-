import React, {useState, useEffect, useLayoutEffect} from "react";
import "./index.scss";

import {connect} from "react-redux";
import classnames from 'classnames';
import {second2minute} from "../../core/utils/utils";
import {HistoryItem} from "../../core/utils/type";
import BottomPlayerSchedule from "./BottomPlayerSchedule";


function BottomPlayer(props: any) {
    const {bottomPlayerVisible, songInfo, changeBottomPlayerVisible, historyList, lyric} = props;
    //锁定按钮
    const [playerLock, setPlayerLock] = useState<boolean>(true);//播放栏是否锁定
    //锁定按钮点击事件
    function changePlayerLock() {
        setPlayerLock(!playerLock);
        //useState不会即时更新数据，需要通过上一个状态去判断
        if (!playerLock) return changeBottomPlayerVisible(true);
        changeBottomPlayerVisible(false);
    }

    //历史记录数量
    const historyNum = JSON.parse(window.localStorage.getItem("PLAYER_HISTORY_LIST") as string).ids.length;
    const [historyVisible, setHistoryVisible] = useState<boolean>(false);
    //清除历史记录


    //处理歌词格式
    let lyricList = lyric.split(`\n`);

    return (
        <div className={classnames({
            "bottom-player": true,
            "pack-up": !bottomPlayerVisible,
            "unfold": bottomPlayerVisible
        })} onMouseEnter={() => changeBottomPlayerVisible(true)}>

            <div className="bottom-player-wrap">
                {/* 锁定按钮*/}
                <div className="bottom-player-locking" onClick={() => changePlayerLock()}>
                    <div className={classnames({
                        "lock": true,
                        "lock-open": !playerLock,
                    })}/>
                </div>
                {/*  播放按钮 */}
                <div className="bottom-player-broadcast">
                    <div className="player-broadcast-prev"></div>
                    <div className="player-broadcast-pause"></div>
                    <div className="player-broadcast-next"></div>
                </div>
                {/* 歌曲信息、进度条*/}
                <div className="bottom-player-info">
                    <div className="player-info-head"><img src={songInfo.cover}/></div>
                    <div className="player-info-content">
                        <div className="player-info-title">
                            <h3 className="line-omit">{songInfo.name}</h3>
                            <span>{songInfo.singer}</span>
                            {songInfo.name ? <s/> : ""}
                        </div>
                        {/*进度条*/}
                        <BottomPlayerSchedule/>
                    </div>
                </div>
                <div className="bottom-player-function">
                    {/*收藏*/}
                    <div className="player-function-collect"/>
                    {/*分享*/}
                    <div className="player-function-share"/>

                    <span/>

                    {/*音量*/}
                    <div className="player-function-volume"/>
                    {/*循环模式*/}
                    <div className="player-function-mode"/>
                    {/*历史记录*/}
                    <div className="player-function-history" onClick={() => setHistoryVisible(!historyVisible)}>
                        <span>
                            {/*{historyList.ids.length || historyNum}*/}
                            {historyList.ids.length}
                        </span>
                    </div>
                </div>
            </div>

            {/* 历史记录弹窗 */}
            <div className={classnames({
                "history-wrap": true,
                "visible": historyVisible
            })}>
                {/*顶部栏*/}
                <div className="history-wrap-head">
                    <h3 className="title">播放列表（{historyList.ids.length}）</h3>
                    <div className="collect">
                        <span/>
                        <p>收藏全部</p>
                    </div>
                    <div className="clear">
                        <span/>
                        <p>清除</p>
                    </div>
                    <h3 className="song-name">{songInfo.name}</h3>
                    <span className="close" onClick={() => setHistoryVisible(false)}/>
                </div>
                {/*内容栏*/}
                <div className="history-wrap-content">

                    <ul className="song-list">
                        {
                            historyList.list.map((item: HistoryItem) =>
                                <li>
                                    {/*播放示意按钮*/}
                                    <span className="player-btn"/>
                                    {/*歌曲名称*/}
                                    <h3 className="song-name line-omit">{item.name}</h3>
                                    {/*歌手*/}
                                    <h3 className="singer line-omit">{item.singer}</h3>
                                    {/*时长*/}
                                    <p className="duration line-omit">{second2minute(item.duration)}</p>
                                    {/*链接*/}
                                    <span className="link"/>
                                </li>
                            )
                        }
                    </ul>
                    <div className="separate-line"/>
                    <div className="song-lyric">
                    {/*<div className="song-lyric" dangerouslySetInnerHTML={{__html: lyric}}>*/}
                        {/*<div className="song-lyric" dangerouslySetInnerHTML={{__html: `<div>123</div>`}}>*/}
                        {
                            lyricList.map((item:any)=>
                                <p>{item.split(`]`)[1]}</p>
                            )
                        }
                    </div>
                    <div className="scroll">

                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return state;
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        changeBottomPlayerVisible: (visible: boolean) => dispatch({type: "CHANGE_BOTTOM_PLAYER_VISIBLE", visible}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomPlayer)
