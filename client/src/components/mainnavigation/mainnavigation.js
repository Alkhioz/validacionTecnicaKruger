import SideMenu from '../sidemenu/sidemenu.js';
import NavBar from '../navbar/navbar.js';

const mainNavigation = (props) => {
    return(
        <>
        <SideMenu
            show={props.show}
            handleShow={props.handleShow}
            name={props.name}
            showProtected={props.showProtected}
            handleLogout={props.handleLogout}
            selected={props.selected}
            changeNav={props.changeNav}
            menuItems={props.menuItems}
        />
        <NavBar
            handleShow={props.handleShow}
            name={props.name}
            showProtected={props.showProtected}
            handleLogout={props.handleLogout}
            selected={props.selected}
            changeNav={props.changeNav}
            menuItems={props.menuItems}
        />
        </>
    );
}

export default mainNavigation;