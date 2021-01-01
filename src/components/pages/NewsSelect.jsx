import React, { Component } from "react";
import { getEmails, isLogin } from "../../Kakao";
import { addNewdCompany, subNewdCompany } from "../apis/restApi";
import { getUserinfoByEmail, getNewsCompanies } from "../apis/restApi";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
class NewsSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: false,
      email: "",
      userinfo: {
        newsCompanySet: [],
      },
      companies: [],
    };
  }

  async componentDidMount() {
    let result = await getNewsCompanies();
    this.setState({ companies: result });
    let email = "";
    const islogin = await isLogin(this);
    if (islogin) email = await getEmails(this);
    let userinfo = await getUserinfoByEmail(email, this);
    this.setState({ keywords: userinfo.keywords });
  }

  render() {
    const { companies, userinfo } = this.state;
    const userhaveCompanies = userinfo.newsCompanySet.map(
      (companyObj) => companyObj.companyName
    );
    const printCompanyList = companies.map((company, index) => (
      <>
        <div class="container">
          <div class="row">
            <div class="col">
              <label>{company.companyName}</label>
            </div>
            <div class="col">
              <BootstrapSwitchButton
                checked={userhaveCompanies.includes(company.companyName)}
                size="sm"
                onstyle="primary"
                offstyle="info"
                onChange={(checked) => {
                  if (checked === false) {
                    // 신문사 제외 프로세스 실행
                    subNewdCompany(company.id, userinfo.id);
                  } else {
                    // 신문사 추가 프로세스 실행
                    addNewdCompany(company.id, userinfo.id);
                  }
                }}
                onlabel={"ON"}
                offlabel={"OFF"}
                width={50}
              />
            </div>
          </div>
        </div>
      </>
    ));
    return (
      <>
        <div>{printCompanyList}</div>
      </>
    );
  }
}

NewsSelect.propTypes = {};

export default NewsSelect;
