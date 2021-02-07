import React, { Component } from 'react'
import { InfoConsumer } from '../context'
import Info from '../Info';
import queryString from 'query-string'
import Kakao from "../../Kakao";


class Home extends Component {
    // getCookie = (name) => {
    //     const value = "; " + document.cookie;
    //     const parts = value.split("; " + name + "=");
    //     if (parts.length === 2) return parts.pop().split(";").shift();
    // }

    render() {
        // const { search } = this.props.location;
        // const queryObj = queryString.parse(search);
        // const { code } = queryObj;
        // console.log(code);
        // Kakao.Auth.setAccessToken(code);
        // console.log(Kakao.Auth.getAccessToken());
        // const { getCookie } = this;
        // const token = getCookie('authorize-access-token')
        // if (token) {
        //     console.log("token:" + token);
        //     Kakao.Auth.setAccessToken(token)
        //     Kakao.Auth.getStatusInfo(({ status }) => {
        //         if (status === 'connected') {
        //             document.getElementById('token-result').innerText = 'login success. token: ' + Kakao.Auth.getAccessToken()
        //         } else {
        //             Kakao.Auth.setAccessToken(null)
        //         }
        //     })
        // }

        return (
            <div className="container">
                <div className="row mt-5">
                    <InfoConsumer>
                        {value => {
                            return value.placeInfo.map(item => {
                                return <Info key={item.id} item={item}></Info>;
                            })
                        }}
                    </InfoConsumer>

                </div>

            </div>

        );
    }
}

export default Home;
