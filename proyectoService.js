// proyectoService.js
const db = require("./database");
const { ObjectId } = require("mongodb");

module.exports = {
  createProyecto: async function (proyecto) {
    try {
      const database = db.getDb();
      proyecto.fechaCreacion = proyecto.fechaCreacion || new Date();

      const result = await database.collection("proyectos").insertOne(proyecto);
      console.log(`Proyecto creado con ID: ${result.insertedId}`);
      return result;
    } catch (error) {
      console.error("Error al crear proyecto:", error);
      throw error;
    }
  },
  getAllProyectos: async function () {
    try {
      // Obtenemos la instancia de la base de datos usando el Singleton.
      const database = db.getDb();
      // Realizamos la operación.
      return await database.collection("proyectos").find({}).toArray();
    } catch (error) {
      console.error("Error al obtener proyectos:", error);
      return [];
    }
  },
  addMiembroToProyecto: async function (proyectoId, usuarioId) {
    try {
      const database = db.getDb();
      const result = await database
        .collection("proyectos")
        .updateOne(
          { _id: new ObjectId(proyectoId) },
          { $addToSet: { miembros: new ObjectId(usuarioId) } }
        );
      return result;
    } catch (error) {
      console.error("Error al agregar miembro:", error);
      throw error;
    }
  },
};
