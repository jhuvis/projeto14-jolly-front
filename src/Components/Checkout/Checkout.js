import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../Header/Header'
import { getCart, checkoutCart} from '../../service/api';

export default function Checkout()
{
    const navigate = useNavigate();
    const [rua, setRua] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");
    const [cep, setCep] = useState("");
    const [pais, setPais] = useState("");
    const [total, setTotal] = useState("");
    const [carts, setCarts] = useState([]);

    const [carrega, setCarregar] = useState("none");

    let token = localStorage.getItem("token");

    useEffect(() => {
        let isApiSubscribed = true;
        console.log(token);
        if(!token)
        {
            alert("Voce não esta logado!");
            navigate('/sign-in');
        }
    
        getCart(token).then((res) => {
          if(isApiSubscribed) 
          {
            setCarts(res.data);
            if(res.data.length === 0)
            {
                alert("Nada para finalizar, seu carrinho esta vazio!");
                navigate('/');
            }
            else
            {
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
      }, []);

function finalizar(event)
{
    let isApiSubscribed = true;
    event.preventDefault();
    setCarregar("");
    const body = 
    {
        rua: rua,
        cidade: cidade,
        estado: estado,
        cep: cep,
        pais: pais
    };
    
    const requisicao = checkoutCart(token, body);

    requisicao.then((e) => 
    {
        if(isApiSubscribed) 
        {
            
            window.location.replace("https://nubank.com.br/pagar/j6xyn/nRYLUAPytp");
        }       
    });
    requisicao.catch((e) => {
        
        alert("checkoutCart deu errado " + e);
    })

    return () => 
    {
            isApiSubscribed = false;
    };

}

    return(
        <>
        <Header />
        <Content>
            <Topo>
                <img src="https://arredo.qodeinteractive.com/wp-content/uploads/2018/05/checkout-title-img.jpg" />
                <h1>Finalizar</h1>
            </Topo>
            <Check>
            <Form onSubmit={finalizar}>
                <h2>Dados da entrega:</h2>

                <Label>Rua:</Label>
                <Input 
                type="street" 
                id="street" 
                value={rua}
                onChange={(e) => setRua(e.target.value)}
                disabled={!carrega}
                required/>
    
                <Label>Cidade:</Label>
                <Input 
                type="city" 
                id="city" 
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                disabled={!carrega}
                required/>
  
                <Label>Estado:</Label>
                <Input 
                type="state" 
                id="state" 
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                disabled={!carrega}
                required/>

                <Label>CEP:</Label>
                <Input   
                type="zip" 
                id="zip" 
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                disabled={!carrega}
                required/>
                
                <Label>Pais:</Label>
                <Input  
                type="country" 
                id="country" 
                value={pais}
                onChange={(e) => setPais(e.target.value)}
                disabled={!carrega}
                required/>

                <Label>Forma de pagamento:</Label>

                <select name="pix" id="pix">
                <option value="pix">Pix</option>
                </select>

                
            
            <Total>
            <h1>Total do carrinho</h1>
            <T><div><h3>Produto</h3></div>
            <div><h3>Total</h3></div></T>
            {carts.map((cart, index) => <Totais key={index}>
                <div><h3>{cart.name} x{cart.quantity}</h3></div>
                <div><h3>${(cart.price*cart.quantity)}</h3></div>
                 </Totais>)}
            <Totais>
                <div><h3>Total</h3></div>
                <div><h3>${total}</h3></div>
            </Totais>
            <Seila/>
            <Buttom type="submit">Finalizar Pedido</Buttom> 
        </Total>  
        </Form>
        </Check>
        
        </Content>
        </>
    );
}

const Check = styled.div`
display: flex;
flex-direction: column;
margin: 85px;
`;

const Seila = styled.div`
border-bottom: 1px solid #ccc;
margin-bottom: 40px;
`;

const T = styled.div`
display: flex ;
align-items: center;
justify-content: space-between;
flex-direction: row;
margin-bottom: 30px;
div{
    margin-right: 220px;
}
h3{
    font-family: 'Raleway';
    font-weight: 700;
    font-size: 22px;
}`;

const Total = styled.div`
display: flex ;
flex-direction: column;
margin-top: 60px;
h1{
    font-family: 'Raleway';
    font-weight: 700;
    font-size: 40px;
    margin-bottom: 45px;
}
`;

const Totais = styled.div`
display: flex ;
align-items: center;
justify-content: space-between;
flex-direction: row;
border-top: 1px solid #ccc;
padding-top: 25px;
h3{
    font-family: 'Raleway';
    font-weight: 600;
    font-size: 18px;
}
div{
    margin-right: 220px;
}
`;

const Label = styled.label`
margin: 5px 5px 5px;
color: #282828;
font-weight: 600;
font-family: sans-serif;
font-size: 15px;;
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
        filter: blur(1.5px);
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

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 50px;
    div{
      margin-bottom: 10px;
    }
    h2{
        font-family: 'Raleway';
        font-size: 25px;
        font-weight: 700;
        margin-bottom: 35px;
        margin-left: 5px;
    }
    select{
    width: 100%;
    height: 44px;
    font-size: 14px;
    line-height: 1.42857143;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 1px;
    background-color: transparent;
    border: 1px solid #e1e1e1;
    outline: 0;
    cursor: pointer;
    float: left;
    margin: 5px 5px;
    }

`;

const Buttom = styled.button`
background-color: black;
color: white;
font-family: 'Raleway';
font-size: 19px;
height: 60px;
width: 170px;
border-radius: 3px;
border: 1px solid;
:hover {
  background-color: white;
  color: black;
}
 `;

const Input = styled.input`
    width: 100%;
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 1px;
    font-family: inherit;
    color: #282828;
    background-color: transparent;
    border: 1px solid #e1e1e1;
    outline: 0;
    cursor: pointer;
    float: left;
    margin: 5px 5px;
`;