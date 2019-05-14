import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Media from '../components/Media';
import Footer from '../components/Footer';
import GoBack from '../components/GoBack';
import * as action from '../actions/project';
import Meta from '../components/Meta';
import {connect} from 'react-redux';
import * as app_config from '../constants/app';
import renderHTML from 'react-render-html';
import {isMobile} from 'react-device-detect';
import Vimeo from '@u-wave/react-vimeo';
//import VimeoProjectDetail from '../components/VimeoProjectDetail'

class ProjectDetail extends Component {

    constructor(props) {

        super(props);

        this.state = {
            project: {},
        };

    }


    componentDidMount() {

        window.scrollTo(0, 0);
        setTimeout(function(){ $('.footer').css({ "opacity": "1"}); }, 1000);
        const match = this.props.match;

        action.getProject(match.params.slug).then(entries => {

            if (entries.items.length > 0) {
                if (entries.items[0].fields) {

                    this.setState({
                        project: entries.items[0].fields
                    });

                }

                const project = this.state.project;

                let iScrollPos = 0;
                const el = document.getElementsByClassName("project-layout")[0];
                
                $(window).scroll(function () {

                    let iCurScrollPos = $(this).scrollTop();
                    
                    if (iCurScrollPos > iScrollPos || iCurScrollPos == 0){
                        //Scrolling Down
                        el.classList.remove('nav_fixed');
                    } else {
                        //Scrolling Up
                        el.classList.add('nav_fixed');
                        $('.project-layout--left').css({ "opacity": "1", "background": project.backgroundColorProject });

                    }
                    iScrollPos = iCurScrollPos;

                });

            }

        });

    }

