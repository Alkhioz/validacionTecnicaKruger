import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavBar from './navbar';

const adminMenuItems = [{name:"Usuarios", icon: "fa fa-users"}, {name:"Editar Perfil", icon: "fa fa-cogs"}];

test('Deberia mostrar el menú de administrador al tener la propiedad showProtected: true', async () => {
    render(<NavBar 
        show={true}
        handleShow={()=>{}}
        name={"Menú testeo"}
        showProtected={true}
        handleLogout={()=>{}}
        selected={0}
        changeNav={()=>{}}
        menuItems={adminMenuItems}
    />);
    expect(screen.getByText('Usuarios')).toBeInTheDocument();
});