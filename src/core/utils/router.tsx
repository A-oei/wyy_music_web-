import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

//组件导入
import Home from "../../views/home";
import ClientDownload from "../../views/clientDownload";
import Test from "../../views/Test";
import PopularRecommendation from "../../views/PopularRecommendation";


export default function Routers() {
    return (
        <div>
            <Router>
                <Route path="/download" exact component={ClientDownload}/>
                <Route path="/test" exact component={Test}/>
                <Route path="/popularRecommendation" exact component={PopularRecommendation}/>
                <Route path="/" exact component={Home}/>
            </Router>
        </div>
    )
}
