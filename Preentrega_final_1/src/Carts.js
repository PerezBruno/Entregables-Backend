const fs = require("fs");
const path = "../carro.json"

class Carts {
  constructor() {
    this.id = 3;
    this.products = [];
  }
static getCartById(id){
return 
}



  async addProducts({id, quantity}){
    try {
       this.products.push({
        id,
        quantity
      })
    } catch (error) {
    console.log("🚀 ~ file: Carts.js:31 ~ Carts ~ addProducts ~ error", error)
    }
  }

  getCartById = async (id) => {
    try {
      const resultadoId = this.id.find((e) => e === id);
      if (resultadoId) {
        return resultadoId;
      } else {
        return console.log("Not found");
      }
      
    } catch (error) {
      console.log("🚀 ~ file: Carts.js:27 ~ Carts ~ getCartById= ~ error", error)
      
    }
  }

  getProductById = async (id) => {
    // this.products = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
    try {
      const resultadoId = this.products.find ((e) => e.id === id);
      if (resultadoId) {
        return resultadoId;
      } else {
        return console.log("Not found");
      }
    } catch (error) {
      console.log("🚀 ~ file: Carts.js:31 ~ Carts ~ getProductById= ~ error", error)
      
    }

  };
}





const carrito1 = new Carts()
console.log("🚀 ~ file: Carts.js:17 ~ carrito1", carrito1)


const prod1 = {
  id:1,
  quantity:3
}

// const prod2 = {
//   id:6,
//   quantity:2
// }
carrito1.addProducts(prod1)
// carrito1.addProducts(prod2)

console.log("🚀 ~ file: Carts.js:25 ~ carrito1", carrito1.products)


// //  carrito1.getCartById(3)

// // const carrito2 = new Carts(path)
// // carrito2.addProducts(prod1)
// // carrito2.addProducts(prod2)

// // console.log("🚀 ~ file: Carts.js:35 ~ carrito2", carrito2.products)

// console.log(carrito1.getProductById(6))

// // carrito2.getProductById(8)
