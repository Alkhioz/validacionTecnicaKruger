import './sidemenu.css';

export default (props)=>{
    return(
        <div className="mainMobileMenu" style={{display: props.show?"block":"none"}}>
            <div className="mainMobileMenuCardHeader">
                    <button className="mainMobileMenuCardHeaderButton" onClick={props.handleShow}><i className="fa fa-times-circle" aria-hidden="true"></i></button>
            </div>
            <div className="mainMobileMenuCard">
                <p><b>Bienvenido </b>{props.name}</p>
                <div className="sideMenu">
                    {props.showProtected&&<>
                        <button className={props.selected===0?"sideMenuItem sideMenuItemSelected":"sideMenuItem"} onClick={props.changeNav} value="0">Dashboard<i className="fa fa-pie-chart" aria-hidden="true"></i></button>
                        <button className={props.selected===1?"sideMenuItem sideMenuItemSelected":"sideMenuItem"} onClick={props.changeNav} value="1">Usuarios<i className="fa fa-users" aria-hidden="true"></i></button>
                    </>}
                    <button className="sideMenuLogout" onClick={props.handleLogout} value="1">Salir<i className="fa fa-sign-out" aria-hidden="true"></i></button>
                </div>
            </div>
        </div>
    );
}