import React, {useState, useEffect, useLayoutEffect} from "react";
import "./index.scss";

import {connect} from "react-redux";
import classnames from 'classnames';

function BottomPlayer(props: any) {
    const {bottomPlayerVisible} = props;

    const [songInfo, setSongInfo] = useState({
        name: "听妈妈的话",//歌曲名称
        singer: "周杰伦",//演唱者
        duration: "04:03",//歌曲时长
        currentDuration: "03:02",//当前播放进度
        cover: "https://bkimg.cdn.bcebos.com/pic/5882b2b7d0a20cf44d513ed676094b36adaf99f2?x-bce-process=image/watermark,image_d2F0ZXIvYmFpa2U4MA==,g_7,xp_5,yp_5",//封面
    })

    return (
        <div className={classnames({
            "bottom-player": true,
            "pack-up": !bottomPlayerVisible
        })}>

            <div className="bottom-player-wrap">
                {/* 锁定按钮*/}
                <div className="bottom-player-locking">
                    <div className={classnames({
                        "lock": true,
                        "lock-open": bottomPlayerVisible
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
                            <s/>
                        </div>
                        {/*进度条*/}
                        <div className="player-info-schedule">
                            {/*进度示意标识*/}
                            <span/>
                            <div className="info-schedule-background"/>
                            <div className="info-schedule-mark"/>
                            <div className="info-schedule-timekeeping">
                                <span>{songInfo.currentDuration}&nbsp;</span>
                                / {songInfo.duration}
                            </div>
                        </div>
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
                    <div className="player-function-history">
                        <span>
                            22
                        </span>
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
        sendSongInfo: () => dispatch({})
    }
}
export default connect(mapStateToProps)(BottomPlayer)
