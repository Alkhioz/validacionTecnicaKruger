import './sidemenu.css';

export default (props)=>{
    const protectedMenuItems = () => props.menuItems.map((item,i)=>{
        return <button key={`protected_${i}`} className={props.selected===i?"sideMenuItem sideMenuItemSelected":"sideMenuItem"} onClick={props.changeNav} value={i}>{item.name}<i className={item.icon} aria-hidden="true"></i></button>
    });
    return(
        <div className="mainMobileMenu" style={{display: props.show?"block":"none"}}>
            <div className="mainMobileMenuCardHeader">
                    <button className="mainMobileMenuCardHeaderButton" onClick={props.handleShow}><i className="fa fa-times-circle" aria-hidden="true"></i></button>
            </div>
            <div className="mainMobileMenuCard">
                <p><b>Bienvenido </b>{props.name}</p>
                <div className="sideMenu">
                    {props.showProtected&&protectedMenuItems()}
                    <button className="sideMenuLogout" onClick={props.handleLogout} value="1">Salir<i className="fa fa-sign-out" aria-hidden="true"></i></button>
                </div>
            </div>
        </div>
    );
}