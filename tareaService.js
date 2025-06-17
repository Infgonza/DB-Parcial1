// tareaService.js
const db = require("./database");
const { ObjectId } = require("mongodb");

module.exports = {
  createTarea: async function (tarea) {
    try {
      const database = db.getDb();
      // Valores por defecto
      tarea.fechaCreacion = tarea.fechaCreacion || new Date();
      tarea.estado = tarea.estado || "por_hacer";
      tarea.prioridad = tarea.prioridad || "baja";

      const result = await database.collection("tareas").insertOne(tarea);
      console.log(`Tarea creada con ID: ${result.insertedId}`);
      return result;
    } catch (error) {
      console.error("Error al crear tarea:", error);
      throw error;
    }
  },

  getAllTareas: async function () {
    try {
      // Obtenemos la instancia de la base de datos usando el Singleton.
      const database = db.getDb();
      // Realizamos la operación.
      return await database.collection("tareas").find({}).toArray();
    } catch (error) {
      console.error("Error al obtener tareas:", error);
      return [];
    }
  },
};
