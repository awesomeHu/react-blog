import React from 'react';
import LoadingAnimation from './loading_animation';


export default function LoadingPage({ style, error, pastDelay, ...rest }) {
  if (error) {
    return <p>unkown error</p>
  } else if (pastDelay) {
    return (
      <div style={{ width: '100%', height: '76vh', display: 'flex', flexDirection: 'column', alignItmes: 'center', justifyContent: 'center', ...style }}>
        <LoadingAnimation style={{ alignSelf: 'center' }} {...rest} />
        <p style={{ alignSelf: 'center' }}>loading...</p>
      </div>
    )
  } else return null
}