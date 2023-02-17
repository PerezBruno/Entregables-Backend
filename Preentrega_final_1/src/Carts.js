const fs = require("fs");

const ProductManager = require("./ProductManager");

const productManager = new ProductManager("./products/productos.json");

class Carts {
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  async generateIndex(listaCarros) {
    try {
      if (listaCarros.length === 0) return 1;
      return listaCarros[listaCarros.length - 1].id + 1;
    } catch (error) {
      console.log(
        "🚀 ~ file: armyManager.js:17 ~ ArmyManager ~ generateIndex ~ error",
        error
      );
    }
  }

  async createCart(id, products = []) {
    let listaCarros = JSON.parse(
      await fs.promises.readFile(this.path, "utf-8")
    );
    const newId = await this.generateIndex(listaCarros);
    try {
      listaCarros.push({
        id: newId,
        products,
      });
      await fs.promises.writeFile(this.path, JSON.stringify(listaCarros));
      return { message: "Carrito creado con exito" };
    } catch (error) {
      console.log(
        "🚀 ~ file: carros2.js:17 ~ Carts ~ createCart ~ error",
        error
      );
    }
  }

  // getCartById = async (id) => {
  //   try {
  //     let listaCarros = JSON.parse(
  //       await fs.promises.readFile(this.path, "utf-8")
  //     );
  //     const resultadoId = listaCarros.find((e) => e.id === id);
  //     if (resultadoId) {
  //       return resultadoId.products;
  //     } else {
  //       return {message: "Not found"};
  //     }
  //   } catch (error) {
  //     console.log(
  //       "🚀 ~ file: carros2.js:31 ~ Carts ~ getCartById= ~ error",
  //       error
  //     );
  //   }
  // };

  getCartById = async (id) => {
    try {
      let listaCarros = JSON.parse(
        await fs.promises.readFile(this.path, "utf-8")
      );
      const resultadoId = listaCarros.find((e) => e.id === id);
      console.log(
        "🚀 ~ file: Carts.js:51 ~ Carts ~ getCartById= ~ resultadoId",
        resultadoId
      );
      const lista = resultadoId.products;
      let nuevaLista = lista.map((registro) => registro.product)
      console.log(
        "🚀 ~ file: Carts.js:78 ~ Carts ~ getCartById= ~ nuevaLista",
        nuevaLista
      );

      if (resultadoId) {
        return resultadoId.products;
      } else {
        return { message: "Not found" };
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: carros2.js:31 ~ Carts ~ getCartById= ~ error",
        error
      );
    }
  };

  addProductInCartById = async (id, product) => {
    console.log(
      "🚀 ~ file: Carts.js:67 ~ Carts ~ addProductInCartById= ~ product",
      product
    );
    console.log(
      "🚀 ~ file: Carts.js:67 ~ Carts ~ addProductInCartById= ~ id",
      id
    );
    //let newProduct = await productManager.getProductById(product)
    //console.log("🚀 ~ file: Carts.js:66 ~ Carts ~ addProductInCartById= ~ newProduct", newProduct)
    try {
      let listaCarros = JSON.parse(
        await fs.promises.readFile(this.path, "utf-8")
      );

      let cartToUpdate = listaCarros.find((e) => e.id === id);

      let prod = cartToUpdate.products.find((e) => {
        return e.product === product;
      });
      if (!prod) {
        cartToUpdate.products.push({ product, quantity: 1 });
        await fs.promises.writeFile(this.path, JSON.stringify(listaCarros));
        console.log("Producto cargado correctamente");
      } else {
        let nuevaCantidad = prod.quantity + 1;
        let posicion = cartToUpdate.products.indexOf(prod);

        let edit = cartToUpdate.products.splice(posicion, 1, {
          product,
          quantity: nuevaCantidad,
        });
        console.log("Producto cargado correctamente");
        await fs.promises.writeFile(this.path, JSON.stringify(listaCarros));
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: carros2.js:45 ~ Carts ~ addProductToCartById= ~ error",
        error
      );
    }
  };
}

module.exports = Carts;

const nuevo = new Carts("../products/carrito.json");

const otroNuevo = new ProductManager("../products/Productos.json");

//otroNuevo.getProducts()
nuevo.getCartById(1);
