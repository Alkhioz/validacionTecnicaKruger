import '@testing-library/jest-dom';
import {login} from '../libs/auth';
import axios from 'axios';

let token="";

test('Obtener el token de acceso', async () => {
    let data = await login("admin", "admin");
    token=data.data.token;
    expect(token!=="").toBe(true);
});

test('Obtener los datos del usuario', async () => {
    let data = await axios.get('http://localhost:8080/getCurrentUserData',{headers:{
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }}).then(res => res.data)
    
    expect(data.name).toBe("admin");
});


test('La petición debe fallar porque el token es invalido', async () => {
    await axios.get('http://localhost:8080/getCurrentUserData',{headers:{
        'Authorization': `Bearer 44`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }}).then(res => res.data).catch(e=>{
        expect(e.response.status).toBeGreaterThanOrEqual(400);
    })
});