const express = require("express");

const path = require ("path")

const productRoutes = require("./routes/product.routes")

const cartsRoutes = require("./routes/carts.routes")

const handlebars = require("express-handlebars")

const { Server } = require("socket.io")

const ProductManager = require ("./ProductManager")

const app = express();

const PORT = 8080;

const httpServer = app.listen(PORT, () => {
  console.log(`API corriendo en el puerto ${PORT}`);
});
const socketServer = new Server(httpServer);

const productManager = new ProductManager("../products/productos.json")


const BASE_PREFIX = "api";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(`/${BASE_PREFIX}/products` , productRoutes);
app.use(`/${BASE_PREFIX}/carts` , cartsRoutes);

//configuración de handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(`${__dirname}/views`));
app.set("view engine", "handlebars");


app.get('/realtimeproducts', async (req, res) => res.status(200).render('realTimeProducts'));

socketServer.on('connection', async socket => {
	console.log('Nuevo cliente conectado');

	const products = await productManager.getProducts();
	socket.emit('products', products);

	socket.on('addProd', async prod => await productManager.addProducts(prod));

	socket.on('delProd', async id => await productManager.deleteProduct(id));
});
  

//Configurar e instalar handlebars - listo


// Configurar e instalar socket


//Crear vista home.handlebars debe mostrar todos los productos agregados hasta el momento


//Crear la vista realTimeProducts.handlebars con el endpoint "/realtimeproducts" en nuestro views router
//Debe contener la misma lista de productod pero debe trabajar con websocket
//Cada vez que se actualice la lista de productos se debe actualizar la vista automáticamente

//Para manipular las listas de productos, crear una vista simple de un formulario en la vista realTimeProducts.handlebars

//Si se desea hacer la conexion de socket emits con HTTP, deberas buscar la forma de utilizar el servidor "io" de sockets dentro de la petición POST