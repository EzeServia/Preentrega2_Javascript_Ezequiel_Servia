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
function agregar() {
  // Pido por prompt el código del producto
  const codigoPrompt = prompt("Introduzca el código del producto:");
  const valorEnMayusculas = codigoPrompt.toUpperCase();

  // Busco si el producto ya existe en el stock
  const productoExistente = enStock(valorEnMayusculas);

  if (productoExistente) {
    // Si el producto existe, pido el precio actualizado
    const precioPrompt = prompt("Introduzca el precio actualizado:");
    const precioActualizado = parseFloat(precioPrompt);

    if (!isNaN(precioActualizado)) {
      // Pido la cantidad a agregar
      const cantidadPrompt = prompt("Introduzca la cantidad a agregar:");
      const cantidad = parseInt(cantidadPrompt);

      if (!isNaN(cantidad)) {
        // Actualizo el precio y la cantidad
        productoExistente.precio = precioActualizado;
        productoExistente.cantidad += cantidad;
        productoExistente.subtotal =
          productoExistente.cantidad * precioActualizado;
        alert("Producto actualizado en el stock.");
      } else {
        alert("Por favor, ingrese una cantidad válida.");
      }
    } else {
      alert("Por favor, ingrese un precio válido.");
    }
  } else {
    // Si el producto no existe, pido las variables adicionales
    const colorPrompt = prompt("Introduzca el color del brillo:");
    const gramajePrompt = prompt("Introduzca el gramaje del producto:");
    const precioPrompt = prompt("Introduzca el precio del producto:");
    const cantidadPrompt = prompt("Introduzca la cantidad a agregar:");

    const precio = parseFloat(precioPrompt);
    const gramaje = parseFloat(gramajePrompt);
    const cantidad = parseInt(cantidadPrompt);

    if (!isNaN(precio) && !isNaN(gramaje) && !isNaN(cantidad)) {
      const nuevoProducto = {
        codigo: codigoPrompt,
        color: colorPrompt,
        gramaje: gramaje,
        precio: precio,
        subtotal: precio * cantidad,
        cantidad: cantidad,
      };
      // Agrego el nuevo producto al stock
      controlStock.push(nuevoProducto);
      alert("Producto agregado al stock.");
    } else {
      alert(
        "Por favor, ingrese valores numéricos válidos para el precio, gramaje y cantidad."
      );
    }
  }
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

function quitar() {
  const codigoPrompt = prompt("Indique el código del producto a eliminar.");
  const valorEnMayusculas = codigoPrompt.toUpperCase();

  const productoEncontrado = enStock(valorEnMayusculas);

  if (productoEncontrado) {
    // Muestra el color y la cantidad del producto en el stock
    alert(
      "El producto se encuentra en el STOCK, es de color " +
        productoEncontrado.color +
        "y hay almacenados " +
        productoEncontrado.cantidad +
        " unidades."
    );

    // Pide la cantidad que deseas eliminar
    const cantidadEliminarPrompt = prompt(
      "Ingrese la cantidad que desea eliminar"
    );
    const cantidadEliminar = parseInt(cantidadEliminarPrompt);

    if (
      !isNaN(cantidadEliminar) &&
      cantidadEliminar > 0 &&
      cantidadEliminar <= productoEncontrado.cantidad
    ) {
      if (productoEncontrado.cantidad > 1) {
        productoEncontrado.cantidad -= cantidadEliminar;
        productoEncontrado.subtotal =
          productoEncontrado.cantidad * productoEncontrado.precio;
        alert(`Se han eliminado ${cantidadEliminar} unidades del producto.`);
      } else {
        const indiceProducto = controlStock.indexOf(productoEncontrado);
        controlStock.splice(indiceProducto, 1);
        alert("Te quedaba uno, ya se acabaron");
      }
    } else {
      alert(
        "La cantidad ingresada no es válida o excede la cantidad en stock."
      );
    }
    listar();
  } else {
    alert("No existen productos con ese código en el STOCK");
  }
}
