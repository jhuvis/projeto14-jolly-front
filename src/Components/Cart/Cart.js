import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext, useEffect } from "react";
import { deleteCart } from '../../service/api';
import UserContext from "../../contexts/UserContext";

export default function Cart(props) {

    const {name, price, img, quantity, upQtd, index, _id} = {...props};
    const { tasks, setTasks } = useContext(UserContext);
    const [valor, setValor] = useState(quantity);
    const [total, setTotal] = useState(price*quantity);
    const [carrega, setCarregar] = useState("none");

    const navigate = useNavigate();
    let token = "a4b338dd-e408-40bc-834c-84231eeba591"; //localStorage.getItem("token");

    function deleta()
    {
        console.log(_id);
        const body = {
            _id: _id
        }

        const requisicao = deleteCart(token, body);

        requisicao.then((e) => 
        {
            window.location.reload(); 
        });
        requisicao.catch((e) => {
            
            alert("deleteCart deu errado " + e);
        })
    }
    
    return (
        <Content>
            <div onClick={() => deleta()}>X</div>
            <Product><img src={img}/><div>{name}</div></Product>
            <div>${price.toFixed(2)}</div>
            <div><Input
                    type="number"
                    id="number"
                    min="1"
                    value={valor}
                    onChange={(e) => {
                        setValor(e.target.value); 
                        setTotal(price*e.target.value);
                        upQtd(e.target.value, index);
                    }}
                    disabled={!carrega}
                    required /></div>
            <div>${total.toFixed(2)}</div>
        </Content>
    );
}

const Product = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
font-size: 15px;
text-align: center;
width: 68px;
div{
    margin-top: 10px;
}
`;

const Input = styled.input`
display: flex;
width: 50px;
height: 30px;
background: #FFFFFF;
border: 1px solid #D5D5D5;
font-family: 'Raleway';
font-weight: 400;
font-size: 18px;
border-radius: 5px;
text-align: center;
`;

const Content = styled.div`
display: flex;
align-items: center;
width: 85vw;
height: 180px;

justify-content: space-around;
flex-direction: row;

font-family: 'Raleway';
font-weight: 400;
font-size: 19px;
color: grey;

border-top: 1px solid #ccc;
img{
    height: 100px;
    width: 80px;
}
`;
