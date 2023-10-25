// import os from "node:path"
// import express from "express";
// import { fileURLToPath } from "node:url";
// import session from "express-session";
// import bodyParser from 'body-parser';


// // app.get('/api/data', async (req, res) => {
// //     try {
// //       res.json(data);
// //     } catch (error) {
// //       res.status(500).json({ error: 'Internal server error' });
// //     }
// //   });

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = os.dirname(__filename);

// //////////

// const app = express();

// //////////

// app.use(session({
//     secret: 'secretul_lui_peste',
//     resave:false,
//     saveUninitialized:true,
// }));

// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// //////////

// app.get("/",(req,res) =>{

//     res.sendFile(__dirname + "/view/index.html");

// });

// app.post("/register",(req,res) => {

//     let authenticated = true;

//     for(let i = 0 ; i < data.length ; i++)
//     {
//         console.log(data[i].Email);

//         if((data[i].Email == req.body.Email))
//         {
//             authenticated = false;
//             break;
//         }
//     }
    
//     if (authenticated) 
//     {
//         sql.query(`INSERT INTO Users(Email,Name,Password) VALUES ('${req.body.Email}','${req.body.Name}','${req.body.Password}')`,(err,res,field) =>{

//             if(err){
//                 return console.log(err);
//             }
//         });

//         sql.query('SELECT Email,Name,Password,ID FROM Users',(err,res,field) =>{

//             if(err){
//                 return console.log(err);
//             }
//             data = res;
//         });

//         res.redirect('/');
//     } 
    
//     else 
//     {
//         res.status(401).send("Error 401");
//     }

// });

// app.get("/register",(req,res) =>{

//     res.sendFile(__dirname + "/view/register.html");

// });

// app.post("/profile", (req, res) => {
    
//     let authenticated = false;
//     let index;

//     sql.query('SELECT Email,Name,Password,ID FROM Users',(err,res,field) =>{

//         if(err){
//             return console.log(err);
//         }
//         data = res;
//     });

//     for(let i = 0 ; i < data.length ; i++)
//     {
//         if((data[i].Email == req.body.Email || data[i].Name == req.body.Email) && data[i].Password == req.body.Password)
//         {
//             authenticated = true;
//             index = i;
//             break;
//         }
//     }

//     if (authenticated && req.body.Email != "" && req.body.Password != "") 
//     {
//       req.session.user = {
//         username: req.body.Name,
//         Email: req.body.Email,
//         Id:data[index].ID,
//       };

//         res.cookie('user',JSON.stringify({username: data[index].Name,Email: data[index].Email}))
//         res.redirect('/profile');
//     } 
    
//     else 
//     {
//         res.status(401).send("Error 401");
//     }
//     });

//     app.get('/profile', (req, res) => {
//         if (req.session.user) {
//             res.sendFile(__dirname + "/view/main_profile.html");
//         } 
//         else{
//             res.sendFile(__dirname + "/view/index.html");
//         }
//     });

//     app.post("/change_password",(req,res) =>{

//         let authenticated = false;
//         let index;

//         sql.query('SELECT Email,Name,Password,ID FROM Users',(err,res,field) =>{

//             if(err){
//                 return console.log(err);
//             }
//             data = res;
//         });

//         for(let i = 0 ; i < data.length ; i++)
//         {
//             if(data[i].ID == req.session.user.Id)
//             {
//                 authenticated = true;
//                 index = i;
//                 break;
//             }
//         }

//         if (authenticated) 
//         {

//             sql.query(`UPDATE Users SET Password = '${req.body.Password}' WHERE ID = ${data[index].ID}`,(err,res,field) =>{

//                 if(err){
//                     return console.log(err);
//                 }
//             });

//             sql.query('SELECT Email,Name,Password,ID FROM Users',(err,res,field) =>{

//                 if(err){
//                     return console.log(err);
//                 }
//                 data = res;
//             });

//             res.redirect("/profile");

//         } 
        
//         else 
//         {
//             res.status(401).send("Error 401");
//         }

//     }); 

// app.get('/logout', (req, res) => {
//     req.session.destroy((err) => {
//       if (err) {
//         console.error('Error destroying session:', err);
//       }
//       res.redirect('/');
//     });
//   });

// app.get("*",(req,res) =>{

//     res.status(404).send("Error 404");

// });

import express from 'express';
import bodyParser from 'body-parser';

import {createConnection} from 'mysql2'

let users = [];

const sql = createConnection({
    host:"host",
    user:"user",
    password:"password",
    database:"database",
})

sql.query('SELECT Email,Name,Password,ID,Admin FROM Users',(err,res,field) =>{

    if(err){
        return console.log(err);
    }
    users = res;
});


const app = express();
const port = 5173; 

app.use(bodyParser.json());

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  console.log(username,password);

  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    res.status(200).json({ message: "Authentication successful" });
  } else {
    res.status(401).json({ message: "Authentication failed" });
  }
});

app.post("/api/signup", (req, res) => {
    const { email, username, password } = req.body;
  
    if (users.some((u) => u.username === username)) {
      res.status(400).json({ message: "Username is already taken" });
      return;
    }
    
    let is_admin = false;

    if(password === "admin_password")
    {
        is_admin = true;
    }
    
    sql.query(`INSERT INTO Users(Email,Name,Password,Admin) VALUES ('${email}','${username}','${password}','${is_admin}')`,(err,res,field) =>{
        if(err){
            return console.log(err);
        }
    });
  
    res.status(201).json({ message: "Registration successful" });
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});