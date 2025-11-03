const Usuario = require('../models/Usuario');

const crearUsuario = async (req, res) => {
    try {
        const { nombre, email, pass } = req.body;

        if (!nombre || !email || !pass) {
            return res.status(400).json({
                error: 'Los campos nombre, email y pass son obligatorios'
            });
        }

        const usuario = await Usuario.create({ nombre, email, pass });
        return res.status(201).json(usuario);
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                error: error.errors.map(e => e.message)
            });
        }

        console.error(error);
        return res.status(500).json({ error: 'Error al crear el usuario' });
    }
};

const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        return res.json(usuarios);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
};

const actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, email, pass } = req.body;

        if (!id) {
            return res.status(400).json({ error: 'El id es obligatorio' });
        }

        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        if (!nombre && !email && !pass) {
            return res.status(400).json({
                error: 'Debes enviar al menos un campo para actualizar (nombre, email o pass)'
            });
        }

        if (typeof nombre !== 'undefined') usuario.nombre = nombre;
        if (typeof email !== 'undefined') usuario.email = email;
        if (typeof pass !== 'undefined') usuario.pass = pass;

        await usuario.save();

        return res.json(usuario);
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                error: error.errors.map(e => e.message)
            });
        }

        console.error(error);
        return res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
};

const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'El id es obligatorio' });
        }

        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        await Usuario.destroy({ where: { id } });

        return res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
};

module.exports = { crearUsuario, obtenerUsuarios, actualizarUsuario, eliminarUsuario };
