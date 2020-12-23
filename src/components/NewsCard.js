import React, { Component } from 'react'
import { InfoConsumer } from '../components/context';
import { Link } from 'react-router-dom';

class NewsCard extends Component {
    render() {
        const { id, title, text, pagenumber, newcompany } = this.props.item;
        const changedtext = text.replace(/(<([^>]+)>)/ig, '');
        return (

            <InfoConsumer>
                {value => (
                    <div className="card container mt-2 mb-2 p-1">
                        <div className="card-body">
                            {newcompany}
                            <h5 key={id} className="card-title">
                                {title}/{pagenumber}면
                            </h5>
                            {/* <p className="card-text">{changedtext}</p> */}
                            <Link to="/" className="card-link">
                                Read More {'>>'}
                            </Link>
                        </div>
                    </div>
                )}

            </InfoConsumer>

        )
    }
}

export default NewsCard;
