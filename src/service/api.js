import axios from "axios";
const URL = 'https://projeto14-jolly-back.herokuapp.com/';
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
        body,
    );
    return requisition;
}
