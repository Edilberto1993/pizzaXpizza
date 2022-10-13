


Swal.fire({
    title: "Bienvenido a pizzaXpizza",
    timer: 1500
})
class PizzaPersonal{
    constructor(id, tipo, especias, queso, precio, imagen ){
        this.id = id,
        this.tipo = tipo,
        this.especias = especias,
        this.queso = queso,
        this.precio = precio,
        this.imagen = imagen
       
    }
    datosPizza(){
        console.log(` ID : ${this.id} \n TIPO: ${this.tipo} \n ESPECIAS: ${this.especias} \n TIPO DE QUESO: ${this.queso} \n PRECIO: ${this.precio}   `)

    }
}


//llamar datosd pizza persona
let datosPizzaPersonal =[]
const llamarPizzaPersonal = async() =>{
    const response = await fetch("/json/pizzas.json")
    const data = await response.json()
    console.log(data);
    for(let pizza of data){
        let nuevaPizzza = new PizzaPersonal(pizza.id, pizza.tipo, pizza.especias, pizza.queso, pizza.precio, pizza.imagen)
         datosPizzaPersonal.push(nuevaPizzza)
    }
    


}
llamarPizzaPersonal()



// constantes del carrito
const contenedorProductos = document.getElementById(`contenedor-productos`)

const contenedorCarrito = document.getElementById(`carrito-contenedor`)

const botonVaciar = document.getElementById(`vaciar-carrito`)

const contadorCarrito = document.getElementById(`contadorCarrito`)

const precioTotal = document.getElementById(`precioTotal`)

let porductoCarrito = document.getElementById(`productoEnCarrito`)
// agregar carrito
let carrito = []

// boton vaciar carrito completo
botonVaciar.addEventListener(`click`,() =>{
    carrito.length = 0
    actualizarCarrito()

   
        Swal.fire({
            position: 'top',
            title: 'Has eliminado correctamente todo del carrito ',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          })
        
    
    
})


// agregar al Storage
document.addEventListener(`DOMContentLoaded`, () => {
    if(localStorage.getItem(`carrito`)){
        carrito = JSON.parse(localStorage.getItem(`carrito`))
        actualizarCarrito()
    }
})


/// AGREGAR A CADA PIZZA EN UNA card
function mostrarTodasPizza() {
    let sectionProductos = document.getElementById(`seccionProductos`)
    sectionProductos.innerHTML = ""
    datosPizzaPersonal.forEach((pizzaPersonal) =>{
    let nuevoProducto = document.createElement(`div`)
    nuevoProducto.classList.add(`${pizzaPersonal.tipo}`)
    nuevoProducto.innerHTML = `<div id="${pizzaPersonal.id} " class="card mx-2 my-3" style="width: 18rem; heigth: 530px ">
                              <img src="img/${pizzaPersonal.imagen}" class="card-img-top" alt="..." style="height: 250px;">
                              <div class="card-body">
                                <h5 class="card-title text-center">${pizzaPersonal.tipo} personal </h5>
                                <p> ESPECIAS: ${pizzaPersonal.especias}</p>
                                <p> QUESO: ${pizzaPersonal.queso}</p>
                                <p> PRECIO: ${pizzaPersonal.precio}</p>
                                <a href="#" class="btn btn-primary" id="agregar${pizzaPersonal.id}">Agregar al carrito</a>
                              </div>
                            </div>`
    
    sectionProductos.appendChild(nuevoProducto)
    

    const boton = document.getElementById(`agregar${pizzaPersonal.id}`)
    boton.addEventListener(`click`, () =>{
        agregarAlCarrito(pizzaPersonal.id)
        product = document.getElementById(`cantidad`)
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Has agregado un nuevo producto ',
            text: `pizza ${pizzaPersonal.tipo} personal  ha sido agregada con exito`,
            showConfirmButton: false,
            timer: 1500
          })
    } )
    
    

 })
   // agregar al carrito
    const agregarAlCarrito = (proId) => {
        const existe = carrito.some(prod => prod.id === proId)
        if (existe) {
            const prod = carrito.map (prod =>{
                if (prod.id === proId) {
                prod.cantidad++
                
            }
            })
        
        }else {

           const item = datosPizzaPersonal.find((prod) => prod.id === proId)
            carrito.push(item)
            console.log(carrito);

        }
        actualizarCarrito()
    }
    
}


