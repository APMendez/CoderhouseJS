const menu = []
let pedido = []
const pedidoLS=JSON.parse(localStorage.getItem("pedidoLS"))
const contenedorMenuCarnes = document.getElementById("contenedorMenuCarnes")
const contenedorMenuPastas = document.getElementById("contenedorMenuPastas")
const contenedorMenuPizzas = document.getElementById("contenedorMenuPizzas")
const contenedorMenuHamburguesas = document.getElementById("contenedorMenuHamburguesas")
const contenedorMenuEnsaladas = document.getElementById("contenedorMenuEnsaladas")
const contenedorMenuBebidas = document.getElementById("contenedorMenuBebidas")
const contenedorMenuPostres = document.getElementById("contenedorMenuPostres")

const btnOrdenar = document.getElementById("ordenar")
const sumaTotal = document.getElementById("sumaTotal")
const pagar = document.getElementById("pagar")

function agregarAlPedido(opcionId) {
    
    const pedir = menu.find((plato)=>plato.id===opcionId)
    pedido.push(pedir)
    console.log(pedido)
    localStorage.setItem("pedidoLS", JSON.stringify(pedido))
    sumarPedido()
}
function sumarPedido(){
    let suma=0
    for (let pedidos of pedido){
        suma+=pedidos.precio
    }
    sumaTotal.innerText=suma
    return suma
}

function pago(){
    swal("¡Gracias por confiar en nosotros!", `Acercate a la caja. Pagarás $ ${sumarPedido()}` , "success");
    localStorage.removeItem("pedidoLS")
    sumaTotal.innerText=0
    pedido=[]
}
function pagoVacio(){
    swal("Todavia no hiciste ningún pedido", "Para pagar debés realizar un pedido primero" , "error")
}

const menuCarnes = async () => {
    const resp = await fetch('../data/menuCarnes.json')
    const data = await resp.json()

    contenedorMenuCarnes.innerHTML = `<h3>Carnes</h3>`
    data.forEach((opcion) => {
        menu.push(opcion)
        const div = document.createElement("div");
        div.setAttribute("class", "divMenu")
        div.innerHTML = `
            <div class="card" style="width: 90vw; max-width: 200px;">
                <div class="card-body">
                    <h5 class="card-title">${opcion.nombre}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">$ ${opcion.precio}</h6>
                    <button id="btnAgregar${opcion.id}" class="boton">Agregar a mi pedido</button>
                </div>
            </div>
            `
        contenedorMenuCarnes.appendChild(div)
        const botonCarnes = document.getElementById(`btnAgregar${opcion.id}`)
        botonCarnes.addEventListener("click", () => {
            agregarAlPedido(opcion.id)
            Toastify({
                text: `¡Agregaste ${opcion.nombre} a tu pedido!`,
                duration: 2000,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
                onClick: function(){} // Callback after click
            }).showToast();
        })
    })
}

