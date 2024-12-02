// const express = require("express");
// const mongoose = require('mongoose');
// const cors = require('cors');
// const ProductModel =require('./models/products')


// const app = express();
// app.use(cors())
// app.use(express.json())

// mongoose.connect("mongodb://localhost:27017/ims")

// app.post("/AddProduct", (req, res) =>{
//     ProductModel.create(req.body)
//     .then(products => res.json(products))
//     .catch(err => res.json(err))
// })

// app.listen(3002, () =>{
//     console.log("Server is Running on the specified port")
// })

const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ProductModel = require('./models/products');
const ExistingProductModel = require('./models/existingproduct');
const SellProductModel = require('./models/sellproduct');
const UpdateQuantityModel = require('./models/updatequantity');
const LoginModel = require('./authorisation/login');
const DeleteModel = require('./models/delete');

const { Parser } = require('json2csv');
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());



mongoose.connect("mongodb://localhost:27017/ims");

app.post("/export", async (req, res) => {
    try {
        // Fetching data from the database
        const products = await ProductModel.find({});

        // Specify the fields you want to include in the CSV
        const fields = [
            'productName', 
            'productDescription', 
            'purchaseQuantity', 
            'minimumQuantity', 
            'lotNumber', 
            'serialNumberFrom', 
            'serialNumberTo'
        ];
        const opts = { fields };

        // Parsing the products to CSV format
        const parser = new Parser(opts);
        const csv = parser.parse(products);

        // Set headers for file download
        res.set({
            'Content-Type': 'text/csv',
            'Content-Disposition': 'attachment; filename=products.csv'
        });

        // Send the CSV content
        console.log("Downloaded Sucessfully")
        res.send(csv);
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while exporting data.");
    }
});

app.post("/exportissuance", async (req, res) => {
    try {
        // Fetching data from the database
        const products = await SellProductModel.find({});

        // Specify the fields you want to include in the CSV
        const fields = [
            'productName', 
            'departmentNeed', 
            'Quantity', 
            'lotNumber', 
            'serialNumberFrom', 
            'serialNumberTo'
        ];
        const opts = { fields };

        // Parsing the products to CSV format
        const parser = new Parser(opts);
        const csv = parser.parse(products);

        // Set headers for file download
        res.set({
            'Content-Type': 'text/csv',
            'Content-Disposition': 'attachment; filename=issuance.csv'
        });

        // Send the CSV content
        console.log("Downloaded Sucessfully")
        res.send(csv);
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while exporting data.");
    }
});
app.post("/exportupdate", async (req, res) => {
    try {
        // Fetching data from the database
        const products = await UpdateQuantityModel.find({});

        // Specify the fields you want to include in the CSV
        const fields = [
            'productName', 
            'productDescription', 
            'updateQuantity', 
            'upminimumQuantity',
            'lotNumber', 
            'serialNumberFrom', 
            'serialNumberTo'
        ];
        const opts = { fields };

        // Parsing the products to CSV format
        const parser = new Parser(opts);
        const csv = parser.parse(products);

        // Set headers for file download
        res.set({
            'Content-Type': 'text/csv',
            'Content-Disposition': 'attachment; filename=update.csv'
        });

        // Send the CSV content
        console.log("Downloaded Sucessfully")
        res.send(csv);
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while exporting data.");
    }
});

app.post("/exportdelete", async (req, res) => {
    try {
        // Fetching data from the database
        const products = await DeleteModel.find({});

        // Specify the fields you want to include in the CSV
        const fields = [
            'productName', 
            'productDescription'
        ];
        const opts = { fields };

        // Parsing the products to CSV format
        const parser = new Parser(opts);
        const csv = parser.parse(products);

        // Set headers for file download
        res.set({
            'Content-Type': 'text/csv',
            'Content-Disposition': 'attachment; filename=delete.csv'
        });

        // Send the CSV content
        console.log("Downloaded Sucessfully")
        res.send(csv);
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while exporting data.");
    }
});


