import axios from 'axios';


const getUserinfoByEmail = async (email, component) => {
    const url = 'http://localhost:8080/api/user/info/' + email;
    console.log(url);
    const data = await axios.get(
        'http://localhost:8080/api/user/info/' + email
        // "http://localhost:8080/api/user/info/2c6829%40naver.com"
    );
    component.setState({ userinfo: data.data });
    return data.data;
};

//신문사 정보 가져오는 함수s
const getNewsCompanies = async () => {
    console.log('excute get newscompanies info');
    const url = 'http://localhost:8080/api/company-list';
    let { data } = await axios.get(url);

    return data;
}

const getNewsData = async (id, component) => {
    const todayDate = new Date();
    const todayDateString = todayDate.getFullYear() + '' + (todayDate.getMonth() + 1) + '' + (todayDate.getDate());
    const url = 'http://localhost:8080/api/user/contents/' + id + '/20201108';

    console.log(url);
    let { data } = await axios.get(url);

    return data;
}

const deleteKeyword = async (id, keyword) => {
    const url = 'http://localhost:8080/api/user/keyword/delete?id=' + id + '&keyWord=' + keyword;

    const result = await axios.put(url);

    return result;
}

const addKeyword = async (id, keyword) => {
    const url = 'http://localhost:8080/api/user/keyword/add?id=' + id + '&keyWord=' + keyword;
    console.log(url);
    const result = await axios.put(url);

    return result;
}

const testPost = async () => {
    const result = await axios.put("http://localhost:8080/api/user/keyword/add?id=12467&keyWord=안녕하세요");

    return result;
}
const addNewdCompany = async (companyid, userid) => {
    const url = 'http://localhost:8080/api/user/news-comany/add?companyid=' + companyid + '&userid=' + userid;
    const result = await axios.put(url);

    return result;
}
const subNewdCompany = async (companyid, userid) => {
    const url = 'http://localhost:8080/api/user/news-comany/sub?companyid=' + companyid + '&userid=' + userid;
    const result = await axios.put(url);

    return result;
}

export { getUserinfoByEmail, getNewsData, testPost, deleteKeyword, addKeyword, getNewsCompanies, addNewdCompany, subNewdCompany };