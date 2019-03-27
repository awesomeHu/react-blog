import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Lottie from 'react-lottie';
import { default as animationData } from '../assets/loading.json';

import '../styles/loading_animation.css';

export default class LoadingAnimation extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      class_name: this.props.hideOnInitialization? 'container-hide' : 'container-enter'
    };

    this.options = {
      loop: true,
      autoplay: true, 
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };
  }

  render() {
    return (
      <div
        className={this.state.class_name}
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', ...this.props.style}}>
        <Lottie
          options={this.options}
          width={this.props.width}
          height={this.props.height} />
      </div>
    );
  }

  hide() {
    // Avoid unnecessary refresh
    if (this.state.class_name === 'container-enter')
      this.setState({class_name: 'container-leave'});
  }

  show() {
    // Avoid unnecessary refresh
    if (this.state.class_name !== 'container-enter')
      this.setState({class_name: 'container-enter'});
  }
}

LoadingAnimation.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

LoadingAnimation.defaultProps = {
  width: LOADING_ANIMATION_WIDTH,
  height: LOADING_ANIMATION_HEIGHT,
};


const LOADING_ANIMATION_WIDTH = 3;
const LOADING_ANIMATION_HEIGHT = 3;