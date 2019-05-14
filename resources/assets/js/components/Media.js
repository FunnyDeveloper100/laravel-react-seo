import React, {Component} from 'react';

let Media = (props) => {
    
    const media = props.media;

    let media_html = <span className="ajax-loader"><img src='../img/ajax-loader.gif' /></span>;

    const alt = media.fields.title;

    const caption = media.fields.description != '' ? <p>{media.fields.description}</p> : '';


    if (media.fields.file.contentType == "image/jpeg" || media.fields.file.contentType == "image/png") {

        media_html = <div>
            <div className="project-image">
                <img src={media.fields.file.url} alt={alt}/>
            </div>
            <div className="project-caption">
                {caption}
            </div>
        </div>;
    }

    if (media.fields.file.contentType == "video/mp4") {
        
        media_html = <div>
            <div className="card card-3x2">
                <div className="card-content">
        
                    <video autoPlay={true} loop ={true} playsInline muted>
                        <source src={media.fields.file.url} type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video>

                </div>
            </div>
            <div className="project-caption">
            {caption}
            </div>
        </div>;
    }

    return <div className="project-info--media m-b-35" key={media.sys.id}>
        {media_html}
    </div>;
};

export default Media;