import React, { Component } from 'react'
import { placeInfo, reviews, detailInfo, news } from '../data'
import { ThemeConsumer } from 'styled-components';


const InfoContext = React.createContext();

class InfoProvider extends Component {

    state = {
        placeInfo : placeInfo,
        reviews : reviews,
        detailInfo : detailInfo,
        news: news
    }


    render() {
        return (
            <InfoContext.Provider value={{
                placeInfo: this.state.placeInfo,
                reviews : this.state.reviews,
                //maps : this.state.maps,
                //headerTitle : this.state.headerTitle,
                //headerSubTitle : this.state.headerSubTitle,
                //headerText : this.state.headerText,
                detailInfo : this.state.detailInfo,
                news : this.state.news,
                //name : this.state.name,
                //avatar : this.state.avatar,
                //comment : this.state.commnet


            }}>
                {this.props.children}
            </InfoContext.Provider>
        )
    }
}

const InfoConsumer = InfoContext.Consumer;

export { InfoProvider, InfoConsumer } ;