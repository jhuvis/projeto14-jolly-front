import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext, useEffect } from "react";
import UserContext from "../../contexts/UserContext";

export default function Cart({...props}) {
    
    const { tasks, setTasks } = useContext(UserContext);
    const [valor, setValor] = useState(0);
    const [carrega, setCarregar] = useState("none");

    const navigate = useNavigate();
    
    return (
        <Content>
            <div>X</div>
            <Product><img src='https://arredo.qodeinteractive.com/wp-content/uploads/2018/05/home9-product2-img1-330x420.jpg'/><div>Blue light</div></Product>
            <div>$150.00</div>
            <div><Input
                    type="number"
                    id="number"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                    disabled={!carrega}
                    required /></div>
            <div>$150.00</div>
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
