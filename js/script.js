let pedido = [];
const contenedorMenu = document.getElementById("contenedorMenu");
const btnOrdenar = document.getElementById("ordenar")

function agregarAlPedido() {
    console.log("agregado");
    // const pedir = menu.find((plato)=>plato.id===opcion.id)
    // pedido.push(pedir)
    // console.log(pedido)
}



//Ejecucion del programa
menu.forEach((opcion) => {
    const div = document.createElement("div");
    div.setAttribute("id", "divMenu")
    div.innerHTML = `
        <p>${opcion.nombre}</p>
        <p>$ ${opcion.precio}</p>
        <button id="btnAgregar${opcion.id}">Agregar a mi pedido</button>`
    contenedorMenu.appendChild(div)
    const boton = document.getElementById("btnAgregar${opcion.id}")
    boton.addEventListener("click", () => {
        agregarAlPedido()
    })
})