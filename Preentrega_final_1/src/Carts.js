const fs = require("fs");

const listaCarros1 = "../products/carrito.json";
let listaCarros = [];

class Carts {
  constructor() {
    this.products = [];
    this.id = 1;
  }

  async createCart(id, products) {
    id = this.id;
    products = [];
    try {
      listaCarros.push({
        id,
        products,
      });
      this.id = this.id + 1;
      await fs.promises.writeFile(listaCarros1, JSON.stringify(listaCarros));
    } catch (error) {
      console.log(
        "🚀 ~ file: carros2.js:17 ~ Carts ~ createCart ~ error",
        error
      );
    }
  }

  getCartById = async (id) => {
    try {
      listaCarros = JSON.parse(
        await fs.promises.readFile(listaCarros1, "utf-8")
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

  // updateProductInCartById = async (id, data) => {
  //   //falta buscar el id del producto a actualizar
  //   try {
  //     // let cartToUpdate = listaCarros.find((e) => e.id === id);
  //     let productoIndex = listaCarros.findIndex((e) => e.id === id);
  //     listaCarros[productoIndex].products = {
  //       ...data,
  //     };
  //     await fs.promises.writeFile(listaCarros1, JSON.stringify(listaCarros));
  //     console.log("Producto editado correctamente");
  //   } catch (error) {
  //     console.log(
  //       "🚀 ~ file: carros2.js:45 ~ Carts ~ addProductToCartById= ~ error",
  //       error
  //     );
  //   }
  // };


  addProductInCartById = async (id, {product, quantity = 1}) => {

    try {

      let listaCarros = JSON.parse( await fs.promises.readFile(listaCarros1, "utf-8"));

      let cartToUpdate = listaCarros.find((e) => e.id === id);
      
      let prod = cartToUpdate.products.find((e)=> e.product === product)

      if(!prod){
      cartToUpdate.products.push({product, quantity})
      await fs.promises.writeFile(listaCarros1, JSON.stringify(listaCarros));
      console.log("Producto cargado correctamente");
      }else if (prod){
        let nuevaCantidad = prod.quantity + 1;
        console.log("🚀 ~ file: Carts.js:84 ~ Carts ~ addProductInCartById= ~ nuevaCantidad", nuevaCantidad)
        let posicion = cartToUpdate.products.indexOf(prod)
        console.log("🚀 ~ file: Carts.js:85 ~ Carts ~ addProductInCartById= ~ posicion", posicion)

        let edit = cartToUpdate.products.splice(posicion, 1, {product, quantity: Number(nuevaCantidad)})
        console.log("🚀 ~ file: Carts.js:89 ~ Carts ~ addProductInCartById= ~ edit", edit)
        await fs.promises.writeFile(listaCarros1, JSON.stringify(listaCarros));

        console.log("Estamos acá!!!!!!!!!!!!!1")
        console.log("🚀 ~ file: Carts.js:88 ~ Carts ~ addProductInCartById= ~ prod", prod)
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

const carritos = new Carts();

// carritos.createCart();

// // console.log(listaCarros);

// carritos.createCart();

// console.log("segundo carro", listaCarros);

//carritos.getCartById(1)

const producto1 = {
  product: 125,
  quantity: 2,
};
// carritos.updateProductInCartById(2, producto1);

const producto2 = {
  product: 300,
  quantity: 6,
};

// carritos.updateProductInCartById(1, producto2);

//carritos.getCartById(2)
const producto3 = {
  product: 600,
};

 //carritos.addProductInCartById(2, producto2);
 carritos.addProductInCartById(2, producto3);


// //

// carritos.addProductInCartById(1, producto2);




// carritos.addProductInCartById(2, producto3);
// carritos.addProductInCartById(2, producto2);

//carritos.getCartById(2)