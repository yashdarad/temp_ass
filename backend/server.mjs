import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());

const mongoURI = 'mongodb+srv://yash_darad:Yash331@cluster0.laqfnol.mongodb.net/';

// Define product schema
const productSchema = new mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    price: Number,
    category: String,
    sold: Boolean,
    image: String,
    dateOfSale: String // Assuming dateOfSale is stored as a string
});

const Product = mongoose.model('Product', productSchema);

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Fetch all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Sales summary endpoint
app.get('/api/sales-summary', async (req, res) => {
    try {
        const month = req.query.month;
        const products = await Product.find();
        
        let filteredProducts = products;
        if (month) {
            filteredProducts = products.filter(product => {
                const saleDate = new Date(product.dateOfSale);
                return saleDate.getMonth() + 1 === parseInt(month);
            });
        }

        const soldCount = filteredProducts.filter(product => product.sold).length;
        const unsoldCount = filteredProducts.filter(product => !product.sold).length;

        res.json({
            soldCount,
            unsoldCount
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
