import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { ThreeDots } from "react-loader-spinner";
import { postSignIn } from '../../service/api';

export default function SignInDisplay(){
    const { tasks, setTasks } = useContext(UserContext);
    const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    function logIn (event) {
        event.preventDefault();
        setIsLoading(true);
		postSignIn({
			email: email,
			password: password
		}).then((answer) => {
            setTasks(answer.data);
            navigate("/");
        }).catch((err) => {
            alert("Login não efetuado! Tente novamente!");
            setIsLoading(false);
            console.error(err);
        });
    }
    function getSignUp(){
        navigate('/sign-up');
    }
    function getHome(){
        navigate('/');
    }
    return(
        <>
            <Content>
                <Centering>
                    <BackHome onClick={getHome}><ion-icon name="arrow-back"></ion-icon></BackHome>
                    <Logo>Jolly</Logo>
                    <Form onSubmit={logIn}>
                        <Input placeholder="E-mail" disabled={isLoading} type="email" required onChange={e => setEmail(e.target.value)}/>
                        <Input placeholder="Senha" disabled={isLoading} type="password" required onChange={e => setPassword(e.target.value)}/>
                        {isLoading ?
                        <Button disabled><ThreeDots 
                        color={'white'} 
                        height={30} 
                        width={40}/></Button>
                        :
                        <Button type="submit" disabled={isLoading}>Entrar</Button>
                        }
                    </Form>
                    
                    <Register onClick={getSignUp}>Primeira vez? Cadastre-se!</Register>
                </Centering>
            </Content>
        </>
    )
}

const BackHome = styled.div`
    position: absolute;
    font-size: 40px;
    top: 65px;
    left: 9%; 
    :hover{
        color: gray;
        cursor: pointer;
    }
`;

const Centering = styled.div`
    border: 1px solid lightgray;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    border-radius: 50px;
    position: relative;
`;

const Logo = styled.div`
    font-family: 'Orbitron';
    font-style: normal;
    font-weight: 700;
    font-size: 80px;
    line-height: 30px;
    color: #000000;
    margin-bottom: 70px;
    margin-top: 70px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const Content = styled.div`
    width: 100vw;
    height: 100vh;
	display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Input = styled.input`
    background-color: lightgray;
    box-sizing: border-box;
    padding-left: 15px;
    border: none;
    border-radius: 5px;
    width: 86.9%;
    height: 58px;
    margin-bottom: 13px;
    text-decoration: none;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #000000;
    ::placeholder{
        color: #000000;
    }
`;

const Button = styled.button`
    width: 86.9%;
    height: 46px;
    box-sizing: border-box;
    background-color: black;
    border-radius: 5px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    color: white;
    border: none;
    margin-bottom: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    :hover{
        cursor: pointer;
        background-color: darkgrey;
    }
`;

const Register = styled.p`
    text-align: center;
    text-decoration: none;
    text-decoration-line: none;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    color: black;
    margin-bottom: 70px;
    :hover{
        cursor: pointer;
        color: grey;
    }
`;
