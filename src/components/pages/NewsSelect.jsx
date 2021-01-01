import React, { Component } from "react";
import NewsCard from "../NewsCard";
import { InfoConsumer } from "../context";
import Kakao, { getEmail, getEmails, isLogin } from "../../Kakao";
import axios from "axios";
import {
  getNewsData,
  getUserinfoByEmail,
  testPost,
  getNewsCompanies,
} from "../apis/restApi";

class NewsSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: false,
      email: "",
      userinfo: {},
      companies: [],
    };
  }

  async componentDidMount() {
    let result = await getNewsCompanies();
    console.log(result);
    this.setState({ companies: result });
    let email = "";
    const islogin = await isLogin(this);
    if (islogin) email = await getEmails(this);
    console.log("in keywords page email");
    console.log(email);
    let userinfo = await getUserinfoByEmail(email, this);
    console.log("userinfo");
    console.log(userinfo);
    this.setState({ keywords: userinfo.keywords });
  }

  render() {
    const { companies } = this.state;
    const printCompanyList = companies.map((company, index) => (
      <div>{company.companyName}</div>
    ));
    return <div>{printCompanyList}</div>;
  }
}

NewsSelect.propTypes = {};

export default NewsSelect;
