import express from 'express';
import {
    createProduct,
    getAllProducts,
    getProductsByCategory,
    updateProduct,
    deleteProduct,
    getProductsByProductID,
    searchProducts,
    getAllCategories
} from '../Controllers/ProductController.js';
import verifyApiKey from '../middleware/verifyApiKey.js'; // Import the middleware

const router = express.Router();

// Apply the middleware to routes that require authentication
router.use(verifyApiKey);

router.post('/createproduct', createProduct);
router.get('/getallproducts', getAllProducts);
router.get('/getproductsbyId/:pid', getProductsByProductID);
router.get('/getproductsbycategory', getProductsByCategory);
router.put('/updateproduct/:pid', updateProduct);  
router.delete('/deleteproduct/:pid', deleteProduct); 
router.get('/search', searchProducts);
router.get('/categories', getAllCategories);

export default router;
