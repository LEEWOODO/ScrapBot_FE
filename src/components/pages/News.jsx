import React, { Component } from "react";
import NewsCard from "../NewsCard";
import { InfoConsumer } from "../context";
import Kakao, { getEmail, getEmails, isLogin } from "../../Kakao";
import axios from "axios";
import { getNewsData, getUserinfoByEmail, testPost } from "../apis/restApi";
class News extends Component {
  constructor(props) {
    super(props);

    // Quiz 자체에 state를 할당하고, items에 기본값을 줍니다.
    this.state = {
      isLogin: false,
      email: "",
      userinfo: {},
      newsResult: [],
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
    console.log("email");
    console.log(email);
    let userinfo = await getUserinfoByEmail(email, this);
    console.log("userinfo");
    console.log(userinfo);
    let newsdata = await getNewsData(userinfo.id, this);
    let result = await testPost();
  }

  render() {
    const { isLogin, email, userinfo, newsResult } = this.state;

    console.log(newsResult);
    // console.log("userinfo :" + userinfo.email);
    return (
      <>
        {/* <div>{isLogin ? mainView : loginView}</div>; */}
        {newsResult.map((news) => {
          console.log("news");
          console.log(news);
          return <NewsCard key={news.id} item={news}></NewsCard>;
        })}
      </>
    );
  }
}

export default News;
