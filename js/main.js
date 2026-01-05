document.addEventListener('DOMContentLoaded', function () {
    const menuCards = document.getElementById('contenedorMenu');
    const footer = document.getElementById('footer');

    var menu = [];

    productosVacios()

const params = new URLSearchParams(window.location.search);
const tipoDesdeURL = params.get("tipo");

function aplicarFiltroPorTipo() {
  if (!tipoDesdeURL) return;

  document.querySelectorAll(".cartaproducto").forEach(carta => {
    const tipo = carta.dataset.tipo;
    if (tipo === tipoDesdeURL) {
      carta.style.display =  "";
      carta.dataset.mostrar = "true";
    } else {
      carta.style.display = "none";
      carta.dataset.mostrar = "false";
    }
  });
}






/* ===============================
   BUSCADOR + FILTROS
================================ */

const buscador = document.getElementById("buscador");
const formFiltros = document.querySelector("#modalFiltros form");


function filtrarProductos() {
  const texto = buscador.value.toLowerCase();

  const precioMin = Number(document.getElementById("precioMin")?.value || 0);
  const precioMax = Number(document.getElementById("precioMax")?.value || Infinity);
  const elemStock = document.getElementById("stock")?.value;
  const conStock =  elemStock == "Con" ? 0 : (elemStock == "Sin" ? 1 : 2)
  const ordenPrecio = document.getElementById("ordenPrecio")?.value || "Sin ordenar";

  const cartaproductos = document.querySelectorAll(".cartaproducto");

  cartaproductos.forEach(carta => {
    const nombre = carta.dataset.nombre.toLowerCase();
    const precio = Number(carta.dataset.precio);
    const prodStock = (carta.dataset.enfalta == "true") ? 1 : 0;
    
    let visible = true;

    if (!nombre.includes(texto)) visible = false;
    if (precio < precioMin || precio > precioMax) visible = false;
    if (!(conStock == prodStock || conStock==2)) visible = false
    if (carta.dataset.mostrar == "false") visible = false
    carta.style.display = visible ? "" : "none";
  });

      if (ordenPrecio == "Precio asc") {
  const visiblesasc = Array.from(cartaproductos).filter(c => c.style.display !== "none");

  visiblesasc.sort((a, b) => {
    const precioA = Number(a.dataset.precio);
    const precioB = Number(b.dataset.precio);
    return precioA - precioB;
  });

  visiblesasc.forEach(c => menuCards.appendChild(c));
} else if (ordenPrecio == "Precio desc") {
  const visiblesdesc = Array.from(cartaproductos).filter(c => c.style.display !== "none");

  visiblesdesc.sort((a, b) => {
    const precioA = Number(a.dataset.precio);
    const precioB = Number(b.dataset.precio);
    return precioB - precioA;
  });

  visiblesdesc.forEach(c => menuCards.appendChild(c));
} else {
    const visiblesorigord = Array.from(cartaproductos).filter(c => c.style.display !== "none");

  visiblesorigord.sort((a, b) => {
    const ordenA = Number(a.dataset.orden);
    const ordenB = Number(b.dataset.orden);
    return ordenA - ordenB;
  });

  visiblesorigord.forEach(c => menuCards.appendChild(c));
}
}

/* Buscar al submitear*/
const btnBuscar = document.getElementById("btnBuscar");

btnBuscar?.addEventListener("click", e => {
  e.preventDefault();
  filtrarProductos();
});

buscador?.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    filtrarProductos();
  }
});


/* Aplicar filtros desde modal */
formFiltros?.addEventListener("submit", e => {
  e.preventDefault();
  filtrarProductos();

  document.activeElement?.blur();

  const modal = bootstrap.Modal.getInstance(
    document.getElementById("modalFiltros")
  );
  modal.hide();
});

/* Reset filtros */
document.getElementById("botonReiniciar")
  ?.addEventListener("click", () => {
    formFiltros.reset(); // solo limpia inputs
  });


  // imagen modal
  const logo = document.getElementById("logo");
  const lightbox = document.getElementById("lightbox");

  logo.addEventListener("click", () => {
    lightbox.style.display = "flex";
  });

  lightbox.addEventListener("click", () => {
    lightbox.style.display = "none";
  });