const menuPastas = async () => {
    const resp = await fetch('../data/menuPastas.json')
    const data = await resp.json()

    contenedorMenuPastas.innerHTML = `<h3>Pastas:</h3>`
    data.forEach((opcion) => {
        menu.push(opcion)
        const div = document.createElement("div");
        div.setAttribute("class", "divMenu")
        div.innerHTML = `
        <div class="card" style="width: 90vw; max-width: 200px;">
            <div class="card-body">
                <h5 class="card-title">${opcion.nombre}</h5>
                <h6 class="card-subtitle mb-2 text-muted">$ ${opcion.precio}</h6>
                <button id="btnAgregar${opcion.id}" class="boton">Agregar a mi pedido</button>
            </div>
        </div>
        `
        contenedorMenuPastas.appendChild(div)
        const botonPastas = document.getElementById(`btnAgregar${opcion.id}`)
        botonPastas.addEventListener("click", () => {
            agregarAlPedido(opcion.id)
            Toastify({
                text: `¡Agregaste ${opcion.nombre} a tu pedido!`,
                duration: 2000,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
                onClick: function(){} // Callback after click
            }).showToast();
        })
    })
}
const menuPizzas = async () => {
    const resp = await fetch('../data/menuPizzas.json')
    const data = await resp.json()

    contenedorMenuPizzas.innerHTML = `<h3>Pizzas:</h3>`
    data.forEach((opcion) => {
        menu.push(opcion)
        const div = document.createElement("div");
        div.setAttribute("class", "divMenu")
        div.innerHTML =`
        <div class="card" style="width: 90vw; max-width: 200px;">
            <div class="card-body">
                <h5 class="card-title">${opcion.nombre}</h5>
                <h6 class="card-subtitle mb-2 text-muted">$ ${opcion.precio}</h6>
                <button id="btnAgregar${opcion.id}" class="boton">Agregar a mi pedido</button>
            </div>
        </div>
        `
        contenedorMenuPizzas.appendChild(div)
        const botonPizzas = document.getElementById(`btnAgregar${opcion.id}`)
        botonPizzas.addEventListener("click", () => {
            agregarAlPedido(opcion.id)
            Toastify({
                text: `¡Agregaste ${opcion.nombre} a tu pedido!`,
                duration: 2000,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
                onClick: function(){} // Callback after click
            }).showToast();
        })
    })
}
const menuHamburguesas = async () => {
    const resp = await fetch('../data/menuHamburguesas.json')
    const data = await resp.json()

    contenedorMenuHamburguesas.innerHTML = `<h3>Hamburguesas:</h3>`
    data.forEach((opcion) => {
        menu.push(opcion)
        const div = document.createElement("div");
        div.setAttribute("class", "divMenu")
        div.innerHTML = `
        <div class="card" style="width: 90vw; max-width: 200px;">
            <div class="card-body">
                <h5 class="card-title">${opcion.nombre}</h5>
                <h6 class="card-subtitle mb-2 text-muted">$ ${opcion.precio}</h6>
                <button id="btnAgregar${opcion.id}" class="boton">Agregar a mi pedido</button>
            </div>
        </div>
        `
        contenedorMenuHamburguesas.appendChild(div)
        const botonHamburguesas = document.getElementById(`btnAgregar${opcion.id}`)
        botonHamburguesas.addEventListener("click", () => {
            agregarAlPedido(opcion.id)
            Toastify({
                text: `¡Agregaste ${opcion.nombre} a tu pedido!`,
                duration: 2000,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
                onClick: function(){} // Callback after click
            }).showToast();
        })
    })
}
const menuEnsaladas = async () => {
    const resp = await fetch('../data/menuEnsaladas.json')
    const data = await resp.json()

    contenedorMenuEnsaladas.innerHTML = `<h3>Ensaladas:</h3>`
    data.forEach((opcion) => {
        menu.push(opcion)
        const div = document.createElement("div");
        div.setAttribute("class", "divMenu")
        div.innerHTML =`
        <div class="card" style="width: 90vw; max-width: 200px;">
            <div class="card-body">
                <h5 class="card-title">${opcion.nombre}</h5>
                <h6 class="card-subtitle mb-2 text-muted">$ ${opcion.precio}</h6>
                <button id="btnAgregar${opcion.id}" class="boton">Agregar a mi pedido</button>
            </div>
        </div>
        `
        contenedorMenuEnsaladas.appendChild(div)
        const botonEnsaladas = document.getElementById(`btnAgregar${opcion.id}`)
        botonEnsaladas.addEventListener("click", () => {
            agregarAlPedido(opcion.id)
            Toastify({
                text: `¡Agregaste ${opcion.nombre} a tu pedido!`,
                duration: 2000,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
                onClick: function(){} // Callback after click
            }).showToast();
        })
    })
}
const menuBebidas = async () => {
    const resp = await fetch('../data/menuBebidas.json')
    const data = await resp.json()

    contenedorMenuBebidas.innerHTML = `<h3>Bebidas:</h3>`
    data.forEach((opcion) => {
        menu.push(opcion)
        const div = document.createElement("div");
        div.setAttribute("class", "divMenu")
        div.innerHTML = `
        <div class="card" style="width: 90vw; max-width: 200px;">
            <div class="card-body">
                <h5 class="card-title">${opcion.nombre}</h5>
                <h6 class="card-subtitle mb-2 text-muted">$ ${opcion.precio}</h6>
                <button id="btnAgregar${opcion.id}" class="boton">Agregar a mi pedido</button>
            </div>
        </div>
        `
        contenedorMenuBebidas.appendChild(div)
        const botonBebidas = document.getElementById(`btnAgregar${opcion.id}`)
        botonBebidas.addEventListener("click", () => {
            agregarAlPedido(opcion.id)
            Toastify({
                text: `¡Agregaste ${opcion.nombre} a tu pedido!`,
                duration: 2000,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
                onClick: function(){} // Callback after click
            }).showToast();
        })
    })
}
const menuPostres = async () => {
    const resp = await fetch('../data/menuPostres.json')
    const data = await resp.json()

    contenedorMenuPostres.innerHTML = `<h3>Postres:</h3>`
    data.forEach((opcion) => {
        menu.push(opcion)
        const div = document.createElement("div");
        div.setAttribute("class", "divMenu")
        div.innerHTML = `
        <div class="card" style="width: 90vw; max-width: 200px;">
            <div class="card-body">
                <h5 class="card-title">${opcion.nombre}</h5>
                <h6 class="card-subtitle mb-2 text-muted">$ ${opcion.precio}</h6>
                <button id="btnAgregar${opcion.id}" class="boton">Agregar a mi pedido</button>
            </div>
        </div>
        `
        contenedorMenuPostres.appendChild(div)
        const botonPostres = document.getElementById(`btnAgregar${opcion.id}`)
        botonPostres.addEventListener("click", () => {
            agregarAlPedido(opcion.id)
            Toastify({
                text: `¡Agregaste ${opcion.nombre} a tu pedido!`,
                duration: 2000,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
                onClick: function(){} // Callback after click
            }).showToast();
        })
    })
}



//Ejecucion del programa
menuCarnes()
menuPastas()
menuPizzas()
menuHamburguesas()
menuEnsaladas()
menuBebidas()
menuPostres()
console.log(menu);
pedidoLS ? (pedido=pedidoLS, sumaTotal.innerText=sumarPedido()) : sumaTotal.innerText=0
pagar.addEventListener("click", () => {
    pedidoLS ? pago() : pagoVacio()
})












