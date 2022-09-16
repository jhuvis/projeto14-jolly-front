import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "../../contexts/UserContext";
import HomeDisplay from "../HomeDisplay/HomeDisplay";
import SignInDisplay from "../SignInDisplay/SignInDisplay";
import SignUpDisplay from "../SignUpDisplay/SignUpDisplay";
import AboutDisplay from "../AboutDisplay/AboutDisplay";

export default function App(){
    const [tasks, setTasks] = useState([]);
    return(
        <UserContext.Provider value={{tasks, setTasks}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomeDisplay />} />
                    <Route path="/sign-in" element={<SignInDisplay />} />
                    <Route path="/sign-up" element={<SignUpDisplay />} />
                    <Route path="/about" element={<AboutDisplay />} />
                </Routes>
		    </BrowserRouter>
        </UserContext.Provider>
    )
}