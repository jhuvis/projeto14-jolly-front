import styled from 'styled-components';
import { useContext, useEffect } from "react";
import UserContext from "../../contexts/UserContext";
import { getCart, putInTheCart } from '../../service/api';
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

export default function Product(props){
    const navigate = useNavigate();
    const { tasks, setTasks } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [itsInTheCart, setItsInTheCart] = useState(false);
    useEffect(() => {
        if(tasks.length !== 0){
            let token = localStorage.getItem("token");
            getCart(token).then((answer)=>{
                let cartArray = answer.data;
                cartArray.forEach(product => {
                    if(props.name === product.name){
                        setItsInTheCart(true);
                    }
                });
            }).catch(() => {
                alert("Erro ao carregar os produtos no carrinho! Tente novamente!");
            });
        }
    }, []);
    function putItemInTheCart(){
        setIsLoading(true);
        let token = localStorage.getItem("token");
        if(tasks.length === 0){
            setIsLoading(false);
            navigate("/sign-in");
        }else{
            putInTheCart({
                name: props.name,
                price: props.price,
                image: props.image,
                quantity: 1
            },token).then(()=>{
                setIsLoading(false);
                setItsInTheCart(true);
                props.setRefreshDisplay(!props.refreshDisplay);
            }).catch((err) => {
                alert("Erro ao colocar no carrinho! Tente novamente!");
                setIsLoading(false);
                console.error(err);
            });
        }
    }
    function getItem(){
        navigate(`/item/${props.name}`);
    }
    return( 
        <>
            <ProductAlone>
                <ProductImage src={props.image} onClick={getItem}></ProductImage>
                <ProductTitle onClick={getItem}>{props.name}</ProductTitle>
                <ProductPrice onClick={getItem}>R${props.price}</ProductPrice>
                {isLoading ?
                (<AddButton disabled><ThreeDots 
                color={'gray'} 
                height={15} 
                width={40}/></AddButton>)
                :
                ( itsInTheCart ? (
                    <AddButtonDisabled disabled>Adicionado ao carrinho</AddButtonDisabled>
                ) : (
                    <AddButton disabled={isLoading} onClick={putItemInTheCart}>Adicionar ao carrinho</AddButton>
                ))
                }
            </ProductAlone>
        </>
    )
}

const AddButtonDisabled = styled.div`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    box-sizing: border-box;
    padding: 6px;
    border: 1px solid lightgray;
    border-radius: 20px;
    margin-bottom: 10px;
    width: 190px;
    display: flex;
    justify-content: center;
    color: white;
    background-color: lightgrey;
`;

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
    :hover{
        cursor: pointer;
    }
`;
const ProductTitle = styled.p`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    color: #000000;
    margin-top: 10px;
    margin-bottom: 10px;
    :hover{
        cursor: pointer;
        text-decoration-line: underline;
    }
`;

const ProductImage = styled.img`
    width: 275px;
    height: 350px;
    object-fit: cover;
    object-position: center;
    :hover{
        box-shadow: 0px 0px 4px gray;
        cursor: pointer;
    }
`;

const ProductAlone = styled.div`
    width: 275px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
`;