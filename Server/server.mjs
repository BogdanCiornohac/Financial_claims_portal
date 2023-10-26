import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/UserRoutes.mjs'



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



app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message)
    err.message = 'Something went wrong!';
  console.log(err)
  res.status(statusCode);
  res.json({ message: err.message });
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});