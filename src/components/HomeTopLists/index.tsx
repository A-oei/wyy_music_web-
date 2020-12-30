import React, {memo} from "react";
import "./index.scss";

import {HomeTopType} from "../../core/utils/type";

import {connect} from "react-redux";


let HomeTopLists = memo((props: { data: HomeTopType, showBottomPlayer: any }) => {
    console.log("HomeTopLists")
    const {lists, headerTitle, headerImg} = props.data;

    const {showBottomPlayer} = props;

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
                    lists && lists.map((item, index) =>
                        <li className="top-lists-item" key={`top_lists_item${index}`}>
                            <span>{index + 1}</span>
                            <p className="line-omit">{item.name}</p>
                            <div>
                                <span onClick={() => showBottomPlayer(item)}/>
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
})

// let HomeTopLists = memo(HomeTopLists)

function MapDispatchToProps(dispatch: any) {
    return {
        showBottomPlayer: (item: any) => dispatch({type: 'CHANGE_BOTTOM_PLAYER_VISIBLE', visible: true, id: item.id})
    }
}

export default connect(null, MapDispatchToProps)(HomeTopLists);
