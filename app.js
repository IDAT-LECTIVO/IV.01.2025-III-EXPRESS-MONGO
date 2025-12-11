const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')


const app = express()
app.use(express.json())
app.use(cors())

// coneccion a mongodb
// mongodb://nraboy:password1234@127.0.0.1:27017/tiendita_don_pepe?authSource=admin


mongoose.connect("mongodb://nraboy:password1234@127.0.0.1:27017/tiendita_don_pepe?authSource=admin")
    .then(() => console.log("Coneccion a mongo db"))
    .catch(err => console.error("Error al conectar", err));



// crear una entidad
const Productos = mongoose.model('Productos', new mongoose.Schema({
    nombre: String,
    precio: String,
    categoria: String,
    imagen: String,
}))


// CRUD

app.post('/productos', async (req, res) => {
    const { nombre, precio, categoria, imagen } = req.body
    const productos = await Productos.create({ nombre, precio, categoria, imagen })
    res.json(productos)
})

app.get('/productos', async (req, res) => {
    const productos = await Productos.find()
    res.json(productos)
})

app.put('/productos/:id', async (req, res) => {
    const { id } = req.params
    const { nombre, precio, categoria } = req.body
    const producto = await Productos.findByIdAndUpdate(id, {
        nombre: nombre,
        precio: precio,
        categoria: categoria,
        imagen: imagen
    }, { new: true })
    res.json(producto)
})

app.delete('/productos/:id', async (req, res) => {
    const { id } = req.params
    const producto = await Productos.findByIdAndDelete(id)

    if (!producto) {
        res.json({
            succes:false,
            mensaje: "Producto no encontrado"
        })
    }

    res.json(producto)
})

// exponer servidor
app.listen(3001, () => {
    console.log(`Example app listening on port ${3001}`)
})


