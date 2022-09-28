import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/Shared/NavBar';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import AddedClassWorkDetails from './Pages/ClassDashboard/AddedClassWorkDetails';
import ClassDetails from './Pages/ClassDashboard/ClassDetails';
import Classes from './Pages/Classes/Classes';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Classes />} />
        <Route path="/class-details" element={<ClassDetails />} />
        <Route
          path="/class-details/added-class-work-details"
          element={<AddedClassWorkDetails />}
        />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
