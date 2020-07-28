import React, {useState, useEffect, createContext} from "react";
import {useHistory, Link} from "react-router-dom";

import "./index.scss";

import BannerCarousel from "../../components/BannerCarousel/index";
import TitleColumn from "../../components/TitleColumn";
import SongItem from "../../components/SongItem/index";
import DiscItem from "../../components/DiscItem/index";
import HomeTopLists from "../../components/HomeTopLists/index";

import {BannerCarouselType, SongItemType, TitleColumnType} from "../../core/utils/type";

import {popularCategorie} from "../../assets/static/data";


//热门推荐分类插槽
function PopularCategories() {
    return (
        <ul className="popular-categories">
            {
                popularCategorie.map((item, index) =>
                    <li key={`popular-categories_${index}`}>
                        <a href={item.path}>{item.value}</a>
                        <span>|</span>
                    </li>
                )
            }
        </ul>
    )
}

function Home(prop: any) {
    const history = useHistory();

    useEffect(() => {
        console.log(history, 'withRouter')
    })

    //传入广告轮播图组件数据
    const bannerCarouselProps: BannerCarouselType = {
        width: 730
    }

    //热门歌单数据
    const songLists: SongItemType[] = [{title: "title", plays: "111", imgUrl: "22"}];

    const popularProps: TitleColumnType = {title: "热门推荐", link: "/", slot: PopularCategories}

    const newProps:TitleColumnType={title:"新碟上架",link:"/"}

    const popularRecommendation = [1, 2, 3, 4, 5]

    return (
        <div className="home">
            <div className="home-banner">
                <div className="home-banner-wrap">
                    <BannerCarousel data={bannerCarouselProps}/>
                    <div className="home-banner-download">
                        <Link to="/download">下载客户端</Link>
                        <p>PC 安卓 iPhone WP iPad Mac 六大客户端</p>
                    </div>
                </div>
            </div>
            <div className="home-content">
                <div className="home-content-left">
                    {/*热门推荐*/}
                    <TitleColumn props={popularProps}>
                        {/*<div>这是默认插槽，通过props.children</div>*/}
                    </TitleColumn>
                    <ul className="home-popular-recommendation">
                        {
                            popularRecommendation.map((item, index) =>
                                <li className="popular-recommendation-item" key={`recommendation-item_${index}`}>
                                    {
                                        songLists.map((item: SongItemType, index) =>
                                            <SongItem data={item} key={`songItem_${index}`}/>
                                        )
                                    }
                                </li>)
                        }

                    </ul>
                    {/* 新碟上架*/}
                    {/*<TitleColumn props={newProps}></TitleColumn>*/}
                    <TitleColumn props={newProps}>
                        {/*<div>这是默认插槽，通过props.children</div>*/}
                    </TitleColumn>
                </div>
                <div className="home-content-right">

                </div>
            </div>


            <div className="home-popular-recommendation">
                {
                    songLists.map((item: SongItemType, index) =>
                        <SongItem data={item} key={`songItem_${index}`}/>
                    )
                }
            </div>


            <ul>
                <li>
                    <DiscItem/>
                </li>
            </ul>

            <ul className="home-top">
                <li>
                    <HomeTopLists data={{headerImg: "", headerTitle: "网易云音乐热歌榜", lists: [{name: "入海"}, {name: "入海"}]}}/>
                </li>
                <li>
                    <HomeTopLists data={{headerImg: "", headerTitle: "网易云音乐热歌榜", lists: [{name: "入海"}, {name: "入海"}]}}/>
                </li>
                <li>
                    <HomeTopLists data={{headerImg: "", headerTitle: "网易云音乐热歌榜", lists: [{name: "入海"}, {name: "入海"}]}}/>
                </li>
            </ul>
        </div>
    )
}

export default Home;
