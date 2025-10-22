import React, {useState, useEffect, Fragment} from "react";
import '../assets/base.css'
import DeleteBtn from "./deleteBtn.jsx";
import EditGameBtn from "./editGameBtn.jsx";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import '../assets/games.css'
import teams from "./teams.jsx";

const Games = (props) => {

    const [games, setGames] = useState([])
    const [show, setShow] = React.useState(false);

    function openModal() {
        setShow(true)
    }

    function closeModal() {
        setShow(false);
    }

    useEffect(() => {
        fetch('http://localhost:8090/games', {
            method: 'GET',
            mode: 'cors'


        })
            .then(res => res.json())
            .then(data => setGames(data))
    }, []);

    const deleteGame = (id) => {
        fetch(`http://localhost:8090/games/${id}`, {method: 'DELETE'})
            .then(() => setGames(prevGames => prevGames.filter(game => game.id !== id)));
    };


    function editGame(id, gameData) {
        console.log("editing game")
        setGames(prevGames => prevGames.map(game => game.id === id ? {...gameData} : game));
    }

    function addGame(event) {
        event.preventDefault();
        const form = event.target;
        const team1 = props.teams.find(t => t.id === parseInt(form["team1Name"].value));
        const team2 = props.teams.find(t => t.id === parseInt(form["team2Name"].value));
        const stadium = props.stadiums.find(s => s.id === parseInt(form["stadium"].value));
        const team1Goals = form["team1Goals"].value;
        const team2Goals = form["team2Goals"].value;
        const date = form["date"].value;
        let over = true

        console.log(team1);
        if (team1Goals === "" && team2Goals === "") {
            over = false
        }


        fetch('http://localhost:8090/results', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                goalsTeamOne: team1Goals,
                goalsTeamTwo: team2Goals,
                gameOver: over
            })
        })
            .then(response => response.json())
            .then(newResult => {
                const data = {
                    teamOne: team1,
                    teamTwo: team2,
                    stadium: stadium,
                    date: date,
                    result: newResult,
                    over: over
                }
                console.log(data)
                fetch('http://localhost:8090/games', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                    .then(response => response.json())
                    .then(newGame => {
                        setGames(prevGames => [...prevGames, newGame]);
                        form.reset();
                    });
            })


    }

    const gamesList = games.map(game => {
        return (<tr key={game.id}>
            <td></td>
            <td>{game.teamOne.name}</td>
            <td>{game.teamTwo.name}</td>
            <td>{game.stadium.name}</td>
            <td>{new Date(game.date).toLocaleString()}</td>
            <td>{game.result === null || game.result.goalsTeamOne === null ? "-:-" : game.result.goalsTeamOne + ":" + game.result.goalsTeamTwo}</td>
            <td>{<EditGameBtn game={game} editGameFunc={editGame}/>}</td>
            <td>{<DeleteBtn deleteFunc={() => deleteGame(game.id)} objType={"Game"}/>}</td>
        </tr>)
    })


    return (<>
        <div className={"content"}>
            <Button variant="primary" className={"create game"} onClick={openModal}>
                Add Game
            </Button>
            <Modal show={show} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Game</Modal.Title>
                </Modal.Header>
                <form className={"create_game"} onSubmit={addGame}>
                    <Modal.Body>
                        <div className={"mb-3"}>
                            <label htmlFor={"team1Name"}>Team 1 Name: </label>
                            <select id={"team1Name"} name={"team1Name"} required={true}>
                                {props.teams.map(team => (
                                    <option key={team.id} value={team.id}>{team.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className={"mb-3"}>
                            <label htmlFor={"team2Name"}>Team 2 Name: </label>
                            <select id={"team2Name"} name={"team2Name"} required={true}>
                                {props.teams.map(team => (
                                    <option key={team.id} value={team.id}>{team.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className={"mb-3"}>
                            <label htmlFor={"stadium"}>Stadium: </label>
                            <select id={"stadium"} name={"stadium"} required={true}>
                                {props.stadiums.map(stadium => (
                                    <option key={stadium.id} value={stadium.id}>{stadium.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className={"mb-3"}>
                            <label htmlFor={"team1Goals"}>Goals for Team 1: </label>
                            <input type={"number"} id={"team1Goals"} name={"team1Goals"}/>
                        </div>
                        <div className={"mb-3"}>
                            <label htmlFor={"team2Goals"}>Goals for Team 2: </label>
                            <input type={"number"} id={"team2Goals"} name={"team2Goals"}/>
                        </div>

                        <div className={"mb-3"}>
                            <label htmlFor={"date"}>Date: </label>
                            <input type={"datetime-local"} id={"date"} name={"date"}/>
                        </div>


                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={closeModal}>
                            Close
                        </Button>
                        <Button variant="primary" type={"submit"} onClick={closeModal}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
            <table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Team 1</th>
                    <th>Team2</th>
                    <th>Stadium</th>
                    <th>Date</th>
                    <th>Result</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>

                <tbody>{gamesList}</tbody>
            </table>
        </div>
    </>)
}

export default Games