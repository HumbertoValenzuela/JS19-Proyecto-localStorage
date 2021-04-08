//  Variables
// Selector para Formulario
const formulario = document.querySelector('#formulario');
// Selector para lista-tweets. para ir listando Mis Tweets
const listaTweets = document.querySelector('#lista-tweets');

// Crear un arreglo que almacenará los Tweets Creados
let tweets = [];

// EvenListener
eventListeners();
function eventListeners() {
    // Al dar submit al formulario, nuevo tweet
    formulario.addEventListener('submit', agregarTweets);
    // Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        MostrarDatosLocalStorage();
    })
}

// MostrarDatosLocalStorage
function MostrarDatosLocalStorage() {
     // Intenta buscar en localStorage los tweets y conviertelo Json.parse.
        //  Si te marca null asignalo como un arreglo Vacio []
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        // tweets = localStorage.getItem('tweets'); da error cuando esta vacio null
        // JSON.parse(tweets); da error al hacerlo por separado
        console.log(tweets);//Si esta vacio dice null
        //Cannot read property 'length' of null
        //es decir, en la función crearHTML  if (tweets.length > 0) no es un método de null.
        //y además tweets.forEach no es un método de null. Por tanto marcará error
       
        // ¿cómo lo haríamos? Si tweets no esta creado aún, lo asigne como un arreglo
        // para que no tengamos esos errores
         // ¿Cómo se soluciona? Se asigna un arreglo vacio, con la opción ||

        // Mandar llamar crearHTML
        crearHTML();
}

// Funciones
function agregarTweets(e) {
    // Formulario que se pasará el (e) así que preventDefault
    e.preventDefault();    

    // Textarea donde el usuario escribe
    const tweetTextArea = document.querySelector('#tweet').value;
    // console.log(tweet);
    // Validación
    if(tweetTextArea === '') {
        // console.log('No Puede ir Vacio');  
        mostrarError('Un mensaje no puede ir vacio');
        //Los dos console.log se ejecutan
        //Es decir, el código se seguirá ejecutando
        // para detener la líneas se coloca en return
        return ; // Evita que se ejecuten más líneas de código
        // El return funciona en un if, siempre y cuando este en una función
    }
    // console.log('Agregando Tweet');
    // Ahora si el usuario escribe algo, ya se tendría que ejecutar  console.log('Agregando Tweet');

// Se observa que los Tweets se pueden repetir, no se tiene
    // una forma para identificarlos
    // para diferenciarlos es Date.now
    // entrega un numero en milisegundos, lo que importa es que no se repite el numero
    const tweetObj = {
        id: Date.now(),
        // sintaxis texto: tweet, se puede cambiar el nombre texto a tweet. quedaría de esta manera tweet: tweet
        // si esto sucede entonces con JS se puede escribir solo tweet
        // texto: tweet
        // tweet: tweet
        tweet: tweetTextArea// es lo mismo que tweet: tweet
    }

    // Se agregarán al arreglo let tweets = [];
    // Y en base al contenido de este arreglo, se va a ir imprimiendo el HTML
    // spreadOperator
    tweets = [...tweets, tweetObj];
    //console.log(tweets);// Mostrará y agregará en un arreglo lo que se escribe

    // Una vez agregando vamos a crear el HTML
    crearHTML();

    // Reiniciar el formulario
    reiniciarFormulario();
}

// Mostrar Mensaje de error
function mostrarError(error) {
    // Se generará código html y scripting   
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');
    // Agregar el <p> antes del cierre del div.contenedor
    // Recordar que appendChild agrega al final de todos los elemento
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);   
    
    // Elimina la alerta despues de 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

// Muestra un listado de los Tweets
function crearHTML() {
    limpiarHTML();
    // Validar que tenga algo el arreglo. debido a que utilizaremos el mismo código cuando estemos eliminando
    // y si alguien elimina todos, no queremos que se siga ejecutando
    console.log('Listando tweets');
    if (tweets.length > 0) {
        // Iterar para acceder a cada Tweets o objeto
        tweets.forEach( (tweetEvento) => {

            // Agregar un botón Eliminar
            const btnEliminarTweet = document.createElement('a');
            btnEliminarTweet.classList.add('borrar-tweet');
            btnEliminarTweet.innerText = 'X';

            // Añadir a la X la función de eliminar
            btnEliminarTweet.onclick = () => {
                // objeto actual y el identificador
                borrarTweet(tweetEvento.id);
            }


            // Crear el HTML
            const li = document.createElement('li');
            li.innerText = tweetEvento.tweet

            // Asignar botón a li
            li.appendChild(btnEliminarTweet);

            // Colocar el html #lista-Tweets
            // appendchild no borra los elementos previos
            listaTweets.appendChild(li);
        });
    }
    // Almacenar en localStorage
    sincronizarStorage();
}

    // appendchild no borra los elementos previos
    // Limpiar el HTML
function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

function reiniciarFormulario() {
    formulario.reset();
}

// Agrega los Tweets actuales a localStorage
// Tenemos acceso global al array let tweets = [];
function sincronizarStorage() {
    // No se puede subir un arreglo a localstorage. entonces json.stringify
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Eliminar Tweet
function borrarTweet(id) {
    // console.log('borrando...', id);
    // Trae todos los demás excepto al que le dimos click
    tweets = tweets.filter( tweet => tweet.id !== id);
    console.log(tweets);
    // para que vuelva a iterar y se refresque la sección
    crearHTML();
}