import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { useAuth } from './components/Auth/AuthContext';

// Lazy loading components
const Login = lazy(() => import('./components/login/Login'));
const Dashboard = lazy(() => import('./components/dashboard'));
const Navbar = lazy(() => import('./components/navbar/Navbar'));
const Article = lazy(() => import('./components/article/Article'));

// Higher-order component for protected routes
const ProtectedRoute = ({ token, children }) => {
  return token ? children : <Navigate to="/" />;
};

function App() {
  const { token } = useAuth();
  console.log("Token is ",token)
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        {token && <Navbar />}

        <Routes>
          {
            !token ? (
              <>
              <Route path='/' element={<Login />} />
              <Route path='*' element={<Navigate to="/" />} />

              </>
            ):(
              <>
              <Route path='*' element={<ProtectedRoute token={token}><Dashboard /></ProtectedRoute>} />
              <Route path='/dashboard' element={<ProtectedRoute token={token}><Dashboard /></ProtectedRoute>} />
              <Route path='/article/:id' element={<ProtectedRoute token={token}><Article /></ProtectedRoute>} />
              </>
            )
          }
       
         
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
