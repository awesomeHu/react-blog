import React, { Component } from 'react';
import Icon from './icons';
import '../styles/scroll_button.css'

export default class ScrollButton extends Component {
  constructor() {
    super();

    this.state = {
      intervalId: 0
    };
  }

  scrollStep = () => {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
  }

  scrollToTop = () => {
    let intervalId = setInterval(this.scrollStep, this.props.delay);
    this.setState({ intervalId: intervalId });
  }

  render() {
    return <div className='scroll_button'
      onClick={this.scrollToTop}>
      <div><Icon icon='scroll_arrow' /></div>
    </div>;
  }
}

