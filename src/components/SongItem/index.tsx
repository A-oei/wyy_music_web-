import React, {useState, useEffect, useReducer, useContext} from "react";
import "./index.scss";

import {SongItemType} from "../../core/utils/type";

import {connect} from "react-redux";

function SongItem(props: { data: SongItemType, playSingle: any }) {
    const {playSingle} = props;
    return (
        <div className="song-item">
            {/*歌单封面*/}
            <div className="song-item-cover">
                <img src={props.data.imgUrl}/>
                <div className="play-column">
                    <span className="play-column-icon"/>
                    <span className="play-volume">{props.data.plays}</span>
                    <div className="play-btn" onClick={() => playSingle()}/>
                </div>
            </div>
            {/*歌单标题*/}
            <h3 className="song-item-name">
                {/*<span className="item-name-type"/>*/}
                <span className="item-name-title">{props.data.title}</span>
            </h3>
        </div>
    )
}

function MapDispatchToProps(dispatch: any) {
    return {
        playSingle: () => dispatch({type: "SHOW_BOTTOM_PLAYER", visible: true, id: ""})
    }
}

export default connect(null, MapDispatchToProps)(SongItem);
