// Header
const headerContainer = document.createElement('header');
fetch('/components/header.html')
    .then(response => response.text())
    .then(data => {
        headerContainer.innerHTML = data;
    })
    .catch(error => {
        console.error('Error al cargar el encabezado:', error);
    });
window.addEventListener('DOMContentLoaded', () => {
    document.body.insertBefore(headerContainer, document.body.firstChild);
});

// Lectura JSON
archivoJSON = "/assets/json/zonas-arqueologicas.json"
function cargarDatosZonasArqueologicas(archivoJSON) {
    return fetch(archivoJSON)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo cargar el archivo JSON.');
            }
            return response.json();
        });
}

// Catalogo de zonas

document.addEventListener('DOMContentLoaded', () => {
    const catalogoContainer = document.getElementById('grid');
    const filtroZona = document.getElementById('filtroZona');
    const filtroEstado = document.getElementById('filtroEstado');

    let zonasArqueologicas = []; 

    cargarDatosZonasArqueologicas(archivoJSON)
        .then(data => {
            zonasArqueologicas = data.zonasArqueologicas;
            llenarFiltros(zonasArqueologicas);
            mostrarCatalogo(zonasArqueologicas);
        })
        .catch(error => {
            console.error('Error al cargar los datos:', error);
        });

    filtroZona.addEventListener('change', () => {
        filtrarZonas();
    });

    filtroEstado.addEventListener('change', () => {
        filtrarZonas();
    });

    function llenarFiltros(zonas) {
        const ordenRegiones = ['Noroeste', 'Noreste', 'Centro', 'Occidente', 'Sureste'];
        const zonasUnicas = [...new Set(zonas.map(zona => zona.region))];
        const estadosUnicos = [...new Set(zonas.map(zona => zona.estado))];

        zonasUnicas.sort((a, b) => ordenRegiones.indexOf(a) - ordenRegiones.indexOf(b));
        estadosUnicos.sort();

        zonasUnicas.forEach(zona => {
            const opcion = document.createElement('option');
            opcion.value = zona;
            opcion.textContent = zona;
            filtroZona.appendChild(opcion);
        });

        estadosUnicos.forEach(estado => {
            const opcion = document.createElement('option');
            opcion.value = estado;
            opcion.textContent = estado;
            filtroEstado.appendChild(opcion);
        });
    }

    function mostrarCatalogo(zonas) {
        catalogoContainer.innerHTML = ''; 
        console.log(zonas);

        zonas.forEach(zona => {
            const zonaArqueologicaDiv = document.createElement('div');
            zonaArqueologicaDiv.classList.add('item');

            const enlaceDetalle = document.createElement('a');
            enlaceDetalle.href = `zona-detalle.html?zona=${zonas.indexOf(zona)}`;

            const contentImg = document.createElement('div');
            contentImg.classList.add('content-img');

            const imagen = document.createElement('img');
            imagen.src = zona.imgc;
            imagen.alt = 'zona';

            contentImg.appendChild(imagen);
            enlaceDetalle.appendChild(contentImg);

            const nombre = document.createElement('p');
            nombre.classList.add('name');
            nombre.textContent = zona.nombre;
            enlaceDetalle.appendChild(nombre);

            const locationDiv = document.createElement('div');
            locationDiv.classList.add('location');
            locationDiv.classList.add('itemap');

            const iconMap = document.createElement('img');
            iconMap.src = '/assets/img/bxs-map.svg';
            iconMap.alt = 'icon-map';

            const ubicacion = document.createElement('p');
            ubicacion.textContent = zona.estado;

            locationDiv.appendChild(iconMap);
            locationDiv.appendChild(ubicacion);

            enlaceDetalle.appendChild(locationDiv);

            zonaArqueologicaDiv.appendChild(enlaceDetalle);

            catalogoContainer.appendChild(zonaArqueologicaDiv);

            const contadorZonas = document.getElementById("cantidadZonas");
            contadorZonas.textContent = zonas.length;
        });
    }

    function filtrarZonas() {
        const zonaSeleccionada = filtroZona.value;
        const estadoSeleccionado = filtroEstado.value;

        const zonasFiltradas = zonasArqueologicas.filter(zona => {
            if (zonaSeleccionada && zona.region !== zonaSeleccionada) {
                return false;
            }
            if (estadoSeleccionado && zona.estado !== estadoSeleccionado) {
                return false;
            }
            return true;
        });

        mostrarCatalogo(zonasFiltradas);
        const contadorZonas = document.getElementById("cantidadZonas");
        contadorZonas.textContent = zonasFiltradas.length;
    }
});



