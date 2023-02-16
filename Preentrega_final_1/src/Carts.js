const fs = require("fs");

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
      this.id = this.id + 1;
      console.log("Carrito creado con exito");
      await fs.promises.writeFile(this.path, JSON.stringify(listaCarros));
    } catch (error) {
      console.log(
        "🚀 ~ file: carros2.js:17 ~ Carts ~ createCart ~ error",
        error
      );
    }
  }

  getCartById = async (id) => {
    try {
      let listaCarros = JSON.parse(
        await fs.promises.readFile(this.path, "utf-8")
      );
      const resultadoId = listaCarros.find((e) => e.id === id);
      if (resultadoId) {
        return console.log(resultadoId.products);
      } else {
        return console.log("Not found");
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: carros2.js:31 ~ Carts ~ getCartById= ~ error",
        error
      );
    }
  };

  addProductInCartById = async (id, { product, quantity = 1 }) => {
    try {
      let listaCarros = JSON.parse(
        await fs.promises.readFile(this.path, "utf-8")
      );

      let cartToUpdate = listaCarros.find((e) => e.id === id);

      let prod = cartToUpdate.products.find((e) => {
        return e.product === product;
      });
      if (!prod) {
        cartToUpdate.products.push({ product, quantity });
        await fs.promises.writeFile(this.path, JSON.stringify(listaCarros));
        console.log("Producto cargado correctamente");
      } else {
        let nuevaCantidad = prod.quantity + 1;
        let posicion = cartToUpdate.products.indexOf(prod);

        let edit = cartToUpdate.products.splice(posicion, 1, {
          product,
          quantity: Number(nuevaCantidad),
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

  // addProductInCartById = async (id, data) => {
  //   try {
  //     let cartToUpdate = listaCarros.find((e) => e.id === id);
  //     cartToUpdate.products.push(data)
  //     await fs.promises.writeFile(listaCarros1, JSON.stringify(listaCarros));
  //     console.log("Producto cargado correctamente");
  //   } catch (error) {
  //     console.log(
  //       "🚀 ~ file: carros2.js:45 ~ Carts ~ addProductToCartById= ~ error",
  //       error
  //     );
  //   }
  // };
}

module.exports = Carts;

// const carritos = new Carts("../products/carrito.json");

// //carritos.createCart();

//  // console.log(listaCarros);

// // carritos.createCart();

// // console.log("segundo carro", listaCarros);

// //carritos.getCartById(1)

// const producto1 = {
//   product: 125,
// };

// const producto2 = {
//   product: 300,
// };

// //carritos.getCartById(2)
// const producto3 = {
//   product: 600,
// };

// //carritos.addProductInCartById(2, producto2);
// //  carritos.addProductInCartById(2, producto3);

// // //

// // carritos.addProductInCartById(1, producto2);

// // carritos.addProductInCartById(2, producto3);
// // carritos.addProductInCartById(2, producto2);

// carritos.getCartById(1)
