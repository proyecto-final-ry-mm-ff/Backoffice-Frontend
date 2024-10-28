import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Chat from './Chat';
import ChatList from './ChatList';
import { ColorModeContext, useMode, codigos } from '../../theme';
import { CssBaseline, Box, ThemeProvider } from '@mui/material';
import Topbar from '../Global/Topbar';
import Sidebar from '../Global/Sidebar';

export default function ChatPage() {

    const [theme, colorMode] = useMode();
    const [selectedChat, setSelectedChat] = useState(); // Estado para el chat seleccionado
    const colors = codigos(theme.palette.mode);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className='app'>
                    <Sidebar />
                    <main className='content'>
                        <Topbar />
                        <div className='dashboard-content'>
                            <Grid container spacing={2}>
                                <Grid item xs={3} md={3}>
                                    <Box>
                                        <ChatList onChatSelect={setSelectedChat} /> {/* Pasar función para seleccionar chat */}
                                    </Box>
                                </Grid>
                                <Grid item xs={9} md={9}> {/* Ajustar el tamaño de Grid para Chat */}
                                    <Box>
                                        <Chat chat={selectedChat} /> {/* Pasar chat seleccionado */}
                                    </Box>
                                </Grid>
                            </Grid>
                        </div>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}