import './select.css';

const Select =(props)=>{
    const options =()=>props.options.map((vaccine,id)=>{
        return <option key={`vaccine${id}`} value={vaccine.id} disabled={vaccine.id===0?true:false}>{vaccine.body}</option>
    });
    return(
        <div className="Select">
            <select>
                {options()}
            </select>
        </div>
    );
}

export default Select;