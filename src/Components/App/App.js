import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "../../contexts/UserContext";
import HomeDisplay from "../HomeDisplay/HomeDisplay";
import SignInDisplay from "../SignInDisplay/SignInDisplay";
import SignUpDisplay from "../SignUpDisplay/SignUpDisplay";

export default function App(){
    const [tasks, setTasks] = useState([]);
    return(
        <UserContext.Provider value={{tasks, setTasks}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomeDisplay />} />
                    <Route path="/sign-in" element={<SignInDisplay />} />
                    <Route path="/sign-up" element={<SignUpDisplay />} />
                </Routes>
		    </BrowserRouter>
        </UserContext.Provider>
    )
}