const itemProduct = document.querySelector("#items"); //shopconten
const verCarrito = document.querySelector("#verCarrito") //ver crrtio
const modeloContainer = document.querySelector("#modelo-container"); //modalcontainer
const cantidadCarrito = document.querySelector("#cantidadCarrito")
const header = document.querySelector("#header");
const body = document.querySelector("#body");
const carritoDelete = document.querySelector(".button-vaciar")
const comprarCarrito = document.querySelector(".button-comprar")

let carrito =  JSON.parse(localStorage.getItem("carrito")) || [];


const viewProducto = () => {
  return new Promise((resolve, reject)=>{
    setTimeout(()=> resolve(cartView), 800);
  });
};

viewProducto()
    .then((res) => {

      productos = res;
      cartView(productos) 
      console.log(productos)
    })





//creamos un div con los productos
product.forEach((product)=>{

    let content = document.createElement("div");
    content.className = "item-product"
    content.innerHTML = `
    <img src = "${product.img}">
    <h3>${product.nombre}</h3>
    <p class = "negrita">${product.precio}$</p>
  
    `;
   itemProduct.append(content)
//agregamos el boton comprar
   let comprar = document.createElement("button")
   comprar.innerText = "comprar";
   comprar.className = "comprar";
   content.append(comprar)
  //agregar al carrito
   comprar.addEventListener("click", ()=>{
  //si repite u product
   const repeat = carrito.some((repeatProduct)=> repeatProduct.id === product.id)

   if(repeat){
    carrito.map((prod)=> {
      if(prod.id === product.id){
        prod.cantidad++;
      }
    });
   }else {
    carrito.push({
      id : product.id,
      img : product.img,
      nombre : product.nombre,
      precio: product.precio,
      cantidad: product.cantidad,
    })
   }
   guardarLocal()
   carritoContador()
   
  }); 
});

const guardarLocal = () => {
localStorage.setItem("carrito", JSON.stringify(carrito))
};



 