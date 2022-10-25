


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
let llamarPizzaPersonal = async() =>{
    const response = await fetch("json/pizzas.json")
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
   
    
}

// agregar al carrito
const agregarAlCarrito = (proId) => {
    const existe = carrito.some(prod => prod.id === proId)
    if (existe) {
        const prod = carrito.map (prod =>{
            if (prod.id === proId) {
            prod .cantidad++
            
        }
        })
    
    }else {

       const item = datosPizzaPersonal.find((prod) => prod.id === proId)
        carrito.push(item)
        console.log(carrito);

    }
    actualizarCarrito()
}


//eliminar del carrito
const eliminarDelCarrito = (prodId) =>{
    const item = carrito.find((prod)=> prod.id === prodId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    actualizarCarrito()
    console.log(carrito);

    
    
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
                       <p>Cantidad: <span id="cantidad">${prod.cantidad}</span> </p>
                       <button onclick ="eliminarDelCarrito(${prod.id})" class="boton-eliminar border-0 text-danger "><i class="fas fa-trash-alt"></button>`

        contenedorCarrito.appendChild(div1)
        localStorage.setItem(`carrito`, JSON.stringify(carrito))
       
    })
    contadorCarrito.innerText = carrito.length
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.precio, 0)
    
}


// filtrar por pizza

let mostarTodo = document.getElementById(`mostrarTodo`)
mostarTodo.addEventListener(`click`, mostrarTodasPizza)

let pizzaHawaiana = document.getElementById(`hawaiana`)
pizzaHawaiana.addEventListener(`click`, ()=>{
    let filtrar = "hawaiana"
    

    let encontrar = datosPizzaPersonal.filter(pizza => pizza.tipo == filtrar)
    console.log(encontrar);
    if(encontrar.length == 0){
        console.log("no encontramos su pizza");

    }else{
        let sectionProductos = document.getElementById(`seccionProductos`)
        sectionProductos.innerHTML= ""
        encontrar.forEach((pizzaPersonalHawaiana)=>{
         let nuevoProducto  =  document.createElement("div")
         nuevoProducto.innerHTML =  `<div id="${pizzaPersonalHawaiana.id} " class="card mx-2 my-3" style="width: 18rem; heigth: 530px ">
        <img src="img/${pizzaPersonalHawaiana.imagen}" class="card-img-top" alt="..." style="height: 250px;">
        <div class="card-body">
          <h5 class="card-title text-center">${pizzaPersonalHawaiana.tipo} personal </h5>
          <p> ESPECIAS: ${pizzaPersonalHawaiana.especias}</p>
          <p> QUESO: ${pizzaPersonalHawaiana.queso}</p>
          <p> PRECIO: ${pizzaPersonalHawaiana.precio}</p>
          <a href="#" class="btn btn-primary" id="agregar${pizzaPersonalHawaiana.id}">Agregar al carrito</a>
        </div>
      </div>`
        sectionProductos.append(nuevoProducto)
         const boton = document.getElementById(`agregar${pizzaPersonalHawaiana.id}`)
    boton.addEventListener(`click`, () =>{
        agregarAlCarrito(pizzaPersonalHawaiana.id)
        product = document.getElementById(`cantidad`)
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Has agregado un nuevo producto ',
            text: `pizza ${pizzaPersonalHawaiana.tipo} personal  ha sido agregada con exito`,
            showConfirmButton: false,
            timer: 1500
          })
    } )
       
        
        }) 
        

    }
})

let pizzaPeperoni = document.getElementById(`peperoni`)
pizzaPeperoni.addEventListener(`click`, ()=>{
    let filtrar = "peperoni"

    let encontrar = datosPizzaPersonal.filter(pizza => pizza.tipo == filtrar)
    console.log(encontrar);
    if(encontrar.length == 0){
        console.log("no encontramos su pizza");

    }else{
        let sectionProductos = document.getElementById(`seccionProductos`)
        sectionProductos.innerHTML= ""
        encontrar.forEach((pizzaPersonalPeperoni)=>{
         let nuevoProducto  =  document.createElement("div")
         nuevoProducto.innerHTML =  `<div id="${pizzaPersonalPeperoni.id} " class="card mx-2 my-3" style="width: 18rem; heigth: 530px ">
        <img src="img/${pizzaPersonalPeperoni.imagen}" class="card-img-top" alt="..." style="height: 250px;">
        <div class="card-body">
          <h5 class="card-title text-center">${pizzaPersonalPeperoni.tipo} personal </h5>
          <p> ESPECIAS: ${pizzaPersonalPeperoni.especias}</p>
          <p> QUESO: ${pizzaPersonalPeperoni.queso}</p>
          <p> PRECIO: ${pizzaPersonalPeperoni.precio}</p>
          <a href="#" class="btn btn-primary" id="agregar${pizzaPersonalPeperoni.id}">Agregar al carrito</a>
        </div>
      </div>`
        sectionProductos.append(nuevoProducto)
         const boton = document.getElementById(`agregar${pizzaPersonalPeperoni.id}`)
    boton.addEventListener(`click`, () =>{
        agregarAlCarrito(pizzaPersonalPeperoni.id)
        product = document.getElementById(`cantidad`)
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Has agregado un nuevo producto ',
            text: `pizza ${pizzaPersonalPeperoni.tipo} personal  ha sido agregada con exito`,
            showConfirmButton: false,
            timer: 1500
          })
    } )
       
        
        }) 
        

    }
})

let pizzaChampiñones = document.getElementById(`champiñones`)
pizzaChampiñones.addEventListener(`click`, ()=>{
    let filtrar = "champiñones"

    let encontrar = datosPizzaPersonal.filter(pizza => pizza.tipo == filtrar)
    console.log(encontrar);
    if(encontrar.length == 0){
        console.log("no encontramos su pizza");

    }else{
        let sectionProductos = document.getElementById(`seccionProductos`)
        sectionProductos.innerHTML= ""
        encontrar.forEach((pizzaPersonalChampiñones)=>{
         let nuevoProducto  =  document.createElement("div")
         nuevoProducto.innerHTML =  `<div id="${pizzaPersonalChampiñones.id} " class="card mx-2 my-3" style="width: 18rem; heigth: 530px ">
        <img src="img/${pizzaPersonalChampiñones.imagen}" class="card-img-top" alt="..." style="height: 250px;">
        <div class="card-body">
          <h5 class="card-title text-center">${pizzaPersonalChampiñones.tipo} personal </h5>
          <p> ESPECIAS: ${pizzaPersonalChampiñones.especias}</p>
          <p> QUESO: ${pizzaPersonalChampiñones.queso}</p>
          <p> PRECIO: ${pizzaPersonalChampiñones.precio}</p>
          <a href="#" class="btn btn-primary" id="agregar${pizzaPersonalChampiñones.id}">Agregar al carrito</a>
        </div>
      </div>`
        sectionProductos.append(nuevoProducto)
         const boton = document.getElementById(`agregar${pizzaPersonalChampiñones.id}`)
    boton.addEventListener(`click`, () =>{
        agregarAlCarrito(pizzaPersonalChampiñones.id)
        product = document.getElementById(`cantidad`)
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Has agregado un nuevo producto ',
            text: `pizza ${pizzaPersonalChampiñones.tipo} personal  ha sido agregada con exito`,
            showConfirmButton: false,
            timer: 1500
          })
    } )
       
        
        }) 
        

    }
})

let pizzaMexicana = document.getElementById(`mexicana`)
pizzaMexicana.addEventListener(`click`,()=>{
    let filtrar = "mexicana"

    let encontrar = datosPizzaPersonal.filter(pizza => pizza.tipo == filtrar)
    console.log(encontrar);
    if(encontrar.length == 0){
        console.log("no encontramos su pizza");

    }else{
        let sectionProductos = document.getElementById(`seccionProductos`)
        sectionProductos.innerHTML= ""
        encontrar.forEach((pizzaPersonalMexicana)=>{
         let nuevoProducto  =  document.createElement("div")
         nuevoProducto.innerHTML =  `<div id="${pizzaPersonalMexicana.id} " class="card mx-2 my-3" style="width: 18rem; heigth: 530px ">
        <img src="img/${pizzaPersonalMexicana.imagen}" class="card-img-top" alt="..." style="height: 250px;">
        <div class="card-body">
          <h5 class="card-title text-center">${pizzaPersonalMexicana.tipo} personal </h5>
          <p> ESPECIAS: ${pizzaPersonalMexicana.especias}</p>
          <p> QUESO: ${pizzaPersonalMexicana.queso}</p>
          <p> PRECIO: ${pizzaPersonalMexicana.precio}</p>
          <a href="#" class="btn btn-primary" id="agregar${pizzaPersonalMexicana.id}">Agregar al carrito</a>
        </div>
      </div>`
        sectionProductos.append(nuevoProducto)
         const boton = document.getElementById(`agregar${pizzaPersonalMexicana.id}`)
    boton.addEventListener(`click`, () =>{
        agregarAlCarrito(pizzaPersonalMexicana.id)
        product = document.getElementById(`cantidad`)
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Has agregado un nuevo producto ',
            text: `pizza ${pizzaPersonalMexicana.tipo} personal  ha sido agregada con exito`,
            showConfirmButton: false,
            timer: 1500
          })
    } )
       
        
        }) 
        

    }
})


let pizzaVegetariana = document.getElementById(`vegetariana`)
pizzaVegetariana.addEventListener(`click`, ()=>{
    let filtrar = "vegetariana"

    let encontrar = datosPizzaPersonal.filter(pizza => pizza.tipo == filtrar)
    console.log(encontrar);
    if(encontrar.length == 0){
        console.log("no encontramos su pizza");

    }else{
        let sectionProductos = document.getElementById(`seccionProductos`)
        sectionProductos.innerHTML= ""
        encontrar.forEach((pizzaPersonalVegetariana)=>{
         let nuevoProducto  =  document.createElement("div")
         nuevoProducto.innerHTML =  `<div id="${pizzaPersonalVegetariana.id} " class="card mx-2 my-3" style="width: 18rem; heigth: 530px ">
        <img src="img/${pizzaPersonalVegetariana.imagen}" class="card-img-top" alt="..." style="height: 250px;">
        <div class="card-body">
          <h5 class="card-title text-center">${pizzaPersonalVegetariana.tipo} personal </h5>
          <p> ESPECIAS: ${pizzaPersonalVegetariana.especias}</p>
          <p> QUESO: ${pizzaPersonalVegetariana.queso}</p>
          <p> PRECIO: ${pizzaPersonalVegetariana.precio}</p>
          <a href="#" class="btn btn-primary" id="agregar${pizzaPersonalVegetariana.id}">Agregar al carrito</a>
        </div>
      </div>`
        sectionProductos.append(nuevoProducto)
         const boton = document.getElementById(`agregar${pizzaPersonalVegetariana.id}`)
    boton.addEventListener(`click`, () =>{
        agregarAlCarrito(pizzaPersonalVegetariana.id)
        product = document.getElementById(`cantidad`)
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Has agregado un nuevo producto ',
            text: `pizza ${pizzaPersonalVegetariana.tipo} personal  ha sido agregada con exito`,
            showConfirmButton: false,
            timer: 1500
          })
    } )
       
        
        }) 
        

    }
})

let pizzaMixta = document.getElementById(`mixta`)
pizzaMixta.addEventListener(`click`, ()=>{
    let filtrar = "mixta"

    let encontrar = datosPizzaPersonal.filter(pizza => pizza.tipo == filtrar)
    console.log(encontrar);
    if(encontrar.length == 0){
        console.log("no encontramos su pizza");

    }else{
        let sectionProductos = document.getElementById(`seccionProductos`)
        sectionProductos.innerHTML= ""
        encontrar.forEach((pizzaPersonalMixta)=>{
         let nuevoProducto  =  document.createElement("div")
         nuevoProducto.innerHTML =  `<div id="${pizzaPersonalMixta.id} " class="card mx-2 my-3" style="width: 18rem; heigth: 530px ">
        <img src="img/${pizzaPersonalMixta.imagen}" class="card-img-top" alt="..." style="height: 250px;">
        <div class="card-body">
          <h5 class="card-title text-center">${pizzaPersonalMixta.tipo} personal </h5>
          <p> ESPECIAS: ${pizzaPersonalMixta.especias}</p>
          <p> QUESO: ${pizzaPersonalMixta.queso}</p>
          <p> PRECIO: ${pizzaPersonalMixta.precio}</p>
          <a href="#" class="btn btn-primary" id="agregar${pizzaPersonalMixta.id}">Agregar al carrito</a>
        </div>
      </div>`
        sectionProductos.append(nuevoProducto)
         const boton = document.getElementById(`agregar${pizzaPersonalMixta.id}`)
    boton.addEventListener(`click`, () =>{
        agregarAlCarrito(pizzaPersonalMixta.id)
        product = document.getElementById(`cantidad`)
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Has agregado un nuevo producto ',
            text: `pizza ${pizzaPersonalMixta.tipo} personal  ha sido agregada con exito`,
            showConfirmButton: false,
            timer: 1500
          })
    } )
       
        
        }) 
        

    }
})






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


