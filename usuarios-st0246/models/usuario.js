const conexion = require("../conexion");

module.exports = {
    insertar(nombre, email, genero) {
        return new Promise((resolve, reject) => {
            conexion.query(`insert into usuarios (nombre, email, genero) values (?, ?, ?)`,
                [nombre, email, genero], (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados.insertId);
                });
        });
    },
    obtener() {
        return new Promise((resolve, reject) => {
            conexion.query(`select id, nombre, email, genero from usuarios`,
                (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados);
                });
        });
    },
    obtenerPorId(id) {
        return new Promise((resolve, reject) => {
            conexion.query(`select id, nombre, email, genero from usuarios where id = ?`,
                [id],
                (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados[0]);
                });
        });
    },
    actualizar(id, nombre, email, genero) {
        return new Promise((resolve, reject) => {
            conexion.query(`update usuarios
            set nombre = ?,
            precio = ?,
            email = ?,
            genero = ?
            where id = ?`,
                [nombre, email, genero, id],
                (err) => {
                    if (err) reject(err);
                    else resolve();
                });
        });
    },
    eliminar(id) {
        return new Promise((resolve, reject) => {
            conexion.query(`delete from usuarios
            where id = ?`,
                [id],
                (err) => {
                    if (err) reject(err);
                    else resolve();
                });
        });
    },
}