function putproductosConStock(producto,boolPush) {
    if (producto.enFalta) {
      claseEnFalta="claseEnFalta"
      imgEnFalta="imgEnFalta"
      letreroEnFalta="letreroEnFalta"
    } else {
      claseEnFalta=""
      imgEnFalta=""
      letreroEnFalta="ocultarElem"
    }
    if (producto.coloresConStock==null) {
      claseSinColores="ocultarElem"
    } else {
      claseSinColores = ""
    }
    if (producto.talle==null) {
      claseSinTalle="ocultarElem"
    } else {
      claseSinTalle = ""
    }
    if(boolPush) {
        menu.push(producto)
    }
    if(footer.classList.contains('footerproductosVacios')) {
        footer.classList.remove('footerproductosVacios');
        menuCards.innerHTML = "";
    }     
    menuCards.innerHTML += `
    <div class="cartaproducto my-3" data-producto-id = ${producto.productoId}
        data-nombre=${producto.nombre}
        data-precio=${producto.precio}
        data-tipo=${producto.tipoproducto}
        data-enfalta=${producto.enFalta}
        data-orden=${producto.orden}
        data-mostrar="true"
    >
    <div class="card cartaadentro ${claseEnFalta} animate-hover-card">
        <div class="img-wrapper">
          <p class= "${letreroEnFalta}">
            Sin stock
          </p>
          <img src=${producto.imagen} class="fotoprod img-fluid ${imgEnFalta}" alt="foto producto" id="fotoproducto">          
        </div>
        <div class="d-flex px-2">
        <div class="card-body py-1 col-8">
            <p class="text-center nombreyprecio mb-1">${producto.nombre}</p>
            <p class="my-1">Tipo: ${producto.tipoproducto}</p>
            <p class="my-1 ${claseSinColores}">Colores disponibles: ${producto.coloresConStock}</p>
            <p class="my-1 ${claseSinTalle}">Talles: ${producto.talle}</p>
        </div>
        </div>
        <p class="text-center nombreyprecio my-1">
            $${producto.precio}
        </p>
    </div>
    </div> 

                `;                
}

function productosVacios(){
menuCards.innerHTML += `
<p class="text-center text-white sinproductos fs-2">No hay productos.</p>
`;
footer.classList.add('footerproductosVacios');
}


producto1={
   productoId: "producto1",
   nombre: "Pulsera negra",
   tipoproducto: "Pulsera",
   precio: 7500,
   enFalta: false,
   imagen: "media/prod1.jpg",
   orden:1
 }

 putproductosConStock(producto1,true)


producto2={
   productoId: "producto2",
   nombre: "Pulsera azul",
   tipoproducto: "Pulsera",
   precio: 7500,
   enFalta: false,
   imagen: "media/prod2.jpg",
   orden:1
 }

 putproductosConStock(producto2,true)

