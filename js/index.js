console.log('bookStore')

var LS_KEY = 'booksList'

// Carga incial de la app

var preCarga = [
    {nombre: "Así hablo zarathustra", editorial: "Planeta agostini", autor: "Friedrich nietzsche", edicion: "2003"},
 {nombre: "Crimen y castigo", editorial: "Libertador", autor: "Fiódor dostoyevski", edicion: "2007"},
{nombre: "La insoportable levedad del ser", editorial: "Narrativa actual", autor: "Milan kundera", edicion: "2009"},
 {nombre: "El nombre de la rosa", editorial: "Paidos", autor: "Umberto eco", edicion: "1999"}
]


setLocalList(LS_KEY, preCarga) 
   
var localListBook = getLocalList(LS_KEY)

var mainListNode = document.getElementById('mainList')

var newListBook = []

var localBook

var newBook

for (var i = 0; i < localListBook.length; i++) {
    localBook = localListBook[i]
    newBook = new Book(
    localBook.nombre,
    localBook.editorial,
    localBook.autor,
    localBook.edicion
  )
  newListBook.push(newBook)

  var trNode = createBookNode(newBook)


  mainListNode.appendChild(trNode)

  
}

// Levantar nombre y validarlo

var nombreInputNode = document.getElementById('nombre')
nombreInputNode.onblur = validateEmptyField

// Levantar editorial y validarlo

var editorialInputNode = document.getElementById('editorial')
editorialInputNode.onblur = validateEmptyField

// Levantar autor y validarlo

var autorInputNode = document.getElementById('autor')
autorInputNode.onblur = validateEmptyField

// Levantar edición y validarlo

var edicionInputNode = document.getElementById('edicion')
edicionInputNode.onblur = validateEdicionField

function validateEdicionField(event) {

  var inputNode = event.target

  var parsedValue = parseInt(inputNode.value)


  if (

    !inputNode.value ||
    isNaN(parsedValue) ||
    parsedValue <= 0
  ) {
    // Caso incorrecto
    inputNode.classList.remove('is-valid')
    inputNode.classList.add('is-invalid')
  } else {
    // Caso correcto
    inputNode.classList.remove('is-invalid')
    inputNode.classList.add('is-valid')
  }
  validateButton()

}


// Función que valida si el campo esta vacío o no

function validateEmptyField(event) {

  var inputNode = event.target

  if (!inputNode.value) {
    inputNode.classList.remove('is-valid')
    inputNode.classList.add('is-invalid')
  } else {
    inputNode.classList.add('is-valid')
    inputNode.classList.remove('is-invalid')
  }

  validateButton()
}



// Función que valida si habilitar o no el botón de agregar

var addBookButtonNode = document.getElementById('addBookButton')

addBookButtonNode.disabled = true

function validateButton() {
  var isValidInputNodes = document.getElementsByClassName('is-valid')

  if (isValidInputNodes.length === 4) {
    addBookButtonNode.disabled = false
  } else {
    addBookButtonNode.disabled = true
  }
}


// Función que agrega libro

addBookButtonNode.onclick = addBook

function addBook () {


  var nombreToLowerCase = nombreInputNode.value.toLowerCase()

  var editorialToLowerCase = editorialInputNode.value.toLowerCase()

  var autorToLowerCase = autorInputNode.value.toLowerCase()

  var capitalize = function (nombre, editorial, autor) {
    if (nombre) {
      return nombre[0].toUpperCase() + nombre.slice(1)
    }

    if (editorial) {
        return editorial[0].toUpperCase() + editorial.slice(1)
      }

      if (autor) {
        return autor[0].toUpperCase() + autor.slice(1)
      }

  }

  var nombre = capitalize(nombreToLowerCase)

  var editorial = capitalize(editorialToLowerCase)

  var autor = capitalize(autorToLowerCase)

  var edicion = edicionInputNode.value


  var newBook = new Book(nombre, editorial, autor, edicion)

 

  newListBook.push(newBook)

  var trNode = createBookNode(newBook)



  mainListNode.appendChild(trNode)

  setLocalList(LS_KEY, newListBook)

  // Limpieza del formulario
  nombreInputNode.value = ''
  editorialInputNode.value = ''
  autorInputNode.value = ''
  edicionInputNode.value = ''

  nombreInputNode.classList.remove('is-valid')
  editorialInputNode.classList.remove('is-valid')
  autorInputNode.classList.remove('is-valid')
  edicionInputNode.classList.remove('is-valid')
  

  addBookButtonNode.disabled = false


}



/**
 * Función que devuelve nodos tr
 * @param { Student } newStudent
 * @returns Node
 */
function createBookNode(newBook) {
  // Creo el nodo td
  var tdNode = document.createElement('td')
 var trNode = document.createElement('tr')

  // Le agrego el contenido al nodo
  trNode.innerHTML='<tr>' +
  (tdNode.innerHTML =
    '<td>' +
    newBook.nombre +
    '</td><td>' +
    newBook.editorial +
    '</td><td>' +
    newBook.autor +
    '</td><td>' + newBook.edicion + '</td>') + '</tr>'

  // Devuelvo solo el nodo con todos sus datos

  return trNode
}


// Función constructora

function Book(nombre, editorial, autor, edicion) {

    if (nombre) {
        this.nombre = nombre
    }
    else {
        this.nombre = ''
    }

    if (editorial) {
        this.editorial= editorial = editorial
    }
    else{
        this.editorial = ''
    }

    if (autor) {
        this.autor = autor
    } else {
        this.autor = ''
    }

    if (edicion) {
        this.edicion = edicion
    } else {
        this.edicion = ''
    }


}



// Función que busca en el localStorage a partir de una key que se le pasa como parámetro
// Se verifica que la key sea del tipo string, y si existe nos devuelve la lista parseada
// sino nos devuelve un array vacío.

function getLocalList(key) {

  if (typeof key === 'string') {

    var localListBook = localStorage.getItem(key)

    if (localListBook) {

      var parsedList = JSON.parse(localListBook)
      return parsedList
    } else {

      return []
    }
  }
}



function setLocalList(key, list) {
  // Verifico los parámetros recibidos
  if (typeof key === 'string' && Array.isArray(list)) {
    // Convierto a JSON el array
    var strList = JSON.stringify(list)
    // Guardo en el localStorage pisando la key
    localStorage.setItem(key, strList)
   
  }
}
