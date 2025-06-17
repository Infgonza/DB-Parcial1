const db = require("./database");
const usuarioService = require("./usuarioService");
const proyectoService = require("./proyectoService");
const tareaService = require("./tareaService");

console.log("Modulo 'app.js' ha sido cargado");

console.log("Iniciando aplicacion de Gestion de Tareas");

async function main() {
  try {
    // 1. CONECTAR A LA BASE DE DATOS
    console.log("Conectando a MongoDB...");
    await db.connectToServer();

    // Crear usuarios
    console.log("  <--- GESTION DE USUARIOS -->");

    const usuario1 = await usuarioService.createUsuario({
      nombre: "Ana",
      email: "ana@email.com",
      password: "1234567",
    });

    const usuario2 = await usuarioService.createUsuario({
      nombre: "Nahuel",
      email: "nahuel@email.com",
      password: "123456",
    });

    // Obtener todos los usuarios
    const allUsuarios = await usuarioService.getAllUsuarios();
    console.log("<--------------------------------------------------------->");
    console.log("Cantidad de Usuarios registrados:", allUsuarios.length);
    console.log("<--------------------------------------------------------->");
    console.log("Usuarios encontrados en la base de datos:");
    console.dir(allUsuarios);
    console.log("<--------------------------------------------------------->");

    // Crear proyectos
    console.log("  <--- GESTION DE PROYECTOS -->");

    const proyecto = await proyectoService.createProyecto({
      nombre: "Desarrollo un stock de inventario",
      descripcion: "Crear un sistema para gestion de inventario",
      propietario: usuario1.insertedId,
      miembros: [usuario1.insertedId, usuario2.insertedId],
      fechaCreacion: new Date(),
    });

    // Crear tareas
    console.log("  <--- GESTION DE TARES -->");

    await tareaService.createTarea({
      titulo: "Diseñar interfaz de usuario",
      descripcion: "Crear pantalla de la aplicacion",
      estado: "por_hacer",
      fechaCreacion: new Date(),
      fechaVencimiento: new Date("2025-07-01"),
      proyecto: proyecto.insertedId,
      asignado: usuario1.insertedId,
      prioridad: "alta",
    });

    await tareaService.createTarea({
      titulo: "Configurar base de datos",
      descripcion: "Establecer conexiones de BD",
      estado: "finalizado",
      fechaCreacion: new Date(),
      fechaVencimiento: new Date("2025-06-25"),
      proyecto: proyecto.insertedId,
      asignado: usuario2.insertedId,
      prioridad: "media",
    });
  } catch (error) {
    console.error("Error en la aplicacion:", error);
  }
}
main().catch(console.error);
