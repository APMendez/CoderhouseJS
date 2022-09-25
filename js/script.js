function bienvenida() {
    let nombre = prompt("Ingresá tu nombre para comenzar");
    if (nombre != ""){
        console.log("¡Bienvenido/a " + nombre + "!");
    } else{
        alert("Por favor ingresá tu nombre")
        bienvenida();
    }
}

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

function verOrden(){
    alert ("detalle de tu pedido:\n" + pedido);
    inicio();
}

function pagar(){
    alert("Deberás pagar $5000 por tu pedido");
    inicio();
}

function finalizar(){
    alert("¡Gracias por elegirnos!");
}

bienvenida();
let pedido=[];
inicio();

