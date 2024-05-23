import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './App.tsx'; // Importe o componente de roteamento principal aqui

ReactDOM.render(
    <React.StrictMode>
        <AppRouter /> {/* Renderiza o componente de roteamento principal */}
    </React.StrictMode>,
    document.getElementById('root') // Ponto de montagem na página HTML (por exemplo, <div id="root"></div>)
);
