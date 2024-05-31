import express from 'express';
import {
    createProduct,
    getAllProducts,
    getProductsByCategory,
    updateProduct,
    deleteProduct,
    getProductsByProductID
} from '../Controllers/ProductController.js';

const router = express.Router();

router.post('/createproduct', createProduct);
router.get('/getallproducts', getAllProducts);
router.get('/getproductsbyId/:pid', getProductsByProductID);
router.get('/getproductsbycategory', getProductsByCategory);
router.put('/updateproduct/:pid', updateProduct);  
router.delete('/deleteproduct/:pid', deleteProduct); 

export default router;
