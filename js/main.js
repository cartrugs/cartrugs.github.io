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

  const filtroPosicion = document.querySelector('#filtroPosicion');


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
  photosPrincipales.addEventListener('click', ({target}) => {

    if (targetImage.matches('img.despliegueImages')) {
      const imageId = targetImage.id;
      desplegarTendencias(targetImage.src);
    }
  });


  /**
   * Evento change para mostrar resultados del filtro.
  */

  filtroPosicion.addEventListener('change', (ev) => {
    const filtroSeleccionado = ev.target.value;
    const imageFiltrada = ev.target;
    if (filtroSeleccionado === 'horizontal') {
      // Filtrar por posición horizontal
      pintarHorizontales(imageFiltrada.width);
    } else if (filtroSeleccionado === 'vertical') {
      // Filtrar por posición vertical
      pintarVerticales();
    }
  });
  
  


  // FUNCIONES

  // Función para llevar a cabo la búsqueda
  const ejecutarBusqueda = async (url) => {
    try {
      // Retorna promesa. await para que continúe ejecutándose el programa. fetch para obtener recursos de forma asíncrona por la red
      let res = await fetch(`${urlBase}/${url}`, {
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
      const photographer = document.createElement('P'); 
      // photographer.textContent = item.photographer;
      // photographer.classList.add('parrafoPhotographer texto')
      cajasPhotos.append(imageBusqueda, photographer);
      resultadoBusqueda.append(cajasPhotos);
      // fragment.append(resultadoBusqueda);
      
    });
    
  };

  const tendenciaUno = 'search?query=macro&page=1';
  const tendenciaDos = 'search?query=milkyway&page=1';
  const tendenciaTres = 'search?query=bees&page=1';

  // Función para crear fotos estáticas.
  const crearEstaticas = async (url1, url2, url3) => {   
    const busquedaArray1 = await ejecutarBusqueda('photos/268819');
    const busquedaArray2 = await ejecutarBusqueda('photos/1906658');
    const busquedaArray3 = await ejecutarBusqueda('photos/2047420');

    const fotosSeleccionadas = [
      {
        item: busquedaArray1,
        categoria: 'macro'
      },{
        item: busquedaArray2,
        categoria: 'milkyway'
      },{
        item: busquedaArray3,
        categoria: 'bees'
      }
    ];

    console.log({busquedaArray1});

    fotosSeleccionadas.forEach(({item, categoria}) => {

      const cajasPhotosTendencias = document.createElement('FIGURE');
      cajasPhotosTendencias.classList.add('caja-photo-tendencias');
      const imageTendencias = document.createElement('IMG');
      imageTendencias.classList.add('despliegueImages')
      imageTendencias.src = item.src.medium;
      imageTendencias.setAttribute('id', item);
      cajasPhotosTendencias.append(imageTendencias);
      photosPrincipales.append(cajasPhotosTendencias) 

    });
  };

  // Función para crear despliegue.

  const desplegarTendencias = async (id) => {
    console.log(id, 'en desplegar tendencias')
    const busquedaArray1 = await ejecutarBusqueda(`search?query=${id}&page=1`);

    imageContainerTendencias,innerHTML = '';
  
    photos.forEach((item, index) => {
      const cajasPhotosTendencias = document.createElement('FIGURE');
      cajasPhotosTendencias.classList.add('caja-photo-tendencias');
      const imageTendencias = document.createElement('IMG');
      imageTendencias.src = item.src.medium;
      const photographer = document.createElement('P'); 
      photographer.textContent = item.photographer
      // photographer.classList.add('parrafoPhotographer texto')
      cajasPhotosTendencias.append(imageTendencias, photographer);
  
      imageContainerTendencias.append(cajasPhotosTendencias);
    });
  };
  
  // Función para pintar horizontales

  // const pintarHorizontales = async (url) => {
  //   const busquedaArray = await ejecutarBusqueda(`search?query=${url}`);
  //   const imagenesHorizontales = busquedaArray.photos.filter(item => item.width > item.heigth)

  //   imagenesHorizontales.forEach((item) => {
  //     const cajasPhotos = document.createElement('FIGURE');
  //     cajasPhotos.classList.add('caja-photo');
  //     const imageBusqueda = document.createElement('IMG');
  //     imageBusqueda.src = item.src.medium;
  //     imageBusqueda.alt= item.alt;
  //     imageBusqueda.width = item.width;
  //     imageBusqueda.height = item.height;
  //     cajasPhotos.append(imageBusqueda);
  //     photosPrincipales.append(cajasPhotos);
  //   });
  // };

  // Función para pintar verticales

  // const pintarVerticales = async (url) => {
  //   const busquedaArray =  await ejecutarBusqueda(`search?query=${url}`);
  //   const imagenesVerticales = busquedaArray.photos.filter(item => item.width < item.heigth)

  //   imagenesVerticales.forEach((item) => {
  //     const cajasPhotos = document.createElement('FIGURE');
  //     cajasPhotos.classList.add('caja-photo');
  //     const imageBusqueda = document.createElement('IMG');
  //     imageBusqueda.src = item.src.medium;
  //     imageBusqueda.src = item.alt;
  //     imageBusqueda.width = item.width;
  //     imageBusqueda.height = item.height;
  //     cajasPhotos.append(imageBusqueda);
  //     resultadoBusqueda.append(cajasPhotos); 
  //   });
  // };
  

  // INVOCACIÓN FUNCIONES
  crearEstaticas(tendenciaUno, tendenciaDos, tendenciaTres);
  
  

}); // LOAD