import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/login/Login';
import Dashboard from './components/dashboard';
import { useAuth } from './components/Auth/AuthContext';
import Navbar from './components/navbar/Navbar';
import Article from './components/article/Article';

function App() {
  const { token } = useAuth(); // Get the token from the AuthContext
  return (
    <BrowserRouter>
    {
      token && (
        <>
        <Navbar />
        </>
      )
    }
    
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/article/:id' element={<Article />} />
      </Routes>

    </BrowserRouter>

  );
}

export default App;
