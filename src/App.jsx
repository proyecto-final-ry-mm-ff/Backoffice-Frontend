import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
//import { ChatProvider } from './context/ChatContext'; // Importa el ChatProvider
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './componentes/Login/Login';
import ChatPage from './componentes/ChatPage/ChatPage';
import FlowDesigner from './componentes/FlowDesignerPage/FlowPage';
import Configuracion from './componentes/ConfigPage/Configuracion';

const App = () => {
  return (
    <Provider store={store}>
      {/* <ChatProvider> */}
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/chatPage" element={<ChatPage />} />
          <Route path="/flowDesigner" element={<FlowDesigner />} />
          <Route path="/configuracion" element={<Configuracion />} />

          {/* Redirección al iniciar la app */}
          <Route path="/" element={<Navigate to="/chatPage" />} />
          <Route path="/dashboard" element={<Navigate to="/chatPage" />} />

          <Route path="*" element={<p>No se encontró la ruta!</p>} />
        </Routes>
      </BrowserRouter>
      {/* <ChatProvider/> */}
    </Provider>
  );
};

export default App;