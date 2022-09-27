import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/Shared/NavBar';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
