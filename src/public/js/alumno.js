// alumno.js

// Función para obtener y mostrar los datos del usuario
async function cargarDatosUsuario() {
    try {
        // Realizar la consulta directamente a la base de datos utilizando el pool
        const query = 'SELECT nombre_completo, edad, foto, certificado_salud FROM DatosCliente WHERE cliente_id = ?'; // Ajusta la consulta según tu estructura de la base de datos
        const usuario = await pool.query(query, [cliente_id]); // Asegúrate de tener el cliente_id disponible
  
        // Actualizar elementos HTML con los datos del usuario
        document.getElementById('nombreCompleto').innerText = usuario[0].nombre_completo;
        document.getElementById('edad').innerText = usuario[0].edad;
  
        // Verificar si hay una foto y mostrarla
        if (usuario[0].foto) {
            const elementoFoto = document.getElementById('foto');
            elementoFoto.src = `data:image/jpeg;base64,${usuario[0].foto.toString('base64')}`;
            mostrarCargarFotoButton();
        }
        else {
            ocultarCargarFotoButton();
        }
  
        // Verificar si hay un certificado_salud y mostrarlo
        if (usuario[0].certificado_salud) {
            alert("Certificado de salud aceptado. No se puede editar.");
        }
    } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
    }
  }
  
  function mostrarCargarFotoButton() {
    const cargarFotoButton = document.getElementById('cargarFotoButton');
    cargarFotoButton.style.display = 'block';
  
    const seleccionarArchivoButton = document.getElementById('seleccionarArchivoButton');
    seleccionarArchivoButton.style.display = 'none';
  }
  
  function ocultarCargarFotoButton() {
    const cargarFotoButton = document.getElementById('cargarFotoButton');
    cargarFotoButton.style.display = 'none';
  }
  
  // Event listener para cargar los datos del usuario cuando la página se carga
  document.addEventListener('DOMContentLoaded', cargarDatosUsuario);
  