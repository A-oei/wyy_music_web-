/**
 * @Author: Aoei
 * @date: 7/21/20
 * @Description: 广告轮播图插件
 */


import React, {useState, useEffect, useReducer, memo,useLayoutEffect} from "react";
//样式
import "./index.scss";

import {BannerCarouselType} from "../../core/utils/type";

type StateType = {
    currentIndex: number
}


export default memo(function BannerCarousel(props: { data: BannerCarouselType }) {

    const [isAutomatic, setIsAutomatic] = useState<boolean>(true);//计时器是否运行
    const [isTransition, setIsTransition] = useState<boolean>(true); //是否保留transition状态
    const [carouselProps, setCarouselProps] = useState<BannerCarouselType>(props.data)

    function setCurrent<T extends StateType>(state: T, type: string) {
        let current = state.currentIndex;

        if (type === "prev") {
            current--;
            setIsAutomatic(false);
        } else if (type === "next") {
            current++;
            setIsAutomatic(false);
        } else {
            isAutomatic && current++;
        }

        if (current >= props.data.bannerList.length - 1) {
            setIsTransition(false);
            return {currentIndex: 0};
        } else if (current < 0) {
            setIsTransition(false);
            return {currentIndex: props.data.bannerList.length - 3};
        } else {
            setIsTransition(true);
            props.data.setBannerBackgroundImg({url: props.data.bannerList[current]['imageUrl']})
            return {currentIndex: current};
        }
    }

    function isActive(index: number): boolean {
        let current = state.currentIndex, max = carouselProps.bannerList.length - 3;
        current > (max) && (current = 0);

        return current == index;
    }

    function viewBannerCarousel(item:{encodeId:number,targetType:number,targetId:number}) { //查看轮播图详情

    }


    const [state, dispatch] = useReducer(setCurrent, {currentIndex: 0});

    useLayoutEffect (() => {
        let timer = setInterval(() => {
            dispatch("");
            setIsAutomatic(true);
        }, 3000);
        return () => clearInterval(timer);
    }, [])

    useEffect(() => {
        setCarouselProps({
            width: props.data.width,
            bannerList: props.data.bannerList,
            bannerNumber: props.data.bannerNumber,
        });//如果props发生变化重新赋值
    }, [props.data])

    return (
        <div className="banner-carousel">
            <div className="carousel-btn-left" data-btn="carousel" onClick={() => dispatch("prev")}/>
            <div className="carousel-btn-right" data-btn="carousel" onClick={() => dispatch("next")}/>
            {/*轮播主体*/}
            <div className="banner-carousel-wrap">
                <ul style={{
                    width: 100 * carouselProps.bannerList.length + "%",
                    left: -(state.currentIndex * carouselProps.width) + 'px',
                    transition: isTransition ? "all 1s" : "none"
                }}>
                    {
                        carouselProps.bannerList.map((item, index) =>
                            <li key={index} style={{width: carouselProps.width + "px"}}
                                onClick={() => viewBannerCarousel(item)}>
                                <img src={item.imageUrl}/>
                            </li>
                        )
                    }
                </ul>
                {/*下标点*/}
                <ol className="carousel-subscript">
                    {
                        Array.from(Array(carouselProps.bannerNumber), (item, index) =>
                            <li className={isActive(index) ? "active" : ""}
                                key={`carousel-subscript-${index}`}/>)
                    }

                </ol>
            </div>
        </div>
    )
})
