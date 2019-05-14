import React from 'react';
import {isMobile} from 'react-device-detect';
import Vimeo from '@u-wave/react-vimeo';

let VimeoProjectDetail = (props) => {
    
    const vimeoID = props.vimeoID ? props.vimeoID : '';
    const vimeoThumbnail = props.vimeoThumbnail ? props.vimeoThumbnail : '';
    const vimeoCaption =  props.vimeoCaption ? props.vimeoCaption : '';

    let vimeo_project='';

    if (vimeoID) {
        if (isMobile) {
            vimeo1 = <div className="project-info--media m-b-35">
                <div className="card card-3x2">
                    <div className="card-content">
                        <div className="video video--iframe vimeo">
                            <Vimeo
                                className="vimeo_wrap"
                                video={vimeoID}
                                muted={false}
                                autoplay={true}
                                loop={true}
                                showTitle={false}
                                showByline={false}
                                showPortrait={false}
                            />
                        </div>
                    </div>
                </div>
                <div className="project-caption">
                    <p>{vimeoCaption}</p>
                </div>
            </div>;
        } else{
            vimeo = <div className="project-info--media m-b-35">
                <div className="card card-3x2 card-vimeo">
                    <div className="card-content">
                        <Vimeo
                            className="vimeo_wrap"
                            video={vimeoID}
                            muted={false}
                            autoplay={true}
                            loop={true}
                            showTitle={false}
                            showByline={false}
                            showPortrait={false}
                            width="651"
                            background={true}
                        />
                    </div>
                </div>
                <div className="project-caption">
                    <p>{vimeoCaption}</p>
                </div>
            </div>;
        }
    }

    return {vimeo_project};
};

export default VimeoProjectDetail;