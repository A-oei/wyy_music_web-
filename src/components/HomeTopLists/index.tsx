import React from "react";
import "./index.scss";

import {HomeTopType} from "../../core/utils/type";

export default function HomeTopLists(props: { data: HomeTopType }) {

    const {lists, headerTitle, headerImg} = props.data;

    return (
        <div className="home-top-lists">
            <div className="top-lists-header">
                <div className="lists-header-img">
                    <img src={headerImg}/>
                    <a href=""/>
                </div>
                <div className="lists-header-title">
                    <h3>{headerTitle}</h3>
                    <div>
                        <span/>
                        <span/>
                    </div>
                </div>
            </div>
            <ul className="top-lists">
                {
                    lists.map((item, index) =>
                        <li className="top-lists-item" key={`top_lists_item${index}`}>
                            <span>{index + 1}</span>
                            <p>{item.name}</p>
                            <div>
                                <span/>
                                <span/>
                                <span/>
                            </div>
                        </li>
                    )
                }
                <li className="top-lists-more">
                    查看全部 >
                </li>
            </ul>
        </div>
    )
}
