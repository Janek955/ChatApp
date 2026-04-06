let socket;

export function connect(token, handlers) {
    const protocol = location.protocol === "https://" ? "wss" : "ws";
    // socket = new WebSocket(`${protocol}://${location.host}`);
    socket = new WebSocket(`${protocol}://localhost:3000`);
    
    socket.onopen = () => {
        socket.send(JSON.stringify({
            type: "auth",
            token
        }));
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (handlers[data.type]) {
            handlers[data.type](data);
        }
        if (data.type === "authSuccess") {
            myNick = data.nick;
            console.log("Zalogowano jako: " + myNick);
        }
    };
    return socket;

}

export function sendMessage(message, attachments = []) {
    socket.send(JSON.stringify({
        type: "chat",
        message,
        attachments
    }));
}

export function joinRoom(roomCode) {
    socket.send(JSON.stringify({
        type: "joinRoom",
        roomCode
    }));
}

export function createRoom(name) {
    socket.send(JSON.stringify({
        type: "createRoom",
        name
    }));
}


// export function connectWebSocket(){
//     // socket = new WebSocket(`ws://${location.host}`); // to jest do zmiany 

//     const protocol = location.protocol === "https:" ? "wss" : "ws";
//     socket = new WebSocket(`${protocol}://${location.host}`);

//     socket.binaryType = "arraybuffer"; ////////////////////////////////////////////////
    
//     socket.onopen = () => {
//         console.log("connectWebSocket");
//         const token = localStorage.getItem("token");

//         socket.send(JSON.stringify({
//             type: "auth",
//             token
//         }));
//     };

//     socket.onmessage = (event) => {
        

//         if ( event.data instanceof ArrayBuffer ) {

//             const blob = new Blob([event.data], { type: "audio/webm;codecs=opus" }); //, { type: "audio/webm;codecs=opus" }
//             const url = URL.createObjectURL(blob);

//             voiceQueue.push(url);

//             if (!playingVoice) {
//                 playVoiceQueue();
//             }
        
//             return;
//         }


//         const data = JSON.parse(event.data);

//         if (data.type === "authSuccess") {
//             myNick = data.nick;
//             console.log("Zalogowano jako: " + myNick);
//             document.getElementById("player-window-user-nick").textContent = myNick;

//             hideLoginOptions();
//         }
//         if (data.type === "chat") {
//             if (data.message) {
//             renderMessage(data.nick, "text", data.message, data.profilePicture);
//             }

//             if (data.attachments) {
//                 data.attachments.forEach(file => {
//                     renderMessage(
//                         data.nick,
//                         file.fileType,
//                         file.fileUrl,
//                         data.profilePicture
//                     );
//                 });
//             }
//             scrollChatToBottom();
//         }
//         if (data.type === "history") {
            
//             data.messages.forEach(msg => {

//                 let messageType = "text"; // <================ DO POPRAWY W BACKEND ŻEBY WYSYŁAŁ messageType
//                 let content = msg.content;

//                 if (msg.file_url) {
//                     messageType = msg.file_type;
//                     content = msg.file_url;
//                 }
//                 renderMessage(msg.nick, messageType, content, msg.profilePicture);
//             });

//             scrollChatToBottom();
//         }

//         if (data.type === "roomCreated") {
//             renderFriendRoom(data.roomCode); // <==== do wyjebania
//             console.log(data.roomCode);
//         }

//         if (data.type === "joined") {
//             console.log("Connected to room id:" + data.roomCode);
//             joiningRoom = false;
//         }

//         if (data.type === "userRooms") {
//             data.rooms.forEach(room => {
//                 renderFriendRoom(room.code, room.name, room.icon);
//             });

//             if (data.rooms.length > 0) {
//                 showRoom(data.rooms[0].code);
//             }
//         }

//         // ERROR HANDLING
//         if (data.type === "error") {
//             console.log(data.message);
//         }

//         if (data.message === "Session expired"){
//             localStorage.removeItem("token");
//             location.reload();
//         }
//     };
// }