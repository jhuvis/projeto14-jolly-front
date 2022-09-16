import styled from 'styled-components';
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { putInTheCart } from '../../service/api';
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

export default function Product(props){
    const navigate = useNavigate();
    const { tasks, setTasks } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    function putItemInTheCart(){
        setIsLoading(true);
        if(tasks.length === 0){
            setIsLoading(false);
            navigate("/sign-in");
        }else{
            putInTheCart({
                name: props.name,
                price: props.price,
                image: props.image,
                quantity: 1
            },tasks.token).then(()=>{
                setIsLoading(false);
            }).catch((err) => {
                alert("Erro ao colocar no carrinho! Tente novamente!");
                setIsLoading(false);
                console.error(err);
            });
        }
    }
    return( 
        <>
            <ProductAlone>
                <ProductImage src={props.image}></ProductImage>
                <ProductTitle>{props.name}</ProductTitle>
                <ProductPrice>R${props.price}</ProductPrice>
                {isLoading ?
                <AddButton disabled><ThreeDots 
                color={'gray'} 
                height={15} 
                width={40}/></AddButton>
                :
                <AddButton disabled={isLoading} onClick={putItemInTheCart}>Adicionar ao carrinho</AddButton>
                }
            </ProductAlone>
        </>
    )
}

const AddButton = styled.div`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    box-sizing: border-box;
    padding: 6px;
    color: lightgrey;
    border: 1px solid lightgray;
    border-radius: 20px;
    margin-bottom: 10px;
    width: 175px;
    display: flex;
    justify-content: center;
    :hover{
        color: white;
        background-color: lightgrey;
        cursor: pointer;
    }
`;

const ProductPrice = styled.p`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    color: #000000;
    margin-bottom: 10px;
`;
const ProductTitle = styled.p`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    color: #000000;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const ProductImage = styled.img`
    width: 275px;
    height: 350px;
    object-fit: cover;
    object-position: center;
    :hover{
        box-shadow: 0px 0px 4px gray;
    }
`;

const ProductAlone = styled.div`
    width: 275px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
`;