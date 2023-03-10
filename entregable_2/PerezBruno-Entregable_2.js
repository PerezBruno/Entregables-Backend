const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.id = 1;
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
      JSON.parse(await fs.promises.readFile(this.path, "utf-8")
      );
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


  updateProduct = async (id, data) =>{
    try {
      let productoAActualizar = await this.getProductById(id)
      let productoIndex = this.products.findIndex(e => e.id === id);
		  this.products[productoIndex] = { ...productoAActualizar, ...data, id:id};
		  await fs.promises.writeFile(this.path, JSON.stringify(this.products));
      console.log("Producto editado correctamente")
    } catch (error) {
      console.log("???? ~ file: PerezBruno-Entregable_2.js:80 ~ ProductManager ~ updateProduct= ~ error", error)
      
    }
  }


  deleteProduct = async(id) =>{
    try{
    this.products = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
		this.products = this.products.filter(prod => prod.id !== id);
    await fs.promises.writeFile(this.path, JSON.stringify(this.products));
  }catch(error){
  console.log("???? ~ file: PerezBruno-Entregable_2.js:92 ~ deleteProduct ~ error", error)
  }
}


}

//****************Proceso de Testing*****************

//Se crear?? una instancia de la clase ???ProductManager???

const adminProduct = new ProductManager("BaseDeDatos.json");

// Se llamar?? ???getProducts??? reci??n creada la instancia, debe devolver un arreglo vac??o []

adminProduct.getProducts()// no existe el archivo a??n

/*
Se llamar?? al m??todo ???addProduct??? con los campos:
title: ???producto prueba???
description:???Este es un producto prueba???
price:200,
thumbnail:???Sin imagen???
code:???abc123???,
stock:25
 */

 adminProduct.addProducts({
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc1234",
  stock: 25,
});

// //Se llamar?? el m??todo ???getProducts??? nuevamente, esta vez debe aparecer el producto reci??n agregado

adminProduct.getProducts()

// se llamar?? al m??todo "getProducById()" y se corroborar?? de que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error.

adminProduct.getProductById(1)


adminProduct.getProductById(3)


 // Se llamar?? al m??todo ???updateProduct()??? y se intentar?? cambiar el campo de alg??n producto, se evaluar?? que no se elimine el id y que se haya hecho la actualizaci??n

const porductoActualizado = {
  title: "producto Actualizado",
  description: "ACTUALIZACION",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc1234",
  stock: 25,
}

adminProduct.updateProduct(1, porductoActualizado)


// se llamar?? al m??todo "deleteProduct", se evaluara que realmente se elimine el producto o que arroje un error en caso de no existir.

adminProduct.deleteProduct(1)
