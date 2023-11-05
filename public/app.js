window.addEventListener('load', () => {

    //Open and connect socket
    let socket = io();
    //Listen for confirmation of connection
    socket.on('connect', ()=> {
        console.log("socket connected");
    });

    // Code to RECEIVE a socket message from the server
    let chatBox = document.getElementById('chat-box-msgs');

    //Listen for messages named 'msg' from the server
    socket.on('msg', function(data) {
        console.log("Message arrived");
        console.log(data);
   
        //Create a message string and page element
    let receivedMsg = data.name + ": " + data.msg;
    let msgEl = document.createElement('p');
    msgEl.innerHTML = receivedMsg;

    //Add the element with the message to the page
    chatBox.appendChild(msgEl);
    });

    // Code to SEND a socket message to the Server
    let nameInput = document.getElementById('name-input');
    let msgInput = document.getElementById('msg-input');
    let sendButton = document.getElementById('send-button');

    sendButton.addEventListener('click', ()=> {
        let curName = nameInput.value;
        let curMsg = msgInput.value;
        let msgObj = { "name": curName, "msg": curMsg };

        //Send the message object to the server
        socket.emit('msg', msgObj);
    });
});
