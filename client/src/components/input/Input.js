import './Input.css';

function Input (props) {
    return(
        <div className="Input">
            <input id={props.id} onChange={props.onChange} onBlur={props.onBlur} value={props.value} type={props.type} maxLength={props.maxLength} required={"required"}/><span className="highlight"></span><span className="InputBar"></span>
            <label>{props.name}</label>
            {props.error !== "" && <p className="InputError">{props.error}</p>}
        </div>
    );
}

export default Input;