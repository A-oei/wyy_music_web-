import React from "react";
import "./index.scss";
import require from "../../core/utils/require";

export default function ClientDownload() {
    return (
        <div className="client-download">
            <div className="client-download-options">
                {/*下载全部客户端*/}
                <div className="download-options-all">
                    <span/>
                    <i>下载全部客户端</i>
                </div>
                {/*选择设备下载*/}
                <div className="download-options-equipment">
                    <div className="options-equipment-mac">
                        <h3>在电脑上听</h3>
                        <img src="./images/options-equipment-mac.jpeg"/>
                        <div>
                            <span>
                                <i/>
                                <s>macOS</s>
                            </span>
                            <span>
                                <i/>
                                <s>Windows</s>
                            </span>
                        </div>
                        <button>下载电脑客户端</button>
                    </div>
                    <div className="options-equipment-iphone">
                        <h3>在手机上听</h3>
                        <img src="./images/options-equipment-iphone.jpeg"/>
                        <div>
                            <span>
                                <i/>
                                <s>iPhone</s>
                            </span>
                            <span>
                                <i/>
                                <s>Android</s>
                            </span>
                        </div>
                        <button>下载手机客户端</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
