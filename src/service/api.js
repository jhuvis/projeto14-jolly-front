import axios from "axios";
const URL = 'http://localhost:5000';
const headerCreator = (token) => {
    return {headers: {Authorization: `Bearer ${token}`}}
};


export function postSignIn(body){
    const requisition = axios.post(
        `${URL}/sign-in`,
        body
    );
    return requisition;
}

export function postSignUp(body){
    const requisition = axios.post(
        `${URL}/sign-up`,
        body
    );
    return requisition;
}

export function getCart(token){
    const requisition = axios.get(
        `${URL}/cart`,
        headerCreator(token)
    );
    return requisition;
}

export function upCart(token, body){
    const requisition = axios.put(
        `${URL}/update-cart`,
        body,
        headerCreator(token)
    );
    return requisition;
}

export function deleteCart(token, body){
    const requisition = axios.put(
        `${URL}/delete-cart`,
        body, 
        headerCreator(token)
    );
    return requisition;
}
