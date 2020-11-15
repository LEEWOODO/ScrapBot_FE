import React, { Component } from 'react';
import { InfoConsumer } from './context';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

class KeywordsCard extends Component {
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
                                    {keyword} &nbsp;<i class="fas fa-times"></i>
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
