const express = require("express");

const fs = require("fs");

const path = require("path");

const app = express();

/* STATIC FOLDER */

app.use(
express.static(
path.join(__dirname,"public")
)
);

/* HOME ROUTE */

app.get("/",(req,res)=>{

res.sendFile(
path.join(
__dirname,
"public",
"login.html"
)
);
});

/* PRODUCTS API */

app.get("/products",(req,res)=>{

const data =
fs.readFileSync(

path.join(
__dirname,
"public",
"products.json"
),

"utf-8"
);

res.json(JSON.parse(data));
});

/* PORT */

const PORT =
process.env.PORT || 52900;

app.listen(PORT,()=>{

console.log(
"Server Running On Port " + PORT
);
});
