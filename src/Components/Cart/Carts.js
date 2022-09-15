import styled from 'styled-components';
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useContext, useEffect } from "react";
import UserContext from "../../contexts/UserContext";
import { postSignIn } from '../../service/api';
import Cart from './Cart';

export default function Carts() {

    const [corpo, setCorpo] = useState("none");
    const [carro, setCarro] = useState("flex");
    
    const { tasks, setTasks } = useContext(UserContext);
    const navigate = useNavigate();
    
    return (
        <>
        <header />
        <Content>
        <Topo>
                <img src="https://arredo.qodeinteractive.com/wp-content/uploads/2018/05/cart-title-img.jpg"/>               
                <h1>Cart</h1>
        </Topo>
        <Corpo display={corpo}>
            <h1>Your cart is currently empty.</h1>
            <Link to={"/"}><Buttom>Return to shop</Buttom></Link>
        </Corpo>
        
        <Carrinho display={carro}>
        <Seila>
            <TopoCart>
                <div></div>
                <div>Product</div>
                <div>Price</div>
                <div>Quantity</div>
                <div>Total</div>
            </TopoCart>
            <Cart />
            <Cart />
            <Cart />
 
        
        </Seila>
        <Baixo>
            <Buttom>Update cart</Buttom>
        </Baixo>
        <Total>
            <h1>Cart Total</h1>
            <Totais>
                <div><h3>Total</h3></div>
                <div><h3>$250.00</h3></div>
            </Totais>
            <Buttom>Proceed to checkout</Buttom>   
        </Total>  
        </Carrinho>
        </Content>
        </>
    );
}

const Total = styled.div`
display: flex ;
align-items: flex-start;
justify-content: flex-start;
flex-direction: column;

h1{
    font-family: 'Raleway';
    font-weight: 700;
    font-size: 40px;
    margin-bottom: 65px;
}
`;

const Totais = styled.div`
display: flex ;
align-items: flex-start;
justify-content: flex-start;
flex-direction: row;
width: 100%;
border-bottom: 1px solid #ccc;
border-top: 1px solid #ccc;
padding-top: 25px;
padding-bottom: 25px;
margin-bottom: 45px;
h3{
    font-family: 'Raleway';
    font-weight: 600;
    font-size: 18px;
}
div{
    margin-right: 220px;
}
`;

const Seila = styled.div`
border-bottom: 1px solid #ccc;
`;

const Baixo = styled.div`
display: flex;
position: relative;
align-items: flex-start;
justify-content: flex-end;
margin: 50px;
`;

const TopoCart = styled.div`
display: flex;
align-items: center;
justify-content: space-around;
flex-direction: row;
margin-bottom: 20px;

div{
    
    font-family: 'Raleway';
    font-weight: 700;
    font-size: 25px;
}
`;

const Carrinho = styled.div`
display: flex;
flex-direction: column;
margin: 85px;
`;

const Buttom = styled.div`
display: flex;
align-items: center;
justify-content: center;
background-color: black;
color: white;
font-family: 'Raleway';
font-size: 19px;
padding: 19px;
border-radius: 3px;
border: 1px solid;
:hover {
  background-color: white;
  color: black;
}
 `;

const Corpo = styled.div`
width: 100%;
min-height: calc(100vh - 350px);
display: ${props => props.display};
flex-direction: column;
align-items: center;
justify-content: center;
-webkit-box-pack: start;
margin-bottom: 70px;
text-align: center;



h1{
    font-family: 'Raleway';
    font-weight: 400;
    font-size: 40px;
    margin-bottom: 40px;
}
`;

const Content = styled.div`
    width: 100%;
    height: auto;
	display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    word-break: break-word;
    a{
        text-decoration: none;
    }
`;

const Topo = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 69px;
    margin-bottom: 35px;
    width: 100%;
    background-position: center;

    img{
        object-fit: cover;
        width: 100%;
        height: 350px;
    }

    h1{
    display: flex;
    position: absolute;
    font-family: 'Raleway';
    font-weight: 600;
    color: #FFFFFF;
    font-size: 55px;
    z-index: 1;
    }
`;

