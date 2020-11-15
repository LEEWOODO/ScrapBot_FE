import React, { Component } from 'react';
import { InfoConsumer } from '../context';
import KeywordsCard from '../KeywordsCard';
import { Link } from 'react-router-dom';

class Keywords extends Component {
    state = {
        
        keywords : [
            "봄","여름","가을","겨울"
            
        ],
        inputKeyword : "",
    }

    // 키워드 변수
    handleChange = (e) => {
        this.setState({
            inputKeyword : e.target.value
        })
    }

    // 키워드 추가 
    handleCreate = (data) => {
        console.log(this.state);

        this.setState({
            keywords: this.state.keywords.concat(this.state.inputKeyword),
            inputKeyword : ""
        })

        // console.log("추가 결과 : "+ this.state.keywords);
    }

    // 키워드 삭제 
    handleDelete = (i) => {
        alert("delete  i:" + i);
        this.setState({
            keywords: [
                ...this.state.keywords.slice(0, i),
                ...this.state.keywords.slice(i+1, this.state.keywords.length)
            ]
        })
    }

    render() {
        const { keywords } = this.state;
        const { handleChange, handleCreate, handleDelete } = this;
        const keywordsList = keywords.map(
            (keyword, index) => (
                // <KeywordsCard key={index} item={keyword}></KeywordsCard>
                <div className="container col-5 col-lg-2 mx-auto mb-2">
                    <div style={{ width: '18rem' }}>
                        <div className="card-body">
                            <Link
                                onClick={() => 
                                    handleDelete(index)
                                }
                                className="btn btn-outline-dark"
                            >
                                {keyword} &nbsp;<i className="fas fa-times"></i>
                            </Link>
                        </div>
                    </div>

                </div>
            )
        );
        return (
                <InfoConsumer>
                    {value => {
                        return (
                           
                            <div className="container-fluid mt-2 mb-3 p-5" >
                                <h5 className="display-5 font-weight-bold">키워드 등록</h5>
                                <p>키워드를 등록해두면 관련된 기사들을 확인 할 수 있어요.</p>
                                <Link>혹시 키워드와 관련된 알림이 오지 않나요?</Link>
                                <form className="form-inline my-2 my-lg-0">
                                    <input className="form-control mr-sm-2" onChange={ this.handleChange } type="search" placeholder="키워드를 입력해주세요." aria-label="Search" />
                                    <button className="btn btn-outline-primary my-2 my-sm-0" type="button" onClick={this.handleCreate}>등록</button>
                                </form>
                                <p>키워드 등록({this.state.keywords.length}/30)</p>

                                {/* <div className="row mt-5">
                                    {value.keywords.map(item => {
                                        return <KeywordsCard key={item.id} item={item}></KeywordsCard>;
                                    })}
                                </div> */}

                                <div className="row mt-5">
                                    {keywordsList}
                                </div>

                                {/* social icons */}
                                <div className="mt-5">
                                    <div className="row justify-content-center">
                                        <div className="col-2">
                                            <i className="fab fa-facebook-f"></i>
                                        </div>
                                        <div className="col-2">
                                            <i className="fab fa-twitter"></i>
                                        </div>
                                        <div className="col-2">
                                            <i className="fab fa-google-plus-g"></i>
                                        </div>
                                        <div className="col-2">
                                            <i className="fab fa-reddit"></i>
                                        </div>
                                        <div className="col-2">
                                            <i className="fab fa-whatsapp"></i>
                                        </div>
                                        <div className="col-2">
                                            <i className="fab fa-facebook-messenger"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }}
                </InfoConsumer>  

        )
    }
}

export default Keywords;