producto3={
   productoId: "producto3",
   nombre: "Pulsera azul",
   tipoproducto: "Pulsera",
   precio: 7500,
   enFalta: false,
   imagen: "media/prod3.jpg",
   orden:1
 }

 putproductosConStock(producto3,true)

  
  producto4={
   productoId: "producto4",
   nombre: "Pulsera roja",
   tipoproducto: "Pulsera",
   precio: 7500,
   enFalta: false,
   imagen: "media/prod4.jpg",
   orden:1
  }
 
  putproductosConStock(producto4,true)

    producto5={
   productoId: "producto5",
   nombre: "Pulsera roja",
   tipoproducto: "Pulsera",
   precio: 7500,
   enFalta: false,
   imagen: "media/prod5.jpg",
   orden:1
  }
 
  putproductosConStock(producto5,true)

    producto6={
   productoId: "producto6",
   nombre: "Aros plateados",
   tipoproducto: "Aros",
   precio: 7500,
   enFalta: false,
   imagen: "media/prod6.jpg",
   orden:1
  }
 
  putproductosConStock(producto6,true)

    producto7={
   productoId: "producto7",
   nombre: "Aros plateados",
   tipoproducto: "Aros",
   precio: 7500,
   enFalta: false,
   imagen: "media/prod7.jpg",
   orden:1
  }
 
  putproductosConStock(producto7,true)

    producto8={
   productoId: "producto8",
   nombre: "Aros plateados",
   tipoproducto: "Aros",
   precio: 7500,
   enFalta: false,
   imagen: "media/prod8.jpg",
   orden:1
  }
 
  putproductosConStock(producto8,true)

    producto9={
   productoId: "producto9",
   nombre: "Aros dorados",
   tipoproducto: "Aros",
   precio: 7500,
   enFalta: false,
   imagen: "media/prod9.jpg",
   orden:1
  }
 
  putproductosConStock(producto9,true)

    producto10={
   productoId: "producto10",
   nombre: "Aros plateados",
   tipoproducto: "Aros",
   precio: 7500,
   enFalta: false,
   imagen: "media/prod10.jpg",
   orden:1
  }
 
  putproductosConStock(producto10,true)

    producto11={
   productoId: "producto11",
   nombre: "Aros plateados",
   tipoproducto: "Aros",
   precio: 7500,
   enFalta: false,
   imagen: "media/prod11.jpg",
   orden:1
  }
 
  putproductosConStock(producto11,true)

    producto12={
   productoId: "producto12",
   nombre: "Aros plateados",
   tipoproducto: "Aros",
   precio: 7500,
   enFalta: false,
   imagen: "media/prod12.jpg",
   orden:1
  }
 
  putproductosConStock(producto12,true)

    producto13={
   productoId: "producto13",
   nombre: "Aros dorados",
   tipoproducto: "Aros",
   precio: 7500,
   enFalta: false,
   imagen: "media/prod13.jpg",
   orden:1
  }
 
  putproductosConStock(producto13,true)

    producto14={
   productoId: "producto14",
   nombre: "Aros plateados",
   tipoproducto: "Aros",
   precio: 7500,
   enFalta: false,
   imagen: "media/prod14.jpg",
   orden:1
  }
 
  putproductosConStock(producto14,true)

    producto15={
   productoId: "producto15",
   nombre: "Aros brillosos",
   tipoproducto: "Aros",
   precio: 7500,
   enFalta: false,
   imagen: "media/prod15.jpg",
   orden:1
  }
 
  putproductosConStock(producto15,true)

    producto16={
   productoId: "producto16",
   nombre: "Tobilleras tejidas de hilo encerado",
   tipoproducto: "Tobillera",
   precio: 7500,
   enFalta: false,
   imagen: "media/prod16.jpg",
   orden:1
  }
 
  putproductosConStock(producto16,true)

    producto17={
   productoId: "producto17",
   nombre: "Tobilleras caracoles",
   tipoproducto: "Tobillera",
   precio: 7500,
   enFalta: false,
   imagen: "media/prod17.jpg",
   orden:1
  }
 
  putproductosConStock(producto17,true)

    producto18={
   productoId: "producto18",
   nombre: "Anillos de acero quirúrgico",
   tipoproducto: "Anillo",
   precio: 7500,
   enFalta: false,
   imagen: "media/prod18.jpg",
   orden:1,
   talle: "Del 17 al 21"
  }
 
  putproductosConStock(producto18,true)

    producto19={
   productoId: "producto19",
   nombre: "Aros abrigadores de acero quirúrgico",
   tipoproducto: "Aros",
   precio: 7500,
   enFalta: false,
   imagen: "media/prod19.jpg",
   orden:1,

  }
 
  putproductosConStock(producto19,true)

    producto20={
   productoId: "producto20",
   nombre: "Aros Cereza de acero quirúrgico",
   tipoproducto: "Aros",
   precio: 7500,
   enFalta: false,
   imagen: "media/prod20.jpg",
   orden:1
  }
 
  putproductosConStock(producto20,true)

    producto21={
   productoId: "producto21",
   nombre: "Choker víbora",
   tipoproducto: "Collar",
   precio: 7500,
   enFalta: false,
   imagen: "media/prod21.jpg",
   orden:1,
   coloresConStock:"Marrón, bordó, negro"
  }
 
  putproductosConStock(producto21,true)


  aplicarFiltroPorTipo();
 


    })

