import './Input.css';

function Input (props) {
    return(
        <div className="Input">
            <input id={props.id} onChange={props.onChange} value={props.value} type={props.type} required={"required"}/><span className="highlight"></span><span className="InputBar"></span>
            <label>{props.name}</label>
        </div>
    );
}

export default Input;