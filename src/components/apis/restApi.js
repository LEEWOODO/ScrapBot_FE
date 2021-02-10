import axios from 'axios';
import Kakao from '../../Kakao'

const getUserinfoByEmail = async (email, component) => {
    const url = 'http://34.64.173.25:8090/api/user/info/' + email;
    console.log(url);
    const data = await axios.get(
        'http://34.64.173.25:8090/api/user/info/' + email
        // "http://34.64.173.25:8090/api/user/info/2c6829%40naver.com"
    );
    console.log(data.data);
    component.setState({ userinfo: data.data });
    return data.data;
};

//신문사 정보 가져오는 함수s
const getNewsCompanies = async () => {
    console.log('excute get newscompanies info');
    const url = 'http://34.64.173.25:8090/api/company-list';
    let { data } = await axios.get(url);

    return data;
}

const getNewsData = async (id, component) => {
    const todayDate = new Date();
    let month = '', date = '';
    if ((todayDate.getMonth()) < 9) {
        month = '0' + (todayDate.getMonth() + 1);
    } else { month = todayDate.getMonth() + 1; }
    if ((todayDate.getDate()) < 10) {
        date = '0' + (todayDate.getDate());
    } else { date = todayDate.getDate(); }

    const todayDateString = todayDate.getFullYear() + '' + (month) + '' + (date);
    console.log(todayDateString);
    const url = 'http://34.64.173.25:8090/api/user/contents/' + id + '/' + todayDateString;

    console.log(url);
    let { data } = await axios.get(url);

    return data;
}

const getNewsDataByDate = async (id, date1, component) => {
    const todayDate = date1;
    let month = '', date = '';
    if ((todayDate.getMonth()) < 9) {
        month = '0' + (todayDate.getMonth() + 1);
    } else { month = todayDate.getMonth() + 1; }
    if ((todayDate.getDate()) < 10) {
        date = '0' + (todayDate.getDate());
    } else { date = todayDate.getDate(); }

    const todayDateString = todayDate.getFullYear() + '' + (month) + '' + (date);
    console.log(todayDateString);
    const url = 'http://34.64.173.25:8090/api/user/contents/' + id + '/' + todayDateString;

    console.log(url);
    let { data } = await axios.get(url);

    return data;
}

const deleteKeyword = async (id, keyword) => {
    const url = 'http://34.64.173.25:8090/api/user/keyword/delete?id=' + id + '&keyWord=' + keyword;

    const result = await axios.put(url);

    return result;
}

const addKeyword = async (id, keyword) => {
    const url = 'http://34.64.173.25:8090/api/user/keyword/add?id=' + id + '&keyWord=' + keyword;
    console.log(url);
    const result = await axios.put(url);

    return result;
}

const testPost = async () => {
    const result = await axios.put("http://34.64.173.25:8090/api/user/keyword/add?id=12467&keyWord=안녕하세요");

    return result;
}
const addNewdCompany = async (companyid, userid) => {
    const url = 'http://34.64.173.25:8090/api/user/news-comany/add?companyid=' + companyid + '&userid=' + userid;
    const result = await axios.put(url);

    return result;
}
const subNewdCompany = async (companyid, userid) => {
    const url = 'http://34.64.173.25:8090/api/user/news-comany/sub?companyid=' + companyid + '&userid=' + userid;
    const result = await axios.put(url);

    return result;
}

const getToken = (code) => {
    fetch("https://kauth.kakao.com/oauth/token", {
        body: "grant_type=authorization_code&client_id=fb9527722b52ff8e010d5eb046d8b82a&redirect_uri=http://www.scrapbot.co.kr/&code=" + code,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST"
    })
        .then(response => response.json())
        .then((json) => {
            Kakao.Auth.setAccessToken(json.access_token);
        })
}



export { getUserinfoByEmail, getNewsData, testPost, deleteKeyword, addKeyword, getNewsCompanies, addNewdCompany, subNewdCompany, getNewsDataByDate, getToken };