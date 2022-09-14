import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "../../contexts/UserContext";
import HomeDisplay from "../HomeDisplay/HomeDisplay";


export default function App(){
    const [tasks, setTasks] = useState([]);
    return(
        <UserContext.Provider value={{tasks, setTasks}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomeDisplay />} />
                </Routes>
		    </BrowserRouter>
        </UserContext.Provider>
    )
}