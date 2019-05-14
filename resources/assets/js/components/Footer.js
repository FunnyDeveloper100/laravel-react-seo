import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as app_config from '../constants/app'
import renderHTML from 'react-render-html';

let Footer = ({themeOptions, japan, color}) => {
    let data_config = {
        footer_text: themeOptions.footerOptionGeneral ? themeOptions.footerOptionGeneral : app_config.FOOTER_TEXT,
        footer_color: themeOptions.footerTextColorGeneral ? themeOptions.footerTextColorGeneral : app_config.FOOTER_COLOR
    };

    const style_color = {
        color: color ? color : data_config.footer_color
    };

    if (japan) {
        return <div className="footer" style={style_color}>
            <div>
                <span>                
                    {data_config.footer_text ? renderHTML(data_config.footer_text) : ''}
                </span>
            </div>
        </div>;
    }

    return <div className="footer" style={style_color}>
        <div>
            <span className="only_mobile_inline m-r-10">
                <Link to='/page/bio-in-japanese'>日本語</Link>
            </span>

            <span>
                {data_config.footer_text ? renderHTML(data_config.footer_text) : ''}
            </span>
        </div>
    </div>;
};

const mapStateToProps = state => ({
    themeOptions: state.themeOptions
});

export default connect(
    mapStateToProps
)(Footer);
