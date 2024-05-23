import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './pages/Login/index.tsx';
import Register from './pages/Login/register.tsx';
import Transactions from './pages/Transactions/index.tsx';

function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Transactions />} />
            </Routes>
        </Router>
    );
}

export default AppRouter;
