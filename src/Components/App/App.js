import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "../../contexts/UserContext";
import HomeDisplay from "../HomeDisplay/HomeDisplay";
import Carts from "../Cart/Carts";
import SignInDisplay from "../SignInDisplay/SignInDisplay";
import SignUpDisplay from "../SignUpDisplay/SignUpDisplay";
import AboutDisplay from "../AboutDisplay/AboutDisplay";
import Checkout from "../Checkout/Checkout";

export default function App(){
    const [tasks, setTasks] = useState([]);
    return(
        <UserContext.Provider value={{tasks, setTasks}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomeDisplay />} />
                    <Route path="/cart" element={<Carts />} />
                    <Route path="/sign-in" element={<SignInDisplay />} />
                    <Route path="/sign-up" element={<SignUpDisplay />} />
                    <Route path="/about" element={<AboutDisplay />} />
                    <Route path="/checkout" element={<Checkout />} />
                </Routes>
		    </BrowserRouter>
        </UserContext.Provider>
    )
}