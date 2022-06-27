import './IconButton.css';

function IconButton (props) {
    return(
        <button onClick={props.onClick} id={props.id} className={props.type} style={props.style}>
            {props.name} <i className={props.icon}></i>
        </button>
    );
}

export default IconButton;