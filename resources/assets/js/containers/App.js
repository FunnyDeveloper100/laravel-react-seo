import React, {Component} from 'react'
import {Route, Switch} from "react-router-dom";
import HomePage from './HomePage'
import ProjectList from './ProjectList'
import ProjectDetail from './ProjectDetail'
import PageDetail from './PageDetail'
import NotFound from './NotFound'
import {updateThemeOptions, getOption} from '../actions/option'
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

class App extends Component {
    constructor(props) {
        super(props);

        this.options = {
            metaTitleGeneral: '',
            metaDescriptionGeneral: '',
            metaKeywordsGeneral: '',
            backgroundColorGeneral: '',
            primaryColorGeneral: '',
            secondColorGeneral: '',
            loadingBarColorGeneral: '',
            headerOptionGeneral: '',
            footerOptionGeneral: '',
            footerTextColorGeneral: '',
            hideHomepageGeneral: false,
            hideHeaderGeneral: false,
            hideFooterGeneral: false,
            metaTitleOfListingProject: '',
            metaDescriptionOfListingProject: '',
            metaKeywordsOfListingProject: '',
            backgroundColorOfListingProject: '',
            headerTextColorOfHome: '',
            footerTextColorOfHome: '',
            colorHoverForUrlOnHomePage: '',
            urlColorOfFooter: '',

        };

        this.state = {
            isLoadConfig: false
        };
    }

    componentWillMount() {
        getOption('Theme options').then(entries => {
            if (entries.items.length > 0) {
                const theme_options = entries.items[0].fields;
                this.options = {
                    metaTitleGeneral: theme_options.metaTitleGeneral,
                    metaDescriptionGeneral: theme_options.metaDescriptionGeneral,
                    metaKeywordsGeneral: theme_options.metaKeywordsGeneral,
                    backgroundColorGeneral: theme_options.backgroundColorGeneral,
                    primaryColorGeneral: theme_options.primaryColorGeneral,
                    secondColorGeneral: theme_options.secondColorGeneral,
                    loadingBarColorGeneral: theme_options.loadingBarColorGeneral,
                    headerOptionGeneral: theme_options.headerOptionGeneral,
                    footerOptionGeneral: theme_options.footerOptionGeneral,
                    footerTextColorGeneral: theme_options.footerTextColorGeneral,
                    hideHomepageGeneral: theme_options.hideHomepageGeneral,
                    hideHeaderGeneral: theme_options.hideHeaderGeneral,
                    hideFooterGeneral: theme_options.hideFooterGeneral,
                    metaTitleOfListingProject: theme_options.metaTitleOfListingProject,
                    metaDescriptionOfListingProject: theme_options.metaDescriptionOfListingProject,
                    metaKeywordsOfListingProject: theme_options.metaKeywordsOfListingProject,
                    backgroundColorOfListingProject: theme_options.backgroundColorOfListingProject,
                    headerTextColorOfHome: theme_options.headerTextColorOfHome,
                    footerTextColorOfHome: theme_options.footerTextColorOfHome,
                    colorHoverForUrlOnHomePage: theme_options.colorHoverForUrlOnHomePage,
                    urlColorOfFooter: theme_options.urlColorOfFooter
                };

                this.props.dispatch(updateThemeOptions(this.options));

                this.setState({
                    isLoadConfig: true
                });
            }
        });
    }

    render() {
        
        if (!this.state.isLoadConfig) {
            return <span></span>
        }
        return (
            <Route render={({location}) => (
                <TransitionGroup className="transition-group">
                    <CSSTransition
                        key={location.key}
                        timeout={{ enter: 300, exit: 300 }}
                        classNames="fade"
                    >
                        <section className="route-section">
                            <Switch location={location}>
                                <Route exact path="/" component={this.options.hideHomepageGeneral ? ProjectList : HomePage}/>
                                <Route path="/project/:slug" component={ProjectDetail}/>
                                <Route path="/projects" component={ProjectList}/>
                                <Route path="/page/:slug" component={PageDetail}/>
                                <Route path="*" component={NotFound}/>
                            </Switch>
                        </section>
                    </CSSTransition>
                </TransitionGroup>
            )} />
        );

    }
}

export default withRouter(
    connect()(App)
);