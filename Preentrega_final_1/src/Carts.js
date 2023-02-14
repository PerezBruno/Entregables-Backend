const fs = require("fs");

class Carts {
  id = 1;
  constructor(path) {
    this.path = path;
    this.products = [];
    //this.id = id;
    this.id++;
  }
  async addProducts({id, quantity}) {
    if (!fs.existsSync(this.path)) {
      try {
        this.products.push({
            id,
            quantity
        });
        await fs.promises.writeFile(this.path, JSON.stringify(this.products));
      } catch (error) {
        console.log(
          "🚀 ~ file: Carts.js:22 ~ Carts ~ addProducts ~ error",
          error
        );
      }
    } else {

    }
  }
  
  async getCartsProducts() {
    try {
      JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
    } catch (error) {
      console.log(error);
    }
  }
}
//   getProductById = async (id) => {
//     this.products = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
//     const resultadoId = this.products.find((e) => e.id === id);
//     if (resultadoId) {
//       return console.log(resultadoId);
//     } else {
//       return console.log("Not found");
//     }
//   };

//   updateProduct = async (id, data) => {
//     try {
//       let productoAActualizar = await this.getProductById(id);
//       let productoIndex = this.products.findIndex((e) => e.id === id);
//       this.products[productoIndex] = {
//         ...productoAActualizar,
//         ...data,
//         id: id,
//       };
//       await fs.promises.writeFile(this.path, JSON.stringify(this.products));
//       console.log("Producto editado correctamente");
//     } catch (error) {
//       console.log(
//         "🚀 ~ file: PerezBruno-Entregable_2.js:80 ~ ProductManager ~ updateProduct= ~ error",
//         error
//       );
//     }
//   };

//   deleteProduct = async (id) => {
//     try {
//       this.products = JSON.parse(
//         await fs.promises.readFile(this.path, "utf-8")
//       );
//       this.products = this.products.filter((prod) => prod.id !== id);
//       await fs.promises.writeFile(this.path, JSON.stringify(this.products));
//     } catch (error) {
//       console.log(
//         "🚀 ~ file: PerezBruno-Entregable_2.js:92 ~ deleteProduct ~ error",
//         error
//       );
//     }
//   };
// }

//module.exports = Carts;
const carrito = new Carts("../carrito.json");

const producto = {
  id: 1,
  quantity: 2,
};
const producto2 = {
  id: 3,
  quantity: 2,
};
carrito.addProducts(producto);
console.log(carrito.products);

// carrito.addProducts(producto2);
// console.log(carrito.products);

const carrito2 = new Carts("../carrito.json");
carrito2.addProducts(producto2);
// console.log(carrito2.products);
