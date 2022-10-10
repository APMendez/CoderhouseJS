window.onload = () => {
    //Funcion para saludar al usuario
    function bienvenida() {
        let nombre = prompt("Ingresá tu nombre para comenzar");
        if (nombre != "") {
            alert("¡Bienvenido/a " + nombre + "!");
        } else {
            alert("Por favor ingresá tu nombre")
            bienvenida();
        }
    }

    //Funcion del menu principal
    function inicio() {
        for (let i = 5; i > 0; i--) {
            let opcion = prompt("Elegí una opción (Tenés " + i + "intentos): \n1- Ordenar \n2 - Ver mi orden \n3 - Pagar \n4 - Agregar Opcion al Menú\n5- Eliminar del Menú\n6- Ver Menú\n7- Finalizar");
            if (opcion >= 1 && opcion <= 7) {
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
                        agregarAlMenu();
                        break;
                    case "5":
                        eliminarPedido();
                        break;
                    case "6":
                        verMenu();
                        break;
                    case "7":
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
    function ordenar() {
        let continuar = ""
        do {
            let busqueda = prompt("Ingrese lo que quiere ordenar para buscar coincidencias:");
            const coincidencias = menu.filter((el) => el.nombre.includes(busqueda));
            for (let coincidencia of coincidencias) {
                console.log(menu.indexOf(coincidencia) + "- " + coincidencia.nombre + ". Precio: $" + coincidencia.precio);
            };
            let eleccion = parseInt(prompt("Ingrese el numero del plato que desea elegir:"));
            let cantidad = parseInt(prompt("Ingrese cantidad a ordenar:"));
            if (!isNaN(eleccion)) {
                pedido.push({
                    plato: menu[eleccion].nombre,
                    cantidad: cantidad,
                    precio: menu[eleccion].precio
                });
            };
            continuar = prompt("Para terminar con la orden ingrese x. De lo contrario presione aceptar.");
        } while (continuar != "x");
        inicio();
    }

    //Funcion para eliminar opciones del pedido
    function eliminarPedido() {
        console.log("Su pedido es: ");
        for (let pedidos of pedido) {
            console.log("N° " + pedido.indexOf(pedidos) + " --- " + pedidos.cantidad + " " + pedidos.plato);
        };
        let ordenAEliminar = prompt("Ingrese el numero del pedido a eliminar de su orden:");
        pedido.splice(ordenAEliminar, 1);
        console.log("Pedido Eliminado");
        inicio();
    }


    //Funcion para ver el pedido realizado
    function verOrden() {
        console.log("Su pedido es: ");
        for (let pedidos of pedido) {
            console.log(pedidos.cantidad + " " + pedidos.plato);
        };
        inicio();
    }

    //Funcion para pagar el pedido
    function pagar() {
        let total = 0
        for (let pedidos of pedido) {
            total = total + pedidos.precio;
        };
        console.log("El total a pagar por su pedido es: $" + total + ". Pro favor acerquese a la caja, aceptamos todos los medios de pago. Gracias!");
    }

    //Funcion de finalizacion del proceso
    function finalizar() {
        alert("¡Gracias por elegirnos!");
    }

    //Funcion para crear opciones del menu
    function platoNuevo(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }

    //Funcion para agregar opciones al menu
    function agregarAlMenu() {
        let nombrePlato = prompt("Ingresa el nombre del nuevo plato. Para volver al menu principal ingresa X");
        while (nombrePlato != "x") {
            const nuevoPlato = new platoNuevo(nombrePlato, prompt("Ingresá el precio del nuevo plato"));
            menu.push(nuevoPlato);
            nombrePlato = prompt("Ingresa el nombre del nuevo plato. Para volver al menu principal ingresa X");
        }
        verMenu();
    }


    //Funcion para ver el menú

    function verMenu() {
        for (plato of menu) {
            console.log(plato.nombre + " ---> su precio: $" + plato.precio);
        };
        inicio();
    }


    //Ejecucion del programa

    bienvenida();
    let pedido = [];
    let menu = [{
        nombre: "carne al horno",
        precio: 1500
    }, {
        nombre: "papas",
        precio: 500
    }, {
        nombre: "ravioles con tuco",
        precio: 1400
    }, {
        nombre: "pizza napolitana",
        precio: 1500
    }, {
        nombre: "arroz con pollo",
        precio: 900
    }, {
        nombre: "lasagna con salsa mixta",
        precio: 1300
    }, {
        nombre: "sopa de calabaza",
        precio: 800
    }, {
        nombre: "carne ahumada",
        precio: 900
    }, {
        nombre: "papas a la huancaina",
        precio: 1000
    }];
    inicio();
}