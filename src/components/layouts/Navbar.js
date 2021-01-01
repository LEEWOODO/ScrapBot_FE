import React, { Component } from 'react';
import logo from '../../logo.svg';
import { Link } from 'react-router-dom';
import Kakao, { getEmail, getEmails, isLogin } from "../../Kakao";
import { getNewsData, getUserinfoByEmail, testPost } from "../apis/restApi";

class Navbar extends Component {
    constructor(props) {
        super(props);

        // Quiz 자체에 state를 할당하고, items에 기본값을 줍니다.
        this.state = {
            isLogin: false,
            email: "",
            userinfo: {}
        };
    }

    loginWithKakao = () => {
        try {
            return new Promise((resolve, reject) => {
                if (!Kakao) {
                    reject("Kakao 인스턴스가 존재하지 않습니다.");
                } else {
                    Kakao.Auth.login({
                        success: (auth) => {
                            console.log("정상적으로 로그인 되었습니다.", auth);
                            this.setState({ isLogin: true });
                            window.location.reload();
                        },
                        fail: (err) => {
                            console.error(err);
                        },
                    });
                }
            });
        } catch (err) {
            console.error(err);
        }

    };
    logoutWithKakao = () => {
        if (Kakao.Auth.getAccessToken()) {
            Kakao.Auth.logout(() => {
                console.log("로그아웃 되었습니다", Kakao.Auth.getAccessToken());
                this.setState({ isLogin: false, email: "" });
            });
        }
    };
    async componentDidMount() {
        let email = "";
        const islogin = await isLogin(this);
        if (islogin) email = await getEmails(this);
        let userinfo = await getUserinfoByEmail(email, this);
        let newsdata = await getNewsData(userinfo.id, this);
        // let result = await testPost();
    };
    render() {
        const { isLogin, email, userinfo, newsResult } = this.state;
        const { logoutWithKakao, loginWithKakao } = this;
        const loginView = (
            <ul className="nav navbar-nav navbar-right">
                <li><a href="#" onClick={() =>
                    logoutWithKakao()
                }>{email}</a></li>
            </ul>
        );
        const notLogin = (
            <ul className="nav navbar-nav navbar-right">
                <li><a href="#" onClick={() =>
                    loginWithKakao()
                }>로그인</a></li>
            </ul>
        )
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                <Link className="navbar-brand ml-5" to="/">
                    <img src={logo} alt="logo" style={{ width: '35px' }}></img>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span>
                        <i className="fas fa-bars" style={{ color: '#fff' }}></i>
                    </span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto">
                        <li className="nav-item active">
                            <Link className="nav-link text-white text-uppercase ml-5" to="/">Home&nbsp;<i className="fas fa-home"></i><span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white text-uppercase ml-5" to="/news">News</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white text-uppercase ml-5" to="/keywords">키워드 설정</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white text-uppercase ml-5" to="/news-config">신문사 설정</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white text-uppercase ml-5" to="/contacts">Contact Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white text-uppercase ml-5" to="/contacts">My Page&nbsp;<i className="fas fa-user"></i></Link>
                        </li>
                    </ul>
                    {/* <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
                </form> */}
                </div>
                <div>{isLogin ? loginView : notLogin}</div>;
            </nav>

        )
    }
}
export default Navbar;
