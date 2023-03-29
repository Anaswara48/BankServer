//import express and store in a variable
const { json } = require("express")
const express = require("express")

//import js
const ds = require('./services/dataservices')

// import jswt
const jwt = require("jsonwebtoken")
//app creation
const app = express()

//to convert all datas from json to js
app.use(express.json())

//middleware creation
const jwtMiddleware = (req, res, next) => {


try {
    // access data from requestbody
    
        const token = req.headers['access']
        // verify token with sceretkey
        const data =  jwt.verify(token, "tokenkey")

        console.log(data);
        next()
    }
catch {
        req.status(422).json({
            staus: false,
            message: "please login",
            statusCode: 404

        })
    }

}

//register-post
 app.post("/register", (req, res) => {
    const result = ds.register(req.body.acno, req.body.uname, req.body.psw)
    res.status(result.statusCode).json(result)

})


//login-get
app.post("/login", (req, res) => {
    const result = ds.login(req.body.acno, req.body.psw)
    res.status(result.statusCode).json(result)

})

//deposit-patch
app.post("/deposit",jwtMiddleware, (req, res) => {
    const result = ds.deposit(req.body.acno, req.body.psw, req.body.amnt)
    res.status(result.statusCode).json(result)

})

//withdraw-patch
app.post("/withdraw", jwtMiddleware,(req, res) => {
    const result = ds.withdraw(req.body.acno, req.body.psw, req.body.amnt)
    res.status(result.statusCode).json(result)

})


//transaction-get
app.get("/transaction",jwtMiddleware, (req, res) => {
    const result = ds.getTransaction(req.body.acno)
    res.status(result.statusCode).json(result)

})



//delete-delete

//resolve api
// app.get("/",(req,res)=>{
//     res.send('get method working........')
// })

// app.post("/",(req,res)=>{
//     res.send('post method working........')
// })

// app.put("/",(req,res)=>{
//     res.send('put method working........')
// })


// app.patch("/",(req,res)=>{
//     res.send('patch method working........')
// })

// app.delete("/",(req,res)=>{
//     res.send('delete method working........')
// })



//set port
app.listen(3000, () => {
    console.log("server started at port 3000");
})
