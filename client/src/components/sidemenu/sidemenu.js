import './sidemenu.css';
const sideMenu = (props)=>{
    const changeNavigation=(evt)=>{
        props.changeNav(evt);
        props.handleShow(evt);
    }
    const protectedMenuItems = () => props.menuItems.map((item,i)=>{
        return <button key={`protected_${i}`} className={props.selected===i?"sideMenuItem sideMenuItemSelected":"sideMenuItem"} onClick={changeNavigation} value={i}>{item.name}<i className={item.icon} aria-hidden="true"></i></button>
    });
    return(
        <div className="sideMenuContainer" style={{display: props.show?"block":"none"}}>
            <div className="sideMenuContainerCardHeader">
                    <button className="sideMenuContainerCardHeaderButton" onClick={props.handleShow}><i className="fa fa-times-circle" aria-hidden="true"></i></button>
            </div>
            <div className="sideMenuContainerCard">
                <p><b>Welcome </b>{props.name}</p>
                <div className="sideMenu">
                    {props.showProtected&&protectedMenuItems()}
                    <button className="sideMenuLogout" onClick={props.handleLogout} value="1">Logout<i className="fa fa-sign-out" aria-hidden="true"></i></button>
                </div>
            </div>
        </div>
    );
}
export default sideMenu;