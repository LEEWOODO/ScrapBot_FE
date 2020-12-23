export default window.Kakao;

const isLogin = (component) => {
    console.log(window.Kakao);
    if (window.Kakao.Auth.getAccessToken()) {
        component.setState({ isLogin: true });
        return true;
    } else {
        component.setState({ isLogin: false });
        return false;
    }
}

const getEmail = (component) => {

    try {
        let resultEmail = '';
        return new Promise((resolve, reject) => {
            if (!window.Kakao) {
                reject("kakao 인스턴스가 없음.");
            } else {
                window.Kakao.API.request({
                    url: "/v2/user/me",
                    success: function (res) {
                        let email = res.kakao_account.email;
                        component.setState({ email: email });
                    },
                    fail: function (error) {
                        console.log("maybe here i think" + error);
                    },
                });
            }
            // resolve(items)
        });


    }
    catch (err) {
        console.error(err);
    }

}

async function getEmails(component) {
    var resultItems = await window.Kakao.API.request({
        url: "/v2/user/me",
        success: function (res) {
            let email = res.kakao_account.email;
            component.setState({ email: email });

        },
        fail: function (error) {
            console.log("maybe here i think" + error);

        },
    });
    //console.log("resultItems")
    // console.log(resultItems); // [1,2,3]
    return resultItems.kakao_account.email;
}

export { isLogin, getEmail, getEmails };