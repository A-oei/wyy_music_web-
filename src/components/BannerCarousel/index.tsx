/**
    * @Author: Aoei
    * @date: 7/21/20
    * @Description: 广告轮播图插件
*/

import React, {useState, useEffect, useReducer, useContext} from "react";
//样式
import "./index.scss";

import {BannerCarouselType} from "../../core/utils/type";

type StateType = {
    currentIndex: number
}


export default function BannerCarousel(props: { data: BannerCarouselType }) {

    const [bannerLists, setBannerLists] = useState(["5", "1", "2", "3", "4", "5", "1"]);//轮播图片集合
    const [isAutomatic, setIsAutomatic] = useState<boolean>(true);//计时器是否运行
    const [isTransition, setIsTransition] = useState<boolean>(true); //是否保留transition状态
    const [carouselProps, setCarouselProps] = useState<BannerCarouselType>(props.data)

    function setCurrent(state: StateType, type: string) {
        let current = state.currentIndex;

        if (type == "prev") {
            current--;
            setIsAutomatic(false);
        } else if (type == "next") {
            current++;
            setIsAutomatic(false);
        } else {
            isAutomatic && current++;
        }


        if (current >= 6) {
            setIsTransition(false);
            return {currentIndex: 0};
        } else {
            setIsTransition(true);
            return {currentIndex: current};
        }
    }

    function isActive(index: number): boolean {
        let current = state.currentIndex, max = bannerLists.length - 3;
        current > (max) && (current = 0);

        return current == index;
    }

    const [state, dispatch] = useReducer(setCurrent, {currentIndex: 0});

    useEffect(() => {
        let timer = setInterval(() => {
            dispatch("");
            setIsAutomatic(true);
        }, 1500);
        return () => clearInterval(timer);
    }, [])

    useEffect(() => {
        setCarouselProps(props.data);//如果props发生变化重新赋值
    }, [props.data])

    return (
        <div className="banner-carousel">
            <div className="carousel-btn-left" data-btn="carousel" onClick={() => dispatch("prev")}/>
            <div className="carousel-btn-right" data-btn="carousel" onClick={() => dispatch("next")}/>
            {/*轮播主体*/}
            <div className="banner-carousel-wrap">
                <ul style={{
                    width: 100 * bannerLists.length + "%",
                    left: -(state.currentIndex * carouselProps.width) + 'px',
                    transition: isTransition ? "all 1s" : "none"
                }}>
                    {
                        bannerLists.map((item, index) =>
                            <li key={index} style={{width: carouselProps.width + "px"}}>{item}</li>
                        )
                    }
                </ul>
                {/*下标点*/}
                <ol className="carousel-subscript">
                    {
                        Array.from(Array(bannerLists.length - 2), (item, index) =>
                            <li className={isActive(index) ? "active" : ""}
                                key={`carousel-subscript-${index}`}/>)
                    }
                </ol>
            </div>
        </div>
    )
}
