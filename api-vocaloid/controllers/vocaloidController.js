const Vocaloid = require('../models/Vocaloid');

const crearVocaloid = async (req, res) => {
    const { nombre, genero, desarrollador, idioma, fechaLanzamiento, versionMotor, imagenPerfil, imagenCuerpoCompleto } = req.body;

    if (!nombre || nombre.trim() === "") {
        return res.status(400).json({ error: 'El nombre es requerido.' });
    }
    if (!genero || (genero !== 'Masculino' && genero !== 'Femenino')) {
        return res.status(400).json({ error: 'El género debe ser Masculino o Femenino.' });
    }
    if (!desarrollador || desarrollador.trim() === "") {
        return res.status(400).json({ error: 'El desarrollador es requerido.' });
    }
    if (!Array.isArray(idioma) || idioma.length === 0) {
        return res.status(400).json({ error: 'El idioma es requerido y debe ser un array.' });
    }
    if (!fechaLanzamiento || isNaN(Date.parse(fechaLanzamiento))) {
        return res.status(400).json({ error: 'La fecha de lanzamiento debe ser válida.' });
    }

    try {
        const nuevoVocaloid = new Vocaloid({
            nombre,
            genero,
            desarrollador,
            idioma,
            fechaLanzamiento,
            versionMotor,
            imagenPerfil,
            imagenCuerpoCompleto
        });

        await nuevoVocaloid.save();
        res.status(201).json(nuevoVocaloid);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el vocaloid.' });
    }
};


const obtenerVocaloids = async (req, res) => {
    const { nombre, sort, page = 1, limit = 100 } = req.query;
    let filtro = {};
    let orden = {};

    if (nombre) {
        filtro.nombre = new RegExp(nombre, 'i');
    }

    if (sort) {
        orden[sort] = 1;
    }

    try {
        const vocaloids = await Vocaloid.find(filtro)
            .sort(orden)
            .skip((page - 1) * limit)
            .limit(Number(limit));

        res.json(vocaloids);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los vocaloids.' });
    }
};



const obtenerVocaloidPorId = async (req, res) => {
    try {
        console.log('ID recibido:', req.params.id);
        
        const vocaloid = await Vocaloid.findById(req.params.id);
        if (!vocaloid) {
            return res.status(404).json({ error: 'Vocaloid no encontrado' });
        }
        res.json(vocaloid);
    } catch (error) {
        console.error('Error al obtener el Vocaloid:', error);
        res.status(500).json({ error: 'Error al obtener el Vocaloid', detalles: error.message });
    }
}


const eliminarVocaloid = async (req, res) => {
    try {
        const vocaloidEliminado = await Vocaloid.findByIdAndDelete(req.params.id);
        if (!vocaloidEliminado) {
            return res.status(404).json({ error: 'Vocaloid no encontrado' });
        }
        res.json({ mensaje: 'Vocaloid eliminado con éxito' });
    } catch (error) {
        console.error('Error al eliminar el Vocaloid:', error);
        res.status(500).json({ error: 'Error al eliminar el Vocaloid', detalles: error.message });
    }
};


const actualizarVocaloid = async (req, res) => {
    const { id } = req.params;
    const datosActualizados = req.body;

    try {
        const vocaloidActualizado = await Vocaloid.findByIdAndUpdate(id, datosActualizados, {
            new: true,
            runValidators: true
        });

        if (!vocaloidActualizado) {
            return res.status(404).json({ error: 'Vocaloid no encontrado' });
        }

        res.json(vocaloidActualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el Vocaloid' });
    }
};

module.exports = {
    crearVocaloid,
    obtenerVocaloids,
    obtenerVocaloidPorId,
    eliminarVocaloid,
    actualizarVocaloid
};
