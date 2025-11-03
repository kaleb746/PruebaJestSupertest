const request = require('supertest');
const Server = require('../models/server');

jest.mock('../models/Usuario');
const Usuario = require('../models/Usuario');

let app;

beforeAll(() => {
    const server = new Server();
    app = server.app; 
});

beforeEach(() => {
    jest.clearAllMocks();
});

describe('Rutas /api/usuarios - pruebas de integración', () => {

    test('POST /api/usuarios debe crear un usuario', async () => {
        const nuevoUsuario = { nombre: 'Juan', email: 'juan@test.com', pass: '123456' };

        Usuario.create.mockResolvedValue({ id: 1, ...nuevoUsuario });

        const res = await request(app)
            .post('/api/usuarios')
            .send(nuevoUsuario);

        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({ id: 1, ...nuevoUsuario });
        expect(Usuario.create).toHaveBeenCalledWith(nuevoUsuario);
    });

    test('POST /api/usuarios debe devolver 400 si faltan campos', async () => {
        const res = await request(app)
            .post('/api/usuarios')
            .send({ email: 'juan@test.com' }); 

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
    });

    test('GET /api/usuarios debe devolver la lista de usuarios', async () => {
        const usuariosMock = [
            { id: 1, nombre: 'Juan' },
            { id: 2, nombre: 'Ana' }
        ];

        Usuario.findAll.mockResolvedValue(usuariosMock);

        const res = await request(app).get('/api/usuarios');

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(usuariosMock);
        expect(Usuario.findAll).toHaveBeenCalled();
    });
});
