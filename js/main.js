/**
 * Se ejecuta cuando el contenido del DOM ha sido cargado.
 */
document.addEventListener('DOMContentLoaded', () => {
  // VARIABLES

  /**
   *  Botón que al clicar inicia la búsqueda (tipo objeto del DOM).
   * @type {object}
   */
  const botonBuscar = document.querySelector('#botonBuscar');

  /**
   *  Elemento input de entrada de búsqueda (tipo objeto del DOM). Se agrega al final .value Ejemplo(entre^^): ^querySelector().value^ para capturar el valor del input (palabra con que el usuario genera la búsqueda) y se asigna ese valor como argumemnto a la función encargada de arrojar los resultados.
   * @type {object}
   */


  /**
   * El formulario para buscar resultados.
   * @type {object}
   */
  const formularioBuscar = document.querySelector('#idFormulario');


  /**
   * El div donde van a mostrase los resultados de la búsqueda.
   * @type {object}
   */
  const resultadoBusqueda = document.querySelector('#resultadoBusqueda');

  /**
   * El div donde van a colocarse las tres fotos tendencias.
   * @type {object}
   */
  const photosPrincipales = document.querySelector('#photosPrincipales');

  /**
   * El div donde van a colocarse las tres fotos tendencias.
   * @type {object}
   */
  const cajasPhotosTendencias = document.querySelector('#imageTendencias');

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
   * Evento submit en el botón de búsqueda. Se pone a la escucha al formulario y se asigna target al botón para desencadenar el evento.
   */
  formularioBuscar.addEventListener('submit', (ev) => {
    ev.preventDefault()

    console.log(ev);
    if (ev.target.className == 'formSearch') {

      const palabraUsuario = document.getElementById('palabra').value
  
      
      // Método test para comprobar la expresión regular(true si hay coincidencia)
      if (regExp.test(palabraUsuario)) {
        // Si true, se ejecuta función ejecutarBusqueda
        pintarResultados(palabraUsuario);
      } else {
        window.alert('La palabra para la búsqueda no es válida. Por favor introduce una nueva palabra');
      }
    }
  });

  /**
   * Evento click para desplegar desde tendencias.
  */
  photosPrincipales.addEventListener('click', (ev) => {
    ev.preventDefault();
  
    const targetImage = ev.target;
    if (targetImage.matches('img.despliegueImages')) {
      const imageId = targetImage.id;
      desplegarTendencias(targetImage.src);
    }
  });
  ;
  

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
            'aIwCSd1ODcT15TJOIvWuLrgCFSgq5Krev7gA8CV5IhQFpAPqt7eA65LU',
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

  const urlDinamica = 'https://api.pexels.com/v1/search?query=red&per_page=1'

  // Función para mostrar los resultados de búsqueda
  const pintarResultados = async (url) => {
    
    // Array para almacenar las imágenes que obtenga de pexels.
    const busquedaArray = await ejecutarBusqueda(`search?query=${url}`);
    console.log(busquedaArray);
    busquedaArray.photos.forEach((item) => {
      // console.log(item);
      const cajasPhotos = document.createElement('FIGURE');
      cajasPhotos.classList.add('caja-photo');
      const imageBusqueda = document.createElement('IMG');
      imageBusqueda.src = item.src.medium,
      imageBusqueda.setAttribute('alt', item.alt);
      const imageBusquedaText = document.createElement('P')
        // imageBusqueda.classList.add('img-photographer');
        // imageBusquedaText.textContent = item.photographer;
      // const figCaption = document.createElement('FIGCAPTION');
      // figCaption.append(imageBusqueda);
      // imageBusquedaText.append(imageBusqueda);
      cajasPhotos.append(imageBusqueda);
      resultadoBusqueda.append(cajasPhotos);
      // fragment.append(resultadoBusqueda);
      
    });
    
  };

  const tendenciaUno = 'search?query=macro&page=1';
  const tendenciaDos = 'search?query=milkyway&page=1';
  const tendenciaTres = 'search?query=bees&page=1';


  // Función para crear fotos estáticas.
  const crearEstaticas = async (url1, url2, url3) => {
    const busquedaArray1 = await ejecutarBusqueda('search?query=macro&page=1');
    const busquedaArray2 = await ejecutarBusqueda('search?query=milkyway&page=1');
    const busquedaArray3 = await ejecutarBusqueda('search?query=bees&page=1');


    // const fotosSeleccionadas = busquedaArray.photos.slice(3,6);
    const fotosUnicas = [];

    const fotosSeleccionadas = [ 
      ...busquedaArray1.photos.slice(3, 4),
      ...busquedaArray2.photos.slice(1, 2),
      ...busquedaArray3.photos.slice(3, 4)
    ];

    fotosSeleccionadas.forEach((item) => {

      const existeFoto = fotosUnicas.find((foto) => foto.src.medium === item.src.medium);
      if (!existeFoto) {
        const cajasPhotosTendencias = document.createElement('FIGURE');
        cajasPhotosTendencias.classList.add('caja-photo-tendencias');
        const imageTendencias = document.createElement('IMG');
        imageTendencias.classList.add('despliegueImages')
        // const imageTendenciasTexto = document.createElement('P');
        // imageBusquedaText.textContent = 'Tendencias';
        imageTendencias.src = item.src.medium;
        
        imageTendencias.setAttribute('id', item);
        // console.log(item)
        // imageTendencias.append(imageTendenciasTexto)
        cajasPhotosTendencias.append(imageTendencias);

        photosPrincipales.append(cajasPhotosTendencias)

        fotosUnicas.push(item);
        console.log(fotosUnicas)
      }
      

    });
  };

  // Función para crear despliegue.

  const desplegarTendencias = async (url1, url2, url3) => {
    console.log(url1, url2, url3)
    const busquedaArray1 = await ejecutarBusqueda('search?query=macro&page=1');
    
    const busquedaArray2 = await ejecutarBusqueda('search?query=milkyway&page=1');
    const busquedaArray3 = await ejecutarBusqueda('search?query=bees&page=1');
    const urls = ['search?query=macro&page=1', 'search?query=milkyway&page=1', 'search?query=bees&page=1'];
    
    const fotos = [
      ...busquedaArray1.photos,
      ...busquedaArray2.photos,
      ...busquedaArray3.photos
    ];
    console.log(fotos)
  
    fotos.forEach((item, index) => {
      const cajasPhotosTendencias = document.createElement('FIGURE');
      cajasPhotosTendencias.classList.add('caja-photo-tendencias');
      const imageTendencias = document.createElement('IMG');
      imageTendencias.src = item.src.medium;
      cajasPhotosTendencias.appendChild(imageTendencias);
  
      imageContainerTendencias.append(cajasPhotosTendencias);
    });
  };
  
  

  // INVOCACIÓN FUNCIONES
  crearEstaticas(tendenciaUno, tendenciaDos, tendenciaTres)
  
  

}); // LOAD