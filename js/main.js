document.addEventListener('DOMContentLoaded', function () {
    const menuCards = document.getElementById('contenedorMenu');
    const footer = document.getElementById('footer');

    var menu = [];

    productosVacios()








/* ===============================
   BUSCADOR + FILTROS
================================ */

const buscador = document.getElementById("buscador");
const formFiltros = document.querySelector("#modalFiltros form");


function filtrarProductos() {
  const texto = buscador.value.toLowerCase();

  const precioMin = Number(document.getElementById("precioMin")?.value || 0);
  const precioMax = Number(document.getElementById("precioMax")?.value || Infinity);
  const tipo = document.getElementById("tipo")?.value || "";
  const elemStock = document.getElementById("stock")?.value;
  const conStock =  elemStock == "Con" ? 0 : (elemStock == "Sin" ? 1 : 2)
  const ordenPrecio = document.getElementById("ordenPrecio")?.value || "Sin ordenar";

  const cartaproductos = document.querySelectorAll(".cartaproducto");

  cartaproductos.forEach(carta => {
    const nombre = carta.dataset.nombre.toLowerCase();
    const precio = Number(carta.dataset.precio);
    const prodTipo = carta.dataset.tipo;
    const prodStock = (carta.dataset.enfalta == "true") ? 1 : 0;
    
    let visible = true;

    if (!nombre.includes(texto)) visible = false;
    if (precio < precioMin || precio > precioMax) visible = false;
    if (tipo != "Cualquiera" && prodTipo !== tipo) visible = false;
    if (!(conStock == prodStock || conStock==2)) visible = false
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
      letreroEnFalta="letreroDisponible"
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
   nombre: "producto1",
   tipoproducto: "Pulsera",
   precio: 7500,
   enFalta: false,
   imagen: "media/ravioles.jpg",
   aptoVegano: false,
   aptoCeliaco: true,
   orden:1
 }

 putproductosConStock(producto1,true)


producto2={
   productoId: "producto2",
   nombre: "producto2",
   tipoproducto: "Pulsera",
   precio: 6500,
   enFalta: false,
   imagen: "media/ravioles.jpg",
   aptoVegano: true,
   aptoCeliaco: false,
   orden:2
 }

 putproductosConStock(producto2,true)

 producto3={
    productoId: "producto3",
    nombre: "producto3",
    tipoproducto: "Aros",
    precio: 9500,
    enFalta: false,
    imagen: "media/ravioles.jpg",
    aptoVegano: true,
    aptoCeliaco: false,
   orden:3
  }
 
  putproductosConStock(producto3,true)

  
  producto4={
    productoId: "producto4",
    nombre: "producto4",
    tipoproducto: "Pulsera",
    precio: 8500,
    enFalta: false,
    imagen: "media/ravioles.jpg",
    aptoVegano: true,
    aptoCeliaco: false,
   orden:4
  }
 
  putproductosConStock(producto4,true)

  
  producto5={
    productoId: "producto5",
    nombre: "producto5",
    tipoproducto: "Collar",
    precio: 8500,
    enFalta: false,
    imagen: "media/ravioles.jpg",
    aptoVegano: true,
    aptoCeliaco: false,
   orden:5
  }
 
  putproductosConStock(producto5,true)

  
  producto6={
    productoId: "producto6",
    nombre: "producto6",
    tipoproducto: "Collar",
    precio: 8500,
    enFalta: true,
    imagen: "media/ravioles.jpg",
    aptoVegano: true,
    aptoCeliaco: false,
   orden:6
  }
 
  putproductosConStock(producto6,true)
 


    })

