import styled from 'styled-components';
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useContext, useEffect } from "react";
import UserContext from "../../contexts/UserContext";
import { getCart, upCart } from '../../service/api';
import Cart from './Cart';

let qtd = [];

export default function Carts() {

    const [corpo, setCorpo] = useState("flex");
    const [carro, setCarro] = useState("none");
    const [carts, setCarts] = useState([]);

    const [total, setTotal] = useState(0);
    const [att, setAtt] = useState(0); 
    
    
    let token = localStorage.getItem("token");
    const { tasks, setTasks } = useContext(UserContext);
    const navigate = useNavigate();
    let isLoged = true;


    useEffect(() => {
        let isApiSubscribed = true;
    
        getCart(token).then((res) => {
          if(isApiSubscribed) 
          {
            setCarts(res.data);
            if(res.data.length === 0)
            {
                setCarro("none");
                setCorpo("flex");
            }
            else
            {
                setCarro("flex");
                setCorpo("none");
                let t = 0;
                for(let i = 0; i < res.data.length; i++)
                {
                    t += (res.data[i].price * res.data[i].quantity);
                }
                console.log(t);
                setTotal(t);
            }
          }
        });
        return () => 
        {
          isApiSubscribed = false;
        };
      }, [att]);

      function upQtd(quantidade, index)
      {
        qtd[index] = quantidade;
      }

      function updateCart()
      {
        for(let i = 0; i < qtd.length; i++)
        {
            if(qtd[i])
            {
                const body = {
                    _id: carts[i]._id,
                    quantity: qtd[i]
                }

                const requisicao = upCart(token, body);

                requisicao.then((e) => 
                {
                    console.log(e);
                });
                requisicao.catch((e) => {
                    
                    alert("updateCart deu errado " + e);
                })
            }
        }
        setAtt(att+1);
        qtd = [];
      }

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
        <>
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
                            <CartNumber>{carts.length}</CartNumber>
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
        <Content>
        <Topo>
                <img src="https://arredo.qodeinteractive.com/wp-content/uploads/2018/05/cart-title-img.jpg"/>               
                <h1>Carrinho</h1>
        </Topo>
        <Corpo display={corpo}>
            <h1>Carrinho vazio.</h1>
            <Link to={"/"}><Buttom>Retornar menu</Buttom></Link>
        </Corpo>
        
        <Carrinho display={carro}>
        <Seila>
            <TopoCart >
                <div></div>
                <div>Produto</div>
                <div>Preço</div>
                <div>Quantidade</div>
                <div>Total</div>
            </TopoCart>
            {carts.map((cart, index) => <Cart
                name={cart.name}
                price={cart.price}
                img={cart.image}
                quantity={cart.quantity}
                upQtd={upQtd}
                index = {index}
                _id = {cart._id}
                key={index}
                att={att}
                setAtt={setAtt}
                 />)}
 
        
        </Seila>
        <Baixo>
            <Buttom onClick={() => updateCart()}>Atualizar carrinho</Buttom>
        </Baixo>
        <Total>
            <h1>Total do carrinho</h1>
            <Totais>
                <div><h3>Total</h3></div>
                <div><h3>R${total.toFixed(2)}</h3></div>
            </Totais>
            <Link to={"/checkout"}><Buttom>Finalizar compra</Buttom></Link> 
        </Total>  
        </Carrinho>
        </Content>
        </>
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

const Total = styled.div`
display: flex ;
align-items: flex-start;
justify-content: flex-start;
flex-direction: column;

h1{
    font-family: 'Poppins';
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
    font-family: 'Poppins';
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
    
    font-family: 'Poppins';
    font-weight: 700;
    font-size: 25px;
}
`;

const Carrinho = styled.div`
display: ${props => props.display};
flex-direction: column;
margin: 85px;
`;

const Buttom = styled.div`
display: flex;
align-items: center;
justify-content: center;
background-color: black;
color: white;
font-family: 'Poppins';
font-size: 19px;
padding: 19px;
border-radius: 3px;
border: 1px solid;
:hover {
  background-color: white;
  color: black;
  cursor: pointer;
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
    font-family: 'Poppins';
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
    margin-top: 75px;
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
    font-family: 'Poppins';
    font-weight: 600;
    color: #FFFFFF;
    font-size: 55px;
    z-index: 1;
    }
`;

