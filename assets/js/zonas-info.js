document.addEventListener("DOMContentLoaded", () => {
  const zonaTitulo = document.getElementById("zona-title");
  const zonaNombre = document.getElementById("zona-nombre");
  const zonaEstado = document.getElementById("zona-estado");
  const zonaHistoria = document.getElementById("zona-historia");
  const zonaDescripcion = document.getElementById("zona-descripcion");
  const zonaImagen = document.getElementById("zona-imagen");
  const zonaMapa = document.getElementById("zona-mapa");

  cargarDatosZonasArqueologicas(archivoJSON)
    .then((data) => {
      const params = new URLSearchParams(window.location.search);
      const zonaId = params.get("zona");

      const zona = data.zonasArqueologicas[zonaId];

      if (zona) {
        zonaTitulo.textContent = zona.nombre;
        zonaNombre.textContent = zona.nombre;
        zonaEstado.textContent = zona.estado;
        zonaHistoria.textContent = zona.historia;
        zonaDescripcion.textContent = zona.descripcion;
        zonaImagen.src = zona.imgv;
        zonaMapa.src = zona.urlmaps;
      }
    })
    .catch((error) => {
      console.error("Error al cargar los datos:", error);
    });
});
