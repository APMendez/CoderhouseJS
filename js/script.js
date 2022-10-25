let pedido = [];
const contenedorMenu = document.getElementById("contenedorMenu")
const btnOrdenar = document.getElementById("ordenar")
const sumaTotal = document.getElementById("sumaTotal")

function agregarAlPedido(opcionId) {
    
    const pedir = menu.find((plato)=>plato.id===opcionId)
    pedido.push(pedir)
    console.log(pedido)
    sumarPedido()
}
function sumarPedido(){
    let suma=0
    for (let pedidos of pedido){
        suma+=pedidos.precio
    }
    sumaTotal.innerText=suma
}



//Ejecucion del programa
sumaTotal.innerText=0
menu.forEach((opcion) => {
    const div = document.createElement("div");
    div.setAttribute("class", "divMenu")
    div.innerHTML = `
        <p>${opcion.nombre}</p>
        <p>$ ${opcion.precio}</p>
        <button id="btnAgregar${opcion.id}">Agregar a mi pedido</button>`
    contenedorMenu.appendChild(div)
    const boton = document.getElementById(`btnAgregar${opcion.id}`)
    boton.addEventListener("click", () => {
        agregarAlPedido(opcion.id)
    })
})


