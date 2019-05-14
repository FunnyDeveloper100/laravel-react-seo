import React from 'react';
import {Link} from 'react-router-dom';

let Menu = (props) => {
    const menus = props.data.map((item, index) =>
        <li key={index} className={item.is_active ? 'active' : ''}>
            <Link to={item.url}>{item.title}</Link>
        </li>
    );

    return <div className="section-content--menu">
        <ul>
            {menus}
        </ul>
    </div>;
};

export default Menu;