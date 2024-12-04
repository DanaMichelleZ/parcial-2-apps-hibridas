const Vocaloid = require('../models/Vocaloid');
const MotorVocaloid = require('../models/MotorVocaloid');

const crearVocaloid = async (req, res) => {
    const { nombre, genero, desarrollador, idiomas, fechaLanzamiento, versionMotor, motorId, imagenPerfil, imagenCuerpoCompleto } = req.body;

    // Validaciones para asegurar que los campos que se requieren estan presentes y validos, tambien verifica que el motor asociado (motorID) existe en la base xd
    if (!nombre || nombre.trim() === "") return res.status(400).json({ error: 'El nombre es requerido.' });

    if (!['Masculino', 'Femenino', 'Desconocido'].includes(genero)) return res.status(400).json({ error: 'El género debe ser válido.' });

    if (!desarrollador || desarrollador.trim() === "") return res.status(400).json({ error: 'El desarrollador es requerido.' });

    if (!Array.isArray(idiomas) || idiomas.length === 0) return res.status(400).json({ error: 'El idioma es requerido.' });

    if (!fechaLanzamiento || isNaN(Date.parse(fechaLanzamiento))) return res.status(400).json({ error: 'La fecha debe ser válida.' });

    if (!motorId) return res.status(400).json({ error: 'El motorId es requerido.' });

    try {
        const motorExistente = await MotorVocaloid.findById(motorId);
        if (!motorExistente) return res.status(404).json({ error: 'El motorId no existe.' });

        //Aca ya me lo termina de crear y guardar uwu
        const nuevoVocaloid = new Vocaloid({
            nombre, genero, desarrollador, idiomas, fechaLanzamiento, versionMotor, motorId, imagenPerfil, imagenCuerpoCompleto,
        });

        await nuevoVocaloid.save();
        res.status(201).json(nuevoVocaloid);
    } catch (error) {
        console.error('Error al crear el Vocaloid:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

const obtenerVocaloids = async (req, res) => {
    const { nombre, sort, page = 1, limit} = req.query;
    let filtro = {};
    let orden = {}; 

    if (nombre) {
        filtro.nombre = new RegExp(nombre, 'i');
    }

    if (sort) {
        orden[sort] = 1;
    }

    try {
        const vocaloids = await Vocaloid.find(filtro) //Con esto consultamos en la base y si no encuentra entonces error :3
            .populate('motorId', 'nombreMotor nombreProducto idiomas fechaLanzamiento')
            .sort(orden)
            .skip((page - 1) * (limit ? parseInt(limit) : 0))
            .limit(limit ? parseInt(limit) : 0);

            if (!vocaloids || vocaloids.length === 0) {
                return res.status(404).json({ error: 'No se encontraron Vocaloids.' });
            }

        res.json(vocaloids);
    } catch (error) {
        console.error('Error al obtener los Vocaloids:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

//Aca hacemos consulta por ID, si no encuentra entonces error 404
const obtenerVocaloidPorId = async (req, res) => {
    try {
        const vocaloid = await Vocaloid.findById(req.params.id)
            .populate({
                path: 'motorId',
                select: 'nombreMotor nombreProducto idiomas fechaLanzamiento',
                strictPopulate: false,
            });

        if (!vocaloid) {
            return res.status(404).json({ error: 'Vocaloid no encontrado' });
        }

        res.json(vocaloid); //  y sino te devuelve un hermoso JSON :
    } catch (error) {
        console.error('Error al obtener el Vocaloid:', error);
        res.status(500).json({ error: 'Error al obtener el Vocaloid', detalles: error.message });
    }
};

const eliminarVocaloid = async (req, res) => {
    try {
        //con una solicitud de DELETE puede eliminar un vocaloid utilizando un ID especifico 
        const vocaloidEliminado = await Vocaloid.findByIdAndDelete(req.params.id);
        if (!vocaloidEliminado) {
            return res.status(404).json({ error: 'Vocaloid no encontrado.' });
        }
        res.json({ mensaje: 'Vocaloid eliminado con éxito.' });

    } catch (error) {
        console.error('Error al eliminar el Vocaloid:', error.message);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

const actualizarVocaloid = async (req, res) => { //Actualiza por ID... si no encuentra entonces 404
    try {
        const vocaloidActualizado = await Vocaloid.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!vocaloidActualizado) {
            return res.status(404).json({ error: 'Vocaloid no encontrado.' });
        }
        res.json(vocaloidActualizado);
    } catch (error) {
        console.error('Error al actualizar el Vocaloid:', error.message);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};


module.exports = {
    crearVocaloid,
    obtenerVocaloids,
    obtenerVocaloidPorId,
    eliminarVocaloid,
    actualizarVocaloid,
};