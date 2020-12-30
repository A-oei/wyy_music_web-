import React, {useEffect,memo} from 'react';
import "./index.scss";
import {TitleColumnType} from "../../core/utils/type";

export default memo(function TitleColumn(props: { props: TitleColumnType,children?:any }) {

    const {slot, title, link} = props.props;

    return (
        <div className="title-column">
            <div className="title-column-title">
                <span/>
                <h3>{ props.props.title}</h3>
            </div>
            {slot&&slot()}
            {/*{props.children}   默认插槽*/}
            <div className="title-column-more">
                <span>更多</span>
                <i className="more-icon"/>
            </div>
        </div>
    )
})
