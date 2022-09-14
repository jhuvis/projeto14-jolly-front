import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext, useEffect } from "react";
import UserContext from "../../contexts/UserContext";
import { postSignIn } from '../../service/api';

export default function HomeDisplay() {
    
    const { tasks, setTasks } = useContext(UserContext);
    const navigate = useNavigate();
    
    return (
        <Content>
            
        </Content>
    );
}



const Content = styled.div`
    width: 100vw;
    height: 100vh;
	display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
`;
