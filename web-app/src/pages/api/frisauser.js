import jwt from "jsonwebtoken";
import { pgPool } from "../../utils/database";

export default function index(req, res) {
    const { method, body } = req;

    switch (method) {
        case 'GET':
            pgPool.query('SELECT * FROM FrisaUser', (error, results) => {
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
        case 'POST':
            const { email, password } = body;
            const query = {
                text: 'SELECT * FROM FrisaUser WHERE email = $1 AND password = $2',
                values: [email, password]
            };

            pgPool.query(query, (error, results) => {
                if (error) {
                    console.error('Error executing query:', error);
                    return res.status(500).json({ error: true, message: 'Internal Server Error' });
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
