class Aspirante {
  constructor({ id_aspirante, nombre, apellidos, email, telefono, id_carrera_elegida }) {
    this.id_aspirante = id_aspirante;
    this.nombre = nombre;  // Cambiado de "nombres" a "nombre"
    this.apellidos = apellidos;
    this.email = email;
    this.telefono = telefono;
    this.id_carrera_elegida = id_carrera_elegida;
  }
}

module.exports = Aspirante;