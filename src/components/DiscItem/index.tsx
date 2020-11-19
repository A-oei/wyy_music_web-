import React, {useState, useEffect, useReducer, useContext} from "react";
import "./index.scss";

export default function DiscItem(props: { data: any }) {
    return (
        <div className="disc-item">
            <img src={props.data.blurPicUrl}/>
            <div className="disc-item-btn"/>
            <div className="disc-info">
                <h3 className="disc-info-title line-omit">{props.data.name}</h3>
                <p className="disc-info-writer line-omit">{props.data.company}</p>
            </div>
        </div>
    )
}
