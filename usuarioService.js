// usuarioService.js
const db = require("./database");

console.log("Módulo 'usuarioService.js' ha sido cargado.");

module.exports = {
  getAllUsuarios: async function () {
    try {
      // Obtenemos la instancia de la base de datos usando el Singleton.
      const database = db.getDb();
      // Realizamos la operación.
      return await database.collection("usuarios").find({}).toArray();
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      return [];
    }
  },

  createUsuario: async function (usuario) {
    try {
      const database = db.getDb();
      const result = await database.collection("usuarios").insertOne(usuario);
      console.log(`Usuario creado con ID: ${result.insertedId}`);
      return result;
    } catch (error) {
      console.error("Error al crear usuario:", error);
    }
  },
};
