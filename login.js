const mysql = require("mysql2"); 
const  express = require("express");


const app = express();
app.use("/assets",express.static("assets"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Yamamura1977",
    database: "nodejs"
});

// connect to the database
connection.connect(function(error){
    if (error) throw error
    else console.log("connected to the database successfully!")
});


app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req,res){
    var username = req.body.username;
    var password = req.body.password;

    connection.query("select * from loginuser where user_name = ? and user_pass = ?",[username,password],function(error,results,fields){
        if(results.length > 0) {
            res.redirect("/welcome");
        } else {
            res.redirect("/");
        }
        res.end();
    })
})

// when login is success
app.get("/welcome",function(req,res){
    res.sendFile(__dirname + "/welcome.html")
})

//set app port
app.listen(4500); 