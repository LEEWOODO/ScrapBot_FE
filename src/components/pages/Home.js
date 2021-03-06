import React, { Component } from 'react'
import { InfoConsumer } from '../context'
import Info from '../Info';
import queryString from 'query-string'
import Kakao from "../../Kakao";
import { getToken } from '../apis/restApi';


class Home extends Component {
    render() {

        const { search } = this.props.location;
        const queryObj = queryString.parse(search);
        const { code } = queryObj;
        //code값이 존재 할 경우
        if (code != undefined) {
            //토큰 새로 발급
            getToken(code);
        }


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
