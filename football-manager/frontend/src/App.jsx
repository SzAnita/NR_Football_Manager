import React, {useEffect, useState} from 'react'
import Teams from './components/teams.jsx'
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import Players from "./components/players.jsx";
import Games from "./components/games.jsx";
import Stadiums from "./components/stadiums.jsx";
import './assets/base.css'
import Home from "./components/home.jsx";


const App = () => {
    const [teams, setTeams] = useState([])
    const [stadiums, setStadiums] = useState([])
    useEffect(() => {
        fetch('http://localhost:8090/teams', {
            method: 'GET',
            mode: 'cors'
        })
            .then(res => res.json())
            .then(data => setTeams(data))
        fetch('http://localhost:8090/stadiums', {
            method: 'GET',
            mode: 'cors'
        })
            .then(res => res.json())
            .then(data => setStadiums(data))
    }, []);


    return (
        <BrowserRouter>
            <nav className={"navbar"}>
                <NavLink to={"/"}>Football Manager</NavLink>
                <NavLink to={"/teams"}>Teams</NavLink>
                <NavLink to={"/players"}>Players</NavLink>
                <NavLink to={"/games"}>Games</NavLink>
                <NavLink to={"/stadiums"}>Stadiums</NavLink>

            </nav>
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/teams"} element={<Teams teams={teams}/>}/>
                <Route path={"/players"} element={<Players teams={teams} setTeams={setTeams}/>}/>
                <Route path={"/games"} element={<Games teams={teams} stadiums={stadiums}/>}/>
                <Route path={"/stadiums"} element={<Stadiums/>}/>
            </Routes>
        </BrowserRouter>

    )
}

export default App
