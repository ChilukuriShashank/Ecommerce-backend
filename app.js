import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; 
import router from './Routers/ProductRouter.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Set the limit to a higher value, for example, 50mb
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cors()); 
app.use(router);

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Connected to Database");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error("Database connection error:", err);
});
