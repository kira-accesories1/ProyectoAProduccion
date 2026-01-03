document.addEventListener('DOMContentLoaded', function () {
    const menuCards = document.getElementById('menu');
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

  const talle = document.getElementById("talle")?.value || "";
  const tipo = document.getElementById("tipo")?.value || "";

  const productos = document.querySelectorAll(".producto");

  productos.forEach(producto => {
    const nombre = producto.dataset.nombre.toLowerCase();
    const precio = Number(producto.dataset.precio);
    const prodTalle = producto.dataset.talle;
    const prodTipo = producto.dataset.tipo;

    let visible = true;

    console.log(talle)
    console.log(precioMin)
    console.log(precioMax)
    console.log(nombre)
    console.log(texto)
    console.log(tipo)

    if (!nombre.includes(texto)) visible = false;
    if (precio < precioMin || precio > precioMax) visible = false;
    if (talle != "Cualquiera" && prodTalle !== talle) visible = false;
    if (tipo != "Cualquiera" && prodTipo !== tipo) visible = false;

    producto.style.display = visible ? "" : "none";
  });
}

/* Buscar en vivo */
buscador?.addEventListener("input", filtrarProductos);

/* Aplicar filtros desde modal */
formFiltros?.addEventListener("submit", e => {
  e.preventDefault();
  filtrarProductos();

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
    if (!producto.enFalta) {
        if(boolPush) {
            menu.push(producto)
        }
        if(footer.classList.contains('footerproductosVacios')) {
            footer.classList.remove('footerproductosVacios');
            menuCards.innerHTML = "";
        }     
        menuCards.innerHTML += `
        <div class="cartaproducto ident mx-4 my-4 justify-content-center" data-producto-id = ${producto.productoId}
            data-nombre=${producto.nombre}
            data-precio=${producto.precio}
            data-talle=${producto.talle}
            data-tipo=${producto.tipoproducto}
        >
        <div class="card animate-hover-card">
            <img src=${producto.imagen} class="fotoprod img-fluid" alt="foto producto" id="fotoproducto">
            <div class="d-flex px-2">
            <div class="card-body py-1 col-8">
                <p class="text-center nombreproducto mb-1">${producto.nombre}</p>
                <p class="my-1">${producto.descripcion}</p>
                <p class="my-1">Tipo: ${producto.tipoproducto}</p>
            </div>
            </div>
            <p class="text-center fs-5 my-1">
                $${producto.precio}
            </p>
        </div>
        </div> 
    
                    `;                
    }
}

function productosVacios(){
menuCards.innerHTML += `
<p class="text-center text-white sinproductos fs-2">No hay productos.</p>
`;
footer.classList.add('footerproductosVacios');
console.log(footer)

}


producto1={
   productoId: "producto1",
   descripcion: "asdasdada",
   talle: "S",
   nombre: "producto1",
   tipoproducto: "Remera",
   precio: 8500,
   enFalta: false,
   imagen: "media/ravioles.jpg",
   aptoVegano: false,
   aptoCeliaco: true
 }

 putproductosConStock(producto1,true)


producto2={
   productoId: "producto2",
   descripcion: "asdasdada",
   talle: "M",
   nombre: "producto2",
   tipoproducto: "Buzo",
   precio: 8500,
   enFalta: false,
   imagen: "media/ravioles.jpg",
   aptoVegano: true,
   aptoCeliaco: false
 }

 putproductosConStock(producto2,true)

 producto3={
    productoId: "producto3",
    descripcion: "asdasdada",
    talle: "L",
    nombre: "producto3",
    tipoproducto: "Campera",
    precio: 8500,
    enFalta: false,
    imagen: "media/ravioles.jpg",
    aptoVegano: true,
    aptoCeliaco: false
  }
 
  putproductosConStock(producto3,true)

  
  producto4={
    productoId: "producto4",
    descripcion: "asdasdada",
    talle: "XL",
    nombre: "producto4",
    tipoproducto: "Campera",
    precio: 8500,
    enFalta: false,
    imagen: "media/ravioles.jpg",
    aptoVegano: true,
    aptoCeliaco: false
  }
 
  putproductosConStock(producto4,true)

  
  producto5={
    productoId: "producto5",
    descripcion: "asdasdada",
    talle: "S",
    nombre: "producto5",
    tipoproducto: "Campera",
    precio: 8500,
    enFalta: false,
    imagen: "media/ravioles.jpg",
    aptoVegano: true,
    aptoCeliaco: false
  }
 
  putproductosConStock(producto5,true)

  
  producto6={
    productoId: "producto6",
    descripcion: "asdasdada",
    talle: "S",
    nombre: "producto6",
    tipoproducto: "Campera",
    precio: 8500,
    enFalta: false,
    imagen: "media/ravioles.jpg",
    aptoVegano: true,
    aptoCeliaco: false
  }
 
  putproductosConStock(producto6,true)
 


    })

