const fastcsv = require("fast-csv");
const productSchema = require("../models/productSchema");

module.exports = {
  // Product creation API
  createProducts: async (req, res) => {
    try {
      const productData = new productSchema(req.body);
      await productData.save();
      res.status(201).json({
        success: true,
        message: "Product created successfully",
        createdProduct: productData,
      });
    } catch (error) {
      // Handle any potential errors and return an error response
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Function to download products as CSV
  // Implemented pagination
  downloadProductsCSV: async (req, res) => {
    try {
      // Define default page and limit values
      const defaultPage = 1;
      const defaultLimit = 10;
      // Parse page and limit as integers
      const pageNumber = parseInt(defaultPage);
      const limitNumber = parseInt(defaultLimit);
      const skip = (pageNumber - 1) * limitNumber;
      // Fetch products with pagination
      const products = await productSchema.find().skip(skip).limit(limitNumber);
      // Create a writable stream for CSV
      const csvStream = fastcsv.format({ headers: true }).transform((doc) => ({
        Name: doc.productName,
        Price: doc.productPrice.toFixed(2),
        Quantity: doc.productQuantity,
      }));
      // Set headers for CSV download
      res.setHeader("Content-disposition", "attachment; filename=products.csv");
      res.setHeader("Content-type", "text/csv");
      res.status(200);
      // Pipe the CSV data to the response
      csvStream.pipe(res);
      products.forEach((product) => {
        csvStream.write(product);
      });
      csvStream.end();
    } catch (error) {
      // Handle any potential errors and return an error response
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // This API is not necessary because MongoDb already saves data in JSON format
  // Implemented pagination
  downloadProductsJSON: async (req, res) => {
    try {
      // Define default page and limit values
      const defaultPage = 1;
      const defaultLimit = 10;
      // Fetch products with default pagination
      const products = await productSchema
        .find()
        .skip((defaultPage - 1) * defaultLimit)
        .limit(defaultLimit);
      // Return products in JSON format
      res.status(200).json(products);
    } catch (error) {
      // Handle any potential errors and return an error response
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // API to update product prices
  updatePrices: async (req, res) => {
    try {
      const products = req.body;
      let updatedCount = 0;
      let updatedProducts = []; // Create an array to store updated products
      // Iterate through the list of products to update
      for (const product of products) {
        const { id, newPrice } = product;
        // Use findByIdAndUpdate to update product price
        const updatedProduct = await productSchema.findByIdAndUpdate(
          id,
          { productPrice: newPrice },
          { new: true }
        );
        if (updatedProduct) {
          updatedCount++;
          updatedProducts.push(updatedProduct); // Add updated product to the array
        }
      }
      // Return success response with updated product information
      res.status(200).json({
        success: true,
        message: "Price updated successfully",
        updatedProductData: updatedProducts, // Use the updatedProducts array here
        updatedProductCount: updatedCount,
      });
    } catch (error) {
      // Handle any potential errors and return an error response
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};
