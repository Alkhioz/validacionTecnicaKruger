import './IconButton.css';

function IconButton (props) {
    return(
        <button onClick={props.onClick} id={props.id} className={props.type}>
            {props.name} <i className={props.icon}></i>
        </button>
    );
}

export default IconButton;