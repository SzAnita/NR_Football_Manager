import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const EditPlayerBtn = (props) => {
    const [show, setShow] = React.useState(false);

    function openModal() {
        setShow(true)
    }

    function closeModal() {
        setShow(false);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const team = form["teamName" + props.player.id].value;
        const playerName = form["playerName" + props.player.id].value;
        const playerRole = form["playerRole" + props.player.id].value;
        const goalsScored = form["goalsScored" + props.player.id].value;

        fetch('http://localhost:8090/teams/' + team, {
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
                fetch('http://localhost:8090/players/' + props.player.id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                    .then(response => response.json())
                    .then(player => {
                        closeModal();
                        props.editPlayerFunc(props.player.id, player);
                        form.reset();
                    });
            });
    }

    return (
        <>
            <Button variant="primary" onClick={openModal} className={"edit player"}>
                Edit Player
            </Button>

            <Modal show={show} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Player</Modal.Title>
                </Modal.Header>
                <form className={"edit_player"} onSubmit={handleSubmit}>
                    <Modal.Body>
                        <div className={"mb-3"}>
                            <label htmlFor={"playerName" + props.player.id}>Player Name: </label>
                            <input type={"text"} id={"playerName" + props.player.id}
                                   name={"playerName" + props.player.id} defaultValue={props.player.name} required/>
                        </div>

                        <div className={"mb-3"}>
                            <label htmlFor={"playerRole" + props.player.id}>Player Role: </label>
                            <select id={"playerRole" + props.player.id} name={"playerRole" + props.player.id}
                                    defaultValue={props.player.role}>
                                <option value={"FORWARD"}>FORWARD</option>
                                <option value={"MIDFIELDER"}>MIDFIELDER</option>
                                <option value={"DEFENDER"}>DEFENDER</option>
                                <option value={"GOALKEEPER"}>GOALKEEPER</option>
                            </select>
                        </div>

                        <div className={"mb-3"}>
                            <label htmlFor={"teamName" + props.player.id}>Team Name: </label>
                            <select id={"teamName" + props.player.id} name={"teamName" + props.player.id}
                                    defaultValue={props.player.team.name}>

                                {props.teams.map(team => (
                                    <option key={team.id} value={team.id}>{team.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className={"mb-3"}>
                            <label htmlFor={"goalsScored" + props.player.id}>Goals Scored: </label>
                            <input type={"number"} id={"goalsScored" + props.player.id}
                                   name={"goalsScored" + props.player.id} min={0} required
                                   defaultValue={props.player.goalsScored}/>
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
        </>
    );
}

export default EditPlayerBtn