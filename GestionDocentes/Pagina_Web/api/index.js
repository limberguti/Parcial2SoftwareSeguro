import express from 'express';
import mysql from 'mysql';
import myconn from 'express-myconnection'
import routes from './routes.js';
import cors from 'cors';

const app = express()
app.set('port',process.env.PORT || 8800)
const dbOptions={
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gestion2',
  port: 3306
}
//middlaners
app.use(myconn(mysql,dbOptions,'single')) 
app.use(express.json())
app.use(cors())
//routes
 app.use('/api',routes)

//server running----------------
app.listen(app.get('port'),()=>{
    console.log("Conectado puerto ",app.get('port'))
})