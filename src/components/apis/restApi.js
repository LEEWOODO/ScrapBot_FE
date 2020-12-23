import axios from 'axios';


const getUserinfoByEmail = async (email, component) => {
    const html = 'http://localhost:8080/api/user/info/' + email;
    console.log(html);
    const data = await axios.get(
        'http://localhost:8080/api/user/info/' + email
        // "http://localhost:8080/api/user/info/2c6829%40naver.com"
    );
    component.setState({ userinfo: data.data });
    return data.data;
};

const getNewsData = async (id, component) => {
    const todayDate = new Date();
    const todayDateString = todayDate.getFullYear() + '' + (todayDate.getMonth() + 1) + '' + (todayDate.getDate());
    const html = 'http://localhost:8080/api/user/contents/' + id + '/20201108';
    console.log("html");
    console.log(html);
    const { data } = await axios.get(html);
    component.setState({ newsResult: data });
    return data;
}

const testPost = async () => {
    const result = await axios.put("http://localhost:8080/api/user/keyword/add?id=12467&keyWord=안녕하세요");
    console.log("result");
    console.log(result);
    return result;
}

export { getUserinfoByEmail, getNewsData, testPost };