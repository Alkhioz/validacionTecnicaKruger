import './select.css';

const Select =(props)=>{
    const options =()=>props.options.map((vaccine,id)=>{
        return <option key={`vaccine${id}`} value={vaccine.id} disabled={vaccine.id===0?true:false} selected={vaccine.id===0?true:false} >{vaccine.body}</option>
    });
    return(
        <div className="Select">
            <select id={props.id}>
                {options()}
            </select>
            <label htmlFor={props.id}>{props.name}</label>
        </div>
    );
}

export default Select;