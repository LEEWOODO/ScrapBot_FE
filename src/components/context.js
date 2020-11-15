import React, { Component } from 'react'
import { placeInfo, reviews, detailInfo, news, keywords } from '../data'
import { ThemeConsumer } from 'styled-components';


const InfoContext = React.createContext();

class InfoProvider extends Component {

    state = {
        placeInfo : placeInfo,
        reviews : reviews,
        detailInfo : detailInfo,
        news : news,
        keywords : keywords
    };

    getItem = id => {
        const item = this.state.placeInfo.find(item => item.id === id);
        return item;
    };

    handleDetail = id => {
        const item = this.getItem(id);
        this.setState(() => {
            return {
                detailInfo : item
            };
        });
    };

    handleDeleteKeywords = id => {
        alert(id);
    };

    render() {
        return (
            <InfoContext.Provider value={{
                placeInfo: this.state.placeInfo,
                reviews : this.state.reviews,
                maps : this.state.maps,
                headerTitle : this.state.headerTitle,
                headerSubTitle : this.state.headerSubTitle,
                headerText : this.state.headerText,
                detailInfo : this.state.detailInfo,
                news : this.state.news,
                name : this.state.name,
                avatar : this.state.avatar,
                comment : this.state.commnet,
                handleDetail : this.handleDetail,

                // keywords
                keywords : this.state.keywords,
                handleDeleteKeywords: this.handleDeleteKeywords



            }}>
                {this.props.children}
            </InfoContext.Provider>
        )
    }
}

const InfoConsumer = InfoContext.Consumer;

export { InfoProvider, InfoConsumer } ;