//eliminar del carrito
const eliminarDelCarrito = (prodId) =>{
    const item = carrito.find((prod)=> prod.id === prodId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    actualizarCarrito()
    
}



/// actualizar carrito
let actualizarCarrito = () =>{
    contenedorCarrito.innerHTML = ""
    carrito.forEach((prod) =>{
       const div1 = document.createElement (`div`)
       div1.className = (`productoEnCarrito`)
       div1.innerHTML =`<img src="img/${prod.imagen}" class="card-img-top" alt="..." style="height: 50px; width: 50px;">
                       <p>${prod.tipo} personal</p>
                       <p>Precio: ${prod.precio}</p
                       <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
                       <button onclick ="eliminarDelCarrito(${prod.id})" class="boton-eliminar border-0 text-danger "><i class="fas fa-trash-alt"></button>`

        contenedorCarrito.appendChild(div1)
        localStorage.setItem(`carrito`, JSON.stringify(carrito))
       
    })
    contadorCarrito.innerText = carrito.length
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.precio, 0)
    
}




//funcion encontrarPizza() mediante find() el cual tiene nombre especifico

function encontrarPizza(){
    /*const filtrarPizza = datosPizzaPersonal.find((pizza)=> pizza.id === pizzaId)
    const index  = datosPizzaPersonal.indexOf(filtrarPizza)
    datosPizzaPersonal.aplice(index, 1)*/
    datosPizzaPersonal.forEach(()=>{
        let buscarPizza = document.getElementsByClassName(`hawaiana`)
    let pizzaEncontrada = datosPizzaPersonal.find((pizza) => pizza.tipo.toLowerCase() == buscarPizza.toLowerCase())
    console.log(pizzaEncontrada)

    pizzaEncontrada == undefined ? alert("El nombre de la pizza que tratas de buscar no se encuentra en nuestro catalogo") : console.log(`encontramos tu pizza y es: ${pizzaTipo.tipo}`),console.log(pizzaEncontrada)  

    })
   
    
}






// filtrar por pizza
let mostarTodo = document.getElementById(`mostrarTodo`)
mostarTodo.addEventListener(`click`, mostrarTodasPizza)
let pizzaHawaiana = document.getElementById(`hawaiana`)
pizzaHawaiana.addEventListener(`click`, encontrarPizza )
/*let pizzaPeperono = document.getElementById(`peperoni`)
pizzaPeperono.addEventListener(`click`, mostrarPorPizza2)
let pizzaChampiñones = document.getElementById(`champiñones`)
pizzaChampiñones.addEventListener(`click`, mostrarPorPizza3)
let pizzaMexicana = document.getElementById(`mexicana`)
pizzaMexicana.addEventListener(`click`, mostrarPorPizza4)
let pizzaPollo = document.getElementById(`pollo`)
pizzaPollo.addEventListener(`click, `, mostrarPorPizza5)
let pizzaVegetariana = document.getElementById(`vegetariana`)
pizzaVegetariana.addEventListener(`click`, mostrarPorPizza6)
let pizzaMixta = document.getElementById(`mixta`)
pizzaMixta.addEventListener(`click`, mostrarPorPizza7)*/






// Guardar datosPizzaPersonal en el Storge

 localStorage.getItem("datosPizzaPersonal") ? datosPizzaPersonal = JSON.parse(localStorage.getItem("datosPizzaPersonal")) : console.log("entro por primera vez"),localStorage.setItem("datosPizzaPersonal", JSON.stringify(datosPizzaPersonal))





//funcion  agregarPizza desde el dom con imputs que estan en el html 
function guardarPizza(){
    let tipoInput = document.getElementById(`tipoInput`)
    let especiasInput = document.getElementById(`especiasInput`)
    let quesoInput = document.getElementById(`quesoInput`)
    let precioInput = document.getElementById(`precioInput`)
    pizzaCreada = new PizzaPersonal(datosPizzaPersonal.length+1, tipoInput.value, especiasInput.value, quesoInput.value, precioInput.value, "mixta.jpg")
    datosPizzaPersonal.push(pizzaCreada)
    actualizarCarrito()
    localStorage.setItem("datosPizzaPersonal", JSON.stringify(datosPizzaPersonal))
    console.log(pizzaCreada);
    
    
}


// guardar pizza
let btnGuardar = document.getElementById(`guardarPizza`)
btnGuardar.addEventListener(`click`, () =>{
    guardarPizza(datosPizzaPersonal)
    mostrarTodasPizza()
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
    
})





// funcion eliminar pizza
/*function eliminarPizza(){
    const nombrePizza = prompt("Cual es la pizza que quieres eliminar, dame el nombre")
    datosPizza.splice(nombrePizza, 1)
    alert(`Has eliminado ${nombrePizza}` )
    console.log(datosPizza.length)
    console.log(datosPizza)  
    
}*/