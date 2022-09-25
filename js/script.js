//Funcion para saludar al usuario
function bienvenida() {
    let nombre = prompt("Ingresá tu nombre para comenzar");
    if (nombre != ""){
        console.log("¡Bienvenido/a " + nombre + "!");
    } else{
        alert("Por favor ingresá tu nombre")
        bienvenida();
    }
}

//Funcion del menu principal
function inicio() {
    for (let i = 5; i>0; i--) {
        let opcion = prompt("Elegí una opción (Tenés " + i + "intentos): \n1- Ordenar \n2 - Ver mi orden \n3 - Pagar \n4- Finalizar");
        if (opcion >= 1 && opcion <= 4) {
            switch (opcion) {
                case "1":
                    ordenar();
                    break;
                case "2":
                    verOrden();
                    break;
                case "3":
                    pagar();
                    break;
                case "4":
                    finalizar();
                    break;
            }
            break;
        
        } else {
            alert("La opción ingresada no es válida")
        }
    }

}
//Funcion para hacer un pedido
function ordenar(){
    let comida = ""
    while (comida != "x"){
        comida = prompt("Ingresá lo que querés ordenar. Para finalizar ingresá X").toLowerCase();
        if (comida != "x"){
            pedido.push(comida);
        } else{
            break;
        }
    }
    alert ("Tu orden es:\n" + pedido);
    inicio();
    
}

//Funcion para ver el pedido realizado
function verOrden(){
    alert ("detalle de tu pedido:\n" + pedido);
    inicio();
}

//Funcion para pagar el pedido
function pagar(){
    alert("Deberás pagar $5000 por tu pedido");
    inicio();
}

//Funcion de finalizacion del proceso
function finalizar(){
    alert("¡Gracias por elegirnos!");
}


//Ejecucion del programa

bienvenida();
let pedido=[];
inicio();

