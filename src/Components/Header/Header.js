import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";



export default function Header(props) {

    const {qtd} = {...props};
    const { tasks, setTasks } = useContext(UserContext);
    const navigate = useNavigate();
    let isLoged = true;


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
    function logOut(){
        setTasks([]);
        localStorage.setItem("token", '');
        navigate('/');
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
                    { isLoged ? (
                        <Icon>
                            <ion-icon name="cart" onClick={goCart}></ion-icon>
                            <CartNumber>{qtd}</CartNumber>
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
        </Head>
        ); 
}

const Click = styled.div`
    :hover{
        cursor: pointer;
    }
`;

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

const Icon = styled.div`
    :hover{
        color: gray;
        cursor: pointer;
    }
    position: relative;
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