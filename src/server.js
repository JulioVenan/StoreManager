const express = require('express');
const app = require('./app');
require('dotenv').config();

const productsController = require('./controllers/products.controller');

app.use(express.json());
app.get('/products', productsController.getAll);
app.get('products/:id', productsController.getById);
// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
