import dotenv from 'dotenv'
dotenv.config()
import express, { urlencoded } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/UserRoutes.mjs'
import ticketRoutes from './routes/TicketRoutes.mjs'


// const sql = createConnection({
//   host: "host",
//   user: "user",
//   password: "password",
//   database: "database",
// })

// sql.query('SELECT Email,Name,Password,ID,Admin FROM Users', (err, res, field) => {

//   if (err) {
//     return console.log(err);
//   }
//   users = res;
// });


const app = express();


const port = process.env.SERVER_PORT;
app.use(cors());
app.use(bodyParser.json());


app.use('/api/user', userRoutes);
app.use('/api/ticket', ticketRoutes);



app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  console.log(err);
  if (err.code = 'P2002') {
    if (err.meta.target.includes('email')) {
      err.message = 'Email is already taken';
    } else if (err.meta.target.includes('username')) {
      err.message = 'Username is already taken';
    }
  }
  if (!err.message)
    err.message = 'Something went wrong!';
  console.log(err)
  res.status(statusCode);
  res.json({ message: err.message });
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});