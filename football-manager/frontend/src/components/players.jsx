import React, {useState, useEffect} from "react";
import '../assets/base.css'
import DeleteBtn from "./deleteBtn.jsx";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import EditPlayerBtn from "./editPlayerBtn.jsx";

const Players = (props) => {

    const [players, setPlayers] = useState([])
    const [show, setShow] = React.useState(false);

    function openModal() {
        setShow(true)
    }

    function closeModal() {
        setShow(false);
    }

    useEffect(() => {
        fetch('http://localhost:8090/players', {
            method: 'GET',
            mode: 'cors'


        })
            .then(res => res.json())
            .then(data => setPlayers(data))
    }, []);

    const deletePlayer = (id) => {
        fetch(`http://localhost:8090/players/${id}`, {method: 'DELETE'})
            .then(() => setPlayers(prevPlayers => prevPlayers.filter(player => player.id !== id)));
    };


    function editPlayer(id, playerData) {
        setPlayers(prevPlayers => prevPlayers.map(player => player.id === id ? {...playerData} : player));
    }

    function addPlayer(event) {
        event.preventDefault();
        const form = event.target;
        const teamId = parseInt(form["teamName"].value);
        const playerName = form["playerName"].value;
        const playerRole = form["playerRole"].value;
        const goalsScored = form["goalsScored"].value;


        fetch('http://localhost:8090/teams/' + teamId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(teamData => {
                let data = {
                    'name': playerName,
                    'role': playerRole,
                    'team': teamData,
                    'goalsScored': goalsScored
                }
                fetch('http://localhost:8090/players', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                    .then(response => response.json())
                    .then(newPlayer => {
                        setPlayers(prevPlayers => [...prevPlayers, newPlayer]);
                        form.reset();
                    });
            })
    }

    const playersList = players.map(player => {
        return (<tr key={player.id}>
            <td></td>
            <td>{player.name}</td>
            <td>{player.role}</td>
            <td>{player.team.name}</td>
            <td>{player.goalsScored}</td>
            <td>{<EditPlayerBtn player={player} editPlayerFunc={editPlayer} teams={props.teams}/>}</td>
            <td>{<DeleteBtn deleteFunc={() => deletePlayer(player.id)} objType={"Player"}/>}</td>
        </tr>)
    })


    return (<>
        <div className={"content"}>
            <Button variant="primary" className={"create team"} onClick={openModal}>
                Add Player
            </Button>
            <Modal show={show} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Player</Modal.Title>
                </Modal.Header>
                <form className={"create_player"} onSubmit={addPlayer}>
                    <Modal.Body>
                        <label htmlFor={"playerName"}>Player Name: </label>
                        <input type={"text"} id={"playerName"} name={"playerName"} required/>
                        <label htmlFor={"playerRole"}>Player Role: </label>
                        <select id={"playerRole"} name={"playerRole"}>
                            <option value={"FORWARD"}>FORWARD</option>
                            <option value={"MIDFIELDER"}>MIDFIELDER</option>
                            <option value={"DEFENDER"}>DEFENDER</option>
                            <option value={"GOALKEEPER"}>GOALKEEPER</option>
                        </select>
                        <label htmlFor={"teamName"}>Team Name: </label>
                        <select id={"teamName"} name={"teamName"}>
                            {props.teams.map(team => (
                                <option key={team.id} value={team.id}>{team.name}</option>
                            ))}
                        </select>
                        <label htmlFor={"goalsScored"}>Goals Scored: </label>
                        <input type={"number"} id={"goalsScored"} name={"goalsScored"} min={0} required/>
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
                    <th>Name</th>
                    <th>Role</th>
                    <th>Team</th>
                    <th>Goals Scored</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>

                <tbody>{playersList}</tbody>
            </table>
        </div>
    </>)
}

export default Players