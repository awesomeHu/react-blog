import React, { Component, PureComponent } from 'react';
import Login from './login'
import SignUp from './signup'
import Popup from './popup';
import { Link } from 'react-router-dom'

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoginShow: false,
            isSignupShow: false,
            isLogoutButtonShow: false,
            isLoggedin: false,
            showName: false,
            user: ''
        }
    }

    componentDidMount() {
        this.user = JSON.parse(localStorage.getItem('user'))
        if (this.user && this.user.userId) {
            this.setState({ isLoggedin: true, user: this.user })
        }
    }
    handleClick = () => {
        this.setState({
            isLoginShow: false,
            isSignupShow: false
        })
    }

    _handleHeaderBarChange = (currentUser) => {
        this.setState({
            isLoggedin: true,
            user: currentUser
        })
    }
    _handleLogout = () => {
        this.setState({
            isLoggedin: false,
            isLogoutButtonShow: false
        })
    }
    render() {
        return (<div>
            <div style={styles.headerStyle}>
                <div style={styles.headerTitleStyle}><Link to='/' style={{color:'white', textDecoration: 'none'}} >W.H</Link></div>
                <div style={styles.headerSmallTitleStyle}>
                    <div style={{ cursor: 'pointer' }}><Link to='/' style={{color:'white', textDecoration: 'none'}} >Home</Link></div>
                    <div style={{ margin: 30, cursor: 'pointer' }}><Link to='/archives' style={{color:'white', textDecoration: 'none'}} >Archives</Link></div>
                    <div style={{ cursor: 'pointer' }}><Link to='/about_me' style={{color:'white', textDecoration: 'none'}} >About me</Link></div>
                    <div style={styles.login} onClick={() => { this.setState({ isLoginShow: true }) }}>{this.state.isLoggedin ? '' : 'LOGIN'}</div>
                    <div style={styles.signup} onClick={() => this.setState({ isSignupShow: true })}>{this.state.isLoggedin ? '' : 'SIGN UP'}</div>
                    <div style={{ cursor: 'pointer', fontWeight: 'bold', right: 80 }} onClick={() => this.setState({ isLogoutButtonShow: !this.state.isLogoutButtonShow })}>{this.state.isLoggedin ? <UserWithLogout name={this.state.user ? this.state.user.name : ''} /> : null}</div>
                </div>
                <div style={{ right: 20, top: 70, position: 'absolute' }}>{this.state.isLogoutButtonShow ? <Logoutbutton handleLogout={this._handleLogout} /> : null}</div>

            </div>
            {this.state.isLoginShow && <Login open={this.state.isLoginShow} handleClickBackground={this.handleClick} handleHeaderBarChange={this._handleHeaderBarChange} />
                || this.state.isSignupShow && <SignUp open={this.state.isSignupShow} handleClickBackground={this.handleClick} />}

        </div>)
    }
}

class UserWithLogout extends PureComponent {
    constructor(props) {
        super(props)
        this.initial = '';
    }
    render() {
        const nameArr = this.props.name && this.props.name.split(' ')
        if (nameArr) {
            if (nameArr.length > 1) {
                const firstLetter = nameArr[0].slice(0, 1).toLocaleUpperCase()
                const secondLetter = nameArr[1].slice(0, 1).toLocaleUpperCase()
                this.initial = firstLetter + secondLetter
            } else this.initial = nameArr[0].slice(0, 1).toLocaleUpperCase()
        }

        return (
            <div>
                <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    color: '#004c99',
                    backgroundColor: 'white',
                    fontSize: 20,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}><p>{this.initial}</p></div>

            </div>
        )
    }
}

export class Logoutbutton extends PureComponent {
    state = {
        hover: false
    }

    _handleLogout = () => {
        localStorage.removeItem('user')
        this.props.handleLogout()
    }
    render() {
        return (
            <div style={Object.assign({}, styles.logoutButtonStyle, { color: this.state.hover ? 'red' : '#004c99' }, this.props.style)}>
                <p style={{ cursor: 'pointer' }}
                    onClick={this._handleLogout}
                    onMouseEnter={() => this.setState({ hover: true })}
                    onMouseLeave={() => this.setState({ hover: false })}>Logout</p></div>
        )
    }
}


const styles = {
    headerStyle: {
        display: 'flex',
        justifyContent: 'space-between',
        height: 70,
        backgroundColor: '#303030',//'#00BFFF',
        width: '100%',
        color: 'white',
        backgroundImage: ''

    },
    login: {
        cursor: 'pointer',
        margin: 'auto 20px',
        fontWeight: 'bold',
        textDecoration: 'underline',
        textDecorationColor: 'white'
    },
    signup: {
        cursor: 'pointer',
        fontWeight: 'bold',
        textDecoration: 'underline',
        textDecorationColor: 'white'
    },

    headerTitleStyle: {
        fontSize: 40,
        alignSelf: 'center',
        marginLeft: 150,
        fontFamily: 'Gudea,Tahoma,Arial',
        fontWeight: 'bold'
    },

    headerSmallTitleStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 30,
        fontSize: 16,
    },

    logoutButtonStyle: {
        width: 120,
        height: 40,
        fontSize: 15,
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6
    }
}

