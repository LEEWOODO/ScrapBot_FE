import React from 'react';
import styled from 'styled-components';


function Footer() {
    return (
        <FooterContainer className="main-footer">
            <div className="footer-middle">
                <div className="container">
                    <div className="row">
                        {/* column 1 */}
                        <div className="col-md-3 col-sm-6">
                            <h4>Contact Us</h4>
                            <ul className="list-unstyled">
                                <li>woodo</li>
                            </ul>
                        </div>
                        {/* column 2 */}
                        <div className="col-md-3 col-sm-6">
                            <h4>woodo king</h4>
                            <ul className="list-unstyled">
                                <li><a href="/">woodo</a></li>
                            </ul>
                        </div>
                        {/* column 3 */}
                        <div className="col-md-3 col-sm-6">
                            <h4>woodo king</h4>
                            <ul className="list-unstyled">
                                <li><a href="/">woodo</a></li>
                            </ul>
                        </div>
                        {/* column 4 */}
                        <div className="col-md-3 col-sm-6">
                            <h4>woodo king</h4>
                            <ul className="list-unstyled">
                                <li><a href="/">woodo</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* footer bottom */}
                    <div className="footer-bottom">
                        <p className="text-xs-center">
                            &copy;{new Date().getFullYear()} Scrap Bot App - All Rights Reserved
                    </p>

                    </div>
                </div>

            </div>
        </FooterContainer>

    );
}

export default Footer;

const FooterContainer = styled.footer`
    .footer-middle {
        background: #343a40;
        padding-top: 3rem;
        color: #fff;
    }

    .footer-bottom{
        padding-top: 3rem;
        padding-bottom: 2rem;
    }

    ul li a {
        color: rgba(109,109,109);
        
    }

    ul li a:hover{
        color: rgba(172,172,172);
    }
`;