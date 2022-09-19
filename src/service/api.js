import axios from "axios";
/* const URL = 'https://projeto14-jolly-back.herokuapp.com/'; */
const URL = 'http://localhost:5000';
const headerCreator = (token) => {
    return {headers: {Authorization: `Bearer ${token}`}}
};

export function getProducts(){
    const requisition = axios.get(
        `${URL}/`
    );
    return requisition;
}

export function putInTheCart(body,token){
    const requisition = axios.post(
        `${URL}/`,
        body,
        headerCreator(token)
    );
    return requisition;
}

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
        body,
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

export function checkoutCart(token, body){
    const requisition = axios.post(
        `${URL}/checkout`,
        body, 
        headerCreator(token)
    );
    return requisition;
}


setInterval(atualizarStatus, 5000);

function atualizarStatus() {
    let token = localStorage.getItem("token");
    if(token !== '')
    {
        axios.post(`${URL}/status`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        }).then().catch(()=>{localStorage.setItem('token', '')});
    }
    
  };