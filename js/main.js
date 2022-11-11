let agregarFacturador = document.getElementsByClassName("item__button");

/* const productos = [
    { id: "item01", titulo: "Hell He Lie", precio: 3.80, conteo: 0 },
    { id: "item02", titulo: "Lorem Ipsum", precio: 2.30, conteo: 0 },
    { id: "item03", titulo: "Norma", precio: 1.50, conteo: 0 },
    { id: "item04", titulo: "Los NO santos", precio: 2.50, conteo: 0 },
    { id: "item05", titulo: "Hachede", precio: 3.00, conteo: 0 },    
]; */

async function servicio() {
    const response = await fetch("./js/data.json")

    const datos = await response.json()


console.log(datos)

    for(let i = 0; i < agregarFacturador.length; i++) {
        agregarFacturador[i].addEventListener("click", () => {
            conteoFactuadorNav(datos[i]);
            costo(datos[i]);
        });
    }

}

function productosCargados() {
    let cantidadProductos = localStorage.getItem("conteoFacturador");
    if( cantidadProductos ) {
        document.querySelector(".numberItemsFacturador").textContent = cantidadProductos;
    }
}

function conteoFactuadorNav(producto, ejecutar) {
    let cantidadProductos = localStorage.getItem("conteoFacturador");
    cantidadProductos = parseInt(cantidadProductos);

    let items = localStorage.getItem("agregadosFaturador");
    items = JSON.parse(items);

    if( ejecutar ) {
        localStorage.setItem("conteoFacturador", cantidadProductos - 1);
        document.querySelector(".numberItemsFacturador").textContent = cantidadProductos - 1;
    } else if(cantidadProductos) {
        localStorage.setItem("conteoFacturador", cantidadProductos + 1);
        document.querySelector(".numberItemsFacturador").textContent = cantidadProductos + 1;
    } else {
        localStorage.setItem("conteoFacturador", 1);
        document.querySelector(".numberItemsFacturador").textContent = 1;
    }
    conteoFacturador(producto);
}

function conteoFacturador(producto) {

    let agregadosFaturador = localStorage.getItem("productosFacturador");
    agregadosFaturador = JSON.parse(agregadosFaturador);

    if(agregadosFaturador != null) {
        let productosActuales = producto.titulo;
    
        if( agregadosFaturador[productosActuales] == undefined ) {
            agregadosFaturador = {
                ...agregadosFaturador,
                [productosActuales]: producto
            }
        } 
        agregadosFaturador[productosActuales].conteo += 1;

    } else {
        producto.conteo = 1;
        agregadosFaturador = { 
            [producto.titulo]: producto
        };
    }

    localStorage.setItem("productosFacturador", JSON.stringify(agregadosFaturador));
}

function costo(producto, ejecutar) {
    let facturaCosto = localStorage.getItem("costo");

    if(ejecutar) {
        facturaCosto = parseInt(facturaCosto);
        localStorage.setItem("costo", facturaCosto - producto.precio);

    } else if(facturaCosto != null) {
        
        facturaCosto = parseInt(facturaCosto);
        localStorage.setItem("costo", facturaCosto + producto.precio);
    
    } else {
        localStorage.setItem("costo", producto.precio);

    }
}

function llamarItem() {
    let agregadosFaturador = localStorage.getItem("productosFacturador");
    agregadosFaturador = JSON.parse(agregadosFaturador);

    let facturaCosto = localStorage.getItem("costo");
    facturaCosto = parseInt(facturaCosto);

    let facturaDiv = document.querySelector('.tag__items');
    
    if( agregadosFaturador && facturaDiv ) {
        facturaDiv.innerHTML = '';
        Object.values(agregadosFaturador).map( (item, index) => {
            facturaDiv.innerHTML += 
            `<div class="itemProducto">
                <div class="itemDescrip">
                    <img src="../img/${item.titulo}.jpg"></img>
                    <span class="sm-hide title">${item.titulo}</span>
                </div>
                <div class="cantidades">
                    <p class="precio">$${item.precio}</p>
                    <div class="unidades">
                        <span>${item.conteo}</span> 
                    </div>
                    <p class="totalUnidad">$${item.conteo * item.precio}</p>
                </div>
            </div>
            `;
        });

        facturaDiv.innerHTML += `
            <hr>
            <div class="totalContenedor">
                <h4 class="titleBruto">Costo Bruto</h4>
                <h4 class="bruto">$${facturaCosto}</h4>
                <h4 class="titleIva">IVA</h4>
                <h4 class="iva">$${facturaCosto * 0.22}</h4>
                <h4 class="titleTotal">TOTAL</h4>
                <h4 class="costoTotal">$${facturaCosto * 1.22}</h4>
            </div>`
    }
}

function imprimir() {
    const imprimir = document.querySelector(".comprar__button")
    imprimir.addEventListener("click", () => {
        Swal.fire(
            '¡Perfecto!',
            'Impresión realizada',
          )
        
    })
}

function limpiar () {
    const limpiarStorage = document.querySelector(".limpiar__button");
    limpiarStorage.addEventListener("click", () => {
        localStorage.removeItem("productosFacturador");
        localStorage.removeItem("costo");
        localStorage.removeItem("conteoFacturador");
    });

}

servicio()
productosCargados();
llamarItem();
imprimir()
limpiar()
