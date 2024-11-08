import * as signalR from '@microsoft/signalr'

const wssUrl = "http://localhost:5056/chat-hub";
const OperatorContext = {};


// Conexión al hub de SignalR
const connection = new signalR.HubConnectionBuilder()
    .withUrl(wssUrl)
    .build();
// Método para conectar al operador y recibir los chats pendientes

//Cuando conecto deberia mandar id de operador y JWT 
connection.start().then(() => {

    console.log('Conectado a SignalR');

    connection.invoke("OperatorConnect")
        .catch(err => console.error("Error al conectar al operador:", err));
}).catch(err => console.error("Error de conexión:", err));
/*
// Recibe la lista de chats pendientes
connection.on("PendingChats", (chats) => {
    console.log("Chats pendientes:", chats);
    if (chats.length > 0) {
        const chatList = chats.map((chat, x) => {
            return `<div class="chat" id="${chat.id}">
                  <span>Chat ${chat.id}</span>
               </div>`;
        });

        document.querySelector(".chatList").innerHTML = chatList;
    }
    // Mostrar la lista de chats pendientes en la interfaz
});

// Recibe notificación de un nuevo chat
connection.on("NewChatRequest", (chat) => {
    console.log({ chat });
    console.log(`Nuevo chat disponible: ${chat.id}`);
    const newChat = `<div class="chat newChat" id="${chat.id}">
                  <span>Chat ${chat.id}</span>
               </div>`;

    document.querySelector(".chatList").insertAdjacentHTML('beforeend', newChat);
    // Actualizar la interfaz para mostrar el nuevo chat
});

//Me asigno un chat
document.querySelector('.content').addEventListener("click", async function (event) {
    if (event.target && event.target.classList.contains('chat')) {
        const selectedChatId = Number.parseInt(event.target.id);
        try {
            await connection.invoke("AssignOperatorToChat", selectedChatId);
            OperatorContext.selectedChatId = selectedChatId;
        } catch (err) {
            console.error("Error asignar operador:", err);
        }
    }

});

// Recibe notificación de que un chat fue asignado
connection.on("ChatAssigned", (chat) => {
    console.log(`El chat ${chat.id} ha sido asignado a otro operador.`);
    // Remover el chat de la lista de pendientes en la interfaz
});

*/
// Escucha los mensajes desde el hub (método "ReceiveMessage")
export const ReceiveMessage = async (messageDto) =>  {
    
    console.log({ messageDto });

    const senderIsClient = messageDto.senderType == 1 ? true : false;
    const date = new Date(messageDto.timeStamp);
    const niceTimeStamp = `${date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`;
    messageElement.classList.add("msg", senderIsClient ? "clientMsg" : "opMsg");
    messageElement.textContent = `${niceTimeStamp} - ${senderIsClient ? 'User' : 'OPE'} says:  ${messageDto.content}`;
    document.getElementById("messages").appendChild(messageElement);

}
/*
connection.on("ReceiveMessage", (messageDto) => {
    const messageElement = document.createElement("div");
    console.log({ messageDto });
    const senderIsClient = messageDto.senderType == 1 ? true : false;
    const date = new Date(messageDto.timeStamp);
    const niceTimeStamp = `${date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`;
    messageElement.classList.add("msg", senderIsClient ? "clientMsg" : "opMsg");
    messageElement.textContent = `${niceTimeStamp} - ${senderIsClient ? 'User' : 'OPE'} says:  ${messageDto.content}`;
    document.getElementById("messages").appendChild(messageElement);
});*/

// Método para enviar un mensaje al hub
export const sendMessageToChat = async (chatId, userId, message) => {
    try {
        await connection.invoke("SendMessageToChat", chatId, userId, message);
        console.log(`Mensaje enviado existosamente // Chat: ${chatId}, Usuario:${userId}, Mensaje:${message}`);
    } catch (err) {
        console.error("Error al enviar mensaje:", err);
    }
};

/*document.getElementById("sendMessageButton").addEventListener("click", async () => {
    const message = document.getElementById("messageContent").value;
    try {
        await connection.invoke("SendMessageToChat", OperatorContext.selectedChatId, 2, message);
    } catch (err) {
        console.error("Error al enviar mensaje:", err);
    }
});*/