app.post("/AddProduct", async (req, res) => {
    try {
        const existingProduct = await ProductModel.findOne({ productName: req.body.productName });

        if (existingProduct) {
            return res.send('Product already exists.');
        }

        const newProduct = await ProductModel.create(req.body);
        res.json(newProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.post("/Delete", async (req, res) => {
    try {
        const { productName } = req.body;
        const product = await ProductModel.findOne({ productName });

        if (!product) {
            console.error(`Product not found: ${productName}`);
            return res.send('Product not found');
        }
        
        await ProductModel.deleteOne({ productName });
        const newProduct = await DeleteModel.create(req.body);
        res.json(newProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.post("/SellPro", async (req, res) => {
    try {
        const { productName, Quantity } = req.body;
        console.log(`Received request to sell product: ${productName} with quantity: ${Quantity}`);
        
        const product = await ProductModel.findOne({ productName });

        if (!product) {
            console.error(`Product not found: ${productName}`);
            return res.send('Product not found');
        }
        
        if (Quantity > product.purchaseQuantity) {
            console.error(`Insufficient quantity for product: ${productName}. Available: ${product.purchaseQuantity}, Requested: ${Quantity}`);
            return res.send('Insufficient product quantity');
        }

        product.purchaseQuantity -= Quantity;

        if (product.purchaseQuantity < product.minimumQuantity) {
            console.error(`Minimum Quantity level reached for product: ${productName}. Available after request: ${product.purchaseQuantity}`);
            return res.send('Minimum product quantity reached');
        }

        await product.save();
        console.log(`Updated product quantity for ${productName}: ${product.purchaseQuantity}`);

        const newProduct = await SellProductModel.create(req.body);
        res.json(newProduct);
    } catch (err) {
        console.error(`Error processing request: ${err.message}`);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});


app.post("/ExisPro", async (req, res) => {
    try {
        const { productName, addQuantity } = req.body;
        console.log(`Received request to sell product: ${productName} with quantity: ${addQuantity}`);
        
        const product = await ProductModel.findOne({ productName });

        if (!product) {
            console.error(`Product not found: ${productName}`);
            return res.send('Product not found');
        }

        // Check if the requested quantity is available
        
        // Update the product quantity
        product.purchaseQuantity += parseInt(addQuantity);
        await product.save();
        console.log(`Updated product quantity for ${productName}: ${product.purchaseQuantity}`);
        const newProduct = await ExistingProductModel.create(req.body);
        res.json(newProduct);
    } catch (err) {
        console.error(`Error processing request: ${err.message}`);
        res.status(500).json(err);
    }
});

app.get("/Display", async (req, res) => {
    try {
        // Fetch all products from the database
        const products = await ProductModel.find();
        res.json(products);
    } catch (error) {
        console.error('Error fetching product data:', error);
        res.status(500).json({ error: 'Error fetching product data' });
    }
});

app.post("/updatequan", async (req, res) => {
    try {
        const { productName, updateQuantity, upminimumQuantity  } = req.body;
        console.log(`Received request to sell product: ${productName} with quantity: ${updateQuantity}`);
        
        const product = await ProductModel.findOne({ productName });

        if (!product) {
            console.error(`Product not found: ${productName}`);
            return res.send('Product not found');
        }

        // Check if the requested quantity is available
        
        // Update the product quantity
        product.purchaseQuantity = parseInt(updateQuantity);
        product.minimumQuantity = upminimumQuantity;
        await product.save();
        console.log(`Updated product quantity for ${productName}: ${product.purchaseQuantity}`);
        const newProduct = await UpdateQuantityModel.create(req.body);
        res.json(newProduct);
    } catch (err) {
        console.error(`Error processing request: ${err.message}`);
        res.status(500).json(err);
    }
});

app.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if the user already exists
        const existingUser = await LoginModel.findOne({ email });

        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await LoginModel.create({ email, password: hashedPassword });

        res.json(newUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await LoginModel.findOne({ email });

        if (!user) {
            return res.status(404).send('User not found');
        }

        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).send('Invalid password');
        }

        // Authentication successful, generate token
        const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });

        // Send the token as a cookie or in the response body
        res.cookie('token', token); // Set the token as a cookie (example)

        // Send a success response with the redirection URL
        res.status(200).json({ redirectTo: '/dashboard' }); // Modify the redirection URL as needed

    } catch (err) {
        res.status(500).json(err);
    }
});


app.listen(3002, () => {
    console.log("Server is Running on the specified port");
});
