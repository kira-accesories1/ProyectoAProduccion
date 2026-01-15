import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Me conecto con supabase
// la supabaseKey debe ser la anon, no service_role
const supabaseUrl = "https://iwxnjefmewvdtktnvepk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3eG5qZWZtZXd2ZHRrdG52ZXBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1NTc4MjgsImV4cCI6MjA4MzEzMzgyOH0.UwHeWYqWq-TvEhhTj8Li6-MS9weuTAG2xM0HRSR19xM";
const supabase = createClient(supabaseUrl, supabaseKey);

/* ===============================
   DOM
================================ */
const menuCards = document.getElementById("contenedorMenu");
const footer = document.getElementById("footer");
const buscador = document.getElementById("buscador");
const formFiltros = document.querySelector("#modalFiltros form");
const btnBuscar = document.getElementById("btnBuscar");

/* ===============================
   URL PARAMS (tipo)
================================ */
const params = new URLSearchParams(window.location.search);
const tipoDesdeURL = params.get("tipo");

/* ===============================
   CARGAR + FILTRAR PRODUCTOS
================================ */
async function cargarProductos() {
  const texto = buscador?.value.trim().toLowerCase() || "";

  const precioMin = Number(document.getElementById("precioMin")?.value || 0);
  const precioMax = Number(document.getElementById("precioMax")?.value || 9999999);

  const elemStock = document.getElementById("stock")?.value;
  const ordenPrecio = document.getElementById("ordenPrecio")?.value || "Sin ordenar";

  let query = supabase
    .from("TablaProductos")
    .select("*");

  /* 🔤 texto */
  if (texto) {
    query = query.ilike("nombre", `%${texto}%`);
  }

  /* 💰 precio */
  query = query.gte("precio", precioMin).lte("precio", precioMax);

  /* 📦 stock */
  if (elemStock === "Con") query = query.eq("enFalta", false);
  if (elemStock === "Sin") query = query.eq("enFalta", true);

  /* 🏷 tipo */
  if (tipoDesdeURL) {
    query = query.eq("tipoprod", tipoDesdeURL);
  }

  /* ↕ orden */
  if (ordenPrecio === "Precio asc") {
    query = query.order("precio", { ascending: true });
  } else if (ordenPrecio === "Precio desc") {
    query = query.order("precio", { ascending: false });
  } else {
    query = query.order("orden", { ascending: true });
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error Supabase:", error);
    return;
  }

  renderizarProductos(data);
}


/* ===============================
   RENDER
================================ */
function renderizarProductos(productos) {
  menuCards.innerHTML = "";

  if (!productos.length) {
    productosVacios();
    return;
  }

  productos.forEach(p => putProductos(p));
}


/* ===============================
   CARD
================================ */

function putProductos(producto) {
  let claseEnFalta = ""
  let imgEnFalta = ""
  let letreroEnFalta = ""
  let claseSinColores = ""
  let claseSinTalle = ""
    if (producto.enFalta) {
      claseEnFalta="claseEnFalta"
      imgEnFalta="imgEnFalta"
      letreroEnFalta="letreroEnFalta"
    } else {
      letreroEnFalta="ocultarElem"
    }
    if (producto.coloresConStock==null) {
      claseSinColores="ocultarElem"
    }
    if (producto.talle==null) {
      claseSinTalle="ocultarElem"
    }
    menuCards.innerHTML += `
    <div class="cartaproducto my-3"
        data-id=${producto.id}
        style="cursor:pointer"
    >
    <div class="card cartaadentro ${claseEnFalta} animate-hover-card">
        <div class="img-wrapper">
          <p class= "${letreroEnFalta}">
            Sin stock
          </p>
          <img src=${producto.imagen_path} class="fotoprod img-fluid ${imgEnFalta}" alt="foto producto" id="fotoproducto">          
        </div>
        <div class="d-flex px-2">
        <div class="card-body py-1 col-8">
            <p class="text-center nombreyprecio mb-1 resaltadonombrecarta">${producto.nombre}</p>
            <p class="my-1">Tipo: ${producto.tipoprod}</p>
        </div>
        </div>
        <p class="text-center nombreyprecio my-1">
            $${producto.precio}
        </p>
    </div>
    </div> 

                `;                
}


/* ===============================
   SIN PRODUCTOS
================================ */
function productosVacios() {
  menuCards.innerHTML = `
    <p class="text-center text-white sinproductos fs-2">
      No hay productos.
    </p>
  `;
}


/* ===============================
   EVENTOS
================================ */
btnBuscar?.addEventListener("click", e => {
  e.preventDefault();
  cargarProductos();
});

buscador?.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    cargarProductos();
  }
});

formFiltros?.addEventListener("submit", e => {
  e.preventDefault();
  cargarProductos();

  document.activeElement?.blur();
  bootstrap.Modal.getInstance(
    document.getElementById("modalFiltros")
  )?.hide();
});

document.getElementById("botonReiniciar")
  ?.addEventListener("click", () => {
    formFiltros.reset();
  });


menuCards.addEventListener("click", e => {
  const carta = e.target.closest(".cartaproducto");
  if (!carta) return;

  const id = carta.dataset.id;
  window.location.href = `pages/producto.html?id=${id}`;
});

[...document.body.querySelectorAll("*")].filter(el => {
  return el.scrollWidth > document.documentElement.clientWidth;
});






  /* ===============================
   INIT
================================ */
document.addEventListener("DOMContentLoaded", () => {
  cargarProductos();
});