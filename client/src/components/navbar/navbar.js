import './navbar.css';

const navBar = (props) =>{
    const protectedMenuItems = () => props.menuItems.map((item,i)=>{
        return <button  key={`protected_${i}`} className={props.selected===i?"navBarProtectedItem navBarProtectedItemSelected":"navBarProtectedItem"} onClick={props.changeNav} value={i}>{item.name}<i className={item.icon} aria-hidden="true"></i></button>;
    });
    return(
        <nav className="navBar">
            <h1 className="navBarLogo noSelect">IVK</h1>
            <div className="navBarControl">
                {props.showProtected&&<div className="navBarProtected">{protectedMenuItems()}</div>}
            </div>
            <div className="navBarUser">
                <p><b>Welcome </b>{props.name} <a className="navBarLogout" href="/login" onClick={props.handleLogout}>Logout</a></p>
            </div>
            <div className="navBarResponsive">
                <button onClick={props.handleShow} className="navBarResponsiveButton"><i className="fa fa-bars"></i></button>
            </div>
        </nav>
    );
}

export default navBar;