import React from 'react';


export const Footer = () => (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#303030',
        height: 70,
        width: '100%',
        bottom: 0,
        fontStyle: 'italic',
        fontFamily: 'arial',
        padding: 25
    }}>
        <div style={{
            fontFamily: 'serif',
            fontSize: 35,
            fontStyle: 'normal',
            color: 'white'
        }}>W.H blog</div>
        <div style={{
            color: '#C0C0C0',
            fontSize: 10
        }}>© 2019 All rights reserved. Coded by Daniel Hu.</div>
    </div>
)