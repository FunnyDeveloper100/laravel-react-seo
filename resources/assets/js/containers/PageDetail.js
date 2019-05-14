import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Footer from '../components/Footer';
import GoBack from '../components/GoBack'
import * as action from '../actions/page'
import * as app_config from '../constants/app'
import connect from "react-redux/es/connect/connect";
import renderHTML from 'react-render-html';
import {isMobile} from 'react-device-detect'
import Meta from '../components/Meta'

class PageDetail extends Component {

    constructor(props) {

        super(props);

        this.state = {
            page: {},
            slug: '',
        };
        this.params = this.props.match.params;
    }

    getPageInfo(slug) {

        action.getPage(slug).then(entries => {

            if (entries.items.length > 0) {
                this.setState({
                    slug: slug,
                    page: entries.items[0].fields
                });
            }

            const page = this.state.page;

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
                    $('.project-layout--left').css({ "opacity": "1", "background": page.backgroundColorPage });

                }
                iScrollPos = iCurScrollPos;

            });
            
        });

    }
    componentDidMount() {

        window.scrollTo(0, 0);
        this.getPageInfo(this.params.slug);
        $('.footer').css({ "opacity": "1"}); 
        //setTimeout(function(){ $('.footer').css({ "opacity": "1"}); }, 300);
    
    }

    render() {
        const page = this.state.page;
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
            title: page.metaTitlePage != undefined ? page.metaTitlePage : data_config.meta_title,
            description: page.metaDescriptionPage != undefined ? page.metaDescriptionPage : data_config.meta_description,
            keywords: page.metaKeywordsPage ? page.metaKeywordsPage : data_config.meta_keywords,
            robots: page.metaRobotsPage ? page.metaRobotsPage : data_config.meta_robots,
            location: location.pathname
        };

        const style_primary_color = {
            color: page.primaryColorPage ? page.primaryColorPage : data_config.primary_color
        };

        const style_second_color = {
            color: page.secondColorPage ? page.secondColorPage : data_config.second_color
        };

        document.body.style.backgroundColor = page.backgroundColorPage;

        if (isMobile) {

            return <div className="page-screen">

                <Meta {...meta_data} />

                    
                <div className="project-layout display-table">

                    <div className="project-layout--content">

                        <div className="project-layout--left">

                            <div className="section-content--menu">
                                <ul className="menu-first">
                                    <li className='active'>
                                        <h1>
                                            <Link onClick={e => { e.preventDefault();  window.location.href = '/projects'}} to='/projects' style = {style_primary_color}>{data_config.head_text}</Link>
                                        </h1>
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

                            <div className={this.state.slug == 'bio-in-japanese' ? 'jpan m-b-35 main-content' : 'm-b-35 main-content'}>{page.content ? renderHTML(page.content) : ''}</div>
                            
                            <Footer japan={this.state.slug == 'bio-in-japanese' ? 'jpan' : ''} color = {page.footerTextColorPage ? page.footerTextColorPage : data_config.footer_color}/>

                        </div>

                    </div>

                </div>

                <GoBack goBack={this.props.history.goBack} className='only_desktop' style={style_second_color}/>

                <style>
                    {`
                    .footer a , .project-layout--right a {color: ${style_second_color.color}}
                    .project-layout--right {color: ${style_primary_color.color}}
                    `}
                </style>

            </div>
        }

        return <div className="page-screen">

            <Meta {...meta_data} />

            <div className="project-layout display-table">

                <div className="project-layout--content">

                    <div className="project-layout--left">

                        <div className="section-content--menu">
                            <ul className="menu-first">
                                <li className={this.state.slug == 'projects' ?'active':''}>
                                    <h1>
                                        <Link onClick={e => { e.preventDefault();  window.location.href = '/projects'}} to='/projects' style ={this.state.slug == 'projects' ?style_primary_color:style_second_color}>{data_config.head_text}</Link>
                                    </h1>
                                </li>
                            </ul>
                            <ul className="menu-second">
                                <li className={this.state.slug == 'about-us' ?'active m-r-10':'m-r-10'}>
                                    <Link to='/page/about-us' style = {this.state.slug == 'about-us' ?style_primary_color:style_second_color}>information</Link>
                                </li>
                                <li className={this.state.slug == 'contact' ?'active':''}>
                                    <Link to='/page/contact' style = {this.state.slug == 'contact' ?style_primary_color:style_second_color}>contact</Link>
                                </li>
                            </ul>
                            <ul className="menu-third only_desktop">
                                <li className={this.state.slug == 'projects' ?'active':''}>
                                    <Link to='/page/bio-in-japanese' style = {this.state.slug == 'bio-in-japanese' ?style_primary_color:style_second_color}>日本語</Link>
                                </li>
                            </ul>
                        </div>

                    </div>

                    <div className="project-layout--right">

                        <div className={this.state.slug == 'bio-in-japanese' ? 'jpan m-b-35 main-content' : 'm-b-35 main-content'}>{this.state.page.content ? renderHTML(this.state.page.content) : ''}</div>
                        
                        <Footer japan={this.state.slug == 'bio-in-japanese' ? 'jpan' : ''} color = {page.footerTextColorPage ? page.footerTextColorPage : data_config.footer_color} />

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
)(PageDetail);
