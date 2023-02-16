const { Router } = require("express");

const ProductManager = require("../../src/ProductManager")

const productManager = new ProductManager("./products/productos.json")
console.log("🚀 ~ file: app.js:12 ~ productManager", productManager)


const router = Router();


// debe listar todos los productos incluir limit
router.get(`/`, async (req, res) => {
    const products = await productManager.getProducts()
    const limit = Number(req.query.limit);
     if(limit) {
       return res.status(200).json(products.slice(0, limit));
     } else 
     return res.status(200).json(products);
 })
 
 //debe traer sólo el producto seleccionado
 router.get("/:pid", async (req, res) => {
    const id = Number(req.params.pid);
    const product = await productManager.getProductById(id);
    if (!product){
      return res.status(404).json(product);
    }else{
      res.status(200).json(product);
    }
  });

  // debe agregar nuevos productos
  router.post(`/`, async (req, res) => {

  });
 

  //toma un producto y lo actualiza
   router.put(`/`, async (req, res) => {

   });


   //elimina un producto
   router.delete(`/:pid`, async (req, res) => {
    
   });

 
 
 module.exports = router;
 

 