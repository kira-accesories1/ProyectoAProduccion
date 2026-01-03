document.addEventListener('DOMContentLoaded', function () {
    const menuCards = document.getElementById('menu');
    const footer = document.getElementById('footer');

    var menu = [];

    platosVacios()


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



function putPlatosConStock(plato,boolPush) {
    if (!plato.enFalta) {
        if(boolPush) {
            menu.push(plato)
        }
        if(footer.classList.contains('footerPlatosVacios')) {
            footer.classList.remove('footerPlatosVacios');
            menuCards.innerHTML = "";
        }     
        menuCards.innerHTML += `
        <div class="producto cartaPlato ident col-lg-3 mx-4 my-4" data-plato-id = ${plato.platoId}
            data-nombre=${plato.nombre}
            data-precio=${plato.precio}
            data-talle=${plato.talle}
            data-tipo=${plato.tipoPlato}
        >
        <div class="card animate-hover-card">
            <img src=${plato.imagen} class="card-img-top" alt="foto plato" id="fotoplato">
            <div class="d-flex px-2">
            <div class="card-body py-1 col-8">
                <p class="text-center nombrePlato mb-1">${plato.nombre}</p>
                <p class="my-1">${plato.descripcion}</p>
                <p class="my-1">Tipo: ${plato.tipoPlato}</p>
            </div>
            </div>
            <p class="text-center fs-5 my-1">
                $${plato.precio}
            </p>
        </div>
        </div> 
    
                    `;                
    }
}

function platosVacios(){
menuCards.innerHTML += `
<p class="text-center plato text-white fuenteLobster fs-2">No hay platos.</p>
`;
footer.classList.add('footerPlatosVacios');
console.log(footer)

}


plato1={
   platoId: "plato1",
   descripcion: "asdasdada",
   talle: "S",
   nombre: "plato1",
   tipoPlato: "Remera",
   precio: 8500,
   enFalta: false,
   imagen: "media/ravioles.jpg",
   aptoVegano: false,
   aptoCeliaco: true
 }

 putPlatosConStock(plato1,true)


plato2={
   platoId: "plato2",
   descripcion: "asdasdada",
   talle: "M",
   nombre: "plato2",
   tipoPlato: "Buzo",
   precio: 8500,
   enFalta: false,
   imagen: "media/ravioles.jpg",
   aptoVegano: true,
   aptoCeliaco: false
 }

 putPlatosConStock(plato2,true)

 plato3={
    platoId: "plato3",
    descripcion: "asdasdada",
    talle: "L",
    nombre: "plato3",
    tipoPlato: "Campera",
    precio: 8500,
    enFalta: false,
    imagen: "media/ravioles.jpg",
    aptoVegano: true,
    aptoCeliaco: false
  }
 
  putPlatosConStock(plato3,true)

  
  plato4={
    platoId: "plato4",
    descripcion: "asdasdada",
    talle: "XL",
    nombre: "plato4",
    tipoPlato: "Campera",
    precio: 8500,
    enFalta: false,
    imagen: "media/ravioles.jpg",
    aptoVegano: true,
    aptoCeliaco: false
  }
 
  putPlatosConStock(plato4,true)

  
  plato5={
    platoId: "plato5",
    descripcion: "asdasdada",
    talle: "S",
    nombre: "plato5",
    tipoPlato: "Campera",
    precio: 8500,
    enFalta: false,
    imagen: "media/ravioles.jpg",
    aptoVegano: true,
    aptoCeliaco: false
  }
 
  putPlatosConStock(plato5,true)

  
  plato6={
    platoId: "plato6",
    descripcion: "asdasdada",
    talle: "S",
    nombre: "plato6",
    tipoPlato: "Campera",
    precio: 8500,
    enFalta: false,
    imagen: "media/ravioles.jpg",
    aptoVegano: true,
    aptoCeliaco: false
  }
 
  putPlatosConStock(plato6,true)
 


    })

