import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Me conecto con supabase
// la supabaseKey debe ser la anon, no service_role
const supabaseUrl = "https://iwxnjefmewvdtktnvepk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3eG5qZWZtZXd2ZHRrdG52ZXBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1NTc4MjgsImV4cCI6MjA4MzEzMzgyOH0.UwHeWYqWq-TvEhhTj8Li6-MS9weuTAG2xM0HRSR19xM";
const supabase = createClient(supabaseUrl, supabaseKey);

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
  document.body.innerHTML = "Producto no encontrado";
  throw new Error("Sin ID");
}

const contenedorinfo = document.getElementById("contenedorinfoprodpagina");
const contenedorimg = document.getElementById("contenedorimgprodpagina");





async function cargarProducto() {
  const { data:producto, error } = await supabase
    .from("TablaProductos")
    .select("*")
    .eq("id", id)
    .single();

  contenedorimg.innerHTML=` 
    <img class="imgprodpagina" src="${producto.imagen_path}">

  `;

  let claseSinColores = "";
  let claseSinTalle = "";
  let claseSinDescripcion ="";
    if (producto.descripcion==null) {
      claseSinDescripcion="ocultarElem"
    }
    if (producto.coloresConStock==null) {
      claseSinColores="ocultarElem"
    }
    if (producto.talle==null) {
      claseSinTalle="ocultarElem"
    }
  contenedorinfo.innerHTML = `
    <h1 class="text-center" id="titulocartaprodpagina">${producto.nombre}</h1>
    <div class="textosinfopagina align-items-start">
        <p class="text-start ${claseSinDescripcion}">Descripción: ${producto.descripcion}</p>
        <p class="text-start">Tipo: ${producto.tipoprod}</p>
        ${producto.enFalta ? "<p class='text-start'>Sin stock</p>":"<p class='text-start'>Disponible</p>"}
        <p class="text-start ${claseSinColores}">Colores: ${producto.coloresConStock}</p>
        <p class="text-start ${claseSinTalle}">Talles: ${producto.talle}</p>
        <p class="text-start">Precio: $${producto.precio}</p>
    </div>
    <a target="_blank" href="https://wa.me/5492226626230?text=Hola,%20quisiera%20comprar%20el%20siguiente%20producto:%20https://kira-accesories.pages.dev/pages/producto.html?id=${id}" class="btn btn-success botonpagina">
      Comprar
    </a>

  `;
}

async function cargarRecomendados(idProducto) {
  const { data:recomendados, error:error2 } = await supabase
    .rpc("get_recomendados", {
      producto_id: idProducto,
      limite: 3
    });

  if (error2) {
    console.error("Error recomendados:", error2);
    return;
  }

  renderizarRecomendados(recomendados);
}

function renderizarRecomendados(productos) {
  const cont = document.getElementById("contenedorimgrecomendadas");
  cont.innerHTML = "";

  productos.forEach(p => {
    cont.innerHTML += `
      <div class="card animate-hover-card contenedorprodrecomendado"
        data-id=${p.id}
        style="cursor:pointer"
        >
        <img src="${p.imagen_path}" class="imgprodrecomendada">
        <div class="recomendada justify-content-between">
            <p class="text-center textorecomendada">${p.nombre}</p>
            ${p.enFalta ? "<p class='text-center textorecomendada'>Sin stock</p>":"<p class='text-center textorecomendada'>Disponible</p>"}
            <p class="text-center textorecomendada">$${p.precio}</p>
        </div>
      </div>
    `;
  });
}


// eventos
const recomendaciones = document.getElementById("contenedorimgrecomendadas");
recomendaciones.addEventListener("click", e => {
  console.log("hgola")
  const carta = e.target.closest(".contenedorprodrecomendado");
  if (!carta) return;

  const id = carta.dataset.id;
  window.location.href = `producto.html?id=${id}`;
});

//corren en el dom
  document.addEventListener("DOMContentLoaded", () => {
    cargarProducto();
    cargarRecomendados(id);
});

