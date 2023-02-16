const express = require("express");

const productRoutes = require("./routes/product.routes")

const cartsRoutes = require("./routes/carts.routes")

// const ProductManager = require("../src/ProductManager")

// const Carts = require("../src/Carts")

const BASE_PREFIX = "api";

//const listaProductos = require("../products/producs.json");

const PORT = 8080;

const app = express();

// const productManager = new ProductManager("./products/productos.json")
// console.log("🚀 ~ file: app.js:12 ~ productManager", productManager)

// const carts = new Carts("./products/carrito.json")
// console.log("🚀 ~ file: app.js:15 ~ carts", carts)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(`/${BASE_PREFIX}/products` , productRoutes);

app.use(`/${BASE_PREFIX}/carts` , cartsRoutes);


//   app.get('/products', async (req, res) => {
//    // const limit = Number(req.query.limit);
//     const products = await productManager.getProducts();
//     console.log("🚀 ~ file: app.js:22 ~ app.get ~ products", products)
// try {
//       return res.json({products});
// } catch (error) {
//   console.log("🚀 ~ file: app.js:25 ~ app.get ~ error", error)
  
// }
//    // if (limit) return res.status(200).json(products.slice(0, limit));
//    // res.status(200).json(products);
//   });


//   app.get('/products/:pid', async (req, res) => {
//     const id = Number(req.params.pid);
//     const product = await productManager.getProductById(id);
//     if (!product) return res.status(404).json({ message: '[!] Product not found' });
//     res.status(200).json(product);
//   });




  app.listen(PORT, () => {
    console.log(`API corriendo en el puerto ${PORT}`);
  });
  