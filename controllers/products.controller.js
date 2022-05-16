const path = require('path');
const express = require('express');
const Products = require('../models/products.model');
const Router = express.Router();

//Insert

Router.post(
  '/insert',
    async (req, res) => {
      try {
        let product = new Products({
          product: req.body.product,  
          items: req.body.items, 
          price: req.body.price,
          image: req.body.image,
        });
      await product.save();
      res.send('Product details uploaded successfully.');
      } catch (error) {
        res.status(400).send('Error while uploading Product details. Try again later.');
      }
    },
    (error, req, res, next) => {
      if (error) {
        res.status(500).send(error.message);
      }
    }
);


//////////////////////////////////////////
// get product details

Router.get('/getAllProducts', async (req, res) => {
  try {
    const files = await Products.find({});
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send('Error while getting list of Products. Try again later.');
  }
});



////////////////////////////////////


//Update
Router.put("/:id", async (req, res) => {
  try {
    let product = await Products.findById(req.params.id);
    const data = {
      product: req.body.product || product.product,
      items: req.body.items || product.items,
      price: req.body.price || product.price,
      image: req.body.image || product.image,
    };
    product = await Products.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(product);
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

//////////////////////////////////////

//Delete
Router.delete("/:id", async (req, res) => {
  try {
    // Find product by id
    const product = await Products.findById(req.params.id);
    if (!product) throw Error('No file found');
    const removed = await product.remove();
    if (!removed)
         throw Error('Something went wrong while trying to delete the file');
    res.json(product);
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});


module.exports = Router;