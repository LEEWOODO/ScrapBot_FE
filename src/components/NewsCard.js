import React, { Component } from 'react'
import { InfoConsumer } from '../components/context';
import { Link } from 'react-router-dom';

class NewsCard extends Component {
    render() {
        const { id, title, text, pagenumber } = this.props.item;
        // const changedtext = text.replace(/(<([^>]+)>)/ig, '');
        return (

            <InfoConsumer>
                {value => (


                    <>
                        <h5 key={id} className="card-title" >
                            &nbsp;&nbsp;&nbsp;{title}/{pagenumber}면
                            </h5>
                        {/* <p className="card-text">{changedtext}</p> */}
                        <Link to="/" className="card-link">

                        </Link>
                    </>

                )}

            </InfoConsumer>

        )
    }
}

export default NewsCard;
