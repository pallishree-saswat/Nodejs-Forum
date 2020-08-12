const express = require("express")
const mongoose = require("mongoose")
const hbs = require("hbs")
const session = require("express-session")
const methodOverride = require("method-override")
const path = require("path")
const dotenv = require("dotenv")

dotenv.config()
require("./db")

//initialization
const app = express();


app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:false}))
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "views", "partials"))
app.set("view options", {layout:"layout"})

//call routes
const normalRoutes = require('./routes/normalRoutes')
const apiRoutes = require('./routes/apiRoutes')
//setting up the session
app.use(
    session({
      secret: "forum",
      resave:true,
      name:"forumsession",
      saveUninitialized:true,
  
    })
  );


//routes 

app.use(normalRoutes)
app.use(apiRoutes)


  app.get("/",function(req,res){
    res.render('index')
    console.log('hiii')
  })
  
 
var PORT = process.env.PORT || 8080
app.listen(PORT, function(){
    console.log("server started on port : " , PORT)
})
  