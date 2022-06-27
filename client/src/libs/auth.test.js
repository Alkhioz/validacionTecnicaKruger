import '@testing-library/jest-dom';
import {login} from './auth';

test('Prueba de login, debe devolver el token de acceso', async () => {
    let data = await login("admin", "admin");
    expect(data.msg).toBe("ok");
    expect(data.data.hasOwnProperty("token")).toBe(true);
});