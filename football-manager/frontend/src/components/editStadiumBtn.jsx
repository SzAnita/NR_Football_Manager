import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const EditStadiumBtn = (props) => {
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
        const stadiumName = form["stadiumName" + props.stadium.id].value;
        const stadiumLocation = form["stadiumLocation" + props.stadium.id].value;

        fetch(`http://localhost:8090/stadiums/${props.stadium.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({location: stadiumLocation, name: stadiumName}),
        })
            .then(() => {
                closeModal();
                props.editStadiumFunc(props.stadium.id, {location: stadiumLocation, name: stadiumName});
            });
    }

    return (
        <>
            <Button variant="primary" onClick={openModal} className={"edit stadium"}>
                Edit Stadium
            </Button>

            <Modal show={show} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Stadium</Modal.Title>
                </Modal.Header>
                <form className={"edit_stadium"} onSubmit={handleSubmit}>
                    <Modal.Body>
                        <div className={"mb-3"}>
                            <label htmlFor={"stadiumName" + props.stadium.id}>Stadium Name: </label>
                            <input type={"text"} id={"stadiumName" + props.stadium.id}
                                   name={"stadiumName" + props.stadium.id}
                                   defaultValue={props.stadium.name} required={true}/>
                        </div>
                        <div className={"mb-3"}>
                            <label htmlFor={"stadiumLocation" + props.stadium.id}>Stadium Location: </label>
                            <input type={"text"} id={"stadiumLocation" + props.stadium.id}
                                   name={"stadiumLocation" + props.stadium.id}
                                   defaultValue={props.stadium.location} required={true}/>
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

export default EditStadiumBtn