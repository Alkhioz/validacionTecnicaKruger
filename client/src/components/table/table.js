import './table.css';

const Table=(props)=>{
    console.log(props.data);
    const tableHeader =()=>props.header.map((head,i)=>{
        return <th key={`TableHead${i}`}>{head}</th>
    });
    const tableBody =()=>props.data.map((element,i)=>{
        return <tr key={`TableHead${i}`}>{props.template.map((key,j)=>{
            return <td key={`TableHead${i}${j}`}>{element[key]}</td>
        })}</tr>;
    });
    
    return(
        <table>
            <thead><tr>{tableHeader()}</tr></thead>
            <tbody>{tableBody()}</tbody>
        </table>
    );
}

export default Table;