document.addEventListener("DOMContentLoaded", () => {
  const zonaTitulo = document.getElementById("zona-title");
  const zonaNombre = document.getElementById("zona-nombre");
  const zonaEstado = document.getElementById("zona-estado");
  const zonaLong = document.getElementById("zona-long");
  const zonaLat = document.getElementById("zona-lat");
  const zonaHistoria = document.getElementById("zona-historia");
  const zonaDescripcion = document.getElementById("zona-descripcion");
  const zonaImagen = document.getElementById("zona-imagen");
  const zonaMapa = document.getElementById("zona-mapa");

  cargarDatosZonasArqueologicas(archivoJSON)
    .then((data) => {
      const params = new URLSearchParams(window.location.search);
      const zonaNombreCodificado = params.get("zona");
      
      // Decodifica el nombre de la zona desde la URL
      const zonaNombreid = decodeURIComponent(zonaNombreCodificado);

      const zona = data.zonasArqueologicas.find((z) => z.nombre === zonaNombreid);

      if (zona) {
        zonaTitulo.textContent = zona.nombre;
        zonaNombre.textContent = zona.nombre;
        zonaEstado.textContent = zona.estado;
        zonaLong.textContent = zona.latitud;
        zonaLat.textContent = zona.altitud;
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
