import React, { Component } from 'react'
import { InfoConsumer } from '../components/context';
import { Link, Route } from 'react-router-dom';


class NewsCard extends Component {
    render() {
        console.log(this.props.item);
        const { id, title, text, pagenumber, url } = this.props.item;
        const changedtext = text.replace(/(<([^>]+)>)/ig, '');
        return (

            <InfoConsumer>
                {value => (
                    <>
                        <div key={id} className="card-title" onClick={() => {
                            //아래의 p tag 숨김 or 보임
                            let ptag = document.getElementById(id + '_div');
                            if (ptag.style.display === 'none') {
                                ptag.style.display = '';
                            } else {
                                ptag.style.display = 'none';
                            }

                        }} style={{ fontSize: '11px' }}>
                            &nbsp;&nbsp;&nbsp;V {title}/{pagenumber}면
                        </div>
                        <div id={id + '_div'} style={{ display: 'none' }}>
                            <p className="card-text" id={id + '_content'} style={{ fontSize: '9px' }}>{changedtext}</p>
                            <Link to={{ pathname: url }} className="card-link" target="_blank"> 기사 원문으로 이동
                            </Link>
                        </div>
                    </>
                )
                }

            </InfoConsumer>

        )
    }
}

export default NewsCard;
