import React from 'react';
import ReactDOM from 'react-dom';
import './core/style/base.scss';
import Topbar from "./components/Topbar/index";
import * as serviceWorker from './serviceWorker';
import Routers from "./core/utils/router";
import PageFooter from "./components/PageFooter/index";
import MusicPlayer from "./components/MusicPlayer/index";

import {BrowserRouter as Router} from "react-router-dom";

import {Provider} from "react-redux";
import {store} from "./redux";

import BottomPlayer from "./components/BottomPlayer";

ReactDOM.render(
    <Provider store={store}>
        <div className="app">
            <Router>
                <Topbar/>
                <div className="app-content">
                    {Routers()}
                </div>
                <PageFooter/>
                <BottomPlayer/>
                <MusicPlayer/>
            </Router>
        </div>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
