import jwt from "jsonwebtoken";
import { pgPool } from "../../utils/database";

export default function index(req, res) {
    const { method } = req;

    switch (method) {
        case 'GET':
            pgPool.query('SELECT * FROM Videos', (error, results) => {
                if (error) {
                    throw error;
                } else {                
                    res.json({
                        error: false,
                        message: 'Data retrieved successfully',
                        data: results.rows 
                    });
                }
            });
            break;
        
        default:
            return res.status(400).json('Invalid request');
    }
}
