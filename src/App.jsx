import React from 'react';//para usar jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';//manejar la navegación y las rutas
import { Provider } from 'react-redux';//para conectar tu aplicación con redux
import { store } from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './componentes/Login/Login';
import ChatPage from './componentes/ChatPage/ChatPage';
import FlowDesigner from './componentes/FlowDesignerPage/FlowPage';
import Configuracion from './componentes/ConfigPage/Configuracion';

const App = () => {

  return (
    // El Provider envuelve la App con el Provider de Redux. 
    // Esto hace que el store de Redux esté disponible para todos los componentes de la app.
    <Provider store={store}>

      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/chatPage" element={<ChatPage />} />
          <Route path="/flowDesigner" element={<FlowDesigner />} />
          <Route path="/configuracion" element={<Configuracion />} />

          {/* Al iniiar se carga el login  (path="/") */}
          <Route path="/" element={<Navigate to="/ChatPage" />} />
          <Route path="/dashboard" element={<Navigate to="/chatPage" />} />

          <Route path="*" element={<p>No se encontró la ruta!</p>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
