import React, { useState, useRef, useEffect } from 'react';
import { Box, Card, CardContent, TextField, Button, useTheme } from '@mui/material';
import { ColorModeContext, codigos } from "../../theme";
import '../../estilos/chat.css';
import { sendMessageToChat } from '../../services.js';

const Chat = ({ chat }) => {
    const theme = useTheme();
    const colors = codigos(theme.palette.mode);

    const [messages, setMessages] = useState([]); // Estado para los mensajes
    const [newMessage, setNewMessage] = useState(''); // Estado para el nuevo mensaje
    const messagesEndRef = useRef(null); // Ref para el final de los mensajes

    // Efecto para desplazar hacia abajo al agregar un nuevo mensaje
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    // Inicializa los mensajes cuando cambia el chat
    useEffect(() => {
        if (chat) {
            const initialMessages = [
                { text: "Hola, que venden?", isSentByMe: false },
                { text: "Muchas cosas", isSentByMe: true }
            ];
            setMessages(initialMessages);
        }
    }, [chat]);

    if (!chat) {
        return (
            <div>
                <p>Selecciona un chat para ver la conversación.</p>
            </div>
        );
    }

    const handleSendMessage = async () => {
        if (newMessage.trim()) {
            setMessages((prevMessages) => [...prevMessages, { text: newMessage, isSentByMe: true }]);
            setNewMessage('');
        }

        const response = await sendMessageToChat(newMessage);
        console.log("Respuesta de la API:", response);
    };

    return (
        <Card variant="outlined">
            <CardContent>
                <h3>{chat.title}</h3>
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