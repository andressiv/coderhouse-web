

const cartView = () => {
    modeloContainer.innerHTML = ""
    modeloContainer.style.display = "flex"
    const header = document.createElement("div")
    header.className = "header"
    header.innerHTML = `
    <h1 class = "modal-header">Carrito</h1>
    `;
    modeloContainer.append(header);
  
    //modalbutton
    const button = document.createElement("h1")
    button.innerText = "X";
    button.className = "modal-header-button"
    button.addEventListener("click", ()=>{
      modeloContainer.style.display = "none";
    })
    header.append(button);
  //contenido carrito
  carrito.forEach((product) =>{
  
    let carritoContent = document.createElement("div")
    carritoContent.className = "contenidoCarrito" //modalcontent
    carritoContent.innerHTML = `
      <img src="${product.img}">
      <h3>${product.nombre}</h3>
      <p>${product.precio}$</p>
      <p>Cantidad: ${product.cantidad}</p>
      <p>Total:${product.cantidad * product.precio} </p>
      <span class ="restar">-</span>
      <span class ="sumar">+</span>
      <span class = "delete-producto">❌</span>
      
    `;
    modeloContainer.append(carritoContent);

   let restar = carritoContent.querySelector(".restar");

   restar.addEventListener("click", () => {
    if(product.cantidad !== 1){
    product.cantidad--;
    }

    guardarLocal()
    cartView()
   });
  
   let sumar = carritoContent.querySelector(".sumar")

   sumar.addEventListener("click", () => {
    product.cantidad++;
    guardarLocal()
    cartView()
   });
 
  let eliminar = carritoContent.querySelector(".delete-producto")
  eliminar.addEventListener("click", ()=>{
    eliminarProducto(product.id);
  })
   
  });
    
   const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
   const totalCompra = document.createElement("div");
   totalCompra.className = "total-content";
   totalCompra.innerHTML = `total a pagar: ${total} $`;
   modeloContainer.append(totalCompra)

   const productoDelete = document.createElement("button")
   productoDelete.className = "button-vaciar"
   productoDelete.innerHTML = `Vaciar carrito`
   modeloContainer.append(productoDelete)
   productoDelete.addEventListener("click", vaciarCarrito)
   
   let comprar = document.createElement("button")
   comprar.className = "button-comprar"
   comprar.innerHTML = `Comprar`;
   modeloContainer.append(comprar)
   comprar.addEventListener("click", sweetAlert)
  

   }
       
  


verCarrito.addEventListener("click", cartView)


const eliminarProducto = (id) => {
    const foundId = carrito.find((element) => element.id === id);

    carrito = carrito.filter((carritoId)=> {
        return carritoId !== foundId;
    });
    carritoContador()
    guardarLocal()
    cartView()
    
}

const carritoContador = () =>{
    cantidadCarrito.style.display = "block";
    const carritoLength = carrito.length;
    localStorage.setItem("carritoLenght", JSON.stringify(carritoLength))
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLenght"));
}
carritoContador()


  function vaciarCarrito(){
  carrito = [];
  eliminarProducto()
   localStorage.removeItem(eliminarProducto)
   
  
   
}




  