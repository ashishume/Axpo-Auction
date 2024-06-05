const express = require("express");
const router = express.Router();
const Product = require("../models/Products");
// const Cart = require("../models/Cart");
const authenticateToken = require("../controllers/authMiddleware");

// Create and save a new product
router.post("/product", async (req, res) => {
  // try {
  //   const { name, category, brand, quantity, price, image, description } = req.body;
  //   const newProduct = new Product({ name, category, brand, quantity, price, image, description });
  //   await newProduct.save();
  //   res.status(201).json({ message: "product added", product: req.body });
  // } catch (error) {
  //   res.status(500).json({ message: error.message });
  // }
});

/** insert multple products */
router.post("/products", async (req, res) => {
  // try {
  //   const validatedProducts = [];
  //   for (const product of req.body) {
  //     const productModel = new Product(product);
  //     const validationResult = productModel.validateSync();
  //     if (validationResult) {
  //       console.error(`Invalid product: ${validationResult.message}`);
  //       res.status(500).json({ message: error.message });
  //     } else {
  //       validatedProducts.push(product);
  //     }
  //   }

  //   if (validatedProducts.length > 0) {
  //     const insertedProducts = await Product.insertMany(validatedProducts);
  //     res.status(201).json({ message: "products added" });
  //   } else {
  //     res.status(500).json({ message: "No valid products to insert" });
  //     console.error("No valid products to insert");
  //   }
  // } catch (error) {
  //   res.status(500).json({ message: error.message });
  // }
});

/** fetch multple products */
router.get("/products", authenticateToken, async (req, res) => {
  // try {
  //   const products = await Product.find().select("-__v");
  //   res.status(200).json(products);
  // } catch (error) {
  //   res.status(500).json({ message: error.message });
  // }
});
/** fetch category products */
router.get("/products/:categoryId", authenticateToken, async (req, res) => {
  // try {
  //   const { categoryId } = req.params;
  //   const products = await Product.find({
  //     category: categoryId,
  //   })
  //     .populate({
  //       path: "category",
  //     })
  //     .select("-__v");
  //   res.status(200).json(products);
  // } catch (error) {
  //   res.status(500).json({ message: error.message });
  // }
});
/** fetch one products */
router.get("/product/:id", authenticateToken, async (req, res) => {
  // try {
  //   const { id } = req.params;
  //   const product = await Product.findById(id)
  //     .populate({
  //       path: "category",
  //     })
  //     .select("-__v");
  //   res.status(200).json(product);
  // } catch (error) {
  //   res.status(500).json({ message: error.message });
  // }
});

/** check if product is already to cart or not */
router.get("/product/added-to-cart/:userId/:productId", authenticateToken, async (req, res) => {
  // try {
  //   const { userId, productId } = req.params;
  //   const cartData = await Cart.findOne({ user: userId, product: productId });
  //   if (cartData) {
  //     res.status(200).json(true);
  //   } else {
  //     res.status(200).json(false);
  //   }
  // } catch (error) {
  //   res.status(500).json({ message: error.message });
  // }
});

module.exports = router;
