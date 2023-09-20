// Variables globales
const controlStock = [];

const azul020 = {
  codigo: "A020C",
  color: "Azul Claro",
  gramaje: "20 mic",
  precio: 100,
  subtotal: 400,
  cantidad: 4,
};
const rojo040 = {
  codigo: "R040",
  color: "Rojo",
  gramaje: "40 mic",
  precio: 100,
  subtotal: 100,
  cantidad: 1,
};
const dorado = {
  codigo: "D060",
  color: "Dorado",
  gramaje: "60 mic",
  precio: 200,
  subtotal: 200,
  cantidad: 1,
};
const plateadoHolografico050 = {
  codigo: "P050H",
  color: "Plateado",
  gramaje: "50 mic",
  precio: 50,
  subtotal: 50,
  cantidad: 1,
};

controlStock.push(azul020);
controlStock.push(rojo040);
controlStock.push(dorado);
controlStock.push(plateadoHolografico050);

// Función que se encargue de buscar si un producto existe en nuestro carrito (array)
function enStock(codigoPrompt) {
  // Find: busca un elemento que cumpla la condición (en este caso el nombre del
  // del producto con el nombre introducido en el prompt) y devuelve el elemento
  // o undefined si no lo encuentra
  return controlStock.find((producto) => producto.codigo == codigoPrompt);
}

// Función para buscar productos
function buscar() {
  const keyword = prompt("¿Qué producto desea buscar?");
  // Me va a retornar un array con todos los elementos que contengan
  // la variable "keyword" (string) que lo define el usuario por el prompt
  const arrayResultados = controlStock.filter((el) =>
    // toLowerCase convierte un string en minúsculas
    el.color.toLowerCase().includes(keyword.toLowerCase())
  );
  console.log(arrayResultados);
}

// Función para agregar un producto al carrito
function agregar() {
  // Pido por prompt los datos del producto
  const codigoPrompt = prompt("Introduzca el código del producto:");
  const precioPrompt = prompt("Introduzca el Precio del paquete:");
  const colorPrompt = prompt("Introduzca el color del brillo.");
  const gramajePrompt = prompt("Indroduzca el gramaje del producto:");
  // Creo un objeto con los datos obtenidos del prompt
  const nuevoProducto = {
    codigo: codigoPrompt,
    color: colorPrompt,
    gramaje: gramajePrompt,
    precio: parseInt(precioPrompt),
    subtotal: parseInt(precioPrompt),
    cantidad: 1,
  };

  // Si lo encuentra, devuelve (return) el producto, sino
  // devuelve undefined
  const productoEncontrado = enStock(codigoPrompt);

  if (productoEncontrado) {
    productoEncontrado.cantidad++;
    productoEncontrado.precio = parseInt(precioPrompt);
    productoEncontrado.subtotal =
      parseInt(precioPrompt) * productoEncontrado.cantidad;
  } else {
    // Push agrega el producto en el array
    controlStock.push(nuevoProducto);
  }

  // Mensaje de alert exitoso
  alert(
    "El producto " +
      codigoPrompt +
      " de color " +
      colorPrompt +
      " fue agregado al carrito."
  );
  listar();
}

// Función para listar los productos del carrito
function listar() {
  console.clear();
  console.log("Productos que hay en el STOCK:");

  // Recorremos los elementos del array carrito
  controlStock.forEach((elemento) => {
    console.log("-------------------------------------------");
    console.log("Codigo:", elemento.codigo);
    console.log("Color:", elemento.color);
    console.log("Gramaje:", elemento.gramaje);
    console.log("Precio:", elemento.precio);
    console.log("Cantidad:", elemento.cantidad);
    console.log("Subtotal:", elemento.subtotal);
  });

  // Reduce: Recorre cada elemento y va acumulando una suma de una propiedad
  // del elemento, en este caso el precio
  const totalStock = controlStock.reduce((acu, el) => acu + el.subtotal, 0);
  console.log("TOTAL EN PESOS DE EL STOCK: $", totalStock);

  // Map: crea un nuevo array transformando los elementos. En este caso
  // le agregamos el IVA a los precios
  const preciosActualizados = controlStock.map((producto) => {
    return {
      codigo: producto.codigo,
      precio: producto.precio * 1.25,
      cantidad: producto.cantidad,
    };
  });
  console.log("Precios actualizados:", preciosActualizados);

  // Sort: crea un nuevo array reordenando los elementos
  // En este caso de mayor a menor según el precio
  const nuevoArrayReordenado = controlStock.sort((el1, el2) => {
    if (el1.precio < el2.precio) {
      return 1;
    }
    if (el1.precio > el2.precio) {
      return -1;
    }
    return 0;
  });
  console.log("Nuevo array reordenado:", nuevoArrayReordenado);
}

// Función para quitar un producto del carrito
function quitar() {
  const codigoPrompt = prompt("Indique el código del producto a eliminar.");

  const productoEncontrado = enStock(codigoPrompt);

  if (productoEncontrado.cantidad > 1) {
    productoEncontrado.cantidad--;
    productoEncontrado.subtotal =
      productoEncontrado.cantidad * productoEncontrado.precio;
    alert("se redujo la cantidad del producto");

    listar();
    return;
  }
  if ((productoEncontrado.cantidad = 1)) {
    const indiceProducto = controlStock.indexOf(productoEncontrado);
    controlStock.splice(indiceProducto, 1);
    alert("Te quedaba uno, ya se acabaron");
    listar();
  } else {
    alert("No existen productos con ese código en el STOCK");
  }
}
