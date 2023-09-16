// Variables globales
const stockGlitter = [];

const dorado020 = {
  nombre: "Dorado-020",
  tipo: "polvo",
  color: "Dorado",
  gramaje: 20,
  peso: 100,
  precio: 2500,
};
const azul040 = {
  nombre: "Azul-040",
  tipo: "polvo",
  color: "Azul",
  gramaje: 40,
  peso: 100,
  precio: 2500,
};
const rojo060 = {
  nombre: "Rojo-060",
  tipo: "gel",
  color: "Rojo",
  gramaje: 60,
  peso: 250,
  precio: 1000,
};
const holografico080 = {
  nombre: "Holografico-080",
  tipo: "polvo",
  color: "Plateado Holográfico ",
  gramaje: 80,
  peso: 1,
  precio: 100,
};

stockGlitter.push(dorado020);
stockGlitter.push(azul040);
stockGlitter.push(rojo060);
stockGlitter.push(holografico080);

// Función que se encargue de buscar si un producto existe en nuestro carrito (array)
function enStockglitter(nombrePrompt) {
  // Find: busca un elemento que cumpla la condición (en este caso el nombre del
  // del producto con el nombre introducido en el prompt) y devuelve el elemento
  // o undefined si no lo encuentra
  return stockGlitter.find((producto) => producto.nombre == nombrePrompt);
}

// Función para buscar productos
function buscar() {
  const keyword = prompt("indique el nombre del Glitter a buscar");
  // Me va a retornar un array con todos los elementos que contengan
  // la variable "keyword" (string) que lo define el usuario por el prompt
  const arrayResultados = stockGlitter.filter((el) =>
    // toLowerCase convierte un string en minúsculas
    el.nombre.toLowerCase().includes(keyword.toLowerCase())
  );
  console.log(arrayResultados);
}

// Función para agregar un producto al carrito
function agregar() {
  // Pido por prompt los datos del producto
  const tipoPrompt = prompt("indique el tipo de Glitter:/n-polvo/n-gel");
  const nombrePrompt = prompt("Introduzca el nombre del glitter:");
  const precioPrompt = prompt("Introduzca el precio del glitter:");
  const gramajePrompt = prompt("¿Cuál es el gramaje del producto?");

  // Creo un objeto con los datos obtenidos del prompt

  const nuevoGlitter = {
    tipo: tipoPrompt,
    nombre: nombrePrompt,
    precio: parseInt(precioPrompt),
    gramaje: parseInt(gramajePrompt),
    peso: 100,
  };

  const productoEncontrado = enStockglitter(nombrePrompt);

  if (productoEncontrado) {
    productoEncontrado.peso;
    productoEncontrado.precio =
      productoEncontrado.precio * productoEncontrado.peso;
  } else {
    // Push agrega el producto en el array
    stockGlitter.push(nuevoGlitter);
  }

  // Mensaje de alert exitoso
  alert("El Glitter " + nombrePrompt + " fue agregado al stock.");
  listar();
}

// Función para listar los productos del carrito
function listar() {
  console.clear();
  console.log("Productos que hay stock:");

  // Recorremos los elementos del array carrito
  stockGlitter.forEach((producto) => {
    console.log("----------");
    console.log("Tipo de Glitter:", producto.tipo);
    console.log("Nombre:", producto.nombre);
    console.log("Precio:", producto.precio);
    console.log("Peso:", producto.peso);
    console.log("Gramaje:", producto.gramaje);
  });

  // Reduce: Recorre cada elemento y va acumulando una suma de una propiedad
  // del elemento, en este caso el precio
  const totalPesos = stockGlitter.reduce((acu, el) => acu + el.precio, 0);
  console.log("TOTAL DEL CARRITO: $", totalPesos);

  // Map: crea un nuevo array transformando los elementos. En este caso
  // le agregamos el IVA a los precios
  const preciosActualizados = stockGlitter.map((producto) => {
    return {
      nombre: producto.nombre,
      precio: producto.precio * 1.25,
      cantidad: producto.peso,
    };
  });
  console.log("Precios actualizados:", preciosActualizados);

  // Sort: crea un nuevo array reordenando los elementos
  // En este caso de mayor a menor según el precio
  const nuevoArrayReordenado = stockGlitter.sort((el1, el2) => {
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
  const nombrePrompt = prompt("¿Qué producto querés quitar?");

  const productoEncontrado = enStockglitter(nombrePrompt);

  if (productoEncontrado) {
    const indiceProducto = stockGlitter.indexOf(productoEncontrado);
    // Una vez obtenemos el índice, lo volamos con splice
    stockGlitter.splice(indiceProducto, 1);
    // Mostramos un mensaje al usuario que se ha borrado el producto del carrito
    alert(
      "El producto " + productoEncontrado.nombre + " fue borrado del carrito."
    );
    listar();
  } else {
    alert("No se encontró el producto " + nombrePrompt + " en el carrito.");
  }
}
