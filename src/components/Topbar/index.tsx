import React, { useState } from 'react';
import { topTLists, topBLists } from "../../assets/static/data";
import {Link} from "react-router-dom";

import './index.scss';




function Topbar() {
    // 是否展示子导航
    const [subnavShow, setSubnavShow] = useState<boolean>(true),
        [navIndex,setNavIndex]=useState<number>(0),
        [subnavIndex, setSubnavIndex] = useState<number>(0);


    const navigationChange=(index:number)=>{
        setSubnavShow(index===0)
        setNavIndex(index)
    }

    return (
        <div className="top-bar">
            {/*顶部导航栏*/}
            <div className="bar-t">
                <h1 className="bar-t-logo">
                    <a href="/">网易云音乐</a>
                </h1>

                <ul>
                    {topTLists.map((item, index) =>
                        <Link key={`topbar_t_${index}`}
                            onClick={()=>navigationChange(index)}
                              to={item.path}
                        >
                            {item.value}
                            {index == 5 && <span className="item-hot-icon" />}
                            {navIndex==index&&<i className="bara-b-arrow" />}
                        </Link>
                    )}
                </ul>

                <div className="bar-t-features">
                    <div className="t-features-search">
                        <input type="text" placeholder="音乐/视频/电台/用户" />
                        <span className="features-search-icon"></span>
                    </div>
                    <button>创作者中心</button>
                    <div className="t-features-login">登录</div>
                </div>
            </div>
            {/* 底部导航栏 */}
            <div className={`${subnavShow && 'has-lists'} bar-b`}>
                {
                    subnavShow &&
                    (<ul>
                        {topBLists.map((item, index) =>
                            <li key={`topbar_b_${index}`}
                                onClick={() => setSubnavIndex(index)}
                                className={subnavIndex == index ? 'is-active' : ''}>
                                {item.value}
                            </li>
                        )}
                    </ul>)
                }
            </div>
        </div>
    )
}

export default Topbar;
