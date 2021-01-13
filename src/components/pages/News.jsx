import React, { Component, useEffect, useState } from "react";
import NewsCard from "../NewsCard";

import Kakao, { getEmails, isLogin } from "../../Kakao";

import {
  getNewsData,
  getUserinfoByEmail,
  getNewsDataByDate,
} from "../apis/restApi";
import copy from "copy-to-clipboard";
import Button from "react-bootstrap/Button";
import DatePicker, { registerLocale } from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
// import clipboardImg from "../../../public/images/clipboard.svg";
class News extends Component {
  constructor(props) {
    super(props);

    // Quiz 자체에 state를 할당하고, items에 기본값을 줍니다.
    this.state = {
      isLogin: false,
      email: "",
      userinfo: { id: 0 },
      newsResult: [
        {
          id: 0,
          newcompany: "",
          newscompanyId: "",
          pagenumber: "",
          regdate: "",
          text: "",
          title: "",
          topornot: true,
          url: "",
        },
      ],
      startDate: new Date(),
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
    let userinfo = await getUserinfoByEmail(email, this);
    let newsdata = await getNewsData(userinfo.id, this);
    this.setState({ newsResult: newsdata });
  }
  async gettingNewsData(userId, date) {
    const { userinfo } = this.state;
    console.log(this.state);
    let newsdata = await getNewsDataByDate(userinfo.id, date, this);
    this.setState({ newsResult: newsdata });
  }

  render() {
    const { newsResult, startDate, userinfo } = this.state;
    // console.log(userinfo);
    const newcompanies = Array.from(
      new Set(newsResult.map((news) => news.newcompany))
    );
    Array.from(new Set(newcompanies));

    // registerLocale("ko", ko);
    return (
      <>
        <Button
          key={0}
          variant="primary"
          className="float-right"
          onClick={() => {
            alert("기사 제목이 복사되었습니다.");

            let companyTitle = "";
            const copyNewsDataList = newsResult
              .map((news) => {
                let copyNewsData = "";
                if (companyTitle !== news.newcompany) {
                  companyTitle = news.newcompany;
                  copyNewsData += "▶" + news.newcompany + "\n";
                }
                copyNewsData +=
                  "\t" +
                  news.title +
                  " " +
                  news.pagenumber +
                  (news.topornot ? " 톱" : "") +
                  "\n";
                return copyNewsData;
              })
              .reduce((prev, curr) => prev + curr);
            copy(copyNewsDataList);
          }}
        >
          기사 제목들만 복사하기 >
        </Button>
        <br></br>
        <br></br>
        {/* 날짜 추가 부분 시작 - 20210102 */}
        <div className="d-flex justify-content-center">
          <h4>&nbsp;날 짜 선 택&nbsp;</h4>
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              console.log(date);
              this.setState({ startDate: date });
              this.gettingNewsData(userinfo.id, date);
            }}
            locale={ko}
          />
        </div>

        {/* 날짜 추가 부분 완성 - 20210102*/}
        {newcompanies.map((Companyname) => {
          return (
            <>
              <div className="card container mt-2 mb-2 p-1">
                <div className="card-body">
                  <h2>{Companyname}</h2>
                  {newsResult.map((news) => {
                    if (Companyname === news.newcompany)
                      return <NewsCard key={news.id} item={news}></NewsCard>;
                  })}
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  }
}

export default News;
