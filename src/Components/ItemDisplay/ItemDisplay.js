import styled from 'styled-components';
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { useState, useEffect } from "react";
import { getCart, getProducts, putInTheCart } from '../../service/api';
import { ThreeDots } from "react-loader-spinner";

export default function ItemDisplay() {
    const {idItem} = useParams();
    const navigate = useNavigate();
    const [isLoged, setIsLoged] = useState(false);
    const [itemsNumber, setItemsNumber] = useState(0);
    const { tasks, setTasks } = useContext(UserContext);
    const [item, setItem] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [itsInTheCart, setItsInTheCart] = useState(false);
    const [refreshDisplay, setRefreshDisplay] = useState(false);
    useEffect(() => {
        let productName;
        getProducts().then((answer)=>{
            let productsArray = answer.data;
            productsArray.forEach(product => {
                if(product.name === idItem){
                    setItem(product);
                    productName = product.name;
                }
            });
        }).catch(() => {
            alert("Erro ao carregar os produtos! Tente novamente!");
        });
        if(localStorage.getItem("token") !== null){
            setIsLoged(true);
            let token = localStorage.getItem("token");
            getCart(token).then((answer)=>{
                setItemsNumber(answer.data.length);
                let cartArray = answer.data;
                cartArray.forEach(product => {
                    if(productName === product.name){
                        setItsInTheCart(true);
                    }
                });
            }).catch(() => {
                alert("Erro ao carregar os produtos no carrinho! Tente novamente!");
            });
        }
    }, [refreshDisplay]);
    function putItemInTheCart(){
        setIsLoading(true);
        let token = localStorage.getItem("token");
        if(localStorage.getItem("token") === null){
            setIsLoading(false);
            navigate("/sign-in");
        }else{
            putInTheCart({
                name: item.name,
                price: item.price,
                image: item.image,
                quantity: 1
            },token).then(()=>{
                setIsLoading(false);
                setItsInTheCart(true);
                setRefreshDisplay(!refreshDisplay);
            }).catch((err) => {
                alert("Erro ao colocar no carrinho! Tente novamente!");
                setIsLoading(false);
                console.error(err);
            });
        }
    }
    function buyItem(){
        if(isLoged === true){
            if(itsInTheCart === true){
                navigate('/cart');
            }else{
                putItemInTheCart();
                setTimeout(()=>{navigate('/cart')},50);
            }
        }else{
            navigate('/sign-in');
        }
    }
    function getHome(){
        navigate('/');
    }
    function getSignIn(){
        navigate('/sign-in');
    }
    function goCart(){
        if(localStorage.getItem("token") !== null){
            navigate('/cart');
        }else{
            navigate('/sign-in');
        }
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
            <Product>
                <ProductImage src={item.image}></ProductImage>
                <ProductInfo>
                    <ProductName>{item.name}</ProductName>
                    <ProductPrice>R${parseFloat(item.price).toFixed(2)}</ProductPrice>
                    <ProductDescription>{item.description}</ProductDescription>
                    <ProductButtons>
                        <Button onClick={buyItem}>Compre agora</Button>
                        {isLoading ?
                        (<Button disabled><ThreeDots 
                        color={'gray'} 
                        height={15} 
                        width={40}/></Button>)
                        :
                        ( itsInTheCart ? (
                            <ButtonDisabled disabled>Adicionado ao carrinho</ButtonDisabled>
                        ) : (
                            <Button disabled={isLoading} onClick={putItemInTheCart}>Adicionar ao carrinho</Button>
                        ))
                        }
                    </ProductButtons>
                </ProductInfo>
            </Product>
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

const ButtonDisabled = styled.div`
display: flex;
align-items: center;
justify-content: center;
background-color: darkgrey;
color: white;
font-family: 'Poppins';
font-size: 19px;
padding: 10px;
border-radius: 5px;
border: 1px solid;
margin-bottom: 5px;
`;

const Button = styled.div`
display: flex;
align-items: center;
justify-content: center;
background-color: black;
color: white;
font-family: 'Poppins';
font-size: 19px;
padding: 10px;
border-radius: 5px;
border: 1px solid;
margin-bottom: 5px;
:hover {
  background-color: white;
  color: black;
  cursor: pointer;
}
`;

const ProductButtons = styled.div`
    position: absolute;
    bottom: 0px;
    right: 0px;
    width: 100%;
    box-sizing: border-box;
    padding-left: 50px;
`;

const ProductDescription = styled.div`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    color: darkgrey;
    margin-bottom: 30px;
`;

const ProductPrice = styled.div`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    color: black;
    margin-bottom: 30px;
`;

const ProductName = styled.div`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 50px;
    color: #000000;
    margin-bottom: 10px;
`;

const ProductInfo = styled.div`
    height: 600px;
    width: 50%;
    box-sizing: border-box;
    padding-left: 50px;
    position: relative;
`;

const ProductImage = styled.img`
    height: 600px;
    width: 50%;
    object-fit: cover;
    object-position: bottom;
`;

const Product = styled.div`
    width: 90%;
	display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    margin-bottom: 100px;
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
    margin-top: 140px;
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
    align-items: center;
    flex-direction: column;
    box-sizing: border-box;
`;
