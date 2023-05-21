const express = require("express")
const path = require("path")
const app = express()
const http = require("http").createServer(app)
const io = require("socket.io")(http)
const port = process.env.port || 8000
app.use(express.static(path.join(__dirname,"/public")))
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"/index.html"))
})


http.listen(port,()=>console.log("app is listning on " + port))

//socket io 
let users = []
io.on("connection",(socket)=>{
     console.log("connected")
     socket.on("newusr",(name)=>{
        console.log("new-user",name)
        users[socket.id] = name
        socket.broadcast.emit("user-joined",name)
     })
     socket.on("disconnect",(name)=>{
        
        socket.broadcast.emit("left",users[socket.id])
        delete users[socket.id]
     })
     
     socket.on("sentData",(msg)=>{
        console.log(msg)
        socket.broadcast.emit("sentData",msg)
     })


})