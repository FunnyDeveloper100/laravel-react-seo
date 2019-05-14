import React, {Component} from 'react';
import {connect} from "react-redux";

class BlueProgressBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            percent: 0
        };
        
    }

    componentWillMount() {

    }


    componentDidMount() {

    }

    componentWillUnmount() {

       // clearInterval(this.props.intervalId);
    }

    render() {

        const percent = this.props.percent || 0;
        const style = {
            transform: `translate3d(${percent}%, 0px, 0px)`,
            backgroundColor: this.props.color || '#9e9e9e'
        };

        return <div className={percent < 100 ? `pace` : `pace pace-done`}>

            <div className="pace-progress" style={style}>
                <div className="pace-progress-inner"></div>
            </div>
            <div className="pace-activity"></div>
            
        </div>;

    }
}

export default connect()(BlueProgressBar);