    render() {
        const project = this.state.project;
        let medias = '';

        const {themeOptions} = this.props;

        if (project.medias != undefined) {
            medias = project.medias.map((media, index) => <Media media={media} key={index}/>);
        }

        let data_config = {

            head_text: themeOptions.headerOptionGeneral ? themeOptions.headerOptionGeneral : app_config.SITE_NAME,
            loading_bar_color: themeOptions.loadingBarColorGeneral ? themeOptions.loadingBarColorGeneral : app_config.LOADING_BAR_COLOR,
            meta_title: themeOptions.metaTitleGeneral ? themeOptions.metaTitleGeneral : app_config.META_TITLE,
            meta_description: themeOptions.metaDescriptionGeneral ? themeOptions.metaDescriptionGeneral : app_config.META_DESCRIPTION,
            meta_keywords: themeOptions.metaKeywordsGeneral ? themeOptions.metaKeywordsGeneral : app_config.META_KEYWORD,
            meta_robots: themeOptions.metaRobotsGeneral ? themeOptions.metaRobotsGeneral : app_config.META_ROBOTS,
            primary_color: themeOptions.primaryColorGeneral ? themeOptions.primaryColorGeneral : app_config.PRIMARY_COLOR,
            second_color: themeOptions.secondColorGeneral ? themeOptions.secondColorGeneral : app_config.SECONDARY_COLOR,
            background_color: themeOptions.backgroundColorGeneral ? themeOptions.backgroundColorGeneral : app_config.BACKGROUND_COLOR,
            footer_color: themeOptions.footerTextColorGeneral ? themeOptions.footerTextColorGeneral : app_config.FOOTER_COLOR

        };

        let meta_data = {

            title: project.metaTitleProject ? project.metaTitleProject : data_config.meta_title,
            description: project.metaDescriptionProject ? project.metaDescriptionProject : data_config.meta_title,
            keywords: project.metaKeywordsProject ? project.metaKeywordsProject : data_config.meta_title,
            robots: project.metaRobotsProject ? project.metaRobotsProject : data_config.meta_robots,
            location: location.pathname

        };

        const style_primary_color = {

            color: project.primaryColorProject ? project.primaryColorProject : data_config.primary_color

        };

        const style_second_color = {

            color: project.secondColorProject ? project.secondColorProject : data_config.second_color

        };

        document.body.style.backgroundColor = project.backgroundColorProject;
        
        let vimeo1='';
        let vimeo2='';
        let vimeo3='';
        let vimeo4='';
        
        const vimeo_thumb_1 = {
            backgroundImage: project.vimeoThumbnail1Project != undefined ? `url(${project.vimeoThumbnail1Project.fields.file.url})` : ''
        };
        const vimeo_thumb_2 = {
            backgroundImage: project.vimeoThumbnail2Project != undefined ? `url(${project.vimeoThumbnail2Project.fields.file.url})` : ''
        };
        const vimeo_thumb_3 = {
            backgroundImage: project.vimeoThumbnail3Project != undefined ? `url(${project.vimeoThumbnail3Project.fields.file.url})` : ''
        };
        const vimeo_thumb_4 = {
            backgroundImage: project.vimeoThumbnail4Project != undefined ? `url(${project.vimeoThumbnail4Project.fields.file.url})` : ''
        };

        if (project.vimeo1Project) {
            if (isMobile) {
                vimeo1 = <div className="project-info--media m-b-35">
                    <div className="card card-3x2">
                        <div className="card-content" style={vimeo_thumb_1}>
                            <div className="video video--iframe vimeo">
                                <Vimeo
                                    className="vimeo_wrap"
                                    video={project.vimeo1Project}
                                    muted={false}
                                    autoplay={false}
                                    loop={false}
                                    showTitle={false}
                                    showByline={false}
                                    showPortrait={false}
                                    background={false}
                                    style={vimeo_thumb_1}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="project-caption">
                        <p>{project.vimeoCaption1Project}</p>
                    </div>
                </div>;
            } else{
                vimeo1 = <div className="project-info--media m-b-35">
                    <div className="card card-3x2 card-vimeo">
                        <div className="card-content" style={vimeo_thumb_1}>
                            <Vimeo
                                className="vimeo_wrap"
                                video={project.vimeo1Project}
                                muted={false}
                                autoplay={false}
                                loop={false}
                                showTitle={false}
                                showByline={false}
                                showPortrait={false}
                                width="651"
                                background={false}
                            />
                        </div>
                    </div>
                    <div className="project-caption">
                        <p>{project.vimeoCaption1Project}</p>
                    </div>
                </div>;
            }
        }
        if (project.vimeo2Project) {
            if (isMobile) {
                vimeo2 = <div className="project-info--media m-b-35">
                    <div className="card card-3x2">
                        <div className="card-content" style={vimeo_thumb_2}>
                            <div className="video video--iframe vimeo">
                                <Vimeo
                                    className="vimeo_wrap"
                                    video={project.vimeo2Project}
                                    muted={false}
                                    autoplay={false}
                                    loop={false}
                                    showTitle={false}
                                    showByline={false}
                                    showPortrait={false}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="project-caption">
                        <p>{project.vimeoCaption2Project}</p>
                    </div>
                </div>;
            }else{
                vimeo2 = <div className="project-info--media m-b-35">
                    <div className="card card-3x2 card-vimeo">
                        <div className="card-content" style={vimeo_thumb_2}>
                            <Vimeo
                                className="vimeo_wrap"
                                video={project.vimeo2Project}
                                muted={false}
                                autoplay={false}
                                loop={false}
                                showTitle={false}
                                showByline={false}
                                showPortrait={false}
                                width="651"
                            />
                        </div>
                    </div>
                    <div className="project-caption">
                        <p>{project.vimeoCaption2Project}</p>
                    </div>
                </div>;
            }
        }
        if (project.vimeo3Project) {
            if (isMobile) {
                vimeo3 = <div className="project-info--media m-b-35">
                    <div className="card card-3x2">
                        <div className="card-content" style={vimeo_thumb_3}>
                            <div className="video video--iframe vimeo">
                                <Vimeo
                                    className="vimeo_wrap"
                                    video={project.vimeo3Project}
                                    muted={false}
                                    autoplay={false}
                                    loop={false}
                                    showTitle={false}
                                    showByline={false}
                                    showPortrait={false}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="project-caption">
                        <p>{project.vimeoCaption3Project}</p>
                    </div>
                </div>;
            }else{
                vimeo3 = <div className="project-info--media m-b-35">
                    <div className="card card-3x2 card-vimeo">
                        <div className="card-content" style={vimeo_thumb_3}>
                            <Vimeo
                                className="vimeo_wrap"
                                video={project.vimeo3Project}
                                muted={false}
                                autoplay={false}
                                loop={false}
                                showTitle={false}
                                showByline={false}
                                showPortrait={false}
                                width="651"
                            />
                        </div>
                    </div>
                    <div className="project-caption">
                        <p>{project.vimeoCaption3Project}</p>
                    </div>
                </div>;
            }
        }
        if (project.vimeo4Project) {
            if (isMobile) {
                vimeo4 = <div className="project-info--media m-b-35">
                    <div className="card card-3x2">
                        <div className="card-content" style={vimeo_thumb_4}>
                            <div className="video video--iframe vimeo">
                                <Vimeo
                                    className="vimeo_wrap"
                                    video={project.vimeo4Project}
                                    muted={false}
                                    autoplay={false}
                                    loop={false}
                                    showTitle={false}
                                    showByline={false}
                                    showPortrait={false}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="project-caption">
                        <p>{project.vimeoCaption4Project}</p>
                    </div>
                </div>;
            }else{
                vimeo4 = <div className="project-info--media m-b-35">
                    <div className="card card-3x2 card-vimeo">
                        <div className="card-content" style={vimeo_thumb_4}>
                            <Vimeo
                                className="vimeo_wrap"
                                video={project.vimeo4Project}
                                muted={false}
                                autoplay={false}
                                loop={false}
                                showTitle={false}
                                showByline={false}
                                showPortrait={false}
                                width="651"
                            />
                        </div>
                    </div>
                    <div className="project-caption">
                        <p>{project.vimeoCaption4Project}</p>
                    </div>
                </div>;
            }
        }
        if (isMobile) {

            return <div className="project-screen">

                <Meta {...meta_data} />

                <div className="project-layout display-table">

                    <div className="project-layout--content">

                        <div className="project-layout--left">

                            <div className="section-content--menu">
                                <ul className="menu-first">
                                    <li className='active'>
                                        <h2>
                                            <Link onClick={e => { e.preventDefault();  window.location.href = '/projects'}} to='/projects' style={style_primary_color}>{data_config.head_text}</Link>
                                        </h2>
                                    </li>
                                </ul>
                                <ul className="menu-second">
                                    <li>
                                        <GoBack goBack={this.props.history.goBack} style={style_second_color}/>
                                    </li>
                                </ul>
                            </div>

                        </div>

                        <div className="project-layout--right">

                            <div className="main-content">
                            
                                {vimeo1}
                                {vimeo2}
                                {vimeo3}
                                {vimeo4}
                                
                                {medias}

                                <h1 className="ttile" style={style_primary_color}>{project.title}</h1>

                                <h2 className="sub-ttile desc m-b-35" style={style_second_color}>{project.description}</h2>

                                <div className="m-b-35 content-project">{project.content ? renderHTML(project.content) : ''}</div>
                            </div>
                            <Footer color={project.footerTextColorProject ? project.footerTextColorProject : data_config.footer_color}/>

                        </div>

                    </div>

                </div>

                <GoBack goBack={this.props.history.goBack} className='only_desktop' style={style_second_color} />

                <style>
                    {`
                    .footer a , .project-layout--right a {color: ${style_second_color.color}}
                    .project-layout--right {color: ${style_primary_color.color}}
                    `}
                </style>

            </div>

        }

        return  <div className="project-screen">

            <Meta {...meta_data} />

            <div className="project-layout">

                <div className="project-layout--content">

                    <div className="project-layout--left">

                        <div className="section-content--menu">

                            <ul className="menu-first">
                                <li className='active'>
                                    <h2>
                                        <Link onClick={e => { e.preventDefault();  window.location.href = '/projects'}} to='/projects' style={style_primary_color}>{data_config.head_text}</Link>
                                    </h2>
                                </li>
                            </ul>

                            <ul className="menu-second">
                                <li className="m-r-10">
                                    <Link to='/page/about-us' style={style_second_color}>information</Link>
                                </li>
                                <li>
                                    <Link to='/page/contact' style={style_second_color}>contact</Link>
                                </li>
                            </ul>

                            <ul className="menu-third only_desktop">
                                <li>
                                    <Link to='/page/bio-in-japanese' style={style_second_color}>日本語</Link>
                                </li>
                            </ul>

                        </div>

                    </div>

                    <div className="project-layout--right">
                        <div className="main-content">
                            {vimeo1}
                            {vimeo2}
                            {vimeo3}
                            {vimeo4}
                            {medias}
                            <h1 className="ttile" style={style_primary_color}>{project.title}</h1>

                            <h2 className="sub-ttile desc m-b-35" style={style_second_color}>{project.description}</h2>

                            <div className="m-b-35 content-project">{project.content ? renderHTML(project.content) : ''}</div>

                        </div>
                        <Footer color={project.footerTextColorProject ? project.footerTextColorProject : data_config.footer_color}/>

                    </div>

                </div>

            </div>

            <GoBack goBack={this.props.history.goBack} className='only_desktop' style={style_second_color}/>

            <style>
                {`
                .section-content--menu > ul > li > a:hover {color: ${style_primary_color.color} !important}
                a.go-back:hover, .footer a:hover, .project-layout--right a:hover {color: ${style_primary_color.color} !important}
                .footer a , .project-layout--right a {color: ${style_second_color.color}}
                .project-layout--right {color: ${style_primary_color.color}}
                `}
            </style>

        </div>
    }
}

const mapStateToProps = state => ({
    themeOptions: state.themeOptions
});


export default connect(
    mapStateToProps
)(ProjectDetail);
