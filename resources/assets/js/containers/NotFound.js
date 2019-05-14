import React, {Component} from 'react'
import {Link} from "react-router-dom";
import Footer from "../components/Footer";
import GoBack from '../components/GoBack'
import {connect} from 'react-redux';
import * as app_config from '../constants/app'
import renderHTML from 'react-render-html';
import {isMobile} from 'react-device-detect'
import Meta from '../components/Meta'

class NotFound extends Component {

    constructor(props) {
        super(props);

        this.state = {
            percentage: 0,
            projects: []
        };

    }

    componentDidMount() {

        window.scrollTo(0, 0);
        setTimeout(function(){ $('.footer').css({ "opacity": "1"}); }, 350);
    
    }

    render() {

        const {themeOptions} = this.props;

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
            title: 'Lost Art — 404 Error',
            description: data_config.meta_description,
            keywords: data_config.meta_keywords
        };

        const style_primary_color = {
            color: data_config.primary_color
        };

        const style_second_color = {
            color: data_config.second_color
        };

        if (isMobile) {

            return <div className="project-layout project-layout--notfound">

                <Meta {...meta_data} />

                    <div className="project-layout--content">

                        <div className="project-layout--left">

                            <div className="section-content--menu">

                                <ul className="menu-first">
                                    <li className='active'>
                                        <h1>
                                            <Link onClick={e => { e.preventDefault();  window.location.href = '/projects'}} to='/projects'>{data_config.head_text}</Link>
                                        </h1>
                                    </li>
                                </ul>
                                <ul className="menu-second">
                                    <li>
                                        <GoBack goBack={this.props.history.goBack}/>
                                    </li>
                                </ul>

                            </div>
                        </div>

                        <div className="project-layout--right">

                            <div className="content-notfound">

                                <div className="title">error 404</div>

                                <div className="content">
                                    <p className="m-b-5">oops, something went wrong</p>
                                    <p className="m-b-0">
                                        <a href="http://lost-art.com/" title="lost art">click here</a> to go to <span>lost-art.com</span>
                                    </p>
                                </div>

                                <Footer />

                            </div>
                        </div>

                    </div>

            </div>

        }

        return <div className="project-layout project-layout--notfound">

            <Meta {...meta_data} />

                <div className="project-layout--content">

                    <div className="project-layout--left">

                        <div className="section-content--menu">

                            <ul className="menu-first">
                                <li className='active'>
                                    <h1>
                                        <Link onClick={e => { e.preventDefault();  window.location.href = '/projects'}} to='/projects'>{data_config.head_text}</Link>
                                    </h1>
                                </li>
                            </ul>

                            <ul className="menu-second">
                                <li className="m-r-10">
                                    <Link to='/page/about-us'>information</Link>
                                </li>
                                <li>
                                    <Link to='/page/contact'>contact</Link>
                                </li>
                            </ul>

                            <ul className="menu-third only_desktop">
                                <li>
                                    <Link to='/page/bio-in-japanese'>日本語</Link>
                                </li>
                            </ul>
                            
                        </div>

                    </div>

                    <div className="project-layout--right">

                        <div className="content-notfound">

                            <div className="title">error 404</div>

                            <div className="content">
                                <p className="m-b-5">oops, something went wrong</p>
                                <p className="m-b-0">
                                    <a href="http://lost-art.com/" title="lost art">click here</a> to go to <span>lost-art.com</span>
                                </p>
                            </div>

                            <Footer />

                        </div>

                    </div>

                </div>

        </div>
    }
}

const mapStateToProps = state => ({
    themeOptions: state.themeOptions
});

export default connect(
    mapStateToProps
)(NotFound);
