// middleware/verifyApiKey.js
import { API_KEYS } from '../config/apiKeys.js';

const verifyApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    
    if (!apiKey || !API_KEYS.includes(apiKey)) {
        return res.status(401).json({ error: 'Unauthorized. Invalid API key.' });
    }
    
    next();
};

export default verifyApiKey;
