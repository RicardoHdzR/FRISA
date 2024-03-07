import jwt from "jsonwebtoken";
import { pgPool } from "../../utils/database";

export default function index(req, res) {
    const { method } = req;

    switch (method) {
        case 'GET':
            pgPool.query('SELECT * FROM course', (error, results) => {
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
            var name = req.body.body.name;
            var description = req.body.body.description;
            var block = req.body.body.block;

            pgPool.query('INSERT INTO course (name, description, block) VALUES ($1, $2, $3) RETURNING *', [name, description, block], (error, results) => {
                if (error) {
                    throw error;
                } else {
                    res.status(201).json({
                        error: false,
                        message: 'Course added successfully',
                        data: results.rows[0]
                    });
                }
            });
            break;
        
        case 'PUT':
            var id = req.body.body.id;
            var name = req.body.body.name;
            var description = req.body.body.description;
            var block = req.body.body.block;

            pgPool.query('UPDATE course SET name = $1, description = $2, block = $3 WHERE id = $4 RETURNING *', [name, description, block, id], (error, results) => {
                if (error) {
                    throw error;
                } else {
                    res.json({
                        error: false,
                        message: 'Course updated successfully',
                        data: results.rows[0]
                    });
                }
            });
            break;

        default:
            return res.status(400).json('Invalid request');
    }
}
