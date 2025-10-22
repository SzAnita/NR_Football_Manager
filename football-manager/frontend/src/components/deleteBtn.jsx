const DeleteBtn = (props) => {


    return (<button className={"delete team btn btn-danger"} onClick={props.deleteFunc}>
        Delete {props.objType}
    </button>)
}

export default DeleteBtn