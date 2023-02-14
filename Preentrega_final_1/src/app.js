const express = require("express");

const ProductManager = require("../src/ProductManager")

//const listaProductos = require("../products/producs.json");

const PORT = 8080;

const app = express();

const productManager = new ProductManager("./products/products.json")
console.log("🚀 ~ file: app.js:12 ~ productManager", productManager)

// app.get(`/products`, (req, res) => {
//     return res.json(listaProductos);
//   });
app.use(express.urlencoded({ extended: true }));


  app.get('/products', async (req, res) => {
   // const limit = Number(req.query.limit);
    const products = await productManager.getProducts();
    console.log("🚀 ~ file: app.js:22 ~ app.get ~ products", products)
try {
      return res.json({products});
} catch (error) {
  console.log("🚀 ~ file: app.js:25 ~ app.get ~ error", error)
  
}
   // if (limit) return res.status(200).json(products.slice(0, limit));
   // res.status(200).json(products);
  });


  app.get('/products/:pid', async (req, res) => {
    const id = Number(req.params.pid);
    const product = await productManager.getProductById(id);
    if (!product) return res.status(404).json({ message: '[!] Product not found' });
    res.status(200).json(product);
  });




  app.listen(PORT, () => {
    console.log(`API corriendo en el puerto ${PORT}`);
  });
  