//DECLARACION DE VARIABLES Y CONSTANTES

const menu = []
var pedido = []
const contenedorMenuCarnes = document.getElementById("contenedorMenuCarnes")
const contenedorMenuPastas = document.getElementById("contenedorMenuPastas")
const contenedorMenuPizzas = document.getElementById("contenedorMenuPizzas")
const contenedorMenuHamburguesas = document.getElementById("contenedorMenuHamburguesas")
const contenedorMenuEnsaladas = document.getElementById("contenedorMenuEnsaladas")
const contenedorMenuBebidas = document.getElementById("contenedorMenuBebidas")
const contenedorMenuPostres = document.getElementById("contenedorMenuPostres")
const divConfirmarPedido = document.getElementById("confirmarPedido")
const btnOrdenar = document.getElementById("ordenar")
const sumaTotal = document.getElementById("sumaTotal")
const sumaSinConfirmar = document.getElementById("sumaSinConfirmar")
const pagar = document.getElementById("pagar")
const listaVerPedido = document.getElementById("listaVerPedido")
const botonVerPedido = document.getElementById("botonVerPedido")
const dropdownPedido = document.getElementById("dropdownPedido")
const navbar = document.getElementById("navbar")
const confirmo = document.getElementById("confirmo")
const cancelo = document.getElementById("cancelo")
//DECLARACION DE FUNCIONES

function agregarAlPedido(opcionId) {
    if (pedido.length==0){
        const pedir = menu.find((plato)=>plato.id===opcionId)
        pedido.push(pedir)
        console.log(pedido)
        divConfirmarPedido.style.display="flex"
        sumaSinConfirmar.innerText= `${sumarPedidoSinConfirmar()}`
        confirmo.addEventListener("click", ()=>{
            confirmarPedido()
        })
        cancelo.addEventListener("click", ()=>{
            cancelarPedido()
        })
    }else{
        const pedir = menu.find((plato)=>plato.id===opcionId)
        pedido.push(pedir)
        console.log(pedido)
        sumaSinConfirmar.innerText= `${sumarPedidoSinConfirmar()}`
    }
        
    
    
}
function sumarPedidoSinConfirmar(){
    let sumaPrevia=0
    for (let pedidos of pedido){
        sumaPrevia+=pedidos.precio
    }
    return sumaPrevia
}
function sumarPedido(primerPedido){
    if(primerPedido!=null){
        var suma=0
        for (let pedidos of primerPedido){
            suma+=pedidos.precio
        }
        
        return suma
    }else{
        var suma=0
        if (JSON.parse(localStorage.getItem("pedidoLS"))){
            let localSt=JSON.parse(localStorage.getItem("pedidoLS"))
            for (let pedidos of localSt){
                suma+=pedidos.precio
            }
            
            return suma
        }
        
    }
    
    
}
function confirmarPedido(){
    if (JSON.parse(localStorage.getItem("pedidoLS"))){
        let pedidoGeneral=[...JSON.parse(localStorage.getItem("pedidoLS"))]
        pedidoGeneral.push(...pedido)
        localStorage.setItem("pedidoLS", JSON.stringify(pedidoGeneral))
        sumarPedido(pedidoGeneral)
        divConfirmarPedido.style.display="none"
        pedido.length=0
        console.log("pedido confirmado")
        console.log(pedido);
    }else{
        const primerPedidoGeneral = localStorage.setItem("pedidoLS", JSON.stringify(pedido))
        sumarPedido(primerPedidoGeneral)
        navbar.style.display = "block"
        divConfirmarPedido.style.display="none"
        pedido.length=0
        console.log("pedido confirmado")
        console.log(pedido);        
    }    
}

function cancelarPedido(){
    pedido.length=0
    divConfirmarPedido.style.display="none"
    console.log(pedido);
    console.log("pedido cancelado");
    Toastify({
        text: "Tu pedido ha sido cancelado",
        duration: 1500,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
        background: "linear-gradient (to right, #b00000, #e78a8a)",
        },
        onClick: function(){} // Callback after click
    }).showToast();
    
}
//FUNCIONES DE PAGO

function pago(){
    sumarPedido()
    swal("¡Gracias por confiar en nosotros!", `Acercate a la caja. Pagarás $ ${sumarPedido()}` , "success");
    window.localStorage.clear()
    pedido.length=0
    verPedido()
    navbar.style.display="none"
    divConfirmarPedido.style.display="none"
}
function pagoVacio(){
    swal("Todavia no hiciste ningún pedido", "Para pagar debés realizar un pedido primero" , "error")
}

//FUNCION PARA VER PEDIDO
function verPedido(){
    if(JSON.parse(localStorage.getItem("pedidoLS"))){
        listaVerPedido.innerHTML= `
        `
        const pedidoLS = [...JSON.parse(localStorage.getItem("pedidoLS"))]
        pedidoLS.forEach(
            (ls)=>{
                const liPedido = document.createElement("li")
            liPedido.setAttribute("class", "dropdown-item")
            liPedido.innerHTML=`
            <p>
            - ${ls.nombre} - $${ls.precio}
            </p>
            
            `
            listaVerPedido.appendChild(liPedido)
            }
        )
        const totalVerPedido = document.createElement("li")
        totalVerPedido.setAttribute("class", "dropdown-item")
        totalVerPedido.innerText=`
        El total de tu orden es $${sumarPedido()}
        `
        listaVerPedido.appendChild(totalVerPedido)
        
    }else{
        navbar.style.display="none"
    }
    
}

//FUNCIONES PARA GENERAR LOS MENU EN EL DOM

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

    contenedorMenuPastas.innerHTML = `<h3>Pastas</h3>`
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

    contenedorMenuPizzas.innerHTML = `<h3>Pizzas</h3>`
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

    contenedorMenuHamburguesas.innerHTML = `<h3>Hamburguesas</h3>`
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

    contenedorMenuEnsaladas.innerHTML = `<h3>Ensaladas</h3>`
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

    contenedorMenuBebidas.innerHTML = `<h3>Bebidas</h3>`
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

    contenedorMenuPostres.innerHTML = `<h3>Postres</h3>`
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


//EJECUCION DEL PROGRAMA
divConfirmarPedido.style.display="none"
pagar.addEventListener("click", () => {
    (JSON.parse(localStorage.getItem("pedidoLS"))) ? pago() : pagoVacio()
})

if(JSON.parse(localStorage.getItem("pedidoLS"))){
    navbar.style.display="flex"
    
}else{
    navbar.style.display="none"
    
}

botonVerPedido.addEventListener("click", ()=>{
    verPedido()
}

)
menuCarnes()
menuPastas()
menuPizzas()
menuHamburguesas()
menuEnsaladas()
menuBebidas()
menuPostres()
sumarPedido()















