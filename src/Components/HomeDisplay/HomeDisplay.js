import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCart, getProducts } from '../../service/api';
import Product from './Product';
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";



export default function HomeDisplay() {
    const navigate = useNavigate();
    const [productsContent, setProductsContent] = useState(<></>);
    const [isLoged, setIsLoged] = useState(false);
    const [itemsNumber, setItemsNumber] = useState(0);
    const [refreshDisplay, setRefreshDisplay] = useState(false);
    const { tasks, setTasks } = useContext(UserContext);
    const token = localStorage.getItem('token');
    useEffect(() => {
        getProducts().then(renderProducts).catch(() => {
            alert("Erro ao carregar os produtos! Tente novamente!");
        });
        if(token){
            getCart(token).then((answer)=>{
                setItemsNumber(answer.data.length);
            }).catch(() => {
                localStorage.setItem("token", '');
            });
        }
    }, [refreshDisplay]);
    function renderProducts(answer) {
        let productsList=answer.data;
        setProductsContent(<>
            {productsList.map((product,index) => <Product key={index} name={product.name} image={product.image} price={product.price} refreshDisplay={refreshDisplay} setRefreshDisplay={setRefreshDisplay}/>)}
        </>);
        if(token){
            setIsLoged(true);
        }else{
            setIsLoged(false);
        }
    }
    function getHome(){
        navigate('/');
    }
    function getSignIn(){
        navigate('/sign-in');
    }
    function getSignUp(){
        if(isLoged === false){
            navigate('/sign-up');
        }
    }
    function goCart(){
        if(token){
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
                <Click onClick={getAbout}>JOLLY</Click>
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
            <Banner>
                <BannerImage src='https://arredo.qodeinteractive.com/wp-content/uploads/2018/05/h3-product-img-1-500x588.jpg'></BannerImage>
                <TextFlexing>
                    <BannerText>Cadeiras premium</BannerText>
                    <BannerDescription>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula nec purus a placerat. Nam mattis malesuada nisl, at finibus sem ornare id. Praesent vel purus et eros pharetra consequat. Donec eleifend mattis purus vel cursus. Etiam eu hendrerit lorem.
                    </BannerDescription>
                    <SignUpText onClick={getSignUp}>Cadastre-se para receber todas as novidades!</SignUpText>
                </TextFlexing>
            </Banner>
            <CollectionText>Coleção Capri<New>New</New></CollectionText>
            <ProductsList>
                {productsContent}
            </ProductsList>
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

const SingleSpacing = styled.div`
    margin-bottom: 7px;
`;

const Click = styled.div`
    :hover{
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
`;

const ProductsList = styled.div`
    display: flex;
    width: 90%;
    justify-content: space-between;
    margin-top: 50px;
    margin-bottom: 75px;
    flex-wrap: wrap;
`;

const CollectionText = styled.div`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 40px;
    color: #000000;
    margin-top: 50px;
    display: flex;
    align-items: center;
`;

const New = styled.div`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    box-sizing: border-box;
    padding: 5px;
    color: lightgrey;
    margin-left: 10px;
    border: 1px solid lightgrey;
    border-radius: 20px;
    :hover{
        color: white;
        background-color: lightgrey;
    }
`;

const Icon = styled.div`
    :hover{
        color: gray;
        cursor: pointer;
    }
    position: relative;
`;

const BannerDescription = styled.div`
`;

const SignUpText = styled.div`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    color: #000000;
    margin-top: 10px;
    text-decoration-line: underline;
    margin-bottom: 20px;
    :hover{
        color: gray;
        cursor: pointer;
    }
`;

const TextFlexing = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin-right: 8%;
`;

const BannerText = styled.div`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 60px;
    color: #000000;
    margin-bottom: 20px;
    margin-top: 20px;
`;

const BannerImage = styled.img`
    height: 24vw;
    width: 27vw;
    margin-left: 8%;
    object-fit: cover;
    object-position: bottom;

    margin-bottom: 20px;
`;

const Banner = styled.div`
    width: 90%;
    margin-top: 130px;
    height: 700px;
    background-color: rgb(242,242,242);
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-size: 19px;
    color: gray;
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
    align-items: center;
    box-sizing: border-box;
`;
