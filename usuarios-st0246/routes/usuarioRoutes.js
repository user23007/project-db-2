const express = require('express');
const router = express.Router();

const usuarioModel = require("../models/usuario");

router.get('/', function (req, res, next) {
    usuarioModel
        .obtener()
        .then(usuarios => {
            res.render("usuarios/ver", {
                usuarios: usuarios,
            });
        })
        .catch(err => {
            return res.status(500).send("Error obteniendo usuarios");
        });

});
router.get('/agregar', function (req, res, next) {
    res.render("usuarios/agregar");
});
router.post('/insertar', function (req, res, next) {
    // Obtener el nombre y precio. Es lo mismo que
    // const nombre = req.body.nombre;
    // const precio = req.body.precio;
    const { nombre, email, genero } = req.body;
    if (!nombre || !email || !genero) {
        return res.status(500).send("No hay nombre o email o genero");
    }
    // Si todo va bien, seguimos
    usuarioModel
        .insertar(nombre, email, genero)
        .then(idUsuarioInsertado => {
            res.redirect("/usuarios");
        })
        .catch(err => {
            return res.status(500).send("Error insertando usuario");
        });
});
router.get('/eliminar/:id', function (req, res, next) {
    usuarioModel
        .eliminar(req.params.id)
        .then(() => {
            res.redirect("/usuarios");
        })
        .catch(err => {
            return res.status(500).send("Error eliminando");
        });
});
router.get('/editar/:id', function (req, res, next) {
    usuarioModel
        .obtenerPorId(req.params.id)
        .then(usuario => {
            if (usuario) {
                res.render("usuarios/editar", {
                    usuario: usuario,
                });
            } else {
                return res.status(500).send("No existe usuario con ese id");
            }
        })
        .catch(err => {
            return res.status(500).send("Error obteniendo usuario");
        });
});
router.post('/actualizar/', function (req, res, next) {
    // Obtener el nombre y precio. Es lo mismo que
    // const nombre = req.body.nombre;
    // const precio = req.body.precio;
    const { id, nombre, email, genero } = req.body;
    if (!nombre || !email || !genero || !id) {
        return res.status(500).send("No hay suficientes datos");
    }
    // Si todo va bien, seguimos
    usuarioModel
        .actualizar(id, nombre, email, genero)
        .then(() => {
            res.redirect("/usuarios");
        })
        .catch(err => {
            return res.status(500).send("Error actualizando usuario");
        });
});

module.exports = router;