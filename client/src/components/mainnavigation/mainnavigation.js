import SideMenu from '../sidemenu/sidemenu';
import NavBar from '../navbar/navbar';

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