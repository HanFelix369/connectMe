const socket = io()
let name = document.querySelector("#userval")
let enter = document.querySelector("#enter")
let msginput = document.querySelector("#sentbox")
let btn = document.querySelector("#sendbtn")
//keypads
let allbtns = document.querySelectorAll(".buttons span")
allbtns.forEach(e=>{
    console.log(e)
    e.addEventListener("click",(val)=>{
       let out= val.target.innerText
       console.log(out)
       if(out !== "ENTER"){
        name.value+=out
       }
    })
})
console.log(allbtns)
enter.addEventListener("click",()=>{
    if(name.value !==""){
        let diloigbox = document.querySelector("#username")
        diloigbox.style.transform="scale(0)"
    }else{
        alert('ENTER YOUR NAME FIRST!');
    }
    socket.emit("newusr",name.value)
    socket.on("user-joined",(name)=>{
        let msgbox = document.createElement("div")
        msgbox.classList.add("alert")
        msgbox.innerHTML = ` <span>${name} Joinded the chat  </span>`
        let msgground = document.querySelector(".messageground")
        msgground.appendChild(msgbox)
        msgground.scrollBy(0,99999999999)
       
    })
    socket.on("left",(name)=>{
        let msgbox = document.createElement("div")
        msgbox.classList.add("alert")
        msgbox.innerHTML = ` <span>${name} has left the chat  </span>`
        let msgground = document.querySelector(".messageground")
        msgground.appendChild(msgbox)
        msgground.scrollBy(0,99999999999)
       
    })
    let greetbox = document.querySelector("#greet")
    greetbox.textContent ="Welcome " + name.value
    
    btn.addEventListener("click",e=>{
        sendMessage(msginput.value)
    })


    function sendMessage(msg){
        let data = {
            user:name.value.trim(),
            message:msg
        }
        if(msginput.value !== ""){
        appendMessage(data,"right")
        socket.emit("sentData",data)
        }
    }
   function appendMessage(msg,type){
       
        let msgbox = document.createElement("div")
        msgbox.classList.add(type)
        msgbox.innerHTML = ` <span>${msg.user}: </span><p class="mess">${msg.message}</p>`
        let msgground = document.querySelector(".messageground")
        msgground.appendChild(msgbox)
        msgground.scrollBy(0,99999999999)
        msginput.value = ""
      
    }
   
  
//recive
socket.on("sentData",(data)=>{
    console.log(data) 
    appendMessage(data,"left")

})


})