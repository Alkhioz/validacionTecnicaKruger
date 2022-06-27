import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Table from './table';

const Template=[
    {
        name: "Nombre",
        id: "nombre"
    },
    {
        name: "Apellido",
        id: "apellido"
    }
];

const data = [{nombre:"Alejandro",apellido:"Mendoza"},{nombre:"Pedro",apellido:"Santana"}];

test('Crea el contenido de la tabla de forma dinámica', async () => {
    render(<Table data={data} template={Template} />);
    expect(screen.getByText('Alejandro')).toBeInTheDocument();
});