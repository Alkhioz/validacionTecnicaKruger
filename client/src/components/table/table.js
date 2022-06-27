import './table.css';

const Table=(props)=>{
    const TableHeader=()=>props.template.map((element, i)=>{
        return <th key={`TableHead${i}`}>{element.name}</th>;
    });
    console.log(typeof props.data);
    const TableBody=()=>props.data.map((element,i)=>{
        return <tr key={`TableBody${i}`}>{props.template.map((template, j)=>{
            return <td key={`TableHead${i}${j}`}>
                {template.hasOwnProperty('render')?template.render(element[template.id]):element[template.id]}
            </td>;
        })}</tr>;
    });
    return(
        <div className="TableContainer">
            <table className="Table">
                <thead className="TableHead">
                    <tr><TableHeader/></tr>
                </thead>
                <tbody className="TableBody">
                    <TableBody/>
                </tbody>
            </table>
        </div>
    );
}

export default Table;