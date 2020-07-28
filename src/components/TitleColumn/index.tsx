import React, {useEffect} from 'react';
import "./index.scss";
import {TitleColumnType} from "../../core/utils/type";

export default function TitleColumn(props: { props: TitleColumnType,children?:any }) {

    useEffect(() => {
        console.log(props, 'TitleColumn-props')
    })

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
}
