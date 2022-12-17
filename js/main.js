const itemProduct = document.querySelector("#items"); //shopconten
const verCarrito = document.querySelector("#verCarrito"); //ver crrtio
const modeloContainer = document.querySelector("#modelo-container"); //modalcontainer
const cantidadCarrito = document.querySelector("#cantidadCarrito");
const header = document.querySelector("#header");
const body = document.querySelector("#body");
const carritoDelete = document.querySelector(".button-vaciar");
const comprarCarrito = document.querySelector(".button-comprar");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// fetch
const getProducts = async () => {
  const res = await fetch("js/product.json");
  const data = await res.json();
  return data;
};

const products = getProducts();

const showProducts = async () => {
  const prodcuts = await getProducts();
  prodcuts.forEach((product) => {
    let content = document.createElement("div");
    content.className = "item-product";
    content.innerHTML = `
      <img src = "${product.img}">
      <h3>${product.nombre}</h3>
      <p class = "negrita">${product.precio}$</p>
    
      `;
    itemProduct.append(content);
    //agregamos el boton comprar
    let comprar = document.createElement("button");
    comprar.innerText = "comprar";
    comprar.className = "comprar";
    content.append(comprar);
    //agregar al carrito
    comprar.addEventListener("click", () => {
      //si repite u product
      const repeat = carrito.some(
        (repeatProduct) => repeatProduct.id === product.id
      );

      if (repeat) {
        carrito.map((prod) => {
          if (prod.id === product.id) {
            prod.cantidad++;
          }
        });
      } else {
        carrito.push({
          id: product.id,
          img: product.img,
          nombre: product.nombre,
          precio: product.precio,
          cantidad: product.cantidad,
        });
      }
      guardarLocal();
      carritoContador();
    });
  });
};

showProducts();



const guardarLocal = () => {
localStorage.setItem("carrito", JSON.stringify(carrito))
};


function sweetAlert(){
  Swal.fire({
    icon: 'success',
    text: 'Tu compra ha sido  exitosa!!',

  })
  
}

function sweetAlertVaciar(){
  Swal.fire({
    icon: 'success',
    text: 'Ha vaciado su carrito!!',

  })
  
}