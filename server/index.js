import * as dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { findOneProduct, findManyProducts } from './db/products.js';
import { findStyles } from './db/styles.js';
import { findRelated } from './db/related.js';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// GET product info
app.get('/products/:product_id', (req, res) => {
  const id = req.params.product_id;
  console.log(id);
  return findOneProduct(id)
    .then((product) => {
      res.json(product);
    })
    .catch((err) => err);
});

// GET product styles
app.get('/products/:product_id/styles', (req, res) => {
  const id = req.params.product_id;
  return findStyles(id)
    .then((styles) => {
      const result = {
        product_id: id,
        results: styles,
      };
      res.end(result);
    })
    .catch((err) => err);
});

// GET related products
app.get('/products/:product_id/related', (req, res) => {
  const id = req.params.product_id;
  return findRelated(id)
    .then((related) => {
      res.end(related);
    })
    .catch((err) => err);
});

// GET products
app.get('/products', async (req, res) => {
  const page = req.params.page || 1;
  const count = req.params.count || 5;
  const total = req.params.page * req.params.count;
  findManyProducts(total)
    .then((products) => {
      res.send(products);
    })
    .catch((err) => err);
});

app.get('/loaderio-d369f42818799ec71faac3249c8f34be', (req, res) => {
  res.send('loaderio-d369f42818799ec71faac3249c8f34be');
})

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
