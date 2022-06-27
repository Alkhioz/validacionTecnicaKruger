import './select.css';

const Select =(props)=>{
    const options =()=>props.options.map((vaccine,id)=>{
        return <option key={`vaccine${id}`} value={vaccine.id} disabled={vaccine.id===0?true:false} >{vaccine.body}</option>
    });
    return(
        <div>
        <div className="Select">
            <select id={props.id} onBlur={props.onBlur} onChange={props.onChange} value={props.value}>
                {options()}
            </select>
            <label htmlFor={props.id}>{props.name}</label>
        </div>
        {props.error !== "" && <p className="SelectError">{props.error}</p>}
        </div>
    );
}

export default Select;