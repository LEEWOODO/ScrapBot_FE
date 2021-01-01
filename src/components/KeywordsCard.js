import React, { Component } from 'react';
import { InfoConsumer } from './context';
import { Link } from 'react-router-dom';


import { getUserinfoByEmail } from "./apis/restApi";
class KeywordsCard extends Component {
    constructor(props) {
        super(props);

        // Quiz 자체에 state를 할당하고, items에 기본값을 줍니다.
        this.state = {
            isLogin: false,
            email: "",
            userinfo: {},
            newsResult: [],
        };
    }




    render() {

        // const {
        //     keywordIdx,
        //     userId,
        //     keywords
        // } = this.props.item;

        const keyword = this.props.item;

        return (
            <InfoConsumer>

                {value => (

                    <div className="container col-5 col-lg-2 mx-auto mb-2">
                        <div style={{ width: '18rem' }}>
                            <div className="card-body">

                                <Link
                                    // onClick={() => 
                                    //     value.handleDeleteKeywords(keywordIdx)
                                    // }
                                    className="btn btn-outline-dark"

                                >
                                    {keyword} &nbsp;<i className="fas fa-times"></i>
                                </Link>
                            </div>
                        </div>

                    </div>
                )}

            </InfoConsumer>
        )
    }

}


export default KeywordsCard;
