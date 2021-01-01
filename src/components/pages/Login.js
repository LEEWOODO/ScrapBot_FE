import React from 'react'

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            email: "",
        };
    }



    componentDidMount() {

    }



    render() {
        const { isLogin, email } = this.state;
        return (
            <div>
                <p>로그인화면</p>
                <button onClick={this.loginWithKakao}>카카오 로그인</button>
            </div>
        );
    }
}

Login.propTypes = {

};

export default Login;