const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }


  async generateIndex(listaProductos) {
    try {
      if (listaProductos.length === 0) return 1;
      return listaProductos[listaProductos.length - 1].id + 1;
    } catch (error) {
      console.log(
        "🚀 ~ file: armyManager.js:17 ~ ArmyManager ~ generateIndex ~ error",
        error
      );
    }
  }


  async addProducts({ title, description, price, thumbnail, code, stock, id, status}) {
    const listaProductos = JSON.parse(await fs.promises.readFile(this.path, "utf-8"))
    const newId = await this.generateIndex(listaProductos);
    id = newId;
    status = true;
    const verificarCode = listaProductos.some((product) => {
      return product.code === code;
    });
    if (verificarCode) {
      console.log("El valor de code ya se encuentra asignado a otro producto");
    } else if (
      title != "" &&
      description != "" &&
      price != "" &&
      thumbnail != "" &&
      stock != "" &&
      title != undefined &&
      description != undefined &&
      price != undefined &&
      thumbnail != undefined &&
      stock != undefined &&
      code != "" &&
      code != undefined
    ) {
      try {
        console.log("producto cargado correctamente");
        listaProductos.push({
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
          status,
          id,
        });
        await fs.promises.writeFile(this.path, JSON.stringify(listaProductos));
      } catch (error) {
        console.log("Este es el error de la promesa escrituraAsync", error);
      }
    } else {
      console.log("Todos los parametros son requeridos");
    }
  }


  async getProducts() {
    try {
      const listaProductos = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
      console.log("🚀 ~ file: ProductManager.js:154 ~ ProductManager ~ getProducts ~ listaProductos", listaProductos)
      return listaProductos;
    } catch (error) {
      console.log(error);
    }
  }

  getProductById = async (id) => {
    this.products = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
    const resultadoId = this.products.find((e) => e.id === id);
    if (resultadoId) {
      return resultadoId;
    } else {
      return console.log("Product Not found");
    }
  };

  updateProduct = async (id, data) => {
    try {
      let productoAActualizar = await this.getProductById(id);
      let productoIndex = this.products.findIndex((e) => e.id === id);
      this.products[productoIndex] = {
        ...productoAActualizar,
        ...data,
        id: id,
      };
      await fs.promises.writeFile(this.path, JSON.stringify(this.products));
      console.log("Producto editado correctamente");
    } catch (error) {
      console.log(
        "🚀 ~ file: PerezBruno-Entregable_2.js:80 ~ ProductManager ~ updateProduct= ~ error",
        error
      );
    }
  };

  deleteProduct = async (id) => {
    try {
      this.products = JSON.parse(
        await fs.promises.readFile(this.path, "utf-8")
      );
      this.products = this.products.filter((prod) => prod.id !== id);
      await fs.promises.writeFile(this.path, JSON.stringify(this.products));
    } catch (error) {
      console.log(
        "🚀 ~ file: PerezBruno-Entregable_2.js:92 ~ deleteProduct ~ error",
        error
      );
    }
  };
}


module.exports = ProductManager;

// const nuevo = new ProductManager("../products/productos.json")


// const producto1={
//     title: "Producto 1",
//     description: "Este es el producto numero 1",
//     price: 1,
//     thumbnail: "no hay imagen",
//     code: 1,
//     stock: 1
// }

// const producto2={
//   title: "Producto 2",
//   description: "Este es el producto numero 1",
//   price: 1,
//   thumbnail: "no hay imagen",
//   code: 2,
//   stock: 1
// }

// //nuevo.addProducts(producto1)
// //console.log(nuevo.getProducts())


// const producto3={
//   title: "Producto 2",
//   description: "Este es el producto numero 1",
//   price: 1,
//   thumbnail: "no hay imagen",
//   code: 6,
//   stock: 1
// }

// nuevo.deleteProduct(2)

