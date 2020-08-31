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

import services from "../../services/home";


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
        getBannerList(0);
    }, [])


    //热门歌单数据
    const songLists: SongItemType[] = [{title: "title", plays: "111", imgUrl: "22"}];

    const popularProps: TitleColumnType = {title: "热门推荐", link: "/", slot: PopularCategories}

    const newProps: TitleColumnType = {title: "新碟上架", link: "/"};

    const comprehensiveList: TitleColumnType = {title: "榜单", link: "/"};


    const [bannerCarouselProps, setBannerCarouselProps] = useState({width: 730, bannerList: [], bannerNumber: 0});//传入广告轮播图组件数据

    const [popularRecommendation, setPopularRecommendation] = useState([1, 2, 3, 4, 5]);//热门推荐数据

    //新碟上架
    const [newShelves, setNewShelves] = useState([1, 2, 3, 4, 5, 7, 8, 9, , 10]);//列表数据

    const [newShelfCurrent, setNewShelfCurrent] = useState(0);//轮播标记
    const [newShelfTransition, setNewShelfTransition] = useState(true);//是否开启动画
    const [transitionOver, setTransitionOver] = useState(false);//动画是否结束


    // const bannerCarouselProps: BannerCarouselType = {
    //     width: 730,
    //     bannerList
    // }


    //新碟上架方法
    function slideNewShelf(index: number) {
        if (transitionOver) return;
        setNewShelfTransition(true);
        setNewShelfCurrent(newShelfCurrent + index);
        setTransitionOver(true);
    }//点击侧边按钮

    function newShelfEnd() {
        let currentIndex = newShelfCurrent
        if (currentIndex <= 0) {
            setNewShelfTransition(false);
            setNewShelfCurrent(2);
        } else if (currentIndex >= 3) {
            setNewShelfTransition(false);
            setNewShelfCurrent(0);
        }
        setTransitionOver(false);
    }//监听动画结束事件


    async function getBannerList(type: number) {
        const data = await services.get_banner_list({type});

        let l = data.banners.length;
        let banners=data.banners;
        console.log(banners,'banners')
        let start = banners[0], end = banners[banners.length - 1];
        data.banners.push(start);
        data.banners.unshift(end);
        console.log(data.banners,'data.bannerList')
        setBannerCarouselProps({
            width: 730,
            bannerList: data.banners,
            bannerNumber: l
        });
    };//获取轮播图数据


    return (
        <div className="home">
            <div className="home-banner">
                <div className="home-banner-wrap">
                    {/*轮播图*/}
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
                    <TitleColumn props={newProps}/>
                    <div className="home-new-shelf">
                        <span className="new-shelf-left" onClick={() => slideNewShelf(-1)}/>
                        <span className="new-shelf-right" onClick={() => slideNewShelf(1)}/>
                        <ul className="new-shelf-box" style={{
                            left: -100 * newShelfCurrent + '%',
                            transition: newShelfTransition ? 'all 2s' : 'none',
                        }}
                            onTransitionEnd={() => newShelfEnd()}
                        >
                            <li>
                                {
                                    newShelves.slice(4).map((item, index) =>
                                        <DiscItem key={`shelf_1_${index}`}/>
                                    )
                                }
                            </li>
                            <li>
                                {
                                    newShelves.slice(0, 5).map((item, index) =>
                                        <DiscItem key={`shelf_2_${index}`}/>
                                    )
                                }
                            </li>
                            <li>
                                {
                                    newShelves.slice(4).map((item, index) =>
                                        <DiscItem key={`shelf_3_${index}`}/>
                                    )
                                }
                            </li>
                            <li>
                                {
                                    newShelves.slice(0, 5).map((item, index) =>
                                        <DiscItem key={`shelf_4_${index}`}/>
                                    )
                                }
                            </li>
                        </ul>
                    </div>

                    {/*榜单*/}
                    <TitleColumn props={comprehensiveList}/>
                    <ul className="home-top">
                        <li>
                            <HomeTopLists
                                data={{headerImg: "", headerTitle: "网易云音乐热歌榜", lists: [{name: "入海"}, {name: "入海"}]}}/>
                        </li>
                        <li>
                            <HomeTopLists
                                data={{headerImg: "", headerTitle: "网易云音乐热歌榜", lists: [{name: "入海"}, {name: "入海"}]}}/>
                        </li>
                        <li>
                            <HomeTopLists
                                data={{headerImg: "", headerTitle: "网易云音乐热歌榜", lists: [{name: "入海"}, {name: "入海"}]}}/>
                        </li>
                    </ul>
                </div>
                {/*右侧*/}
                <div className="home-content-right">
                    {/*用户登录*/}
                    <div className="user-login">
                        <p>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
                        <div>用户登录</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
