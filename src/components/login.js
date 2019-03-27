import React, { PureComponent, Component } from 'react';
import Popup, { notice } from './popup'
import Icon from './icons';
import { connect } from 'react-redux';
import { login } from '../redux_actions/user_actions'
import { instance } from '../api'

export class AdminLogin extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            isHovered: false,
        }
    }

    _handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    _handleLogin = () => {
        const userInfo = {
            email: this.state.email,
            password: this.state.password
        }
        instance.post('/login', userInfo)
            .then(response => {
                if ((response && response.data && response.data.code === 0) && response.data.data.type === 1) {
                    localStorage.setItem('admin', JSON.stringify(response.data.data))
                    notice.open('Login successfully!')
                    this.props.history.push('/admin');

                } else notice.open('Authorized failed!')
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 1000 }}>
                <div style={styles.AdminContainer}>
                    <div style={styles.title}>Admin login</div>
                    <div><div style={styles.label}>Email:</div>
                        <div> <input
                            type='email'
                            style={styles.input}
                            name='email'
                            onChange={this._handleInputChange} />
                        </div>
                    </div>
                    <div style={{ margin: '30px auto 30px auto' }}>
                        <div style={styles.label}>Password:</div>
                        <div><input
                            type='password'
                            style={styles.input}
                            name='password'
                            onChange={this._handleInputChange} />
                        </div>
                    </div>
                    <div style={Object.assign({}, styles.button, { backgroundColor: this.state.isHovered ? '#808080' : '#10b750' })}
                        onClick={this._handleLogin}
                        onMouseEnter={() => this.setState({ isHovered: true })}
                        onMouseLeave={() => this.setState({ isHovered: false })}
                    ><p>Login</p></div>
                </div>
            </div>
        )
    }
}

class Login extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            isHovered: false,
            hoveredIcon: false
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.currentUser !== nextProps.currentUser && nextProps.currentUserStatus) {
            notice.open('Login successfully!')
            //Close login popup and change the header bar
            this.props.handleClickBackground()
            this.props.handleHeaderBarChange(nextProps.currentUser)
        } else notice.open('Email or password is wrong!')
    }

    _handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    _handleLogin = () => {
        const userInfo = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.login(userInfo)
    }

    render() {
        return (<Popup open={this.props.open} handleClickBackground={this.props.handleClickBackground}>
            <div style={styles.container}>
                <div style={{
                    alignSelf: 'flex-end',
                    marginRight: 20,
                    marginTop: -30,
                    width: 25,
                    height: 25,
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: this.state.hoveredIcon ? '#e6e6e6' : ''
                }}
                    onClick={this.props.handleClickBackground}
                    onMouseEnter={() => this.setState({ hoveredIcon: true })}
                    onMouseLeave={() => this.setState({ hoveredIcon: false })}
                ><Icon icon='cross' /></div>
                <div style={styles.title}>Log in</div>

                <div><div style={styles.label}>Email:</div>
                    <div> <input
                        type='email'
                        style={styles.input}
                        name='email'
                        onChange={this._handleInputChange} />
                    </div>
                </div>
                <div style={{ margin: '30px auto 30px auto' }}>
                    <div style={styles.label}>Password:</div>
                    <div><input
                        type='password'
                        style={styles.input}
                        name='password'
                        onChange={this._handleInputChange} />
                    </div>
                </div>
                <div style={Object.assign({}, styles.button, { backgroundColor: this.state.isHovered ? '#808080' : '#10b750' })}
                    onClick={this._handleLogin}
                    onMouseEnter={() => this.setState({ isHovered: true })}
                    onMouseLeave={() => this.setState({ isHovered: false })}
                ><p>Login</p></div>
            </div>
        </Popup>
        )
    }
}


const mapStateToProps = (state) => ({
    currentUserStatus: state.usersState.loggedInUser.loggedIn,
    currentUser: state.usersState.loggedInUser.user,
    msg: state.usersState.loggedInUser.msg
})

const mapDispatchToProps = {
    login
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)


const styles = {
    AdminContainer: {
        width: 450,
        height: 400,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10000,
        borderRadius: 6,

    },
    container: {
        position: 'absolute',
        width: 450,
        height: 400,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10000,
        borderRadius: 6
    },
    title: {
        fontFamily: 'Cambria',
        fontSize: 25,
        fontWeight: 'bold',
        color: '#7a7875',
        marginBottom: 30
    },
    label: {
        fontSize: 15,
        fontFamily: 'Verdana',
        color: 'grey'
    },
    input: {
        width: 350,
        height: 35,
        fontSize: 20,
        border: 'none',
        borderBottom: '0.5px solid #d1d3d6',
        background: 'transparent',
        outline: 'none'
    },
    button: {
        width: 350,
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        marginTop: 15,
        color: 'white',
        cursor: 'pointer'
    }
}
