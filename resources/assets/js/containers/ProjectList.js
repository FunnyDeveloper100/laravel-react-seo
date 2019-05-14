import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Footer from '../components/Footer';
import Meta from '../components/Meta'
import ProjectItem from '../components/ProjectItem'
import * as action from "../actions/project";
import {connect} from 'react-redux';
import * as app_config from '../constants/app'
import {isMobile} from 'react-device-detect';

class ProjectList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: [],
        };

    }



    componentDidMount() {

        window.scrollTo(0, 0);
        setTimeout(function(){ $('.footer').css({ "opacity": "1"}); }, 1000);
        action.getProjects().then(entries => {

            this.setState({
                projects: entries.items
            });

            const {themeOptions} = this.props;

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
                    $('.project-layout--left').css({ "opacity": "1", "background": themeOptions.backgroundColorOfListingProject });
                }
                iScrollPos = iCurScrollPos;
                

            });  

        });

    }

    render() {

        const {themeOptions} = this.props;

        let data_config = {

            head_text: themeOptions.headerOptionGeneral ? themeOptions.headerOptionGeneral : app_config.SITE_NAME,
            loading_bar_color: themeOptions.loadingBarColorGeneral ? themeOptions.loadingBarColorGeneral : app_config.LOADING_BAR_COLOR,
            meta_title: themeOptions.metaTitleGeneral ? themeOptions.metaTitleGeneral : app_config.META_TITLE,
            meta_description: themeOptions.metaDescriptionOfListingProject ? themeOptions.metaDescriptionOfListingProject : app_config.META_DESCRIPTION,
            meta_keywords: themeOptions.metaKeywordsOfListingProject ? themeOptions.metaKeywordsOfListingProject : app_config.META_KEYWORD,
            meta_robots: themeOptions.metaRobotsGeneral ? themeOptions.metaRobotsGeneral : app_config.META_ROBOTS,
            primary_color: themeOptions.primaryColorGeneral ? themeOptions.primaryColorGeneral : app_config.PRIMARY_COLOR,
            second_color: themeOptions.secondColorGeneral ? themeOptions.secondColorGeneral : app_config.SECONDARY_COLOR,
            background_color: themeOptions.backgroundColorGeneral ? themeOptions.backgroundColorGeneral : app_config.BACKGROUND_COLOR,
            footer_color: themeOptions.footerTextColorGeneral ? themeOptions.footerTextColorGeneral : app_config.FOOTER_COLOR

        };

        const meta_data = {

            title: themeOptions.metaTitleOfListingProject != undefined ? themeOptions.metaTitleOfListingProject : data_config.meta_title,
            description: data_config.meta_description,
            keywords: data_config.meta_keywords,
            robots: data_config.meta_robots,
            location: location.pathname

        };

        const style_primary_color = {

            color: data_config.primary_color

        };

        const style_second_color = {

            color: data_config.second_color
            
        };

        const style_hover = {

            color: !isMobile ? data_config.primary_color : ''

        };

        document.body.style.backgroundColor = themeOptions.backgroundColorOfListingProject;
        
        const projects = this.state.projects.map((project, index) => <ProjectItem key={index} project={project}/> );

        return <div className="project-screen">

            <Meta {...meta_data}/>

            <div className="project-layout">

                <div className="project-layout--content">

                    <div className="project-layout--left">

                        <div className="section-content--menu">

                            <ul className="menu-first">
                                <li className='active'>
                                    <h1>
                                        <Link onClick={e => { e.preventDefault();  window.location.href = '/projects'}} to='/projects' style={style_primary_color}>{data_config.head_text}</Link>
                                    </h1>
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
                            {projects}
                        </div>
                        
                        <Footer color={data_config.footer_color}/>
                    </div>

                </div>

            </div>

            <style>
                {`
                .section-content--menu > ul > li > a:hover{color: ${style_hover.color} !important}
                .footer a:hover {color: ${data_config.primary_color} !important}
                .footer a {color: ${data_config.second_color}}
                .project-layout--right {color: ${data_config.primary_color}}
                .project-list a:hover ~ .desc a{color: ${style_primary_color.color} !important}
                .project-list .desc a:hover{color: ${data_config.primary_color} !important}
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
)(ProjectList);
