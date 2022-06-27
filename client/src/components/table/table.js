import './table.css';

const Table=(props)=>{
    console.log(props.template);
    const tableHeader=()=>props.template.map((element, i)=>{
        return <th key={`TableHead${i}`}>{element.name}</th>;
    });
    const tableBody=()=>props.data.map((element,i)=>{
        return <tr key={`TableBody${i}`}>{props.template.map((template, j)=>{
            return <td key={`TableHead${i}${j}`}>
                {template.hasOwnProperty('render')?template.render(element[template.id]):element[template.id]}
            </td>;
        })}</tr>;
    });
    return(
        <table className="Table">
            <thead><tr>{tableHeader()}</tr></thead>
            <tbody>{tableBody()}</tbody>
        </table>
    );
}

export default Table;