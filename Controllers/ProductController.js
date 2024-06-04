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


export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, quantity,images } = req.body;
        
        const product = new Product({ name, description, price, category, quantity,images });
        await product.save();
        
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Internal Server Error. Failed to create product.' });
    }
};



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


// Get all products matching the search query
export const searchProducts = async (req, res) => {
    try {
        const { query, category, minPrice, maxPrice } = req.query;
        const searchCriteria = {
            ...(query && {
                $or: [
                    { name: { $regex: query, $options: 'i' } }, // Case-insensitive search for product name
                    { description: { $regex: query, $options: 'i' } }, // Case-insensitive search for product description
                    { category: { $regex: query, $options: 'i' } } // Case-insensitive search for product category
                ]
            }),
            ...(category && { category }),
            ...(minPrice && { price: { $gte: minPrice } }),
            ...(maxPrice && { price: { $lte: maxPrice } })
        };
        const products = await Product.find(searchCriteria);
        
        if (products.length === 0) {
            return res.status(404).json({ error: `No products found matching the search criteria.` });
        }
        
        res.status(200).json(products);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Internal Server Error. Failed to search for products.' });
    }
};

// Other controller functions...

// Get all unique categories
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Product.distinct('category');
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error. Failed to fetch categories.' });
    }
};