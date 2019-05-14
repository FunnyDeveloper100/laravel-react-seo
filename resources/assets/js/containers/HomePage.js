import React, {Component} from 'react'
import SectionItem from '../components/SectionItem';
import Swiper from 'swiper';
import "swiper/dist/css/swiper.min.css"
import * as action from '../actions/section'
import {Link} from "react-router-dom";
import Footer from '../components/Footer';
import {connect} from 'react-redux';
import * as app_config from '../constants/app'
import Meta from '../components/Meta'
import {isMobile} from 'react-device-detect';

class HomePage extends Component {

    constructor(props) {
        
        super(props);
        this.state = {
            sections: [],
        };

    }

    componentDidMount() {

        action.getSections().then(entries => {
            this.setState({
                sections: entries.items
            });
            if (!isMobile) {
                if ($(".nano").length > 0) {
                    $(".nano").nanoScroller();
                }
            }
        });

        setTimeout(function(){ $('.footer').css({ "opacity": "1"}); }, 300);

    }

    componentDidUpdate() {
        this.buildSwiper();
    }


    buildSwiper() {
        this.swiper = new Swiper('.swiper-container-', {
            direction: 'vertical',
            initialSlide: 0,
            speed: 1400,
            slidesPerView: 1,
            loop: false,
            mousewheel: {
                invert: true,
                forceToAxis: true
            },
            keyboard: {
                enabled: true,
                onlyInViewport: false
            }
        });
        window.swiper = this.swiper;
    }


    nextSwiper() {
        if (typeof window.swiper !== 'undefined') {
            window.swiper.slideNext();
        }

    }

    render() {

        const sections = this.state.sections.map((section, index) =>
            <SectionItem key={index} index={index} project={section} nextSwiper={this.nextSwiper}/>
        );

        const {themeOptions} = this.props;

        let data_config = {

            head_text: themeOptions.headerOptionGeneral ? themeOptions.headerOptionGeneral : app_config.SITE_NAME,
            loading_bar_color: themeOptions.loadingBarColorGeneral ? themeOptions.loadingBarColorGeneral : app_config.LOADING_BAR_COLOR,
            meta_title: themeOptions.metaTitleGeneral ? themeOptions.metaTitleGeneral : app_config.META_TITLE,
            meta_description: themeOptions.metaDescriptionGeneral ? themeOptions.metaDescriptionGeneral : app_config.META_DESCRIPTION,
            meta_keywords: themeOptions.metaKeywordsGeneral ? themeOptions.metaKeywordsGeneral : app_config.META_KEYWORD,
            meta_robots: themeOptions.metaRobotsGeneral ? themeOptions.metaRobotsGeneral : app_config.META_ROBOTS,
            primary_color: themeOptions.headerTextColorOfHome ? themeOptions.headerTextColorOfHome : app_config.PRIMARY_COLOR,
            second_color: themeOptions.secondColorGeneral ? themeOptions.secondColorGeneral : app_config.SECONDARY_COLOR,
            background_color: themeOptions.backgroundColorGeneral ? themeOptions.backgroundColorGeneral : app_config.BACKGROUND_COLOR,
            footer_color: themeOptions.footerTextColorOfHome ? themeOptions.footerTextColorOfHome : app_config.FOOTER_COLOR,
            color_hover: themeOptions.colorHoverForUrlOnHomePage,
            url_color: themeOptions.urlColorOfFooter

        };

        let meta_data = {

            title: data_config.meta_title,
            description: data_config.meta_description,
            keywords: data_config.meta_keywords,
            robots: data_config.meta_robots,
            location: location.pathname

        };

        const style_primary_color = {

            color: data_config.primary_color

        };

        let hideheader = themeOptions.hideHeaderGeneral ? "hideheader" : "";
        let hidefooter = themeOptions.hideFooterGeneral ? "hidefooter" : "";

        document.body.style.backgroundColor = data_config.background_color;

        return <div className="home-screen">

            <Meta {...meta_data} />

            <div className={`section-content--menu ${hideheader}`}>

                <ul className="menu-first">
                    <li className='active'>
                        <h1>
                            <Link onClick={e => { e.preventDefault();  window.location.href = '/projects'}} to='/projects' style={style_primary_color}>{data_config.head_text}</Link>
                        </h1>
                    </li>
                </ul>

            </div>

            <div className="home-screen--slide">

                <div className="swiper-container swiper-container-outer swiper-container-vertical">
                    <div className="swiper-wrapper">
                        {sections}
                    </div>
                </div>

            </div>

            <div className={`section-content--footer ${hidefooter}`}>
                <Footer color={data_config.footer_color}/>
            </div>

            <style>
                {`
                .section-content--menu > ul > li > a:hover {color: ${data_config.color_hover} !important}
                .footer a:hover {color: ${data_config.color_hover} !important}
                .footer a {color: ${data_config.url_color}}

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
)(HomePage);
