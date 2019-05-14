import React, {Component} from 'react';
import {Route, Link} from "react-router-dom";
import * as app_config from '../constants/app'
import {connect} from 'react-redux';

let ProjectItem = (props) => {
    
    const {project} = props;

    const {themeOptions} = props;

    let data_config = {
            primary_color: themeOptions.primaryColorGeneral ? themeOptions.primaryColorGeneral : app_config.PRIMARY_COLOR,
            second_color: themeOptions.secondColorGeneral ? themeOptions.secondColorGeneral : app_config.SECONDARY_COLOR
        };

    let media_html = '';

    const media = project.fields.image.fields.file;

    const alt = project.fields.image.fields.title;

    if (media.contentType == "image/jpeg" || media.contentType == "image/png") {

        media_html = <div className="card card-3x2">
            <div className="card-content">
                <img src={media.url} alt={alt}/>
            </div>
        </div>;
    }

    if (media.contentType == "video/mp4") {

        media_html = <div className="card card-3x2">

            <div className="card-content mp4">

                <video autoPlay={true} loop ={true} playsInline muted>
                    <source src={media.url} type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
                
            </div>

        </div>;

    }

    const style_primary_color = {
        color: data_config.primary_color
    };

    const style_second_color = {
        color: data_config.second_color
    };

    return <div className="project-item" key={project.sys.id}>

        <div className="project-item--right">
            <Link to={`/project/${project.fields.slug}`}>
                {media_html}
            </Link>
        </div>

        <div className={`project-item--left project-list project-list-${project.sys.id}`}>

            <Link to={`/project/${project.fields.slug}`}><h2 style={style_primary_color}>{project.fields.title}</h2></Link>
            <h3 className="desc"><Link style={style_second_color} to={`/project/${project.fields.slug}`}>{project.fields.description}</Link></h3>

        </div>

    </div>;
};

const mapStateToProps = state => ({
    themeOptions: state.themeOptions
});


export default connect(
    mapStateToProps
)(ProjectItem);