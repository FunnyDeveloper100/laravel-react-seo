import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import "nanoscroller/bin/css/nanoscroller.css"
import "nanoscroller/bin/javascripts/jquery.nanoscroller"

class NanoScroll extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

        this.scrollContainer = $(ReactDOM.findDOMNode(this.refs['scroll-container']));

        this.scrollContainer.css({
            height: window.innerHeight + 'px'
        });

        this.scrollContainer.nanoScroller();

        //$(".nano").nanoScroller();
    };

    render() {

        return <div ref="scroll-container" {...this.props} className="nano">
            <div className="nano-content">
                {this.props.children}
            </div>
        </div>;
        
    }
}

export default NanoScroll;