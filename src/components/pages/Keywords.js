import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { InfoConsumer } from '../context';

class Keywords extends Component {
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

    async componentDidMount() {
        await axios.get('https://dog.ceo/api/breeds/image/random')
            .then(response => {
                console.log("rio : " + response.data);
            })
            .catch(error => {
                console.log(error);
            });


        await axios.get('http://localhost:8080/api/user/info/' + this.state.userEmail)
            .then(response => {
                console.log("rio : " + response.data);

                let keywords = response.data.keywords;
                console.log(keywords);
                let indexNumber = 0;
                keywords = keywords.map(function (element) { return { idx: indexNumber++, title: element } });

                this.setState({ keywords });


                // this.keywords({
                //     keywords: response.data.keywords
                // });



            })
            .catch(error => {
                console.log(error);
            });

    }

    // 키워드 변수
    handleChange = (e) => {
        e.preventDefault();

        this.setState({
            [e.target.name]: e.target.value
        });

        // this.setState({
        //     inputKeyword : e.target.value
        // })
    }

    // 엔터키 이벤트
    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.handleCreate();
        }
    }

    // 키워드 추가 
    handleCreate = (data) => {
        console.log("data :" + data);
        this.setState({
            keywords: this.state.keywords.concat({ id: this.id++, title: this.state.inputKeyword }),
            inputKeyword: ''
        })

        // information: information.concat({ id: this.id++, ...data })


    }

    // 키워드 삭제 
    handleDelete = (title) => {
        const { keywords } = this.state;

        alert("delete  title:" + title);
        this.setState({
            keywords: keywords.filter(keyword => keyword.title !== title),
        });

        // this.setState({
        //     keywords: [
        //         ...this.state.keywords.slice(0, i),
        //         ...this.state.keywords.slice(i+1, this.state.keywords.length)
        //     ]
        // })
    }

    // handleSubmit 이벤트 막기
    handleSubmit = e => {
        e.preventDefault();
        this.handleCreate();
    }

    render() {
        const { keywords } = this.state;
        const { handleChange, handleKeyPress, handleCreate, handleDelete, handleSubmit } = this;
        const keywordsList = keywords.map(
            (keyword, index) => (
                console.log("keyword : " + keyword),
                console.log("index : " + index),
                // <KeywordsCard key={index} item={keyword}></KeywordsCard>
                <div key={index} className="container col-5 col-lg-2 mx-auto mb-2">
                    <div style={{ width: '18rem' }}>
                        <div className="card-body">
                            <Link
                                onClick={() =>
                                    handleDelete(keyword.title)
                                }
                                className="btn btn-outline-dark"
                            // to='#'
                            >
                                {keyword.title} &nbsp;<i className="fas fa-times"></i>
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
                            <Link to='#'>혹시 키워드와 관련된 알림이 오지 않나요?</Link>
                            <form className="form-inline my-2 my-lg-0" onSubmit={this.handleSubmit}>
                                <input className="form-control mr-sm-2" type="search" placeholder="키워드를 입력해주세요." aria-label="Search" name="inputKeyword" value={this.state.inputKeyword} onChange={handleChange} />
                                <button className="btn btn-outline-primary my-2 my-sm-0" type="button" onClick={handleCreate}>등록</button>
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

                            <div>
                                결과 : {JSON.stringify(this.state.keywords)}

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
