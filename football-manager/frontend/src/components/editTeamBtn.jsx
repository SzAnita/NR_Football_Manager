import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const EditTeamBtn = (props) => {
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
        const teamName = form["teamName" + props.team.id].value;

        fetch(`http://localhost:8090/teams/${props.team.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: teamName}),
        })
            .then(() => {
                closeModal();
                props.editTeamFunc(props.team.id, teamName);
            });
    }

    return (
        <>
            <Button variant="primary" onClick={openModal} className={"edit team"}>
                Edit Team
            </Button>

            <Modal show={show} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Team</Modal.Title>
                </Modal.Header>
                <form className={"edit_team"} onSubmit={handleSubmit}>
                    <Modal.Body>
                        <label htmlFor={"teamName" + props.team.id}>Team Name: </label>
                        <input type={"text"} id={"teamName" + props.team.id} name={"teamName" + props.team.id}
                               defaultValue={props.team.name} required/>
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

export default EditTeamBtn