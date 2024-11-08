import React, { useState, useRef, useEffect } from 'react';
import { Box, Card, CardContent, TextField, Button, useTheme } from '@mui/material';
import { ColorModeContext, codigos } from "../../theme";
import '../../estilos/chat.css';
import { sendMessageToChat } from '../../Services/signalRService.js';

const Chat = ({ chatId }) => {
    const theme = useTheme();
    const colors = codigos(theme.palette.mode);

    const [messages, setMessages] = useState([]); // Estado para los mensajes
    const [newMessage, setNewMessage] = useState(''); // Estado para el nuevo mensaje
    const messagesEndRef = useRef(null); // Ref para el auto scroll

    // Efecto para scroll con nuevo mensaje
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    // Cargar los mensajes 
    useEffect(() => {
        if (chatId) {
            //TODO / Cargar mensajes         
            setMessages([
                { id: 1, text: "¡Hola! ¿Cómo estás?", isSentByMe: false },
                { id: 2, text: "¡Bien, gracias! ¿Y tú?", isSentByMe: true },
            ]);
        }
    }, [chatId]); // Atento a cada vez que el chatId cambie


    const handleSendMessage = async () => {
        if (newMessage.trim()) {
            setMessages((prevMessages) => [...prevMessages, { text: newMessage, isSentByMe: true }]);

            // Enviar el mensaje a SignalR

            const userId = 2;
            try {
                // Llamar a sendMessageToChat desde SignalRService
                await sendMessageToChat(chatId, userId, newMessage);
            } catch (err) {
                console.error("Error al enviar mensaje:", err);
            }
        }
    };

    return (
        <Card variant="outlined">
            <CardContent>
                <h2>Chat {chatId}</h2>

                {/*Seccion para ver los mensajes*/}

                <Box className="chat-box">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={msg.isSentByMe ? "message-sent" : "message-received"}
                        >
                            <p className="message">{msg.text}</p>
                            <span className="time">
                                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    ))}
                    <div ref={messagesEndRef} /> {/* Div para el final de los mensajes */}
                </Box>

                {/*Seccion para escribir un mensaje*/}

                <Box display="flex">
                    <TextField
                        variant="outlined"
                        fullWidth
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Escribe un mensaje..."
                    />
                    <Button variant="contained" onClick={handleSendMessage} sx={{ marginLeft: 1 }}>
                        Enviar
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default Chat;