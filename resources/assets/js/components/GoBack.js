import React from 'react';
import {Link} from "react-router-dom";

const GoBack = (props) => {

    const _class = "go-back " + props.className;
    const _style = props.style;

    //return <Link to='/projects' className={_class} style={_style}>back</Link>;
    return <a href="/projects" className={_class} style={_style}>back</a>;
              
};

export default GoBack;