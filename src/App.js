import React, { Component } from 'react';
import { Routes } from './components/routes';
import { Notification } from './components/popup'
import ScrollButton from './components/scroll_button'

export default class App extends Component {

  render() {
    return (
      <div style={{
        backgroundColor: '#eceff1',
        height: 'auto',
        minheight:800,
        overflow:'auto',  
      }}>
        <Routes />
        <Notification />
        <ScrollButton scrollStepInPx="50" delay="16.66"/>
      </div>
    );
  }
}




