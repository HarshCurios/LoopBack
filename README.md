# Express.js Product Management API

## Overview

This is an Express.js application for managing and downloading product records from a database. It provides endpoints to download products in both JSON and CSV formats, as well as an endpoint to update product prices.

## Prerequisites

Before running this project, you should have the following software installed:

- Node.js and npm
- MongoDB

# API Endpoints

Download Products as JSON
URL: /downloadProductsJSON
Method: GET
Description: Fetches product records from the database in JSON format with optional pagination.
Usage: Access the endpoint to retrieve product data in JSON format.

Download Products as CSV
URL: /downloadProductsCSV
Method: GET
Description: Fetches product records from the database in CSV format with optional pagination.
Usage: Access the endpoint to retrieve product data in CSV format.

Update Product Prices
URL: /updatePrices
Method: POST
Description: Accepts an array of objects in the request body to update product prices in the database.
Usage: Send a POST request with an array of objects containing product IDs and new prices to update.
Contributing
Contributions are welcome! If you'd like to contribute to this project, please follow these steps:


# Acknowledgments

Thanks to Fastify for the fast and efficient web framework.
Inspired by Express.js for the web server framework.
Contact
For any questions or inquiries, please contact Ankit Sharma.