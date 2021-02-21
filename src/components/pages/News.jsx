import React, { Component, useEffect, useState } from "react";
import NewsCard from "../NewsCard";

import Kakao, { getEmails, isLogin } from "../../Kakao";
import { Link } from "react-router-dom";
import {
  getNewsData,
  getUserinfoByEmail,
  getNewsDataByDate,
  getNewsCompanies,
} from "../apis/restApi";
import copy from "copy-to-clipboard";
import Button from "react-bootstrap/Button";
import DatePicker, { registerLocale } from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import copyAnd from "copy-text-to-clipboard";
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
      isNoKeyword: 0, //if loading -0, nokeyword -3, keywordExsit -1
      totalCompanyList: [
        "조선일보",
        "중앙일보",
        "동아일보",
        "매일경제",
        "한국경제",
        "서울경제",
        "머니투데이",
      ],
    };
  }

  async componentDidMount() {
    let email = "";
    const islogin = await isLogin(this);
    if (islogin) email = await getEmails(this);
    let userinfo = await getUserinfoByEmail(email, this);
    let emtpyResult = await this.filterSelectedCompany();
    let newsdata = await getNewsData(userinfo.id, this);
    this.setState({ newsResult: newsdata });

    this.checkKeyWordsLength(userinfo.keywords);
  }

  async filterSelectedCompany() {
    let { totalCompanyList } = this.state;
    const { newsCompanySet } = this.state.userinfo;
    const selectedCompanies = newsCompanySet.map(
      (companyObj) => companyObj.companyName
    );
    totalCompanyList = totalCompanyList.filter((newsCompayName) =>
      selectedCompanies.includes(newsCompayName)
    );
    this.setState({ totalCompanyList });
    return 1;
  }

  async gettingNewsData(userId, date) {
    const { userinfo } = this.state;

    console.log(this.state);
    let newsdata = await getNewsDataByDate(userinfo.id, date, this);
    this.setState({ newsResult: newsdata });
  }
  checkKeyWordsLength = (keywordsArray) => {
    console.log(keywordsArray.length);
    if (keywordsArray.length <= 0) {
      this.setState({ isNoKeyword: 3 });
    } else {
      this.setState({ isNoKeyword: 1 });
    }
  };

  render() {
    const {
      newsResult,
      startDate,
      userinfo,
      isNoKeyword,
      totalCompanyList,
      isLogin,
    } = this.state;
    // console.log(userinfo);
    const newcompaniesSetByDate = Array.from(
      new Set(newsResult.map((news) => news.newcompany))
    );

    let newLine = "";

    function checkMobile() {
      var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기

      if (varUA.indexOf("android") > -1) {
        //안드로이드
        newLine = "\r\n";
      } else if (
        varUA.indexOf("iphone") > -1 ||
        varUA.indexOf("ipad") > -1 ||
        varUA.indexOf("ipod") > -1
      ) {
        //IOS
        newLine = "\n";
      } else {
        //아이폰, 안드로이드 외
        newLine = "\n";
      }
    }
    checkMobile();
    // registerLocale("ko", ko);
    console.log("isLogin" + isLogin);
    if (isLogin === false)
      return (
        <>
          <div className="card container mt-2 mb-2 p-1">
            <div className="card-body">
              <h3>로그인이 필요합니다.</h3>
              <br />
              <h5>
                메뉴 우측 상단에서 <br />
                로그인 버튼을 눌러 로그인을 진행해주세요
              </h5>
            </div>
          </div>
        </>
      );

    if (isNoKeyword === 1) {
      return (
        <>
          <Button
            key={0}
            variant="primary"
            className="float-right"
            onClick={() => {
              alert("기사 제목이 복사되었습니다.");
              let StringResult = "";
              totalCompanyList.forEach((Companyname) => {
                StringResult += "▶" + Companyname + newLine;
                newcompaniesSetByDate.includes(Companyname)
                  ? newsResult
                      .filter((news) => news.newcompany === Companyname)
                      .forEach(
                        (news) =>
                          (StringResult +=
                            "\t" +
                            news.title +
                            " " +
                            news.pagenumber +
                            (news.topornot ? " 톱" : "") +
                            newLine)
                      )
                  : (StringResult +=
                      "\t" + "입력된 키워드가 포함된 기사가 없음." + newLine);
                StringResult += newLine;
              });
            }}
          >
            기사 제목들만 복사하기 >
          </Button>
          <br></br>
          <br></br>
          {/* 날짜 추가 부분 시작 - 20210102 */}
          <div className="d-flex justify-content-center">
            <div style={{ fontSize: "15px" }}>&nbsp;날 짜 선 택&nbsp;</div>
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

          {totalCompanyList.map((Companyname) => {
            return (
              <>
                <div className="card container mt-2 mb-2 p-1">
                  <div className="card-body">
                    <div style={{ fontSize: "20px" }}>▶{Companyname}</div>
                    {newcompaniesSetByDate.includes(Companyname) ? (
                      newsResult
                        .filter((news) => news.newcompany === Companyname)
                        .map((news) => (
                          <NewsCard key={news.id} item={news}></NewsCard>
                        ))
                    ) : (
                      <>
                        <div
                          className="card-title"
                          style={{ fontSize: "13px" }}
                        >
                          &nbsp;&nbsp;&nbsp; 입력된 키워드가 포함된 기사가 없음.
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </>
            );
          })}
        </>
      );
    } else if (isNoKeyword === 3) {
      //there is no keyword
      return (
        <>
          <div className="card container mt-2 mb-2 p-1">
            <div className="card-body">
              <h3>등록하신 키워드가 없습니다.</h3>
              <br />
              <h4>
                '키워드 설정' 페이지에서 <br />
                필요한 키워드들을 등록해주세요
              </h4>
              <Link to="/keywords" className="card-link">
                <h5>키워드 설정 바로가기</h5>
              </Link>
            </div>
          </div>
        </>
      );
    } else if (isNoKeyword === 0) {
      return (
        <>
          <p>loading page...</p>
        </>
      );
    }
  }
}

export default News;
