import React, { PureComponent, Component } from 'react';
import Popup from './popup'
import { notice } from './popup'
import { instance } from '../api'
import Icon from './icons';

export default class SignUp extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            isHovered: false,
            hoveredIcon: false
        }
    }

    _handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    _handleSubmit = () => {
        const { username, email, password, confirm_password } = this.state
        let data = {
            name: username,
            email: email,
            password: password,
            password_confirm: confirm_password
        }
        if (username && email && password && confirm_password && password === confirm_password) {
            instance.post('/signup', data)
                .then(response => {
                    if (response && response.data && response.data.code === 0) {
                        console.log('response 0 ', response)
                        this.props.handleClickBackground()
                        notice.open('Signup successfully!')
                    } else notice.open(response && response.data && response.data.message)
                })
                .catch(err => { console.log(err); notice.open('Server error!') })
        } else return notice.open('Invalid input, please try again!')

    }

    render() {
        return (<Popup open={this.props.open} handleClickBackground={this.props.handleClickBackground}>
            <div style={styles.container}>
                <div style={Object.assign({}, styles.cross_style, { backgroundColor: this.state.hoveredIcon ? '#e6e6e6' : '' })}
                    onClick={this.props.handleClickBackground}
                    onMouseEnter={() => this.setState({ hoveredIcon: true })}
                    onMouseLeave={() => this.setState({ hoveredIcon: false })}
                ><Icon icon='cross' /></div>
                <div style={styles.title}>Sign up</div>
                <div>
                    <div style={styles.label}>Username:</div>
                    <div><input type='name' name='username' style={styles.input} onChange={this._handleInputChange} /></div>
                </div>
                <div style={{ margin: '30px auto' }}>
                    <div style={styles.label}>Password:</div>
                    <div><input type='password' name='password' style={styles.input} onChange={this._handleInputChange} /></div></div>
                <div style={{ margin: '' }}>
                    <div style={styles.label}>Confirm Password:</div>
                    <div><input type='password' name='confirm_password' style={styles.input} onChange={this._handleInputChange} /></div></div>
                <div style={{ margin: '30px auto' }}>
                    <div style={styles.label}>Email:</div>
                    <div><input type='text' name='email' style={styles.input} onChange={this._handleInputChange} /></div></div>
                <div style={Object.assign({}, styles.button, { backgroundColor: this.state.isHovered ? '#808080' : '#10b750' })}
                    onClick={this._handleSubmit}
                    onMouseEnter={() => this.setState({ isHovered: true })}
                    onMouseLeave={() => this.setState({ isHovered: false })}
                ><p>Signup</p></div>
            </div>
        </Popup>
        )
    }
}


const styles = {
    container: {
        position: 'fixed',
        width: 550,
        height: 600,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6
    },
    cross_style: {
        alignSelf: 'flex-end',
        marginRight: 20,
        marginTop: -30,
        width: 25,
        height: 25,
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Cambria',
        fontSize: 30,
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
        width: 390,
        height: 35,
        fontSize: 20,
        border: 'none',
        borderBottom: '0.5px solid #d1d3d6',
        background: 'transparent',
        outline: 'none'
    },
    button: {
        width: 390,
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        marginTop: 15,
        color: 'white',
        cursor: 'pointer',
    }
}