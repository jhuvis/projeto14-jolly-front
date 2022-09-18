import styled from 'styled-components';
import { useNavigate, useParams } from "react-router-dom";

export default function ItemDisplay() {
    const {idItem} = useParams();
    const navigate = useNavigate();
    function getHome(){
        navigate('/');
    }
    function getSignIn(){
        navigate('/sign-in');
    }
    function getCart(){
        navigate('/cart');
    }
    function getAbout(){
        navigate('/about');
    }
    return (
        <Content>
            <Header>
                <Click onClick={getHome}>JOLLY</Click>
                <Icons>
                    <Icon>
                        <ion-icon name="home" onClick={getHome}></ion-icon>
                    </Icon>
                    <Icon>
                        <ion-icon name="information-circle" onClick={getAbout}></ion-icon>
                    </Icon>
                    <Icon>
                        <ion-icon name="cart" onClick={getCart}></ion-icon>
                    </Icon>
                    <Icon>
                        <ion-icon name="person" onClick={getSignIn}></ion-icon>
                    </Icon>
                </Icons>
            </Header>
            <Spacing></Spacing>
            
            <Footer>
                <AboutDiv>
                    <FooterTitle>Sobre nós</FooterTitle>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula nec purus a placerat. Nam mattis malesuada nisl, at finibus sem ornare id.</p>
                </AboutDiv>
                <ContactDiv>
                    <FooterTitle>Contato</FooterTitle>
                    <p>email@jolly.com</p>
                    <SingleSpacing></SingleSpacing>
                    <p>+55 (11) 99999-9999</p>
                </ContactDiv>
            </Footer>
        </Content>
    );
}

const TitleAbout = styled.p`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 25px;
    color: #000000;
    margin-left: 5%;
    margin-right: 5%;
    margin-bottom: 20px;
    margin-top: 20px;
`;

const TextAbout = styled.p`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-size: 19px;
    color: #000000;
    margin-left: 5%;
    margin-right: 5%; 
`;

const Spacing = styled.div`
    margin-top: 100px;
`;

const SingleSpacing = styled.div`
    margin-bottom: 7px;
`;

const Click = styled.div`
    :hover{
        cursor: pointer;
    }
`;

const Icon = styled.div`
    :hover{
        color: gray;
        cursor: pointer;
    }
`;

const FooterTitle = styled.div`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    color: white;
    margin-bottom: 10px;
`;

const AboutDiv = styled.div`
    width: 300px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    color: white;
    margin: 60px;
    margin-left: 70px;
`;

const ContactDiv = styled.div`
    width: 300px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    color: white;
    margin-bottom: 35px;
`;

const Footer = styled.div`
    width: 100vw;
    display: flex;
    align-items: center;
    background-color: grey;
    position: absolute;
    bottom: 0px;
`;

const Icons = styled.div`
    font-size: 25px;
    display: flex;
    justify-content: space-between;
    width: 140px;
`;

const Header = styled.div`
    width: 100%;
    background-color: rgba(255,255,255,0.95);
    height: 75px;
    border: 1px solid lightgray;
	display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding-left: 5%;
    padding-right: 5%;
    font-family: 'Orbitron';
    font-style: normal;
    font-weight: 700;
    font-size: 25px;
    line-height: 30px;
    color: #000000;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 1;
`;

const Content = styled.div`
    width: 100vw;
    height: 100vh;
	display: flex;
    flex-direction: column;
    box-sizing: border-box;
`;
