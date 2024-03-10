import jwt from "jsonwebtoken";
import { pgPool } from "../../utils/database";

export default function index(req, res) {
    const { method, body } = req;

    switch (method) {

        case 'POST':
            if (body.password && body.email) {
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
            } else if (body.email && body.password && body.firstName && body.lastName && body.birthDate) {
                const { email, password, firstName, lastName, birthDate } = body;
                const createQuery = {
                    text: 'INSERT INTO FrisaUser (email, password, firstName, lastName, birthDate) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                    values: [email, password, firstName, lastName, birthDate]
                };

                pgPool.query(createQuery, (error, results) => {
                    if (error) {
                        console.error('Error executing create query:', error);
                        return res.status(500).json({ error: true, message: 'Internal Server Error' });
                    } else {
                        const newUser = results.rows[0];
                        // Generate JWT token here if needed
                        res.json({
                            error: false,
                            message: 'User created successfully',
                            data: newUser
                        });
                    }
                });
            } else {
                return res.status(400).json('Invalid request');
            }
            break;
        
        default:
            return res.status(400).json('Invalid request');
    }
}
