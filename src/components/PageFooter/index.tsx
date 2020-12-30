import React, {useState, useEffect, useReducer, useContext} from "react";
import "./index.scss"

//条款列表
const termsLists = [
    {
        href: "https://st.music.163.com/official-terms/service",
        title: "服务条款"
    },
    {
        href: "https://st.music.163.com/official-terms",
        title: "隐私政策"
    },
    {
        href: "https://music.163.com/st/staticdeal/complaints.html",
        title: "版权投诉指引"
    }
]
//功能列表
const functionLists = [
    {href: "https://music.163.com/st/userbasic#/auth", position: "-63px -101px", name: "用户认证"},
    {href: "https://music.163.com/nmusician/web/index#/", position: "0 0", name: "独立音乐人"},
    {href: "https://music.163.com/web/reward", position: "-60px -50px", name: "赞赏"},
    {href: "https://music.163.com/st/userbasic#/auth", position: "0 -101px", name: "视频奖励"},
];

export default function PageFooter() {
    return (
        <div className="page-footer">
            <div className="page-footer-content">
                {/*版权*/}
                <div className="footer-content-copyright">
                    <div className="content-copyright-terms">
                        {
                            termsLists.map((item, index) =>
                                <p key={`copyright_terms_p_${index}`}>
                                    <a href={item.href} key={index}>{item.title}</a>
                                    <span>|</span>
                                </p>
                            )
                        }
                    </div>
                    <p>
                        <span>网易公司版权所有©1997-2020</span>
                        <span>杭州乐读科技有限公司运营：浙网文[2018]3506-263号</span>
                    </p>
                    <p>
                        <span>违法和不良信息举报电话：0571-89853516</span>
                        <span>举报邮箱：ncm5990@163.com</span>
                    </p>
                    <p>
                        <span>粤B2-20090191-18</span>
                        <span>工业和信息化部备案管理系统网站</span>
                    </p>
                </div>
                {/*功能*/}
                <div className="footer-content-function">
                    {
                        functionLists.map((item, index) =>
                            <a href={item.href} style={{backgroundPosition: item.position}} key={`function_${index}`}>
                                <span>{item.name}</span>
                            </a>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
