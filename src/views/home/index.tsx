import React, {useState, useEffect, useMemo, useCallback,useLayoutEffect} from "react";
import {useHistory, Link} from "react-router-dom";

import "./index.scss";
import BannerCarousel from "../../components/BannerCarousel/index";
import TitleColumn from "../../components/TitleColumn";
import SongItem from "../../components/SongItem/index";
import DiscItem from "../../components/DiscItem/index";
import HomeTopLists from "../../components/HomeTopLists/index";

import {BannerCarouselType, HomeTopType, TitleColumnType, PopularAnchors} from "../../core/utils/type";

import {popularCategorie} from "../../assets/static/data";

import services from "../../services/home";


function Home(prop: any) {

    //热门推荐分类插槽
    function PopularCategories() {
        // @ts-ignore
        return (
            <div className="popular-categories">
                {
                    popularCategorie.map((item, index) =>
                        // <li key={`popular-categories_${index}`} onClick={()=>PopularCategoriesChange(item.path)}>
                        <Link key={`popular-categories_${index}`}
                              to={{pathname: `/popularRecommendation`, state: {assort: item.value}}}>
                            {/*<a href={item.path}>{item.value}</a>*/}
                            <i>{item.value}</i>
                            <span>|</span>
                        </Link>
                    )
                }
            </div>
        )
    }


    const popularProps: TitleColumnType = useMemo(() => {
        return {title: "热门推荐", link: "/", slot: PopularCategories}
    }, [])

    const newProps: TitleColumnType = useMemo(() => {
        return {title: "新碟上架", link: "/"}
    }, []);


    const comprehensiveList: TitleColumnType = useMemo(() => {
        return {title: "榜单", link: "/"};
    }, []);

    const [bannerBackgroundImg, setBannerBackgroundImg] = useState({url: ""});//banner轮播图背景毛玻璃图片
    const [bannerCarouselProps, setBannerCarouselProps] = useState({
        width: 730,
        bannerList: [],
        bannerNumber: 0,
        setBannerBackgroundImg
    });//传入广告轮播图组件数据


    const [popularRecommendation, setPopularRecommendation] = useState([]);//热门推荐数据

    const [soarList, setSoarList] = useState<HomeTopType>({headerImg: "", headerTitle: "", lists: [{name: ""}]});//飙升榜数据
    const [newList, setNewList] = useState<HomeTopType>({headerImg: "", headerTitle: "", lists: []});//新歌榜数据
    const [originalList, setOriginalList] = useState<HomeTopType>({headerImg: "", headerTitle: "", lists: []});//原创榜数据
    const [anchorsList, setAnchorsList] = useState<PopularAnchors[]>([{name: "", picUrl: "", rcmdtext: ""}]);

    //新碟上架
    const [newShelves, setNewShelves] = useState([]);//列表数据

    const [newShelfCurrent, setNewShelfCurrent] = useState(0);//轮播标记
    const [newShelfTransition, setNewShelfTransition] = useState(true);//是否开启动画
    const [transitionOver, setTransitionOver] = useState(false);//动画是否结束


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
        } else if (currentIndex >= 2) {
            setNewShelfTransition(false);
            setNewShelfCurrent(0);
        }
        setTransitionOver(false);
    }//监听动画结束事件


    const getBannerList = useCallback(async function (type: number) {
        const data = await services.get_banner_list({type});

        let l = data.banners.length;
        let banners = data.banners;
        let start = banners[0], end = banners[banners.length - 1];
        data.banners.push(start);
        data.banners.unshift(end);
        setBannerCarouselProps({
            width: 730,
            bannerList: data.banners,
            bannerNumber: l,
            setBannerBackgroundImg
        });
    }, []);//获取轮播图数据

    const getPopularRecommendation = useCallback(async function (cat: string = "全部") {
        const {playlists} = await services.get_popular_recommendation({cat, before: "", limit: 8, order: "hot"});
        //[{title: "title", plays: "111", imgUrl: "22"}]
        let songList: any = [];
        playlists.forEach((item: any) => {
            songList.push({title: item.name, imgUrl: item.coverImgUrl, plays: item.playCount})
        })
        setPopularRecommendation(songList)
    }, []);//获取热门推荐

    const getNewShelves = useCallback(async function () {
        const {monthData} = await services.get_new_shelves({type: "new", area: "ALL", limit: 10});
        setNewShelves(monthData);

    }, []);//获取新碟上架数据

    const getTopList = useCallback(async function () {
        const {list} = await services.get_top_info();
        const soar = list[0];
        const soarList = await services.get_top_list({id: soar.id});
        setSoarList({headerTitle: "云音乐飙升榜", headerImg: soar.coverImgUrl, lists: soarList.playlist.tracks.slice(0, 10)});

        const news = list[1];
        const newList = await services.get_top_list({id: news.id});
        setNewList({headerTitle: "云音乐新歌榜", headerImg: news.coverImgUrl, lists: newList.playlist.tracks.slice(0, 10)})

        const original = list[2];
        const originalList = await services.get_top_list({id: original.id});
        setOriginalList({
            headerTitle: "网易原创歌曲榜",
            headerImg: original.coverImgUrl,
            lists: originalList.playlist.tracks.slice(0, 10)
        });
    }, []);//获取榜单数据

    const getPopularAnchors = async function () {
        const {toplist} = await services.get_popular_anchors({limit: 5, type: "hot"});
        setAnchorsList(toplist);
    }

    useEffect(() => {
        getBannerList(0);
        getPopularRecommendation();
        getTopList();
        getNewShelves();
        getPopularAnchors();
    }, [])

    return (
        <div className="home">
            {/*顶部广告部分*/}
            <div className="home-banner">
                <img src={bannerBackgroundImg.url} className="home-banner-bg blur"/>
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
                                        <SongItem data={item} key={`songItem_${index}`}/>
                                    }
                                </li>)
                        }

                    </ul>
                    {/* 新碟上架*/}
                    <TitleColumn props={newProps}/>
                    <div className="home-new-shelf">
                        <span className="new-shelf-left" onClick={() => slideNewShelf(-1)}/>
                        <span className="new-shelf-right" onClick={() => slideNewShelf(1)}/>
                        <ul className="new-shelf-box" style={{
                            left: -100 * newShelfCurrent + '%',
                            transition: newShelfTransition ? 'all 3s' : 'none',
                        }}
                            onTransitionEnd={() => newShelfEnd()}
                        >
                            <li>
                                {
                                    newShelves.slice(5).map((item, index) =>
                                        <DiscItem key={`shelf_1_${index}`} data={item}/>
                                    )
                                }
                            </li>
                            <li>
                                {
                                    newShelves.slice(0, 5).map((item, index) =>
                                        <DiscItem key={`shelf_2_${index}`} data={item}/>
                                    )
                                }
                            </li>
                            <li>
                                {
                                    newShelves.slice(5).map((item, index) =>
                                        <DiscItem key={`shelf_3_${index}`} data={item}/>
                                    )
                                }
                            </li>
                        </ul>
                    </div>

                    {/*榜单*/}
                    <TitleColumn props={comprehensiveList}/>
                    <ul className="home-top">
                        <li><HomeTopLists data={soarList}/></li>
                        <li><HomeTopLists data={newList}/></li>
                        <li><HomeTopLists data={originalList}/></li>
                    </ul>
                </div>
                {/*右侧*/}
                <div className="home-content-right">
                    {/*用户登录*/}
                    <div className="user-login">
                        <p>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
                        <div>用户登录</div>
                    </div>

                    {/*热门主播*/}
                    <div className="popular-anchors">
                        <h3>热门主播</h3>
                        <ul>
                            {
                                anchorsList.map((item,index) =>
                                    <li key={`popular_anchors_${index}`}>
                                        <img src={item.picUrl}/>
                                        <div>
                                            <p className="line-omit">{item.name}</p>
                                            <p className="line-omit">{item.rcmdtext}</p>
                                        </div>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
