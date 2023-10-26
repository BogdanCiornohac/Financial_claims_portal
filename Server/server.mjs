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

// app.post("/api/login", catchAsync(async (req, res) => {
//   const { username, password } = req.body;

//   console.log(username, password);

//   const user = await prisma.user.findUnique({
//     where: {
//       username: username
//     }
//   })

//   console.log(user);
//   const compare = await bcrypt.compare(password, user.password);
//   if (user && compare) {
//     console.log('Same')
//     res.status(200).json({ authenticated: true, id: user.id, message: "Authentication successful" });
//   } else {
//     res.status(401).json({ authenticated: false, message: "Authentication failed" });
//   }
// }));

// app.post("/api/signup", catchAsync(async (req, res) => {
//   const { email, username, password } = req.body;
//   const salt = await bcrypt.genSalt(10);
//   const hash = await bcrypt.hash(password, salt);
//   const user = await prisma.user.create({
//     data: {
//       email: email,
//       username: username,
//       password: hash
//     }
//   })
//   console.log(user);

//   res.status(201).json({ message: "Registration successful" });
// }));

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