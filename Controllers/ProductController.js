import Product from '../Models/Product.js';

// Get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error. Failed to fetch products.' });
    }
};

// Get products by category
export const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.body;
        const products = await Product.find({ category: category });
        if (products.length === 0) {
            return res.status(404).json({ error: `No products found in category '${category}'` });
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error. Failed to fetch products.' });
    }
};

// Get product by product ID
export const getProductsByProductID = async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await Product.findOne({ productid: pid });
        if (!product) {
            return res.status(404).json({ error: `Product with ID '${pid}' not found` });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error. Failed to fetch product.' });
    }
};

// Create a new product
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, quantity, images } = req.body;
        const product = new Product({ name, description, price, category, quantity, images });
        await product.save();
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(400).json({ error: 'Bad Request. Failed to create product.' });
    }
};

// Update a product
export const updateProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        const updateData = req.body;
        const product = await Product.findOneAndUpdate({ productid: pid }, updateData, { new: true });
        if (!product) {
            return res.status(404).json({ error: `Product with ID '${pid}' not found` });
        }
        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        res.status(400).json({ error: 'Bad Request. Failed to update product.' });
    }
};

// Upload an image for a product
export const uploadImage = (req, res) => {
    upload.single('file')(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error. Failed to upload image.' });
        }
        const { pid } = req.params;
        try {
            const product = await Product.findOne({ productid: pid });
            if (!product) {
                return res.status(404).json({ error: `Product with ID '${pid}' not found` });
            }
            product.images.push({ url: `/files/${req.file.filename}`, alt: req.body.alt || '' });
            await product.save();
            res.status(200).json({ message: 'Image uploaded successfully', product });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error. Failed to upload image.' });
        }
    });
};

// Delete a product
export const deleteProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await Product.findOneAndDelete({ productid: pid });
        if (!product) {
            return res.status(404).json({ error: `Product with ID '${pid}' not found` });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error. Failed to delete product.' });
    }
};
