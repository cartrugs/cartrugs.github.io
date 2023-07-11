// VARIABLES

// Expresión regular que permite cualquier palabra o palabras con longitud máxima de 50 caracteres
const regEx = /[\w\sÑ-ÿ]{1,50}$/g;

// fragment
const fragment = document.createDocumentFragment();
console.log(fragment)

// EVENTOS

document.addEventListener('DOMContentLoaded', ()=> {
    // querySelector botón e input
    const botonBuscar = document.querySelector('#botonBuscar');
    console.log(botonBuscar)
    const inputBuscar = document.querySelector('#inputBuscar');
    console.log(inputBuscar)
    // Evento click en el botón
    botonBuscar.addEventListener('click', () => {
        // Variable para crear búsqueda a través del valor del input, introduciendo palabra en el elemnto
        const datosBusqueda = inputBuscar.value;
        // Método test para comprobar la expresión regular(true si hay coincidencia)
        if (regEx.test(datosBusqueda)) {
            // Si true, se ejecuta función ejecutarBusqueda
            ejecutarBusqueda(datosBusqueda);
        } else {
            console.log('valor de la búsqueda no válido')
        }
    })

})

// FUNCIONES

// Función para llevar a cabo la búsqueda
const ejecutarBusqueda = async (url) => {
    try {
        // Retorna promesa. await para que continúe ejecutándose el programa. fetch para obtener recursos de forma asíncrona por la red
        let res = await fetch(`https://api.pexels.com/v1/search?query=${busqueda}`, {
            // No tengo muy claro si esto es así
            headers: {
                Authorization: 'aIwCSd1ODcT15TJOIvWuLrgCFSgq5Krev7gA8CV5IhQFpAPqt7eA65LU'
            }
        });

        if (res.ok) {
            res = await res.json();
            mostrarResultados(res);
        } else {
            throw('Ha ocurrido un error');
        }
    } catch (error) {
        console.log(error);
    }
}

// Función para mostrar los resultados de búsqueda
const mostrarResultados = () => {
    // div donde van a colocarse las tres fotos tendencias.
    const photosPrincipales = document.querySelector('#photosPrincipales')
    // Array para almacenar las imágenes que obtenga de pexels
    const tendenciasArray = [];
    tendenciasArray.forEach( () => {
        const cajasPhotos = document.createElement('DIV');
        cajasPhotos.classList.add('caja-photo');
        const imageTendencias = document.createElement('IMG');
        imageTendencias.setAttribute('id', item)
        const figCaption = document.createElement('FIGCAPTION');
        figCaption.append(imageTendencias);
        imageTendencias.append(cajasPhotos);
        
    });
    cajasPhotos.append(fragment);
}



// INVOCACIÓN FUNCIONES