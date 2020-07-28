import React, {useState, useEffect, useReducer, useContext} from "react";
import "./index.scss";

import {SongItemType} from "../../core/utils/type";

export default function SongItem(props:{data:SongItemType}) {
    return (
        <div className="song-item">
            {/*歌单封面*/}
            <div className="song-item-cover">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTwkPyz8HdOqwWPz1Zwk3iKti_LRdqPBdv9Ng&usqp=CAU"/>
                <div className="play-column">
                    <span className="play-column-icon"/>
                    <span className="play-volume">520万</span>
                    <div className="play-btn"/>
                </div>
            </div>
            {/*歌单标题*/}
            <h3 className="song-item-name">
                <span className="item-name-type"/>
                <span className="item-name-title">浓夏绿日｜漫长的告别</span>
            </h3>
        </div>
    )
}
