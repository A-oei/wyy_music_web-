//热门推荐view
import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";

export default function PopularRecommendation() {
    const history: any = useHistory();

    useEffect(() => {
        console.log(history.location.state, 'state');
    }, [])

    function routerJump() {
        history.push("/test")
    }



    return (
        <div onClick={() => routerJump()}>
            <audio
                src="http://m8.music.126.net/20201119110218/ce9143fd8aa5c184256651824b48b823/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3"
                controls>
                您当前的浏览器不支持audio，请更换浏览器
            </audio>
            {/*<h3 onClick={}>播放</h3>*/}
        </div>
    )
}
