import {Pool} from 'pg'

let pgPool

if(!pgPool){
    pgPool = new Pool({
        user: "admin",
        host: "dpg-cniu5j6n7f5s73cqj0lg-a.oregon-postgres.render.com",
        database: "dbfrisa",
        password: "6ACjclLCRccldRpAyhvc8pQ5Rh9b1azM",
        port: "5432",
        ssl: {
            rejectUnauthorized: false
        }
        
    });
}



export {pgPool};