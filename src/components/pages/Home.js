import React, { Component } from 'react'
import { InfoConsumer } from '../context'
import Info from '../Info';
import queryStirng from 'query-string'
import Kakao from "../../Kakao";


class Home extends Component {
    componentWillMount() {
        const { search } = this.props.location;
        const queryObj = queryString.parse(search);
        const { code } = queryObj;
        console.log(code);
        Kakao.Auth.setAccessToken(code);
        console.log(Kakao.Auth.getAccessToken());
    }
    render() {
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
