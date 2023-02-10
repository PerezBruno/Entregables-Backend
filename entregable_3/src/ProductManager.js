const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.id = 10;
  }

  async addProducts({ title, description, price, thumbnail, code, stock, id }) {
    id = this.id;
    const verificarCode = this.products.some((product) => {
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
        this.products.push({
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
          id,
        });

        this.id = this.id + 1;
        await fs.promises.writeFile(this.path, JSON.stringify(this.products));
      } catch (error) {
        console.log("Este es el error de la promesa escrituraAsync", error);
      }
    } else {
      console.log("Todos los parametros son requeridos");
    }
  }

  async getProducts() {
    try {
      JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
    } catch (error) {
      console.log(error);
    }
  }

  getProductById = async (id) => {
    this.products = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
    const resultadoId = this.products.find((e) => e.id === id);
    if (resultadoId) {
      return console.log(resultadoId);
    } else {
      return console.log("Not found");
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