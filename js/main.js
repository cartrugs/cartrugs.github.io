/**
 * Se ejecuta cuando el contenido del DOM ha sido cargado.
 */
document.addEventListener('DOMContentLoaded', () => {

  // VARIABLES
  // querySelector botón e input

  /**
   *  Botón que al clicar inicia la búsqueda (tipo objeto del DOM).
   * @type {object}
   */
  const botonBuscar = document.querySelector('#botonBuscar');

  /**
   *  Elemento input de entrada de búsqueda (tipo objeto del DOM). Se agrega al final .value Ejemplo(entre^^): ^querySelector().value^ para capturar el valor del input (palabra con que el usuario genera la búsqueda) y se asigna ese valor como argumemnto a la función encargada de arrojar los resultados.
   * @type {object}
   */
  const inputBuscar = document.querySelector('#inputBuscar').value;
  
   /**
   * El div donde van a colocarse las tres fotos tendencias.
   * @type {object}
   */
  const photosPrincipales = document.querySelector('#photosPrincipales');

  /**
   * Expresión regular que permite cualquier palabra o palabras con una longitud máxima de 50 caracteres.
   * @type {object}
   */
  const regExp = /^[\w\sÑ-ÿ]{1,50}$/g;

  // fragment
  /**
   * @type {object}
   */
  const fragment = document.createDocumentFragment();

  /**
   * La URL base para la API de Pexels.
   * @type {string}
   */
  const urlBase = 'https://api.pexels.com/v1';

  // EVENTOS

  /**
   *  * @param {Event}
   * Evento click en el botón de búsqueda. Se pone a la escucha al documento y se asigna target al botón para desencadenar el evento.
   */
  document.addEventListener('click', ({target}) => {

    if (target === document.getElementById('#botonBuscar')) {
        // Variable para crear búsqueda a través del valor del input, introduciendo palabra en el elemento.
        const datosBusqueda = inputBuscar.value;
        // Método test para comprobar la expresión regular(true si hay coincidencia)
        if (regExp.test(datosBusqueda)) {
            // Si true, se ejecuta función ejecutarBusqueda
            mostrarResultados();
          } else {
            console.log('valor de la búsqueda no válido');
          }
        } 
        
    
  });

  // FUNCIONES

  // Función para llevar a cabo la búsqueda
  const ejecutarBusqueda = async (url) => {
    try {

      // const urlBuscar = `search?query=${inputBuscar.value}`
      // Retorna promesa. await para que continúe ejecutándose el programa. fetch para obtener recursos de forma asíncrona por la red
      let res = await fetch(`${urlBase}/${url}`, {
        // No tengo muy claro si esto es así
        headers: {
          'Authorization': 'aIwCSd1ODcT15TJOIvWuLrgCFSgq5Krev7gA8CV5IhQFpAPqt7eA65LU',
        },
      });

      if (res.ok) {
        res = await res.json();
        return res;
      } else {
        throw 'Ha ocurrido un error';
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Función para mostrar los resultados de búsqueda
  const mostrarResultados = async () => {
    // Array para almacenar las imágenes que obtenga de pexels
    const busquedaArray = await ejecutarBusqueda(`search?query=${inputBuscar.value}`);
    console.log(busquedaArray);
    busquedaArray.forEach(() => {
      const cajasPhotos = document.createElement('DIV');
      cajasPhotos.classList.add('caja-photo');
      const imageTendencias = document.createElement('IMG');

      imageTendencias.setAttribute('id', item);
      const figCaption = document.createElement('FIGCAPTION');
      figCaption.append(imageTendencias);
      imageTendencias.append(cajasPhotos);
    });
    cajasPhotos.append(fragment);
  };

  const crearEstaticas = async () => { 
    const tendenciasArray = await ejecutarBusqueda()
  } 

  // INVOCACIÓN FUNCIONES
  mostrarResultados()

}); // LOAD
