//进度条
import React from "react";

import {second2minute} from "../../core/utils/utils";
import {connect} from "react-redux";

function BottomPlayerSchedule(props: any) {
    const {songInfo, rate, playTime} = props;
    return (
        <div className="player-info-schedule">
            {/*进度示意标识*/}
            <span style={{left: rate * 100 - 2 + "%"}}/>
            <div className="info-schedule-background"/>
            <div className="info-schedule-mark" style={{width: Math.round(rate * 100) + "%"}}/>
            {
                songInfo.duration > 0
                    ? <div className="info-schedule-timekeeping">
                        <span>{playTime}&nbsp;</span>
                        / {second2minute(songInfo.duration)}
                    </div>
                    : ""
            }
        </div>
    )
}

function mapStateToProps(state: any) {
    return state;
}

export default connect(mapStateToProps)(BottomPlayerSchedule);
