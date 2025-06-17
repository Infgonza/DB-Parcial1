const { MongoClient } = require("mongodb");
const MONGODB_URI = "URI BASE DE DATOS";
const DB_NAME = "GestionTareas";

const client = new MongoClient(MONGODB_URI);
let dbConnection;

module.exports = {
  connectToServer: async function () {
    try {
      // Si ya existe una conexión, no hacemos nada.
      if (dbConnection) {
        console.log("Ya existe una conexión a la base de datos.");
        return;
      }

      // Conectamos el cliente al servidor.
      await client.connect();

      // Asignamos la conexión a nuestra variable 'dbConnection'.
      dbConnection = client.db(DB_NAME);

      console.log("✅ Conexión exitosa a MongoDB.");
    } catch (err) {
      console.error("❌ Error al conectar con MongoDB:", err);
      // Si la conexión falla, la aplicación no puede continuar.
      process.exit(1);
    }
  },
  /**
   * Devuelve la instancia de la base de datos ya conectada.
   * Es la forma en que el resto de la aplicación interactúa con la BD.
   * @returns {Db} La instancia de la conexión a la base de datos.
   */
  getDb: function () {
    if (!dbConnection) {
      // Este error previene que se intente usar la BD sin estar conectados.
      throw new Error(
        "¡Debes llamar a connectToServer() antes de usar la base de datos!"
      );
    }
    return dbConnection;
  },
};
