import React from 'react';
import styled from 'styled-components';
import { Link, Route } from 'react-router-dom';


function Footer() {
    return (
        <FooterContainer className="main-footer">
            <div className="footer-middle">
                {/* footer bottom */}
                <div className="footer-bottom">
                    <div style={{ fontSize: "10px" }}>
                        <div style={{ fontSize: "12px" }}> &nbsp;&nbsp; 서비스 맛집</div>
                        <ul className="list-unstyled">
                            <li><Link to={{ pathname: 'https://www.notion.so/71ceebc34e8641a9b33e935b8ba30c7d' }} className="card-link" target="_blank">&nbsp;스크랩봇 이용방법</Link></li>
                            <li><Link to={{ pathname: 'https://docs.google.com/document/d/1QlzxDDgcmFWevece_Qv6VQmwOL5lvzJxgBOknBfAzdU/edit?usp=sharing' }} className="card-link" target="_blank">&nbsp;서비스 맛집 이용약관</Link></li>
                            <li><Link to={{ pathname: 'https://docs.google.com/document/d/1JYxgGvVI5y3FxSH2l-_Jfz6Q6aTEWm4oA4RFGT5DhKw/edit#' }} className="card-link" target="_blank">&nbsp;개인정보 취급방침</Link></li>
                        </ul>
                    </div>
                    <p className="text-xs-center">
                        &copy;{new Date().getFullYear()} Scrap Bot App - All Rights Reserved
                    </p>

                </div>
            </div>

        </FooterContainer >
    );
}

export default Footer;

const FooterContainer = styled.footer`
    .footer-middle {
        background: #343a40;
        padding-top: 0rem;
        color: #fff;
    }

    .footer-bottom{
        padding-top: 1rem;
        padding-bottom: 1rem;
    }

    ul li a {
        color: rgba(109,109,109);
        
    }

    ul li a:hover{
        color: rgba(172,172,172);
    }
`;