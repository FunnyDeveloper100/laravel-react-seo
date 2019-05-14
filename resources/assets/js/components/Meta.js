import React, {Component} from 'react'
import {Helmet} from "react-helmet";
import {connect} from 'react-redux';

class Meta extends Component {
    
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {

    }

    render() {

        return <Helmet>
            <title>{this.props.title || ''}</title>
            <meta name="robots" content={this.props.robots || ''} />
            <meta name="googlebot" content={this.props.robots || ''} />
            <meta name="msnbot" content={this.props.robots || ''} />
            <meta name="description" content={this.props.description || ''} />
            <meta name="keyworks" content={this.props.keywords || ''} />
            <meta name="author" content="Lost art" />
            <meta name="revisit-after" content="1 days" />
            <link rel="canonical" href={this.props.location || ''} />
            
        </Helmet>;
    }
}

const mapStateToProps = state => ({
    configs: state.configs
});


export default connect(
    mapStateToProps
)(Meta);