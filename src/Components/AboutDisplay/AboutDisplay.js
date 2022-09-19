import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { useState, useEffect } from "react";
import { getCart } from '../../service/api';

export default function AboutDisplay() {
    const navigate = useNavigate();
    const [isLoged, setIsLoged] = useState(false);
    const [itemsNumber, setItemsNumber] = useState(0);
    const { tasks, setTasks } = useContext(UserContext);
    const token = localStorage.getItem('token');
    useEffect(() => {
        if(token){
            setIsLoged(true);
            getCart(token).then((answer)=>{
                setItemsNumber(answer.data.length);
            }).catch(() => {
                alert("Erro ao carregar os produtos no carrinho! Tente novamente!");
            });
        }
    }, []);
    function getHome(){
        navigate('/');
    }
    function getSignIn(){
        navigate('/sign-in');
    }
    function goCart(){
        navigate('/cart');
    }
    function getAbout(){
        navigate('/about');
    }
    function logOut(){
        setTasks([]);
        localStorage.setItem("token", '');
        setIsLoged(false);
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
                    { isLoged ? (
                        <Icon>
                            <ion-icon name="cart" onClick={goCart}></ion-icon>
                            <CartNumber>{itemsNumber}</CartNumber>
                        </Icon>
                    ) : (
                        <Icon>
                            <ion-icon name="cart" onClick={goCart}></ion-icon>
                        </Icon>
                    )}
                    { isLoged ? (
                    <Icon>
                        <ion-icon name="log-out" onClick={logOut}></ion-icon>
                    </Icon>
                    ) : (
                    <Icon>
                        <ion-icon name="person" onClick={getSignIn}></ion-icon>
                    </Icon>
                    )}
                </Icons>
            </Header>
            <Spacing></Spacing>
            <TitleAbout>
                Quem somos nós?
            </TitleAbout>
            <TextAbout>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula nec purus a placerat. Nam mattis malesuada nisl, at finibus sem ornare id. Praesent vel purus et eros pharetra consequat. Donec eleifend mattis purus vel cursus. Etiam eu hendrerit lorem. Curabitur pharetra tortor eu libero imperdiet tincidunt. Sed sed ultricies nunc.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula nec purus a placerat. Nam mattis malesuada nisl, at finibus sem ornare id. Praesent vel purus et eros pharetra consequat. Donec eleifend mattis purus vel cursus. Etiam eu hendrerit lorem. Curabitur pharetra tortor eu libero imperdiet tincidunt. Sed sed ultricies nunc.
            </TextAbout>
            <TitleAbout>
                O que nos move?
            </TitleAbout>
            <TextAbout>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula nec purus a placerat. Nam mattis malesuada nisl, at finibus sem ornare id. Praesent vel purus et eros pharetra consequat. Donec eleifend mattis purus vel cursus. Etiam eu hendrerit lorem. Curabitur pharetra tortor eu libero imperdiet tincidunt. Sed sed ultricies nunc.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula nec purus a placerat. Nam mattis malesuada nisl, at finibus sem ornare id. Praesent vel purus et eros pharetra consequat. Donec eleifend mattis purus vel cursus. Etiam eu hendrerit lorem. Curabitur pharetra tortor eu libero imperdiet tincidunt. Sed sed ultricies nunc.
            </TextAbout>
            <TitleAbout>
                Nosso compromisso com nossos clientes
            </TitleAbout>
            <TextAbout>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula nec purus a placerat. Nam mattis malesuada nisl, at finibus sem ornare id. Praesent vel purus et eros pharetra consequat. Donec eleifend mattis purus vel cursus. Etiam eu hendrerit lorem. Curabitur pharetra tortor eu libero imperdiet tincidunt. Sed sed ultricies nunc.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula nec purus a placerat. Nam mattis malesuada nisl, at finibus sem ornare id. Praesent vel purus et eros pharetra consequat. Donec eleifend mattis purus vel cursus. Etiam eu hendrerit lorem. Curabitur pharetra tortor eu libero imperdiet tincidunt. Sed sed ultricies nunc.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula nec purus a placerat. Nam mattis malesuada nisl, at finibus sem ornare id. Praesent vel purus et eros pharetra consequat. Donec eleifend mattis purus vel cursus. Etiam eu hendrerit lorem. Curabitur pharetra tortor eu libero imperdiet tincidunt. Sed sed ultricies nunc.
            
            </TextAbout>
            
            <FooterSpace></FooterSpace>

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

const CartNumber = styled.div`
    position: absolute;
    height: 10px;
    width: 10px;
    font-size: 6px;
    line-height: 7px;
    color: white;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 1.3px;
    right: -1.5px;
    border-radius: 50%;
    border: solid 0.5px white;
`;

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

const FooterSpace = styled.div`
    height: 50px;
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
    position: relative;
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
	display: flex;
    flex-direction: column;
    box-sizing: border-box;
`;
