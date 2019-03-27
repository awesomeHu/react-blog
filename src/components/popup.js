import React, { Component, PureComponent } from 'react'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import '../styles/popup.css'


export default class Popup extends PureComponent {
    constructor(props) {
        super(props);

    }

    stopBubble = (event) => {
        if (event && event.stopPropagation)
            event.stopPropagation();
        else
            window.event.cancelBubble = true;
    }

    render() {
        return (
            <CSSTransitionGroup
                transitionName="popup-wrapper"
                transitionAppear={true}
                transitionAppearTimeout={200}
                transitionEnterTimeout={200}
                transitionLeaveTimeout={100}
            >
                {this.props.open && <div key="popup"
                    className='popup-wrapper'
                    onClick={this.props.handleClickBackground}>
                    <CSSTransitionGroup
                        transitionName="popup-content"
                        transitionAppear={true}
                        transitionAppearTimeout={200}
                        transitionEnterTimeout={200}
                        transitionLeaveTimeout={100}
                    >
                        <div onClick={this.stopBubble}
                            className='popup-content'
                            style={{ position: 'fixed', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {this.props.children}
                        </div>
                    </CSSTransitionGroup>
                </div>}
            </CSSTransitionGroup>
        )
    }
}

class popupNoticeManager {

    registerPopupNotice(popupNotice) {
        this.popupNotice = popupNotice
    }
    open(text) {
        this.popupNotice.open(text)
    }
    close() {
        this.popupNotice.close()
    }
}

export const notice = new popupNoticeManager()


export class Notification extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            text: ''
        }
        this.last = 0
    }

    count_down = () => {
        this.last++
        if (this.last >= 3) {
            clearInterval(this.timer)
            this.setState({ show: false })
        }
    }

    componentDidMount() {
        notice.registerPopupNotice(this)
    }

    open = (text) => {
        this.setState({ show: true, text })
        this.timer = setInterval(this.count_down, 1000)
    }
    close = () => {
        this.setState({ show: false })
    }


    render() {
        const { show, text } = this.state
        return (<CSSTransitionGroup
            transitionName="notification-wrapper"
            transitionAppear={true}
            transitionEnter={false}
            transitionAppearTimeout={300}
            transitionLeaveTimeout={300}
        >
            {show ? <div
                className='notification-wrapper'>
                <div style={{ fontSize: 20, color: 'white' }}>{text}</div>
            </div> : null}
        </CSSTransitionGroup>)
    }
}



