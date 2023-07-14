/**
 * Se ejecuta cuando el contenido del DOM ha sido cargado.
 */
document.addEventListener("DOMContentLoaded", () => {
  // VARIABLES

  /**
   *  Botón que al clicar inicia la búsqueda (tipo objeto del DOM).
   * @type {object}
   */
  const botonBuscar = document.querySelector("#botonBuscar");

  /**
   *  Elemento input de entrada de búsqueda (tipo objeto del DOM). Se agrega al final .value Ejemplo(entre^^): ^querySelector().value^ para capturar el valor del input (palabra con que el usuario genera la búsqueda) y se asigna ese valor como argumemnto a la función encargada de arrojar los resultados.
   * @type {object}
   */


  /**
   * El formulario para buscar resultados.
   * @type {object}
   */
  const formularioBuscar = document.querySelector("#idFormulario");


  /**
   * El div donde van a mostrase los resultados de la búsqueda.
   * @type {object}
   */
  const resultadoBusqueda = document.querySelector("#resultadoBusqueda");

  /**
   * El div donde van a colocarse las tres fotos tendencias.
   * @type {object}
   */
  const photosPrincipales = document.querySelector("#photosPrincipales");

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
  const urlBase = "https://api.pexels.com/v1";

  // EVENTOS

  /**
   *  * @param {Event}
   * Evento click en el botón de búsqueda. Se pone a la escucha al documento y se asigna target al botón para desencadenar el evento.
   */
  formularioBuscar.addEventListener("submit", (ev) => {
    ev.preventDefault()

    console.log(ev);
    if (ev.target.className == 'formSearch') {

      const palabraUsuario = document.getElementById('palabra').value
  
      
      // Método test para comprobar la expresión regular(true si hay coincidencia)
      if (regExp.test(palabraUsuario)) {
        // Si true, se ejecuta función ejecutarBusqueda
        pintarResultados(palabraUsuario);
      } else {
        window.alert("La palabra para la búsqueda no es válida. Por favor introduce una nueva palabra");
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
          Authorization:
            "aIwCSd1ODcT15TJOIvWuLrgCFSgq5Krev7gA8CV5IhQFpAPqt7eA65LU",
        },
      });

      if (res.ok) {
        res = await res.json();

        return res;
      } else {
        throw "Ha ocurrido un error";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const urlDinamica = "https://api.pexels.com/v1/search?query=red&per_page=1"

  // Función para mostrar los resultados de búsqueda
  const pintarResultados = async (url) => {
    // Array para almacenar las imágenes que obtenga de pexels
    
    const busquedaArray = await ejecutarBusqueda(`search?query=${url}`);
    console.log(busquedaArray);
    busquedaArray.photos.forEach((item) => {
      // console.log(item);
      const cajasPhotos = document.createElement("FIGURE");
      cajasPhotos.classList.add("caja-photo");
      const imageBusqueda = document.createElement("IMG");
      (imageBusqueda.src = item.src.medium),
        imageBusqueda.setAttribute("alt", item.alt);
      const figCaption = document.createElement("FIGCAPTION");
      figCaption.append(imageBusqueda);
      cajasPhotos.append(figCaption);
      resultadoBusqueda.append(cajasPhotos);
    });
  };

  // const crearEstaticas = async () => {
  //   const {ok, page, photos} = await ejecutarBusqueda()
  //   const cajasPhotosTendencias = document.createElement('DIV');
  //     cajasPhotosTendencias.classList.add('caja-photo-tendencias');
  //     const imageTendencias = document.createElement('IMG');

  //     imageTendencias.setAttribute('id', item);
  //     const figCaption = document.createElement('FIGCAPTION');
  //     figCaption.append(imageTendencias);
  //     imageTendencias.append(cajasPhotos);

  // }

  // INVOCACIÓN FUNCIONES

}); // LOAD
