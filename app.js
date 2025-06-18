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
    console.log(" ");
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
    console.log(" ");
    console.log("<--------------------------------------------------------->");
    console.log(" ");
    console.log("Cantidad de Usuarios registrados:", allUsuarios.length);
    console.log(" ");
    console.log("<--------------------------------------------------------->");
    console.log(" ");
    console.log("Usuarios encontrados en la base de datos:");
    console.log(JSON.stringify(allUsuarios, null, 2));
    console.log(" ");
    console.log("<--------------------------------------------------------->");
    console.log(" ");

    // Crear proyectos
    console.log("  <--- GESTION DE PROYECTOS -->");
    console.log(" ");

    const proyecto = await proyectoService.createProyecto({
      nombre: "Desarrollo un stock de inventario",
      descripcion: "Crear un sistema para gestion de inventario",
      propietario: usuario1.insertedId,
      miembros: [usuario1.insertedId, usuario2.insertedId],
      fechaCreacion: new Date(),
    });

    // Obtener todos los proyectos
    const allProyectos = await proyectoService.getAllProyectos();
    console.log(" ");
    console.log("<--------------------------------------------------------->");
    console.log(" ");
    console.log("Cantidad de proyectos registrados:", allProyectos.length);
    console.log(" ");
    console.log("<--------------------------------------------------------->");
    console.log(" ");
    console.log("Proyectos encontrados en la base de datos:");
    console.log(JSON.stringify(allProyectos, null, 2));
    console.log(" ");
    console.log("<--------------------------------------------------------->");
    console.log(" ");

    // Crear tareas
    console.log("  <--- GESTION DE TAREAS -->");
    console.log(" ");

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

    // Obtener todas los tareas
    const allTareas = await tareaService.getAllTareas();
    console.log(" ");
    console.log("<--------------------------------------------------------->");
    console.log(" ");
    console.log("Cantidad de tareas registrados:", allTareas.length);
    console.log(" ");
    console.log("<--------------------------------------------------------->");
    console.log(" ");
    console.log("Tareas encontrados en la base de datos:");
    console.log(JSON.stringify(allTareas, null, 2));
    console.log(" ");
    console.log("<--------------------------------------------------------->");
    console.log(" ");
  } catch (error) {
    console.error("Error en la aplicacion:", error);
  }
}
main().catch(console.error);
