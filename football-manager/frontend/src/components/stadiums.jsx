import React, {useState, useEffect, Fragment} from "react";
import '../assets/base.css'
import DeleteBtn from "./deleteBtn.jsx";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import EditStadiumBtn from "./editStadiumBtn.jsx";

const Stadiums = () => {

    const [stadiums, setStadiums] = useState([])
    const [show, setShow] = React.useState(false);

    function openModal() {
        setShow(true)
    }

    function closeModal() {
        setShow(false);
    }

    useEffect(() => {
        fetch('http://localhost:8090/stadiums', {
            method: 'GET',
            mode: 'cors'


        })
            .then(res => res.json())
            .then(data => setStadiums(data))
    }, []);

    const deleteStadium = (id) => {
        fetch(`http://localhost:8090/stadiums/${id}`, {method: 'DELETE'})
            .then(() => setStadiums(prevStadiums => prevStadiums.filter(stadium => stadium.id !== id)));
    };


    function editStadium(id, stadiumData) {
        setStadiums(prevStadiums => prevStadiums.map(stadium => stadium.id === id ? {...stadiumData} : stadium));
    }

    function addStadium(event) {
        event.preventDefault();
        const form = event.target;
        const stadiumName = form["stadiumName"].value;
        const stadiumLocation = form["location"].value;

        fetch('http://localhost:8090/stadiums', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: stadiumName, location: stadiumLocation}),
        })
            .then(response => response.json())
            .then(newStadium => {
                setStadiums(prevStadiums => [...prevStadiums, newStadium]);
                form.reset();
            });
    }

    const stadiumsList = stadiums.map(stadium => {
        return (<tr key={stadium.id}>
            <td></td>
            <td>{stadium.name}</td>
            <td>{stadium.location}</td>
            <td>{<EditStadiumBtn stadium={stadium} editStadiumFunc={editStadium}/>}</td>
            <td>{<DeleteBtn deleteFunc={() => deleteStadium(stadium.id)} objType={"Stadium"}/>}</td>
        </tr>)
    })


    return (<>
        <div className={"content"}>
            <Button variant="primary" className={"create stadium"} onClick={openModal}>
                Add Stadium
            </Button>
            <Modal show={show} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Stadium</Modal.Title>
                </Modal.Header>
                <form className={"create_stadium"} onSubmit={addStadium}>
                    <Modal.Body>
                        <div className={"mb-3"}>
                            <label htmlFor={"stadiumName"}>Stadium Name: </label>
                            <input type={"text"} id={"stadiumName"} name={"stadiumName"} required/>
                        </div>
                        <div className={"mb-3"}>
                            <label htmlFor={"location"}>Location: </label>
                            <input type={"text"} id={"location"} name={"location"} required/>
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
                    <th>Name</th>
                    <th>Location</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>

                <tbody>{stadiumsList}</tbody>
            </table>
        </div>
    </>)
}

export default Stadiums