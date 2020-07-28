import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

//组件导入
import Home from "../../views/home";
import ClientDownload from "../../views/clientDownload";

export default function Routers() {
    return (
            <div>
                <Route path="/" exact component={Home}/>
                <Route path="/download" exact component={ClientDownload}/>
            </div>
    )
}
