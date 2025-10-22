import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const EditGameBtn = (props) => {
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

        const teamOneGoals = form["teamOneGoals" + props.game.id].value;
        const teamTwoGoals = form["teamTwoGoals" + props.game.id].value;
        const stadium = form["stadium" + props.game.id].value;
        const date = form["date" + props.game.id].value;


        const data = {
            stadium: {...props.game.stadium, name: stadium},
            date: date,
            teamOne: {...props.game.teamOne, goalsScored: teamOneGoals + props.game.teamOne.goalsScored},
            teamTwo: {...props.game.teamTwo, goalsScored: teamTwoGoals + props.game.teamOne.goalsScored},
            result: {...props.game.result, teamOneGoals: teamOneGoals, teamTwoGoals: teamTwoGoals}
        }

        if (teamOneGoals !== null && teamTwoGoals !== null) {
            if (teamOneGoals > teamTwoGoals) {
                data.teamOne.victories += 1;
                data.teamTwo.defeats += 1;
            } else if (teamOneGoals < teamTwoGoals) {
                data.teamTwo.victories += 1;
                data.teamOne.defeats += 1;
            } else {
                data.teamOne.draws += 1;
                data.teamTwo.draws += 1;
            }
        }

        fetch(`http://localhost:8090/games/${props.game.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(() => {
                closeModal();
                props.editGameFunc(props.game.id, data);
            });
    }

    return (
        <>
            <Button variant="primary" onClick={openModal} className={"edit game"}>
                Edit Game
            </Button>

            <Modal show={show} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Game</Modal.Title>
                </Modal.Header>
                <form className={"edit_team"} onSubmit={handleSubmit}>
                    <Modal.Body>

                        <div className={"mb-3"}>
                            <label htmlFor={"stadium" + props.game.id}>Stadium: </label>
                            <input type={"text"} id={"stadium" + props.game.id}
                                   name={"stadium" + props.game.id} defaultValue={props.game.stadium.name} required/>
                        </div>
                        <div className={"mb-3"}>
                            <label htmlFor={"date" + props.game.id}>Date: </label>
                            <input type={"datetime-local"} id={"date" + props.game.id}
                                   name={"date" + props.game.id} defaultValue={props.game.date} required/>
                        </div>

                        <div className={"mb-3"}>
                            <label htmlFor={"teamOneGoals" + props.game.id}>Goals for {props.game.teamOne.name}:</label>
                            <input type={"text"} id={"teamOneGoals" + props.game.id}
                                   name={"teamOneGoals" + props.game.id}
                                   defaultValue={props.game.result === null ? "-" : props.game.result.teamOneGoals}/>
                        </div>
                        <div className={"mb-3"}>
                            <label htmlFor={"teamTwoGoals" + props.game.id}>Goals
                                for {props.game.teamTwo.name}: </label>
                            <input type={"text"} id={"teamTwoGoals" + props.game.id}
                                   name={"teamTwoGoals" + props.game.id}
                                   defaultValue={props.game.result === null ? "-" : props.game.result.teamTwoGoals}/>
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

export default EditGameBtn