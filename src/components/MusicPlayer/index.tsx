import React, {useState, useEffect, useLayoutEffect,useRef} from "react";

import {connect} from "react-redux";
import common from "../../services/common";

function MusicPlayer(props: any) {

    const {songId} = props;

    const testUrl=useRef({url:""})

    const [songInfo, setSongInfo] = useState({});//歌曲信息
    const [songUrl, setSongUrl] = useState<string>("");//歌曲地址
    const [autoplay, setAutoplay] = useState<boolean>(false);//是否播放

    console.log(testUrl,"testUrl")

    //获取歌曲url
    async function getSongUrl(params: { id: string }) {
        const {data} = await common.getSongUrl({id: params.id});
        const url = data[0]['url']
        setSongUrl(url);
        setAutoplay(true);
        console.log(autoplay, "autoplay")
    }

    //获取歌曲信息
    function getSongInfo(params: { ids: string }) {
        common.getSongInfo(params)
            .then((res: any) => {
                console.log(res, "res,song")
            })
    }


    useEffect(() => {
        if (!songId) return;
        getSongInfo({ids: songId});
        getSongUrl({id: songId});
    }, [songId])


    return (
        <div className="music-player">
            <audio
                src={songUrl}
                autoPlay={autoplay}
                controls>
                您当前的浏览器不支持audio，请更换浏览器
            </audio>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return state;
}

export default connect(mapStateToProps,)(MusicPlayer);
