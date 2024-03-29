let socket=io();

let join_btn=document.getElementById("login");
let userInput=document.getElementById("username");
let form=document.getElementById("login-page");
let messageInput=document.getElementById("type-msg");
let chat=document.getElementById("chat-page");
let messageContaineer=document.getElementById("message-containeer");
let Username="";

join_btn.addEventListener("click",event=>{

    event.preventDefault();

    let Username=userInput.value;

    if(Username!="")
    {
        form.style.display="none";
        chat.style.display="block";
    }
})

let sendmsg=document.querySelector("#message-input>button");
    sendmsg.addEventListener("click",event=>{
    event.preventDefault();    
    // console.log("clicked"); 

    let data={
        id: socket.id,
        message: messageInput.value,
        username: Username,
    }
    console.log(data);

    socket.emit('chat message',data)

    socket.on('chat message',data =>{
        if(data.id!== socket.id)
           {
             addmessages(data,"recieved")
           }
           else
           {
             addmessages(msg,"sent");
           }
    })
});

function addmessages(data,type){
    let msgDiv=document.createElement("div");
    msgDiv.innerText=`${data.message}`;

    if(type=="sent")
    {
        msgDiv.className="sent-msg";
    }
    else if(type=="recieved")
    {
        msgDiv.className="recieved-msg";
    }

    messageContaineer.appendChild(msgDiv);
    msgInput.value=null;
}