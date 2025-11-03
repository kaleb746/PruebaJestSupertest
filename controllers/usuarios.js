const Usuario = require('../models/usuario');

const crearUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.create(req.body);
        res.status(201).json(usuario);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const obtenerUsuarios = async (req, res) => {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
};


const actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        await Usuario.update(req.body, { where: { id } });
        res.json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        await Usuario.destroy({ where: { id } });
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { crearUsuario, obtenerUsuarios, actualizarUsuario, eliminarUsuario };
