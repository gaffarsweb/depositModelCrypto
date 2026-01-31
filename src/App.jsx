import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AdminDashboard from './pages/admin/Dashboard';
import UserDashboard from './pages/user/Dashboard';
import ProtectedRoute from './auth/ProtectedRoute';
import RoleRoute from './auth/RoleRoute';
import Welcome from './pages/Welcome';
import './styles/modal.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin" element={
          <ProtectedRoute>
            <RoleRoute role="ADMIN">
              <AdminDashboard />
            </RoleRoute>
          </ProtectedRoute>
        } />

        <Route path="/user" element={
          <ProtectedRoute>
            <RoleRoute role="USER">
              <UserDashboard />
            </RoleRoute>
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}
