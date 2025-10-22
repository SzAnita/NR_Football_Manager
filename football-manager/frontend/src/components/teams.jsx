import React, {useState, useEffect, Fragment} from "react";
import '../assets/base.css'
import DeleteBtn from "./deleteBtn.jsx";
import EditTeamBtn from "./editTeamBtn.jsx";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Teams = (props) => {

    const [teams, setTeams] = useState(props.teams)
    const [show, setShow] = React.useState(false);

    function openModal() {
        setShow(true)
    }

    function closeModal() {
        setShow(false);
    }

    useEffect(() => {
        fetch('http://localhost:8090/teams', {
            method: 'GET',
            mode: 'cors'


        })
            .then(res => res.json())
            .then(data => setTeams(data))
    }, []);

    const deleteTeam = (id) => {
        fetch(`http://localhost:8090/teams/${id}`, {method: 'DELETE'})
            .then(() => setTeams(prevTeams => prevTeams.filter(team => team.id !== id)));
    };


    function editTeam(id, newName) {
        setTeams(prevTeams => prevTeams.map(team => team.id === id ? {...team, name: newName} : team));
    }

    function addTeam(event) {
        event.preventDefault();
        const form = event.target;
        const teamName = form["teamName"].value;

        fetch('http://localhost:8090/teams', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: teamName}),
        })
            .then(response => response.json())
            .then(newTeam => {
                console.log(newTeam);
                setTeams(prevTeams => [...prevTeams, newTeam]);
                form.reset();
            });
    }

    const teamsList = teams.map(team => {
        return (<tr key={team.id}>
            <td></td>
            <td>{team.name}</td>
            <td>{team.goalsScored}</td>
            <td>{team.goalsReceived}</td>
            <td>{team.victories}</td>
            <td>{team.draws}</td>
            <td>{team.defeats}</td>
            <td>{(team.victories * 3) + team.draws}</td>
            <td>{<EditTeamBtn team={team} editTeamFunc={editTeam}/>}</td>
            <td>{<DeleteBtn deleteFunc={() => deleteTeam(team.id)} objType={"Team"}/>}</td>
        </tr>)
    })


    return (<>
        <div className={"content"}>
            <Button variant="primary" className={"create team"} onClick={openModal}>
                Add Team
            </Button>
            <Modal show={show} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Team</Modal.Title>
                </Modal.Header>
                <form className={"create_team"} onSubmit={addTeam}>
                    <Modal.Body>
                        <label htmlFor={"teamName"}>Team Name: </label>
                        <input type={"text"} id={"teamName"} name={"teamName"} required/>
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
                    <th>Goals Scored</th>
                    <th>Goals Received</th>
                    <th>Victories</th>
                    <th>Draws</th>
                    <th>Defeats</th>
                    <th>Points</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>

                <tbody>{teamsList}</tbody>
            </table>
        </div>
    </>)
}

export default Teams