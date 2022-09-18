import styled from 'styled-components';
import { useNavigate } from "react-router-dom";



export default function Header() {

    const navigate = useNavigate();

    function getHome()
    {
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

return (

    <Head>
            <Click onClick={getHome}>JOLLY</Click>
            <Icons>
                <Icon>
                    <ion-icon name="home" onClick={getHome}></ion-icon>
                </Icon>
                <Icon>
                    <ion-icon name="information-circle" onClick={getAbout}></ion-icon>
                </Icon>
                <Icon>
                    <ion-icon name="cart" onClick={goCart}></ion-icon>
                </Icon>
                <Icon>
                    <ion-icon name="person" onClick={getSignIn}></ion-icon>
                </Icon>
            </Icons>
        </Head>
        ); 
}

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

const Icons = styled.div`
    font-size: 25px;
    display: flex;
    justify-content: space-between;
    width: 140px;
`;

const Head = styled.div`
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